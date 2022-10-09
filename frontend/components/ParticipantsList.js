import React, { useState, useRef, useEffect } from "react";
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from "react-virtualized";
import { useMoralis } from "react-moralis";
import FormattedTime from "./FormattedTime";
import styles from "../styles/ParticipantsList.module.scss";

export default function ParticipantsList({ gRefresh }) {
  const { Moralis, isInitialized } = useMoralis();
  const [list, setList] = useState([]);
  const listRef = useRef(null);

  useEffect(() => {
    if (isInitialized) {
      listParticipants();
    }
  }, [isInitialized, gRefresh]);

  async function listParticipants() {
    const list = await Moralis.Cloud.run("getParticipants");

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
            <div id="participants_row">
              <a href={`https://polygonscan.com/tx/${list[index].txLink}`} target="_blank" rel="noreferrer" id="participants_row">
                <div className={`${styles.participants_list__data}`} id="participants_row">
                  <span className={styles.participants_list__address_data} id="participants_row">
                    {list[index].address}
                  </span>
                  <span className={styles.participants_list__score_data} id="participants_row">
                    {list[index].score}
                  </span>
                  <span className={styles.participants_list__chance_data} id="participants_row">
                    {list[index].chance}%
                  </span>
                  <span className={styles.participants_list__date_data} id="participants_row">
                    <FormattedTime time={list[index].createdAt} gRefresh={gRefresh} />
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
    <div style={{ maxHeight: "440px", overflowY: "auto", overflowX: "hidden" }}>
      <AutoSizer disableHeight>
        {({ width }) => (
          <List
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
