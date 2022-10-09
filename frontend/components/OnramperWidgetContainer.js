import React, { useState, useEffect } from "react";
import OnramperWidget from "@onramper/widget";
import ReactLoading from "react-loading";
import { useMoralis } from "react-moralis";
import styles from "../styles/OnramperWidgetContainer.module.scss";

export default function OnramperWidgetContainer({ address, setShowOnramper }) {
  const [onramperKey, setOnramperKey] = useState(null);
  const { Moralis, isInitialized } = useMoralis();

  const defaultAddress = {
    MATIC: {
      address
    }
  }

  useEffect(() => {
    if (isInitialized) {
      getOnramperKey();
    }
  }, [isInitialized]);

  async function getOnramperKey() {
    const keyQuery = new Moralis.Query("Keys");
    const keyRecord = await keyQuery.first();

    const keyResult = keyRecord.attributes.onramper;

    setOnramperKey(keyResult);
  }

  return (
    <div className={styles.onramper}>
      <div className={styles.onramper__cross} onClick={() => setShowOnramper(false)} id="close_get_matic"></div>
      <div className={styles.onramper__wrapper}>
        {onramperKey ? (
          <OnramperWidget
            API_KEY={onramperKey}
            color={"#A64242"}
            defaultAddrs={defaultAddress} // this is not a typo
            defaultAmount={5}
            defaultCrypto={"MATIC"}
            defaultFiat={"USD"}
            defaultFiatSoft={"EUR"}
            isAddressEditable={true}
            amountInCrypto={5}
            redirectURL={"https%3A%2F%2Fchessgains.com%2Fwallet"}
          />
        ) : (
          <ReactLoading type="spin" color="#F4F0E6" width={100} height={100} />
        )}
      </div>
    </div>
  );
}