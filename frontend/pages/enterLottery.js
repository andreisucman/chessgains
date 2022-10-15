import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { useGetCurrentState } from "../components/ContextProvider";

export default function TestEntry() {
  const { Moralis } = useMoralis();
  const currentState = useGetCurrentState();
  const contractProcessor = useWeb3ExecuteFunction();

  async function signWithEthers() {
    const normalizedRatio = currentState.maticRatio / 10 ** 8;
    const enterFee = Moralis.Units.Token(1 / normalizedRatio, "18");
    // get gas price
    const getGasPrice = await fetch(
      `https://api.polygonscan.com/api?module=gastracker&action=gasoracle&apikey=${process.env.POLYGONSCAN_API_KEY}`
    );
    const jsonResult = await getGasPrice.json();
    const fastPrice = jsonResult.result.FastGasPrice;
    const uppedPrice = Math.trunc(fastPrice * 1.1);
    const fastPriceInGwei = Moralis.Units.Token(`${uppedPrice}`, "9");

    const ethers = Moralis.web3Library; // get ethers.js library
    const web3Provider = await Moralis.enableWeb3(); // Get ethers.js web3Provider
    const gasPrice = await web3Provider.getGasPrice();

    const signer = web3Provider.getSigner();

    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_ENGINE_ADDRESS,
      currentState.engineAbi.abi,
      signer
    );

    const transaction = await contract.enter({
      value: enterFee,
      gasLimit: 10000000,
      gasPrice: fastPriceInGwei,
    });

    try {
      await transaction.wait();

    } catch (err) {
      if (err.code === -32603) {
        setIsLoading(false);
        setShowInsufficientBalance(true);
      }
      console.log(err);
    }
  }

  async function enterLottery() {
    const normalizedRatio = currentState.maticRatio / 10 ** 8;
    const enterFee = Moralis.Units.Token(1 / normalizedRatio, "18");

    // enter the lottery
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

  return <button onClick={signWithEthers}>Enter lottery</button>;
}
