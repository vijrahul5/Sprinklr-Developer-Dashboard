import React, { useEffect, useState } from "react";
import { useStyletron } from "baseui";
import {
    StyledTable,
    StyledHead,
    StyledHeadCell,
    StyledCell,
} from "baseui/table";

import {
    InfiniteLoader,
    List,
    AutoSizer,
    CellMeasurer,
    CellMeasurerCache,
} from "react-virtualized";

const minimumBatchSize = 20;

const Expe = ({ jql = "", columnTitles, loadMoreRows, author, minWidth }) => {
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

    return (
        <div className="table__Container">
            <div
                className={css({
                    height: "600px",
                    width: "100%",
                    minWidth: minWidth,
                })}
            >
                <StyledTable
                    role="grid"
                    aria-colcount={columnTitles.length}
                    aria-rowcount={remoteRowCount}
                >
                    <StyledHead role="row">
                        {columnTitles.map((column, index) => (
                            <StyledHeadCell
                                role="columnheader"
                                key={index}
                                className="table__headCell"
                            >
                                {column}
                            </StyledHeadCell>
                        ))}
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
                                            rowHeight={cache.rowHeight}
                                            deferredMeasurementCache={cache}
                                            rowRenderer={({
                                                index,
                                                key,
                                                parent,
                                                style,
                                            }) => {
                                                return (
                                                    <CellMeasurer
                                                        cache={cache}
                                                        columnIndex={0}
                                                        key={key}
                                                        parent={parent}
                                                        rowIndex={index}
                                                    >
                                                        <div style={style}>
                                                            {isRowLoaded({
                                                                index: index,
                                                            }) ? (
                                                                <StyledHead
                                                                    role="row"
                                                                    key={key}
                                                                    className="table__row"
                                                                >
                                                                    {list[
                                                                        index
                                                                    ].map(
                                                                        (
                                                                            cell,
                                                                            ind
                                                                        ) => (
                                                                            <StyledHeadCell
                                                                                role="gridcell"
                                                                                key={
                                                                                    ind
                                                                                }
                                                                                className="table__cell"
                                                                            >
                                                                                {
                                                                                    cell
                                                                                }
                                                                            </StyledHeadCell>
                                                                        )
                                                                    )}
                                                                </StyledHead>
                                                            ) : (
                                                                <StyledCell
                                                                    role="gridcell"
                                                                    key={index}
                                                                ></StyledCell>
                                                            )}
                                                        </div>
                                                    </CellMeasurer>
                                                );
                                            }}
                                        />
                                    )}
                                </AutoSizer>
                            )}
                        </InfiniteLoader>
                    </div>
                </StyledTable>
            </div>
        </div>
    );
};

export default Expe;
