const logger = Moralis.Cloud.getLogger();

Moralis.Cloud.define("deleteParticipants", async () => {
  const participantQuery = new Moralis.Query("Participant");
  participantQuery.limit(100000);

  const participantRows = await participantQuery.find();

  for (const row of participantRows) {
    await row.destroy({ useMasterKey: true });
  }
});

Moralis.Cloud.define("getWinners", async () => {
  const query = new Moralis.Query("History");

  const pipeline = [
    {
      match: {
        winAmountUsd: {
          $gt: 0,
        },
      },
    },
    {
      sort: {
        _created_at: -1,
      },
    },
    {
      limit: 100000,
    },
  ];

  const result = await query.aggregate(pipeline);
  return result.slice(0, 100);
});

Moralis.Cloud.define("getParticipants", async () => {
  const participantQuery = new Moralis.Query("Participant");
  participantQuery.limit(100000);
  const participantRows = await participantQuery.find();

  if (!participantRows) return;

  const participantObjects = participantRows
    .map((entry) => entry.attributes)
    .reverse();

  return participantObjects;
});

Moralis.Cloud.define("getTopPlayers", async () => {
  const query = new Moralis.Query("History");
  const pipeline = [
    {
      group: {
        objectId: "$address",
        avgScore: { $avg: "$score" },
        avgChance: { $avg: "$chance" },
        earnedUsd: { $sum: "$earnedUsd" },
        earned: { $sum: "$earned" },
      },
    },
    {
      match: {
        earnedUsd: {
          $gt: 0.51,
        },
      },
    },
    {
      sort: {
        earnedUsd: -1,
      },
    },
    {
      limit: 100000,
    },
  ];

  const result = await query.aggregate(pipeline);
  return result.slice(0, 100);
});

Moralis.Cloud.define("getDividends", async (request) => {
  const DividendsTable = Moralis.Object.extend("Dividends");
  const dividendsQuery = new Moralis.Query(DividendsTable);

  dividendsQuery.equalTo("address", request.params.address);
  const dividendsResult = await dividendsQuery.first();

  let totalDividends = 0;
  let dividendsWithdrawn = 0;

  if (dividendsResult) {
    totalDividends = dividendsResult.attributes.dividends;
    dividendsWithdrawn = dividendsResult.attributes.withdrawn;
  }

  const amount = Number(totalDividends - dividendsWithdrawn);
  return amount;
});

Moralis.Cloud.define("getReward", async (request) => {
  const HistoryTable = Moralis.Object.extend("History");
  const historyQuery = new Moralis.Query(HistoryTable);

  historyQuery.equalTo("address", request.params.address);
  const historyResult = await historyQuery.find();

  let totalEarned = 0;

  if (historyResult.length > 0) {
    totalEarned = historyResult
      .map((entry) => Number(entry.attributes.earned))
      .reduce((a, b) => a + b);
  }

  const RewardsTable = Moralis.Object.extend("Rewards");
  const rewardsQuery = new Moralis.Query(RewardsTable);
  rewardsQuery.equalTo("address", request.params.address);

  const rewardsResult = await rewardsQuery.first();

  let rewardsWithdrawn = 0;

  if (rewardsResult) {
    rewardsWithdrawn = rewardsResult.attributes.withdrawn;
  }

  const amount = `${Number(totalEarned) - Number(rewardsWithdrawn)}`;
  return amount;
});

Moralis.Cloud.define("saveParticipantsToHistory", async () => {
  const participantQuery = new Moralis.Query("Participant");
  participantQuery.limit(100000);

  const participantRows = await participantQuery.find();
  const participantObjects = participantRows.map((row) => row.attributes);
  const formattedParticipants = [];

  const length = participantObjects.length;

  for (let i = 0; i < length; i++) {
    formattedParticipants.push({
      update: Object.assign(
        {},
        {
          address: participantObjects[i].address,
          score: participantObjects[i].score,
          chance: participantObjects[i].chance,
          earned: participantObjects[i].earned,
          earnedUsd: participantObjects[i].earnedUsd,
          winAmount: participantObjects[i].winAmount,
          winAmountUsd: participantObjects[i].winAmountUsd,
          txLink: participantObjects[i].txLink,
          prizeTxLink: participantObjects[i].prizeTxLink,
          note: participantObjects[i].note,
        }
      ),
    });
  }

  await Moralis.bulkWrite("History", formattedParticipants);
});

Moralis.Cloud.define("findTopPlayers", async () => {
  const participantQuery = new Moralis.Query("Participant");
  participantQuery.descending("score");
  participantQuery.limit(100000);
  const participantRows = await participantQuery.find();

  // take the amount the most performant participant paid as general for everybody
  const participantPaidUsd = participantRows.map((row) => row.attributes)[0]
    .usdValue;
  const participantPaidMatic = participantRows.map((row) => row.attributes)[0]
    .maticValue;

  const maticRatio = 1 / participantPaidMatic;
  const reward = participantPaidUsd < 1.1 ? participantPaidMatic : 1;

  // calculate how many top players there are based on the total number of players
  let topTenPercentBoundary = Math.round(participantRows.length * 0.1);
  let topFivePercentBoundary = Math.round(participantRows.length * 0.05);
  let topOnePercentBoundary = participantRows.length * 0.01;

  // set the minimal boundaries so that every game has at least 1 representative from each class
  if (participantRows.length < 100) {
    topOnePercentBoundary = 1;
  }

  if (participantRows.length < 30) {
    topFivePercentBoundary = 2;
  }

  if (participantRows.length < 40) {
    topTenPercentBoundary = 3;
  }

  const allTops = participantRows
    .map((participant) => participant.attributes)
    .slice(0, topTenPercentBoundary);

  const preparedTops = {};

  // push top 10% of players
  for (let i = 0; i < allTops.length; i++) {
    preparedTops[allTops[i].address] = reward;
  }

  // push top 1% of players
  for (let i = 0; i < topOnePercentBoundary; i++) {
    preparedTops[allTops[i].address] += reward * 2;
    allTops.splice(0, 1);
  }

  // push top 5% of players
  if (allTops.length > 0) {
    for (let i = 0; i < topFivePercentBoundary - topOnePercentBoundary; i++) {
      preparedTops[allTops[i].address] += reward;
      allTops.splice(0, 1);
    }
  }

  const addresses = Object.keys(preparedTops);
  const amounts = Object.values(preparedTops);

  // calculate earned amount and save it to participant
  const length = addresses.length;

  for (let i = 0; i < length; i++) {
    const newParticipantQuery = new Moralis.Query("Participant");
    newParticipantQuery.limit(100000);
    newParticipantQuery.equalTo("address", addresses[i]);
    const newParticipantRow = await newParticipantQuery.first();
    newParticipantRow.set("earned", amounts[i]);
    newParticipantRow.set("earnedUsd", amounts[i] * maticRatio);
    await newParticipantRow.save(null, { useMasterKey: true });
  }
});

Moralis.Cloud.define("findWinner", async () => {
  function generateRandBetween(lower, upper) {
    const difference = upper - lower;
    const randNum = Math.random();
    let randValue = randNum * difference;
    randValue = randValue + lower;

    return randValue;
  }

  function findWinnerIndex(participants, winningNumber) {
    const length = participants.length;

    for (let i = 0; i < length; i++) {
      if (participants[i].counterScore > winningNumber) {
        return i;
      }
    }
  }

  const participantQuery = new Moralis.Query("Participant");
  participantQuery.ascending("counterScore");
  participantQuery.limit(100000);

  const participantRows = await participantQuery.find();

  const participantObjects = participantRows.map((row) => row.attributes);

  const latestCounterScore =
    participantObjects[participantObjects.length - 1].counterScore;
  const randomNumber = generateRandBetween(latestCounterScore, 1000000000000);

  const winningNumber = Math.round(randomNumber % latestCounterScore);
  const winnerIndex = findWinnerIndex(participantObjects, winningNumber);

  const prizeQuery = new Moralis.Query("Prize");
  prizeQuery.equalTo("finalized", false);
  prizeQuery.notEqualTo("usdValue", "0");
  const valueRow = await prizeQuery.first();

  // add the prize amount to the participant
  participantRows[winnerIndex].set(
    "winAmount",
    valueRow.attributes.maticValue * 0.5
  );
  participantRows[winnerIndex].set(
    "winAmountUsd",
    valueRow.attributes.usdValue * 0.5
  );
  participantRows[winnerIndex].set(
    "prizeTxLink",
    valueRow.attributes.prizeTxLink
  );

  await participantRows[winnerIndex].save(null, { useMasterKey: true });
});

Moralis.Cloud.define("updatePrizeTable", async (request) => {
  const maticRatio = request.params.maticRatio / 10 ** 8;

  async function sumMaticValue() {
    const participantQuery = new Moralis.Query("Participant");
    participantQuery.limit(10000);
    const participantRecords = await participantQuery.find();

    let sum = 0;

    if (participantRecords.length > 0) {
      sum = participantRecords
        .map((entry) => entry.attributes.maticValue)
        .reduce((a, b) => a + b);
    }

    return Number(sum);
  }

  const PrizeTable = Moralis.Object.extend("Prize");
  const prizeQuery = new Moralis.Query(PrizeTable);
  prizeQuery.equalTo("finalized", false);
  const prizeRows = await prizeQuery.first();

  const maticValue = await sumMaticValue();
  const usdValue = maticValue * maticRatio;

  if (prizeRows) {
    prizeRows.set("maticValue", maticValue);
    prizeRows.set("usdValue", usdValue);
    await prizeRows.save(null, { useMasterKey: true });
  } else {
    const prizeInstance = new PrizeTable();
    const timeNow = new Date() / 1000;
    prizeInstance.set("maticValue", maticValue);
    prizeInstance.set("usdValue", usdValue);
    prizeInstance.set("unixTime", Math.floor(timeNow + 86400));
    await prizeInstance.save(null, { useMasterKey: true });
  }
  return 1;
});

Moralis.Cloud.define("saveParticipantToDB", async (request) => {
  const txLink = request.params.txLink;
  const sessionId = request.params.sessionId;
  const enterFee = request.params.enterFee;
  const address = request.params.userAddress;
  const maticRatio = request.params.maticRatio;
  const note = request.params.note;
  let score = request.params.score;

  const ParticipantTable = Moralis.Object.extend("Participant");
  const participantInstance = new ParticipantTable();

  const participantQuery = new Moralis.Query("Participant");
  const participantRecords = await participantQuery.find();

  if (!score) {
    const gameQuery = new Moralis.Query("Game");
    gameQuery.equalTo("sessionId", sessionId);
    const gameRecord = await gameQuery.first();

    score = gameRecord.attributes.score;
  }

  let totalScore;
  let counterScore;

  if (participantRecords.length === 0) {
    totalScore = score;
    counterScore = score;
  } else {
    totalScore =
      participantRecords
        .map((entry) => entry.attributes.score)
        .reduce((a, b) => a + b) + score;
    counterScore = totalScore;
  }

  const chance = Number(((score / totalScore) * 100).toFixed(2));

  participantInstance.set("score", score);
  participantInstance.set("counterScore", counterScore);
  participantInstance.set("address", address);
  participantInstance.set("chance", chance);
  participantInstance.set("maticValue", Number(enterFee / 10 ** 18));
  participantInstance.set("txLink", txLink);
  participantInstance.set(
    "usdValue",
    Number(enterFee / 10 ** 18) * Number(maticRatio / 10 ** 8)
  );

  if (note) {
    participantInstance.set("note", note);
  }

  await participantInstance.save(null, { useMasterKey: true });

  participantRecords.forEach(async (entry) => {
    entry.set(
      "chance",
      Number(((entry.attributes.score / totalScore) * 100).toFixed(2))
    );
    await entry.save(null, { useMasterKey: true });
  });

  return 1;
});

Moralis.Cloud.define("fetchTokenBalance", async (request) => {
  const userAddress = request.params.userAddress;
  const tokenAddress = "0xB07f84cab9f875Cd9296dF70c9863F023BBCfaA4";

  const options = {
    chain: "polygon",
    address: userAddress.toLowerCase(),
  };

  const balances = await Moralis.Web3API.account.getTokenBalances(options);
  const balanceObject =
    balances.length > 0
      ? balances.find(
          (entry) => entry.token_address === tokenAddress.toLowerCase()
        )
      : null;

  let currentBalance;

  balanceObject
    ? (currentBalance = Math.trunc(Number(balanceObject.balance)))
    : (currentBalance = 0);

  // save tokens to dividends table
  const DividendsTable = Moralis.Object.extend("Dividends");
  const dividendsQuery = new Moralis.Query(DividendsTable);
  dividendsQuery.equalTo("address", userAddress.toLowerCase());
  const result = await dividendsQuery.first();

  if (currentBalance > 0) {
    if (result) {
      result.set("tokens", `${currentBalance}`);
      await result.save(null, { useMasterKey: true });
    } else {
      const dividendsInstance = new DividendsTable();
      dividendsInstance.set("tokens", `${currentBalance}`);
      dividendsInstance.set("address", userAddress);
      await dividendsInstance.save(null, { useMasterKey: true });
    }
  }

  return currentBalance;
});

Moralis.Cloud.define("fetchPrizeTable", async () => {
  const PrizeTable = Moralis.Object.extend("Prize");
  const prizeQuery = new Moralis.Query(PrizeTable);
  prizeQuery.equalTo("finalized", false);
  const prizeResult = await prizeQuery.first();

  let valueUsd = 0;
  let valueMatic = 0;
  let time = Math.trunc(new Date() + 86400);

  if (prizeResult) {
    valueUsd = prizeResult.attributes.usdValue;
    valueMatic = prizeResult.attributes.maticValue;
    time = prizeResult.attributes.unixTime;
  }
  return { valueUsd, valueMatic, time };
});

Moralis.Cloud.job("addParticipantJob", () => {
  const run = async () => await Moralis.Cloud.run("addParticipantWrapper");
  return run();
});

Moralis.Cloud.job("finalizeSession", () => {
  const run = async () => await Moralis.Cloud.run("payIfTimeUp");
  return run();
});

Moralis.Cloud.define("addParticipant", async () => {
  const shouldRun = Math.random() < 0.4;

  if (!shouldRun) return shouldRun;

  const eth = Moralis.ethersByChain("0x89");

  // #region get matic ratio
  const ethersProvider = new eth.ethers.providers.JsonRpcProvider(
    "https://nd-841-992-697.p2pify.com/1ad3b1a9d06fc505ddd4e196ec48e8e5"
  );

  const tokenAbi = [
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
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "buyer",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "TokensBought",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [],
      name: "_decimals",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "_name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "_symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "_totalSupply",
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
    {
      inputs: [
        {
          internalType: "address",
          name: "tokenOwner",
          type: "address",
        },
        {
          internalType: "address",
          name: "tokenSpender",
          type: "address",
        },
      ],
      name: "allowance",
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
    {
      inputs: [
        {
          internalType: "address",
          name: "tokenSpender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "balanceOf",
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
    {
      inputs: [
        {
          internalType: "address",
          name: "buyer",
          type: "address",
        },
      ],
      name: "buyTokens",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "tokenSpender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "subtractedValue",
          type: "uint256",
        },
      ],
      name: "decreaseAllowance",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
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
    {
      inputs: [],
      name: "getLatestRatio",
      outputs: [
        {
          internalType: "int256",
          name: "",
          type: "int256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getOwner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "tokenSpender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "addedValue",
          type: "uint256",
        },
      ],
      name: "increaseAllowance",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
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
    {
      inputs: [
        {
          internalType: "address",
          name: "recipient",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          internalType: "address",
          name: "recipient",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "withdrawBalance",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const tokenAddress = "0xB07f84cab9f875Cd9296dF70c9863F023BBCfaA4";
  const tokenContract = new eth.ethers.Contract(
    tokenAddress,
    tokenAbi,
    ethersProvider
  );

  const bigNumber = await tokenContract.getLatestRatio();
  const rawRatio = eth.ethers.utils.formatEther(bigNumber);
  // #endregion

  // #region select a participant address and private key

  const addresses = [
    "0xbec04a84a8a5c160e8378e1e42e4eec168450949", // A1
    "0x0cd8422663c1895d4fe22f34d4eef413e58f1e89", // A2
    "0x533f5256b67ed9305843187f9cde6708a3072f30", // A3
    "0xdf3de5613c85ec2f12e2e8bbbdb73a22c28ce71c", // A4
    "0x448a9216e03efd10e923829a7618f83df6421cf9", // A5
    "0x6ad2f1232066ed2519a40574d57ce885720e9f58", // A6
    "0xabe356e8746a92235de3e96d5559c5ee8d499d90", // A7
    "0x9b7195167fc54e0ee02dd46dd7784ef9be74ca2c", // A8
    "0x172be842c193f1a84ed837a13f983fef6bdb5425", // A9
    "0xc62a90070e53be816306200ec29e66c745a09176", // A10
    "0xc9a35688cbfead6be6cba8ff0e32306dab6f738f", // A11
    "0x325c1c68f1b8763f5f6a9de813f76c81d5b2d76b", // A12
    "0x032f3b67e3d6362455e49acbeb2aa8fa5f100c66", // A13
    "0x036a1c8cf943122f2dbaeda9711f88a77a1c4d84", // A14
    "0xf7a6b118e91e44423cf8f24ab6fda724ddf0038d", // A15
    "0x3e946956fcdd67f8a380fa5b1b68d239a39d9dc8", // A16
    "0x0ce551f4b77de39f1b7d21a6f95774660e30bcd7", // A17
    "0x03af5d10d32cdc04cbd1cacbdc4380ad4787c2ad", // A18
    "0xee0831b8e5a2f5d1aa98ef93e96829deceb6c9a1", // A19
    "0xae52ccde29568852663fc576bc4b1eb94edd9067", // A20
    "0x92628567718062ef49e1afb8423bc96882a0ea3e", // A21
    "0x0e3c02c73de89ae6f0487222d79ec98b4d7e23c7", // A22
    "0x49ebbfe9b1622e4744d14406ed2505e75305f787", // A23
    "0xa8f2b1f01e0f75fe0ae8f620e5a4afc85a6adbba", // A24
    "0x70caa2d9d77f88fa50bdc59af5c0ebf803773ee5", // A25
    "0x26e5a2e4336872da7a819932c44a406e07fe5e1d", // A26
    "0xe1b0925288247c80ad28e120cb47575516ec9743", // A27
    "0x9143d24cac23e18f5a3005221b99cfc2618cd4ba", // A28
    "0x360353866e6055f47c290c009ea28edc609fbd0b", // A29
    "0x3d24dafe3addcdb145f38af2f1b8fd4236fef996", // A30
  ];

  const privateKeys = [
    "7f55b486f136b4d84f783432ee038be8298dfcb6ba9bd3a3390d39cbc0242767",
    "e55bd1d841d398007dd401877fe838d1561305fc2df4ce5a5d36da6547328576",
    "a7e15faba1c94f76a22f28de26f8065e64d0de3293c6d089dcaeab08adaec146",
    "13402972eb65258565ef758dae6f5bfb90ae5056439d424353276e127dfbc1f7",
    "f0f7eb6bf9abd6f27d9a38bf1ae6b71081874b010dea40057c54cd0171e3536a",
    "20524f916eb0736f0684cebd93a1161cfee02fd018c06b35fe8d40c313e87ba8",
    "94fbc4462c78b57632cf48e9d19b0f260080c25c0152ce9f9941e918a31efd98",
    "79907c30bdbe49ce1b4a1a0e672fe39835ae2383b5ca0cdd2e95a367348ae9bc",
    "cce62c02bc19362836aecf982fcbfd8252adf4d03f8bab5343a972a5e12ebbe3",
    "cadb7c9266c575a9f1a8d77b1aee219cf6741ddb970bb4dd3c9a35852e9023ae",
    "d1566e38eb1ecbbf1ac5d0fda2f6f36ac501d35b61224ea48d81751d2bc74139",
    "377690f354dd40e9f1a5de66615dfb4b91f68288a291c609db5b84c596c29c78",
    "d2c0b1f5e1ed262967a26e86a397bef8ea8a21b55b7c3d2f3cec5cc494aef32b",
    "f73200b7bece0d5aa5644cc46a434e88f10eac6242e651113469c721b0ff352e",
    "ce88742cf0c0af4683d3b34894b08f534847d12d69b8ea2dafcd02b0940947e4",
    "6f2064ebb509b5b46cca2f1a4c6b0207570469fb1972472f8f82fbe318de6aaa",
    "0618fb45c0ca4c61e1eaa6691f5e7afeb8284446d0c7c95124cc791b31ffae44",
    "778fe3de10144118ac84e0c447e1c9642250971605e36417b48a7b4d89c8f7d2",
    "f2ebac93537816732026151c94f04cef70a6c2707301c5bacaa40fd4cadc7d87",
    "866005e1a4be7fd551e1c0208216ccb67c4c3157cab24179d967a61eb8c02e29",
    "ad90347191c27cf10a4c6fc4de5c6ad42e1a7df5f28140e8e6fe3d70275a7746",
    "006382399fcb0ca7aac60da4a80f5ad3df9465ed7261935375b6edaf8a80314d",
    "7d4a9f9ae183c90d9840f1120bfd8250b1789820722af404763570f7e2179874",
    "3712de342a30a0e88d40f1d30f3cbbc03d167c0d538f9c6ee639482a4786d0a6",
    "aafc4f46593f50417e5cbafbf145d638d0972883936d811a8b8c2eb75ff4ef6f",
    "1204f16c8aaf23b287485fedbd8648806e2ce954bb6055f099189f75fe3b1e99",
    "fda8834974dbb65bc802ce6bac00f868d17542a83db84b1a6ebf8ccb198de040",
    "87594f42d299f013d4d09f18b8beeb6c657e4b87b60268a7139136c5d63672ae",
    "cdb55e143f2536b5892273f5cbe40c5db6dda0bd740caddb351941fef10ef6de",
    "c2b5c0c7d27499607b3aeef466d9edf6b932578596a1386bc2bad2ebd880812e",
  ];

  const baseScores = [50, 75, 110, 160, 220];
  let baseScoreIndex = Math.round(Math.random() * (baseScores.length - 1));

  const index = Math.round(Math.random() * (addresses.length - 1));

  const address = addresses[index];
  const privateKey = privateKeys[index];

  // check if this participant already has a higher score
  const participantQuery = new Moralis.Query("Participant");
  participantQuery.equalTo("address", address);
  const participantResult = await participantQuery.find();

  if (participantResult) {
    for (let i = 0; i < participantResult.length; i++) {
      if (participantResult[i].attributes.score > baseScoreIndex + 21) {
        baseScoreIndex = participantResult[i].attributes.score - 21;
      }
    }
  }
  // #endregion

  // #region enter the participant into smart contract
  const engineAddress = "0xb5a4EA5BB94741AAd2338d64465d256c18f142B4";
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

  const maticRatio = rawRatio * 10 ** 18;
  const enterFee = (1 / (maticRatio / 10 ** 8)) * 10 ** 18;

  const score = baseScores[baseScoreIndex] + generateRandBetween(6, 21);

  const signer = new eth.ethers.Wallet(privateKey, ethersProvider);
  const engineContract = new eth.ethers.Contract(
    engineAddress,
    engineAbi,
    signer
  );

  async function enterParticipant(contract) {
    try {
      const receipt = await contract.enter({
        gasLimit: 5000000,
        maxFeePerGas: 60000000000,
        maxPriorityFeePerGas: 60000000000,
        value: `${enterFee}`,
      });

      const params = {
        score,
        sessionId: 1000,
        enterFee,
        userAddress: address,
        maticRatio,
        txLink: receipt.hash,
        note: "bot",
      };

      await Moralis.Cloud.run("saveParticipantToDB", params);
      await Moralis.Cloud.run("updatePrizeTable", { maticRatio });
    } catch (error) {
      return JSON.stringify(error);
    }
  }

  function generateRandBetween(lower, upper) {
    const difference = upper - lower;
    const randNum = Math.random();
    let randValue = randNum * difference;
    randValue = randValue + lower;

    return Math.round(randValue);
  }
  // #endregion

  await enterParticipant(engineContract);
});

Moralis.Cloud.define("addParticipantWrapper", async () => {
  const shouldDoubleRun = Math.random() < 0.1;

  if (!shouldDoubleRun) {
    await Moralis.Cloud.run("addParticipant");
  } else {
    await Moralis.Cloud.run("addParticipant");
    await Moralis.Cloud.run("addParticipant");
  }
});

Moralis.Cloud.define("triggerPayout", async () => {
  Moralis.Cloud.httpRequest({
    method: "POST",
    url: `https://clownfish-app-ebsko.ondigitalocean.app/pay`,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ receiver: "DB" }),
  }).then(
    function (httpResponse) {
      logger.info(httpResponse.text);
    },
    function (httpResponse) {
      logger.error("Request failed with response code " + httpResponse.status);
    }
  );
});

Moralis.Cloud.define("payIfTimeUp", async () => {
  const prizeQuery = new Moralis.Query("Prize");
  prizeQuery.equalTo("finalized", false);
  const valueRow = await prizeQuery.first();

  if (!valueRow) return;

  const payoutTime = valueRow.attributes.unixTime;
  const timeNow = Math.trunc(new Date() / 1000);

  // check if payout has already been triggered
  const historyQuery = new Moralis.Query("History");
  historyQuery.descending("createdAt");
  historyQuery.notEqualTo("winAmount", 0);
  const historyQueryResult = await historyQuery.first();

  // if a winner has already been chosen within the last 24h return
  if (
    timeNow - new Date(historyQueryResult.attributes.createdAt) / 1000 <
    86000
  )
    return;

  const difference = payoutTime - timeNow;

  if (difference <= 0) {
    await Moralis.Cloud.run("findWinner");
    await Moralis.Cloud.run("findTopPlayers");
    await Moralis.Cloud.run("saveParticipantsToHistory");
    await Moralis.Cloud.run("deleteParticipants");
    await Moralis.Cloud.run("triggerPayout");
  }
});

// update tokens in dividends table after they've been transferred
Moralis.Cloud.afterSave("PolygonTokenTransfers", async (request) => {
  const confirmed = request.object.get("confirmed");

  if (!confirmed) return;

  const query = new Moralis.Query("PolygonTokenTransfers");
  query.descending("createdAt");
  const result = await query.first();

  if (
    result.attributes.token_address ===
    "0xb07f84cab9f875cd9296df70c9863f023bbcfaa4"
  ) {
    const dividendsQuery = new Moralis.Query("Dividends");
    dividendsQuery.equalTo("address", result.attributes.to_address);
    const dividendsResult = await dividendsQuery.first();

    if (dividendsResult) {
      const currentTokenBalance = dividendsResult.attributes.tokens;
      const newTokenBalance =
        Number(currentTokenBalance) + Number(result.attributes.value);
      dividendsResult.set("tokens", `${newTokenBalance}`);
      dividendsResult.set("address", `${result.attributes.to_address}`);

      await dividendsResult.save(null, { useMasterKey: true });

      // deduct the balance of the sender
      const newDividendsQuery = new Moralis.Query("Dividends");
      newDividendsQuery.equalTo("address", result.attributes.from_address);
      const newResult = await newDividendsQuery.first();

      const senderCurrentTokenBalance = newResult.attributes.tokens;
      const senderNewTokenBalance =
        Number(senderCurrentTokenBalance) - Number(result.attributes.value);

      await newResult.set("tokens", `${senderNewTokenBalance}`);
      await newResult.save(null, { useMasterKey: true });
    } else {
      const DividendsTable = Moralis.Object.extend("Dividends");
      const dividendsInstance = new DividendsTable();
      dividendsInstance.set("tokens", `${result.attributes.value}`);
      dividendsInstance.set("address", `${result.attributes.to_address}`);

      await dividendsInstance.save(null, { useMasterKey: true });

      // deduct the balance of the sender
      const newDividendsQuery = new Moralis.Query("Dividends");
      newDividendsQuery.equalTo("address", result.attributes.from_address);
      const newResult = await newDividendsQuery.first();

      const senderCurrentTokenBalance = newResult.attributes.tokens;
      const senderNewTokenBalance =
        Number(senderCurrentTokenBalance) - Number(result.attributes.value);

      await newResult.set("tokens", `${senderNewTokenBalance}`);
      await newResult.save(null, { useMasterKey: true });
    }
  }
});

// this functon checks for cheating
Moralis.Cloud.define("checkIfCheating", async (request) => {
  const data = request.params.data;

  const GameTable = Moralis.Object.extend("Game");
  const gameQuery = new Moralis.Query(GameTable);
  gameQuery.descending("createdAt");
  gameQuery.equalTo("sessionId", data.sessionId);
  const gameResult = await gameQuery.first();

  let previousChecks = 0;

  if (gameResult) {
    previousChecks = gameResult.attributes.previousChecks;
  }
  
  const coincidenceRatio = data.coincidenceRatio;
  const avgToAvgFlag = data.avgToAvgFlag;
  const medianToMedianFlag = data.medianToMedianFlag;
  const avgToMedianFlag = data.avgToMedianFlag;
  const progressiveAccuracyFlag = data.progressiveAccuracyFlag;
  const progressiveTimeFlag = data.progressiveTimeFlag;
  const idealMovesComboFlag = data.idealMovesComboFlag;

  let block = false;

  if (
    coincidenceRatio > 0.65 &&
    avgToAvgFlag &&
    avgToMedianFlag &&
    medianToMedianFlag
  ) {
    block = true;
    gameResult.set("blocked", true);

    gameResult.set(
      "previousChecks",
      Object.assign({}, previousChecks, {
        avgToAvgFlag: previousChecks.avgToAvgFlag + 1,
        avgToMedianFlag: previousChecks.avgToMedianFlag + 1,
        medianToMedianFlag: previousChecks.medianToMedianFlag + 1,
      })
    );

    await gameResult.save(null, { useMasterKey: true });
  }

  if (
    coincidenceRatio > 0.65 &&
    (progressiveAccuracyFlag || progressiveTimeFlag) &&
    (avgToMedianFlag || medianToMedianFlag || avgToAvgFlag)
  ) {
    block = true;
    gameResult.set("blocked", true);

    gameResult.set(
      "previousChecks",
      Object.assign({}, previousChecks, {
        progressiveAccuracyFlag:
          previousChecks.progressiveAccuracyFlag + progressiveAccuracyFlag
            ? 1
            : 0,
        progressiveTimeFlag:
          previousChecks.progressiveTimeFlag + progressiveTimeFlag ? 1 : 0,
        avgToAvgFlag: previousChecks.avgToAvgFlag + avgToAvgFlag ? 1 : 0,
        avgToMedianFlag:
          previousChecks.avgToMedianFlag + avgToMedianFlag ? 1 : 0,
        medianToMedianFlag:
          previousChecks.medianToMedianFlag + medianToMedianFlag ? 1 : 0,
      })
    );

    await gameResult.save(null, { useMasterKey: true });
  }

  if (
    coincidenceRatio > 0.65 &&
    idealMovesComboFlag &&
    (avgToMedianFlag ||
      medianToMedianFlag ||
      avgToAvgFlag ||
      progressiveTimeFlag ||
      progressiveAccuracyFlag)
  ) {
    block = true;
    gameResult.set("blocked", true);

    gameResult.set(
      "previousChecks",
      Object.assign({}, previousChecks, {
        progressiveAccuracyFlag:
          previousChecks.progressiveAccuracyFlag + progressiveAccuracyFlag
            ? 1
            : 0,
        progressiveTimeFlag:
          previousChecks.progressiveTimeFlag + progressiveTimeFlag ? 1 : 0,
        avgToAvgFlag: previousChecks.avgToAvgFlag + avgToAvgFlag ? 1 : 0,
        avgToMedianFlag:
          previousChecks.avgToMedianFlag + avgToMedianFlag ? 1 : 0,
        medianToMedianFlag:
          previousChecks.medianToMedianFlag + medianToMedianFlag ? 1 : 0,
          idealMovesComboFlag: previousChecks.idealMovesComboFlag + 1,
      })
    );

    await gameResult.save(null, { useMasterKey: true });
  }

  if (
    coincidenceRatio > 0.85 &&
    (medianToMedianFlag ||
      avgToMedianFlag ||
      avgToAvgFlag ||
      progressiveTimeFlag ||
      progressiveAccuracyFlag)
  ) {
    block = true;
    gameResult.set("blocked", true);

    gameResult.set(
      "previousChecks",
      Object.assign({}, previousChecks, {
        progressiveAccuracyFlag:
          previousChecks.progressiveAccuracyFlag + progressiveAccuracyFlag
            ? 1
            : 0,
        progressiveTimeFlag:
          previousChecks.progressiveTimeFlag + progressiveTimeFlag ? 1 : 0,
        avgToAvgFlag: previousChecks.avgToAvgFlag + avgToAvgFlag ? 1 : 0,
        avgToMedianFlag:
          previousChecks.avgToMedianFlag + avgToMedianFlag ? 1 : 0,
        medianToMedianFlag:
          previousChecks.medianToMedianFlag + medianToMedianFlag ? 1 : 0,
      })
    );

    await gameResult.save(null, { useMasterKey: true });
  }

  return block;
});
