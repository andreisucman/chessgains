import React, { useState, useEffect, useRef } from "react";
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from "react-virtualized";
import { useMoralis } from "react-moralis";
import FormattedTime from "./FormattedTime";
import styles from "../styles/WinnersList.module.scss";

export default function WinnersList({ gRefresh }) {
  const { Moralis, isInitialized } = useMoralis();
  const [list, setList] = useState([]);
  const listRef = useRef(null);

  useEffect(() => {
    if (isInitialized) {
      listWinners();
    }
  }, [isInitialized, gRefresh]);

  async function listWinners() {
    const list = await Moralis.Cloud.run("getWinners");
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
            <div className={styles.winners_list__list_item} id="winners_list_row">
              <a href={`https://polygonscan.com/tx/${list[index].prizeTxLink}`} target="_blank" rel="noreferrer" id="winners_list_row">
                <div className={styles.winners_list__data} id="winners_list_row">
                  <span className={styles.winners_list__address_data} id="winners_list_row">{list[index].address}</span>
                  <span className={styles.winners_list__reward_data} id="winners_list_row">
                    {Number(list[index].winAmount).toFixed(0)}
                    <div className={styles.winners_list__polygon_icon}></div>(~$
                    {Number(list[index].winAmountUsd).toFixed(0)})
                  </span>
                  <span className={styles.winners_list__date_data}>{<FormattedTime time={list[index].createdAt} />}</span>
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
