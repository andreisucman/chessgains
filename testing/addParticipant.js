async function addParticipant() {
  await Moralis.start({
    serverUrl: "https://rfoqdnxrqo9v.usemoralis.com:2053/server",
    appId: "631L5XogDOAuSaMnc8DQjoDTy8sSm0gHVH9ikeEh",
    masterKey: "3YiQTciXk54wmcBT26JgI3rYCsifTG4WFWDzApuP",
  });

  const provider = new ethers.providers.JsonRpcProvider(
    "https://nd-841-992-697.p2pify.com/1ad3b1a9d06fc505ddd4e196ec48e8e5"
  );

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
  const engineAddress = "0x432F12B07673a87579Da46cA482305374768EA41";
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
          name: "participant",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "time",
          type: "uint256",
        },
      ],
      name: "ParticipantEntry",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address payable",
          name: "winner",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
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
          name: "recipient",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "payRest",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
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
      name: "PrizeTransfer",
      type: "event",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
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
      name: "RewardTransfer",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newAdmin",
          type: "address",
        },
      ],
      name: "setAdmin",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "number",
          type: "uint256",
        },
      ],
      name: "setOwnerShare",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "number",
          type: "uint256",
        },
      ],
      name: "setWinnerShare",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address payable",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "admin",
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
      name: "getLatestPrice",
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
      name: "owner",
      outputs: [
        {
          internalType: "address payable",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "ownerShare",
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
      name: "winnerShare",
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

  const signer = new ethers.Wallet(privateKey, provider);

  const engineContract = new ethers.Contract(engineAddress, engineAbi, signer);

  const bigNumber = await engineContract.getLatestPrice();
  const rawRatio = ethers.utils.formatEther(bigNumber);

  const maticRatio = rawRatio * 10 ** 18;
  const enterFee = (1 / (maticRatio / 10 ** 8)) * 10 ** 18;

  const score = baseScores[baseScoreIndex] + generateRandBetween(6, 21);

  async function enterParticipant(contract) {
    try {
      const getGasPrice = await fetch(
        `https://api.polygonscan.com/api?module=gastracker&action=gasoracle&apikey=EHNGM8NFC93N6IBF548SI12D67UTTET4YS`
      );
      const jsonResult = await getGasPrice.json();
      const fastPrice = jsonResult.result.FastGasPrice;

      const uppedPrice = Math.trunc(fastPrice * 1.1) * 7 || 400000000000;
      const fastPriceInGwei = Moralis.Units.Token(`${uppedPrice}`, "9");

      try {
        const response = await contract.enter({
          gasLimit: 10000000,
          // maxFeePerGas: fastPriceInGwei || 490000000000,
          // maxPriorityFeePerGas: fastPriceInGwei || 490000000000,
          value: `${enterFee}`,
        });

        const receipt = await response.wait(3);

        const params = {
          score,
          sessionId: 1000,
          enterFee,
          userAddress: address,
          maticRatio,
          txLink: receipt.transactionHash,
          note: "bot",
        };

        console.log("params", params);

        await Moralis.Cloud.run("saveParticipantToDB", params);
        await Moralis.Cloud.run("updatePrizeTable", { maticRatio });
      } catch (err) {
        console.log(err);
      }
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
}
