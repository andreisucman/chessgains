async function transfer() {
  const recipient = "";
  const amount = 5000;

  const provider = ethers.getDefaultProvider(
    "https://nd-841-992-697.p2pify.com/1ad3b1a9d06fc505ddd4e196ec48e8e5"
  );

  const signer = new ethers.Wallet(
    "b88c5f901aace1ff059bfcafb54e034ff0542eef37cfb2f1b90bd09349ee473d",
    provider
  );

  const tokenAddress = "0x6CF09208a84b289922146E7847612Ff59A1c92Fe";
  const contract = new ethers.Contract(tokenAddress, tokenAbi, signer);

  async function transfer(contract) {
    console.log("sending tokens...");
    try {
      // const getGasPrice = await fetch(`http://localhost:3001/gas`);
      // const gas = await getGasPrice.json();
      // const fastPriceInGwei = ethers.utils.parseUnits(`${gas}`, "gwei");

      const response = await contract.transfer(recipient, amount, {
        gasLimit: 5000000,
        // maxFeePerGas: fastPriceInGwei,
        // maxPriorityFeePerGas: fastPriceInGwei,
      });
      const receipt = await response.wait(3);
      console.log("tokens sent", receipt.transactionHash);
    } catch (error) {
      console.log("error", error);
    }
  }

  await transfer(contract);
}
