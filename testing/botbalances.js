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

const provider = ethers.getDefaultProvider(
  "https://nd-841-992-697.p2pify.com/1ad3b1a9d06fc505ddd4e196ec48e8e5"
);

const balances = {};
let k = 0;

async function checkBalances() {

  for (let i = 0; i < addresses.length; i++) {
    const earnedQuery = new Moralis.Query("History");
    const withdrawnQuery = new Moralis.Query("Rewards");
    withdrawnQuery.equalTo("address", addresses[i]);
    const withdrawnResult = await withdrawnQuery.find();
    earnedQuery.equalTo("address", addresses[i]);
    const earnedResult = await earnedQuery.find();

    let earned = 0;
    let withdrawn = 0;

    if (earnedResult.length > 0) {
      for (let i = 0; i < earnedResult.length; i++) {
        earned += earnedResult[i].attributes.earned;
      }
    }

    if (withdrawnResult.length > 0) {
      for (let i = 0; i < withdrawnResult.length; i++) {
        withdrawn += withdrawnResult[i].attributes.withdrawn;
      }
    }
    
    balances.i = earned - withdrawn;
    console.log(balances.i) 
  }
}

async function startMoralis() {
  const serverUrl = "https://rfoqdnxrqo9v.usemoralis.com:2053/server";
  const appId = "631L5XogDOAuSaMnc8DQjoDTy8sSm0gHVH9ikeEh";
  await Moralis.start({ serverUrl, appId });
  checkBalances();
}

startMoralis();
