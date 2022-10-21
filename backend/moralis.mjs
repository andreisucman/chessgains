import Moralis from "moralis-v1/node.js";
import { ethers } from "ethers";
import XMLHttpRequest from "xhr2";

export async function pay(receiver, key) {
  await Moralis.start({
    serverUrl: "https://rfoqdnxrqo9v.usemoralis.com:2053/server",
    appId: "631L5XogDOAuSaMnc8DQjoDTy8sSm0gHVH9ikeEh",
    masterKey: "3YiQTciXk54wmcBT26JgI3rYCsifTG4WFWDzApuP",
  });

  let to = receiver;
  let amount = 0;

  if (key === "reward") {
    const HistoryTable = Moralis.Object.extend("History");
    const historyQuery = new Moralis.Query(HistoryTable);

    historyQuery.equalTo("address", to);
    const historyResult = await historyQuery.find();

    let totalEarned = 0;

    if (historyResult.length > 0) {
      totalEarned = historyResult
        .map((entry) => Number(entry.attributes.earned))
        .reduce((a, b) => a + b);
    }

    const RewardsTable = Moralis.Object.extend("Rewards");
    const rewardsQuery = new Moralis.Query(RewardsTable);
    rewardsQuery.equalTo("address", to);

    const rewardsResult = await rewardsQuery.first();

    let rewardsWithdrawn = 0;

    if (rewardsResult) {
      rewardsWithdrawn = rewardsResult.attributes.withdrawn;
    }

    amount = ethers.utils.parseUnits(`${Number(totalEarned) - Number(rewardsWithdrawn)}`, "ether");
  }

  if (key === "dividends") {
    const DividendsTable = Moralis.Object.extend("Dividends");
    const dividendsQuery = new Moralis.Query(DividendsTable);

    dividendsQuery.equalTo("address", to);
    const dividendsResult = await dividendsQuery.first();

    let totalDividends = 0;
    let dividendsWithdrawn = 0;

    if (dividendsResult) {
      totalDividends = dividendsResult.attributes.dividends;
      dividendsWithdrawn = dividendsResult.attributes.withdrawn;
    }

    amount = ethers.utils.parseUnits(
      `${Number(totalDividends) - Number(dividendsWithdrawn)}`,
      "ether"
    );
  }

  if (key === "pay") {
    const HistoryTable = Moralis.Object.extend("History");
    const historyQuery = new Moralis.Query(HistoryTable);

    historyQuery.descending("createdAt");
    historyQuery.notEqualTo("winAmount", 0);
    const historyResult = await historyQuery.first();

    const prizeQuery = new Moralis.Query("Prize");
    prizeQuery.equalTo("finalized", false);
    prizeQuery.notEqualTo("usdValue", 0);
    const valueRow = await prizeQuery.first();

    if (valueRow) {
      to = historyResult.attributes.address;
      amount = ethers.utils.parseUnits(`${valueRow.attributes.maticValue}`, "ether");
    }
  }

  const provider = new ethers.providers.JsonRpcProvider(
    "https://nd-841-992-697.p2pify.com/1ad3b1a9d06fc505ddd4e196ec48e8e5"
  );

  const signer = new ethers.Wallet(
    "b88c5f901aace1ff059bfcafb54e034ff0542eef37cfb2f1b90bd09349ee473d",
    provider
  );

  const engineAbi = [
    {
      inputs: [],
      name: "enter",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "time",
          type: "uint256",
        },
      ],
      name: "fundsTransfer",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "participant",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "time",
          type: "uint256",
        },
      ],
      name: "participantEntry",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address payable",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "payPrize",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address payable",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "payRest",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address payable",
          name: "user",
          type: "address",
        },
      ],
      name: "setAdmin",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getBalance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  const engineAddress = "0xb5a4EA5BB94741AAd2338d64465d256c18f142B4";

  const contract = new ethers.Contract(engineAddress, engineAbi, signer);

  const contractBalance = await contract.getBalance();
  const readableBalance = ethers.utils.formatEther(contractBalance);

  async function pay(contract, to, amount) {
    let gasPrice = await getGasPrice();

    if (gasPrice < 4000) {
      gasPrice = gasPrice * 2;
    }
    
    const fastPriceInGwei = ethers.utils.parseUnits(`${gasPrice}`, "gwei");

    try {
      let response;

      if (key === "reward" && Number(amount) > 0) {
        // check if the payout has already been initiated
        const RewardTable = Moralis.Object.extend("Rewards");
        const rewardQuery = new Moralis.Query(RewardTable);
        rewardQuery.equalTo("address", to);
        const rewardQueryResult = await rewardQuery.first();

        if (rewardQueryResult && rewardQueryResult.attributes.pendingTx) return;

        if (rewardQueryResult) {
          rewardQueryResult.set("pendingTx", true);
          rewardQueryResult.save(null, { useMasterKey: true });
        } else {
          const rewardInstance = new RewardTable();
          rewardInstance.set("pendingTx", true);
          rewardInstance.set(null, { useMasterKey: true });
        }

        response = await contract.payRest(to, amount, {
          gasLimit: 10000000,
          maxFeePerGas: fastPriceInGwei || 490000000000,
          maxPriorityFeePerGas: fastPriceInGwei || 490000000000,
        });

        const receipt = await response.wait(3);

        const RewardsTable = Moralis.Object.extend("Rewards");
        const rewardsQuery = new Moralis.Query(RewardsTable);
        rewardsQuery.equalTo("address", to);
        const rewardsResult = await rewardsQuery.first();

        let rewardsWithdrawn = 0;

        if (rewardsResult) {
          rewardsWithdrawn = rewardsResult.attributes.withdrawn;
          rewardsResult.set(
            "withdrawn",
            Number(rewardsWithdrawn) + Number(ethers.utils.formatEther(amount))
          );
          rewardsResult.set("pendingTx", false);
          await rewardsResult.save(null, { useMasterKey: true });
        } else {
          const rewardsInstance = new RewardsTable();
          rewardsInstance.set("address", to);
          rewardsInstance.set(
            "withdrawn",
            Number(rewardsWithdrawn) + Number(ethers.utils.formatEther(amount))
          );
          rewardsInstance.set("pendingTx", false);
          await rewardsInstance.save(null, { useMasterKey: true });
        }

        return { status: await receipt.status };
      }

      if (key === "dividends" && Number(amount) > 0) {
        // check if the payout has already been initiated
        const DividendsQueryCheckTable = Moralis.Object.extend("Dividends");
        const dividendsQueryCheck = new Moralis.Query(DividendsQueryCheckTable);
        dividendsQueryCheck.equalTo("address", to);
        const dividendsQueryCheckResult = await dividendsQueryCheck.first();

        if (dividendsQueryCheckResult && dividendsQueryCheckResult.attributes.pendingTx) return;

        if (dividendsQueryCheckResult) {
          dividendsQueryCheckResult.set("pendingTx", true);
          await dividendsQueryCheckResult.save(null, { useMasterKey: true });
        } else {
          const dividendsInstance = new DividendsQueryCheckTable();
          dividendsInstance.set("pendingTx", true);
          dividendsInstance.save(null, { useMasterKey: true });
        }

        response = await contract.payRest(to, amount, {
          gasLimit: 10000000,
          maxFeePerGas: fastPriceInGwei || 490000000000,
          maxPriorityFeePerGas: fastPriceInGwei || 490000000000,
        });

        const receipt = await response.wait(3);

        const DividendsTable = Moralis.Object.extend("Dividends");
        const dividendsQuery = new Moralis.Query(DividendsTable);
        dividendsQuery.equalTo("address", to);
        const dividendsQueryResult = await dividendsQuery.first();

        let dividendsWithdrawn = 0;

        if (dividendsQueryResult) {
          dividendsWithdrawn = dividendsQueryResult.attributes.withdrawn;
        }

        dividendsQueryResult.set(
          "withdrawn",
          Number(dividendsWithdrawn) + Number(ethers.utils.formatEther(amount))
        );
        
        dividendsQueryResult.set("pendingTx", false);
        await dividendsQueryResult.save(null, { useMasterKey: true });

        return { status: await receipt.status };
      }

      if (key === "pay" && Number(amount) > 0) {
        try {
          response = await contract.payPrize(to, amount, {
            gasLimit: 10000000,
            maxFeePerGas: fastPriceInGwei || 490000000000,
            maxPriorityFeePerGas: fastPriceInGwei || 490000000000,
          });
        } catch (err) {
          console.log(err);
          throw new Error(err);
        }

        try {
          const receipt = await response.wait(3);
          sendToTelegram((Number(ethers.utils.formatEther(amount)) * 0.5).toFixed(0));

          // add payment link and payout time to the winner in the history
          const historyTable = Moralis.Object.extend("History");
          const historyQuery = new Moralis.Query(historyTable);

          historyQuery.equalTo("address", to);
          historyQuery.descending("createdAt");

          const historyResult = await historyQuery.first();

          historyResult.set("prizeTxLink", await receipt.transactionHash);
          historyResult.set("payoutTime", Math.trunc(new Date() / 1000));

          await historyResult.save(null, { useMasterKey: true });
        } catch (err) {
          console.log(err);
          throw new Error(err);
        }

        // set prize status to finalized
        try {
          const prizeQuery = new Moralis.Query("Prize");
          prizeQuery.equalTo("finalized", false);
          const prizeResult = await prizeQuery.first();

          if (prizeResult) {
            prizeResult.set("finalized", true);
            await prizeResult.save(null, { useMasterKey: true });
          }
        } catch (err) {
          console.log(err);
          throw new Error(err);
        }

        // create new prize instance
        try {
          const PrizeTable = Moralis.Object.extend("Prize");
          const prizeTableInstance = new PrizeTable();

          prizeTableInstance.set("finalized", false);
          prizeTableInstance.set("maticValue", 0);
          prizeTableInstance.set("usdValue", 0);
          prizeTableInstance.set("unixTime", Math.round(new Date() / 1000 + 86400));

          await prizeTableInstance.save(null, { useMasterKey: true });
        } catch (err) {
          console.log(err);
          throw new Error(err);
        }

        // calculate dividends for all token holders
        try {
          const DividendsTable = Moralis.Object.extend("Dividends");
          const dividendsQuery = new Moralis.Query(DividendsTable);
          dividendsQuery.limit(100000);

          const dividendsResult = await dividendsQuery.find();

          if (dividendsResult.length > 0) {
            const length = dividendsResult.length;

            for (let i = 0; i < length; i++) {
              const totalDividends = dividendsResult[i].attributes.dividends;
              const totalTokens = dividendsResult[i].attributes.tokens;
              const number =
                Number(totalDividends) +
                Number(totalTokens / 1000000) * (Number(ethers.utils.formatEther(amount)) * 0.22);

              dividendsResult[i].set("dividends", number);
              await dividendsResult[i].save(null, { useMasterKey: true });
            }
          }

          return { status: await receipt.status };
        } catch (err) {
          console.log(err);
          throw new Error(err);
        }
      }
    } catch (error) {
      return JSON.stringify(error);
    }
  }

  if (readableBalance < 0.1) {
    return { status: "Not enough funds in the contract" };
  }

  pay(contract, to, amount);
}

export async function sendToTelegram(amount = 0) {
  const tg = {
    token: "5517856789:AAE-TfpiicX5E1LfJ9D4mB6wYDImvFtbOS4",
    chat_id: "@chessgains",
  };

  function sendMessage(text) {
    const url = `https://api.telegram.org/bot${tg.token}/sendMessage`;

    const obj = {
      chat_id: tg.chat_id,
      text: text,
    };

    const xht = new XMLHttpRequest();
    xht.open("POST", url, true);
    xht.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    xht.send(JSON.stringify(obj));
  }

  sendMessage(
    `We have a new winner of ${amount} MATIC! Visit https://chessgains.com/winner to see the updated list.`
  );

  return 1;
}

export async function getGasPrice() {
  const getGasPrice = await fetch(
    `https://api.polygonscan.com/api?module=gastracker&action=gasoracle&apikey=${process.env.POLYGONSCAN_API_KEY}`
  );
  const jsonResult = await getGasPrice.json();
  const fastPrice = jsonResult.result.FastGasPrice;
  const uppedPrice = Math.round(Number(fastPrice) * 1.1);
  return uppedPrice;
}
