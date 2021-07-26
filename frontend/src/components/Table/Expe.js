//library
import React from "react";

//hooks
import { useEffect, useState } from "react";
import { useStyletron, withStyle } from "baseui";

//components
import {
  StyledTable,
  StyledHead,
  StyledHeadCell,
  StyledBody,
} from "baseui/table";

import Loader from "../loaders/Loader";
import Tombstone from "../loaders/Tombstone";
import {
  InfiniteLoader,
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";

//constants
const minimumBatchSize = 20;
const overscanRowCount = 10;
const TitleHeadCell = withStyle(StyledHeadCell, {
  minwidth: "150px",
  maxWidth: "150px",
});

const Expe = ({
  jql = "",
  columnTitles,
  loadMoreRows,
  author,
  minWidth,
  loadtumbstone = false,
}) => {
  let ColumnLength = columnTitles.length;
  const [css] = useStyletron();
  useEffect(() => {
    setList([]);
    setLoading(false);
    setRemoteCount(20);
    setLastLoadedIndex(-1);
  }, [jql, author]);

  const [list, setList] = useState([]);
  const [remoteRowCount, setRemoteCount] = useState(20);
  const [loading, setLoading] = useState(false);
  const [lastLoadedIndex, setLastLoadedIndex] = useState(-1);

  function isRowLoaded({ index }) {
    return !!list[index];
  }
  const cache = new CellMeasurerCache({
    defaultHeight: 50,
    fixedWidth: true,
  });

  if (loadtumbstone) {
    return (
      <div className={css({ height: "600px" })}>
        <StyledTable>
          <StyledHead
            style={{
              borderBottom: "1px solid rgb(200,200,200)",
            }}
          >
            <StyledHeadCell>Type</StyledHeadCell>
            <StyledHeadCell>Key</StyledHeadCell>
            <StyledHeadCell>Status</StyledHeadCell>
            <StyledHeadCell>Priority</StyledHeadCell>
            <StyledHeadCell>Summary</StyledHeadCell>
          </StyledHead>
          <StyledBody>
            {[...Array(10)].map((x, i) => (
              <StyledHead
                style={{
                  borderBottom: "1px solid rgb(200,200,200)",
                }}
              >
                {[...Array(ColumnLength)].map(() => (
                  <StyledHeadCell>
                    <Tombstone
                      style={{
                        height: "40px",
                        width: "100%",
                      }}
                    />
                  </StyledHeadCell>
                ))}
              </StyledHead>
            ))}
          </StyledBody>
        </StyledTable>
      </div>
    );
  }

  return (
    <div className="table__Container">
      <div
        className={css({
          height: "600px",
          width: "100%",
          minWidth: minWidth,
        })}
      >
        <StyledTable>
          <StyledHead className="table__headRow">
            {columnTitles.slice(0, ColumnLength - 1).map((column, index) => (
              <TitleHeadCell key={index} className="table__headCell">
                {column}
              </TitleHeadCell>
            ))}
            <StyledHeadCell key={ColumnLength - 1} className="table__headCell">
              {columnTitles[ColumnLength - 1]}
            </StyledHeadCell>
          </StyledHead>

          <div className={css({ height: "100%" })}>
            <InfiniteLoader
              isRowLoaded={isRowLoaded}
              loadMoreRows={({ stopIndex }) => {
                if (!loading && stopIndex > lastLoadedIndex)
                  loadMoreRows({
                    startIndex: lastLoadedIndex + 1,
                    stopIndex,
                    setLoading,
                    jql,
                    setList,
                    lastLoadedIndex,
                    setLastLoadedIndex,
                    list,
                    setRemoteCount,
                  });
              }}
              rowCount={remoteRowCount}
              minimumBatchSize={minimumBatchSize}
            >
              {({ onRowsRendered, registerChild }) => (
                <AutoSizer>
                  {({ height, width }) => (
                    <List
                      onRowsRendered={onRowsRendered}
                      ref={registerChild}
                      height={height}
                      width={width}
                      rowCount={remoteRowCount}
                      overscanRowCount={overscanRowCount}
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
                            {isRowLoaded({
                              index: index,
                            }) ? (
                              <StyledHead
                                key={key}
                                className="table__row"
                                style={style}
                              >
                                {list[index]
                                  .slice(0, ColumnLength - 1)
                                  .map((cell, ind) => (
                                    <TitleHeadCell
                                      key={ind}
                                      className="table__cell"
                                    >
                                      {cell}
                                    </TitleHeadCell>
                                  ))}
                                <StyledHeadCell
                                  key={ColumnLength - 1}
                                  className="table__cell"
                                >
                                  {list[index][ColumnLength - 1]}
                                </StyledHeadCell>
                              </StyledHead>
                            ) : (
                              <></>
                            )}
                          </CellMeasurer>
                        );
                      }}
                    />
                  )}
                </AutoSizer>
              )}
            </InfiniteLoader>
          </div>

          {loading ? <Loader /> : <></>}
        </StyledTable>
      </div>
    </div>
  );
};

export default Expe;