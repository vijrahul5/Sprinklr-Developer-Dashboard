import React, { useEffect, useState } from "react";
import { useStyletron } from "baseui";
import axios from "axios";
import JiraTableBuilder from "../JiraDashboard/components/builder/JiraTableBuilder";
import {
  StyledTable,
  StyledHead,
  StyledHeadCell,
  StyledRow,
  StyledCell,
} from "baseui/table";
import { DIVIDER } from "baseui/table-semantic";

import {
  InfiniteLoader,
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";
// import "react-virtualized/styles.css";
const minimumBatchSize = 20;
const Expe = ({ jql = "" }) => {
  const [css] = useStyletron();
  useEffect(() => {
    setList([]);
    setRemoteCount(1);
  }, [jql]);
  const [list, setList] = useState([]);
  const [remoteRowCount, setRemoteCount] = useState(1);
  const [lastLoadedIndex, setLastLoadedIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  function isRowLoaded({ index }) {
    return !!list[index];
  }
  function loadMoreRows({ startIndex, stopIndex }) {
    setLoading(true);
    let data = {
      startAt: startIndex,
      maxResults: stopIndex - startIndex + 1,
      jql: jql,
    };
    console.log("mmmaaa", startIndex, stopIndex);
    return axios.post("/api/jira/getDataByJql", data).then((response) => {
      let result = response.data.data;
      let arr = result.issues.map((detail) => {
        let priority =
          detail.fields.priority !== null ? detail.fields.priority.name : "";
        let newItem = JiraTableBuilder()
          .setIssueName(detail.fields.issuetype.name)
          .setIssueSummary(detail.fields.summary)
          .setIssueKey("", detail.key)
          .setIssuePriority(priority)
          .setIssueStatus(detail.fields.status.name)
          .build();

        return newItem;
      });
      setList([...list, ...arr]);
      setRemoteCount(result.total);
      setLoading(false);
    });
  }
  const COLUMNS = ["Type", "Key", "Summary", "Status", "Priority"];
  const cache = new CellMeasurerCache({
    defaultHeight: 500,
    fixedWidth: true,
  });

  return (
    <div className={css({ height: "500px" })}>
      <StyledTable
        role="grid"
        aria-colcount={COLUMNS.length}
        aria-rowcount={remoteRowCount}
        $gridTemplateColumns="200px 200px 200px 200px 200px"
        divider={DIVIDER.grid}
      >
        <StyledHead role="row">
          {COLUMNS.map((column, index) => (
            <StyledHeadCell role="columnheader" key={index}>
              {column}
            </StyledHeadCell>
          ))}
        </StyledHead>
        <div className={css({ height: "100%", width: "100%" })}>
          <InfiniteLoader
            isRowLoaded={isRowLoaded}
            loadMoreRows={({ startIndex, stopIndex }) => {
              if (!loading) loadMoreRows({ startIndex, stopIndex });
            }}
            rowCount={remoteRowCount}
            minimumBatchSize={minimumBatchSize}
          >
            {({ onRowsRendered, registerChild }) => (
              <AutoSizer>
                {({ width, height }) => (
                  <List
                    onRowsRendered={onRowsRendered}
                    ref={registerChild}
                    height={height}
                    width={width}
                    rowCount={remoteRowCount}
                    rowHeight={cache.rowHeight}
                    deferredMeasurementCache={cache}
                    rowRenderer={({ index, key, parent, style }) => {
                      return (
                        <CellMeasurer
                          cache={cache}
                          columnIndex={0}
                          key={key}
                          parent={parent}
                          rowIndex={index}
                        >
                          {isRowLoaded({ index: index }) ? (
                            <StyledRow role="row" key={key} style={style}>
                              {isRowLoaded({ index: index }) ? (
                                list[index].map((cell, ind) => (
                                  <StyledCell role="gridcell" key={ind}>
                                    {cell}
                                  </StyledCell>
                                ))
                              ) : (
                                <StyledCell role="gridcell" key={index}>
                                  Loading...
                                </StyledCell>
                              )}
                            </StyledRow>
                          ) : (
                            <></>
                          )}
                        </CellMeasurer>
                      );
                    }}
                    className="virtual"
                  />
                )}
              </AutoSizer>
            )}
          </InfiniteLoader>
        </div>
      </StyledTable>
    </div>
  );
};

export default Expe;
