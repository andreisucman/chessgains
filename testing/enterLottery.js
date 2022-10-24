import { useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { useGetCurrentState } from "../frontend/components/ContextProvider";

export default function TestEntry() {
  const { Moralis } = useMoralis();
  const currentState = useGetCurrentState();
  const [enterFee, setEnterFee] = useState(0);
  const [showInsufficientBalance, setShowInsufficientBalance] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function signWithEthers() {
    setIsLoading(true);
    const normalizedRatio = currentState.maticRatio / 10 ** 8;
    const enterFee = Moralis.Units.Token(1 / normalizedRatio, "18");

    if (currentState.maticBalance < 1 / normalizedRatio) {
      setIsLoading(false);
      setShowInsufficientBalance(true);
      return;
    }

    // save enter fee to use it in the insufficient funds modal
    setEnterFee(enterFee);

    // get gas price
    const getGasPrice = await fetch(
      `https://api.polygonscan.com/api?module=gastracker&action=gasoracle&apikey=${process.env.POLYGONSCAN_API_KEY}`
    );
    const jsonResult = await getGasPrice.json();
    const fastPrice = jsonResult.result.FastGasPrice;
    const uppedPrice = Math.trunc(fastPrice * 1.1) || 400000000000;
    const fastPriceInGwei = Moralis.Units.Token(`${uppedPrice}`, "9");

    const ethers = Moralis.web3Library; // get ethers.js library

    let web3Provider;
    try {
      web3Provider = await Moralis.enableWeb3({
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
    } catch (err) {
      console.log(err);
    }

    const signer = web3Provider.getSigner();

    const contract = new ethers.Contract(process.env.NEXT_PUBLIC_ENGINE_ADDRESS, currentState.engineAbi.abi, signer);

    const transaction = await contract.enter({
      value: enterFee,
      gasLimit: 1000000,
      gasPrice: fastPriceInGwei,
    });

    try {
      const tx = await transaction.wait(3);

      // save the participant to DB
      const params = {
        sessionId: chess.sessionId,
        userAddress,
        enterFee,
        maticRatio,
        txLink: tx.transactionHash,
      };

      async function finalizeRound() {
        await Moralis.Cloud.run("saveParticipantToDB", params);
        await Moralis.Cloud.run("updatePrizeTable", { maticRatio });
        setShowFinalScreen(2);
        setIsLoading(false);
      }
      finalizeRound();
    } catch (err) {
      console.log(err);
    }
  }

  async function enterTournament() {
    const normalizedRatio = currentState.maticRatio / 10 ** 8;
    const enterFee = Moralis.Units.Token(1 / normalizedRatio, "18");

    // enter the tournament
    const options = {
      contractAddress: process.env.NEXT_PUBLIC_ENGINE_ADDRESS,
      functionName: "enter",
      abi: currentState.engineAbi.abi,
      msgValue: enterFee,
    };

    await contractProcessor.fetch({
      params: options,
      onSuccess: (tx) => {
        tx.wait();
      },
      onError: (error) => {
        if (error.code === -32603) {
          setIsLoading(false);
          setShowInsufficientBalance(true);
        }
        throw new Error(error);
      },
    });
  }

  return <button onClick={signWithEthers}>Enter tournament</button>;
}
