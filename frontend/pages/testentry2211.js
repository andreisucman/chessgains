import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { useGetCurrentState } from "../components/ContextProvider";

export default function TestEntry() {
  const { Moralis } = useMoralis();
  const currentState = useGetCurrentState();
  const contractProcessor = useWeb3ExecuteFunction();

  async function enterLottery() {
    const normalizedRatio = maticRatio / 10 ** 8;
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

  return <button onClick={enterLottery}>Enter lottery</button>;
}
