import React, { useEffect, useContext, useState } from "react";
import { useMoralis, useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis";
import ls from "localstorage-slim";
import logo from "../public/logo_black.webp";
import { useRouter } from "next/router";

const CurrentStateContext = React.createContext();
const MethodsContext = React.createContext();
const PrizeTimerContext = React.createContext();

export function useGetCurrentState() {
  return useContext(CurrentStateContext);
}

export function useGetMethods() {
  return useContext(MethodsContext);
}

export function useGetPrizeTimer() {
  return useContext(PrizeTimerContext);
}

export default function ContextProvider({ children }) {
  const [currentState, setCurrentState] = useState({});
  const [methods, setMethods] = useState({});

  const { isAuthenticated, enableWeb3, isWeb3EnableLoading, isWeb3Enabled, user, Moralis, authenticate, logout, isInitialized } =
    useMoralis();
  const savedUserAddress = ls.get("chessgains_user_address", { decrypt: true });
  const [userAddress, setUserAddress] = useState(savedUserAddress ? savedUserAddress : null);
  const [tokensForSale, setTokensForSale] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [maticBalance, setMaticBalance] = useState(0);
  const [prizeValueUsd, setPrizeValueUsd] = useState(0);
  const [prizeValueMatic, setPrizeValueMatic] = useState(0);
  const [payoutTime, setPayoutTime] = useState(null);
  const [maticRatio, setMaticRatio] = useState(0);
  const [performanceReward, setPerformanceReward] = useState(0);
  const [dividends, setDividends] = useState(0);
  const [tokenAbi, setTokenAbi] = useState({ abi: null, status: false });
  const [engineAbi, setEngineAbi] = useState({ abi: null, status: false });
  const [seconds, setSeconds] = useState(null);
  const [timer, setTimer] = useState(null);
  const [gRefresh, setGRefresh] = useState(0);
  const [wRefresh, setWRefresh] = useState(0);
  const router = useRouter();

  // #region subscriptions for rerender
  useEffect(() => {
    if (!isInitialized) return;

    async function subscribePrize() {
      const query = new Moralis.Query("Prize");
      const subscription = await query.subscribe();

      subscription.on("create", () => {
        setGRefresh((prevValue) => prevValue + 1);
      });
      subscription.on("update", () => {
        setGRefresh((prevValue) => prevValue + 1);
      });
      subscription.on("delete", () => {
        setGRefresh((prevValue) => prevValue + 1);
      });
    }
    subscribePrize();

    if (!userAddress) return;

    async function subscribeTransactions() {
      const query = new Moralis.Query("PolygonTransactions");
      const subscription = await query.subscribe();

      subscription.on("create", () => {
        setWRefresh((prevValue) => prevValue + 1);
      });
      subscription.on("update", () => {
        setWRefresh((prevValue) => prevValue + 1);
      });
    }
    subscribeTransactions();
  }, [isInitialized, userAddress]);

  //#endregion

  // #region enable web3 if the user is logged in and save the address
  useEffect(() => {
    if (!isWeb3Enabled && !isWeb3EnableLoading && isAuthenticated) {
      try {
        enableWeb3({
          provider: "web3Auth",
          clientId: process.env.NEXT_PUBLIC_WEB3AUTH_ID,
          chainId: process.env.NEXT_PUBLIC_CHAIN_ID,
          loginMethodsOrder: [
            "google",
            "twitter",
            "facebook",
            "reddit",
            "discord",
            "twitch",
            "github",
            "linkedin",
            "weibo",
            "wechat",
            "email_passwordless",
          ],
          appLogo: "/_next/static/media/logo_black.adaf0e59.webp",
          theme: "light",
        });
      } catch (error) {
        throw new Error(error);
      }
    }
  }, [isAuthenticated, isWeb3Enabled, isWeb3EnableLoading, enableWeb3]);

  useEffect(() => {
    if (isAuthenticated && user) {
      setUserAddress(user.attributes.ethAddress.toLowerCase());
      ls.set("chessgains_user_address", user.attributes.ethAddress, { encrypt: true });
    }
  }, [isAuthenticated, user]);
  // #endregion

  // #region handle login and logout
  async function handleLogin() {
    try {
      if (isAuthenticated) {
        router.push("/wallet");
      } else {
        await authenticate({
          provider: "web3Auth",
          clientId: process.env.NEXT_PUBLIC_WEB3AUTH_ID,
          chainId: process.env.NEXT_PUBLIC_CHAIN_ID,
          signingMessage: "Chessgains web3 login",
          loginMethodsOrder: [
            "google",
            "twitter",
            "facebook",
            "reddit",
            "discord",
            "twitch",
            "github",
            "linkedin",
            "weibo",
            "wechat",
            "email_passwordless",
          ],
          appLogo: logo.src,
          theme: "light",
        });
        router.push("/wallet");
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async function handleLogout() {
    try {
      await logout();
      ls.set("chessgains_user_address", null, { encrypt: true });
      setUserAddress(null);
    } catch (err) {
      console.log(err);
    }
  }
  // #endregion

  // #region fetch token balance
  useEffect(() => {
    if (isInitialized) {
      async function saveTokenBalance() {
        if (!userAddress) return;

        const userTokenBalance = await Moralis.Cloud.run("fetchTokenBalance", { userAddress });
        setTokenBalance(await userTokenBalance);

        const tokensForSaleBalance = await Moralis.Cloud.run("fetchTokenBalance", {
          userAddress: process.env.NEXT_PUBLIC_ADMIN_ADDRESS.toLowerCase(),
        });
        setTokensForSale(await tokensForSaleBalance);
      }
      saveTokenBalance();
    }
  }, [userAddress, isAuthenticated, isInitialized, wRefresh]);
  // #endregion

  // #region fetch matic balance
  const Web3Api = useMoralisWeb3Api();

  const options = {
    chain: "polygon",
    address: userAddress,
  };

  useEffect(() => {
    if (isAuthenticated && isInitialized && userAddress) {
      async function getUpdatedBalance() {
        const balance = await Web3Api.account.getNativeBalance(options);
        setMaticBalance(Number((balance.balance / 10 ** 18).toFixed(2)));
      }
      getUpdatedBalance();
    }
  }, [isAuthenticated, isInitialized, userAddress, wRefresh]);

  // #endregion

  // #region fetch matic ratio
  const { native } = useMoralisWeb3Api();

  async function getAbi() {
    const abiQuery = new Moralis.Query("Abi");
    const abiResult = await abiQuery.first();
    setTokenAbi({ abi: abiResult.attributes.token, status: true });
    setEngineAbi({ abi: abiResult.attributes.engine, status: true });
  }



  const getMaticRatio = useMoralisWeb3ApiCall(native.runContractFunction, {
    ...optionsRatio,
  });

  async function getRatio() {
    setMaticRatio(await getMaticRatio.fetch({ ...optionsRatio }));
  }

  useEffect(() => {
    if (isInitialized) {
      getAbi();
      if (tokenAbi.status) {
        getRatio();
      }
    }
  }, [isInitialized, tokenAbi.status, gRefresh]);

  console.log("matic ratio 242", getMaticRatio)
  // #endregion

  // #region fetch performance reward and dividends
  async function fetchRewardAndDividends(address) {
    const reward = await Moralis.Cloud.run("getReward", { address });

    const dividends = await Moralis.Cloud.run("getDividends", { address });
    setPerformanceReward(reward);
    setDividends(dividends);
  }

  useEffect(() => {
    if (!isInitialized) return;
    fetchRewardAndDividends(userAddress);
  }, [isInitialized, wRefresh, userAddress]);
  // #endregion

  // #region fetch prize value and payout time
  async function fetchPrize() {
    const prize = await Moralis.Cloud.run("fetchPrizeTable");
    setPrizeValueUsd(prize.valueUsd);
    setPrizeValueMatic(prize.valueMatic);
    setPayoutTime(prize.time);
  }

  useEffect(() => {
    if (isInitialized) {
      fetchPrize();
    }
  }, [isInitialized, gRefresh]);
  // #endregion

  // #region calculate time for the timer
  const timeNow = Math.round(new Date() / 1000);
  const difference = payoutTime - timeNow;

  useEffect(() => {
    if (payoutTime > 0) {
      setSeconds(difference);
    }
  }, [payoutTime, gRefresh]);

  useEffect(() => {
    let intervalId = setInterval(() => {
      if (seconds >= 0) {
        setSeconds((prevValue) => prevValue - 1);
        setTimer(timerMessage);
      } else {
        setTimer(timerMessage);
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [seconds, gRefresh]);

  let hoursDisplay = 0;
  let minutesDisplay = 0;
  let secondsDisplay = 0;

  if (seconds > 0) {
    hoursDisplay = Math.trunc(seconds / 3600) >= 10 ? Math.trunc(seconds / 3600) : `0${Math.trunc(seconds / 3600)}`;

    minutesDisplay =
      Math.trunc((seconds / 3600 - hoursDisplay) * 60) >= 10
        ? Math.trunc((seconds / 3600 - hoursDisplay) * 60)
        : `0${Math.trunc((seconds / 3600 - hoursDisplay) * 60)}`;

    secondsDisplay =
      Math.trunc(seconds - (hoursDisplay * 3600 + minutesDisplay * 60)) >= 10
        ? Math.trunc(seconds - (hoursDisplay * 3600 + minutesDisplay * 60))
        : `0${Math.trunc(seconds - (hoursDisplay * 3600 + minutesDisplay * 60))}`;
  }

  let timerMessage;

  if (seconds > 0) {
    timerMessage = `draws in ${hoursDisplay}:${minutesDisplay}:${secondsDisplay}`;
  } else {
    timerMessage = `drawing now`;
  }
  // #endregion

  // #region trigger payout and reward/dividend allocation
  useEffect(() => {
    if (isInitialized && seconds < 0) {
      Moralis.Cloud.run("payIfTimeUp");
    }
  }, [seconds, isInitialized]);

  async function allocateReward({ receiver, endpoint }) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ receiver }),
      });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
  // #endregion

  // #region save data to context
  useEffect(() => {
    setCurrentState({
      userAddress,
      tokensForSale,
      tokenBalance,
      maticBalance,
      prizeValueUsd,
      prizeValueMatic,
      payoutTime,
      maticRatio,
      performanceReward,
      dividends,
      tokenAbi,
      engineAbi,
      gRefresh,
      wRefresh
    });
  }, [
    userAddress,
    tokensForSale,
    tokenBalance,
    maticBalance,
    prizeValueUsd,
    prizeValueMatic,
    payoutTime,
    maticRatio,
    performanceReward,
    dividends,
    tokenAbi,
    engineAbi,
    gRefresh,
    wRefresh
  ]);
  // #endregion

  // #region initialize methods to context
  useEffect(() => {
    setMethods({
      handleLogin,
      handleLogout,
      setPrizeValueUsd,
      allocateReward,
      setWRefresh,
      setPerformanceReward,
      setDividends,
    });
  }, []);
  // #endregion

  return (
    <CurrentStateContext.Provider value={currentState}>
      <MethodsContext.Provider value={methods}>
        <PrizeTimerContext.Provider value={timer}>{children}</PrizeTimerContext.Provider>
      </MethodsContext.Provider>
    </CurrentStateContext.Provider>
  );
}
