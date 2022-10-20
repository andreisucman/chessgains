import React, { useState, useEffect, useRef } from "react";
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from "react-virtualized";
import { useMoralis } from "react-moralis";
import styles from "../styles/TopPlayersList.module.scss";

export default function TopPlayersList({ gRefresh }) {
  const { Moralis, isInitialized } = useMoralis();
  const [list, setList] = useState([]);
  const listRef = useRef(null);

  useEffect(() => {
    if (isInitialized) {
      listTopPlayers();
    }
  }, [isInitialized, gRefresh]);

  async function listTopPlayers() {
    const list = await Moralis.Cloud.run("getTopPlayers");
    setList(list);
  }

  const cache = new CellMeasurerCache({
    defaultHeight: 30,
    fixedWidth: true,
  });

  const rowRenderer = ({ index, key, parent, style }) => {
    return (
      <CellMeasurer key={key} cache={cache} columnCount={1} columnIndex={0} parent={parent} rowIndex={index}>
        {({ registerChild }) => (
          <div ref={registerChild} key={key} style={style}>
            <div className={styles.top_players__list_item} id="top_players_list_row">
              <a
                href={`https://polygonscan.com/address/${list[index].objectId}#internaltx`}
                target="_blank"
                rel="noreferrer"
                id="top_players_list_row"
              >
                <div className={styles.top_players__data} id="top_players_list_row">
                  <span className={styles.top_players__address_data} id="top_players_list_row">
                    {list[index].objectId}
                  </span>
                  <span className={styles.top_players__reward_data} id="top_players_list_row">
                    {Math.round(list[index].avgScore)}
                  </span>
                  <span className={styles.top_players__date_data} id="top_players_list_row">
                    {Number(list[index].earned).toFixed(0)}
                    <div className={styles.top_players__polygon_icon}></div>(~$
                    {Number(list[index].earnedUsd).toFixed(0)})
                  </span>
                </div>
              </a>
            </div>
          </div>
        )}
      </CellMeasurer>
    );
  };

  return (
    <div style={{ maxHeight: "496px", overflowY: "auto", overflowX: "hidden" }}>
      <AutoSizer disableHeight>
        {({ width }) => (
          <List
            ref={listRef}
            deferredMeasurementCache={cache}
            height={Infinity}
            rowCount={list.length}
            rowHeight={cache.rowHeight}
            rowRenderer={rowRenderer}
            width={width}
          />
        )}
      </AutoSizer>
    </div>
  );
}
