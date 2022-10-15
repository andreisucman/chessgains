async function transfer() {
  const recipient = "";
  const amount = 0;

  const provider = ethers.getDefaultProvider(
    "https://nd-841-992-697.p2pify.com/1ad3b1a9d06fc505ddd4e196ec48e8e5"
  );

  const signer = new ethers.Wallet(
    "b88c5f901aace1ff059bfcafb54e034ff0542eef37cfb2f1b90bd09349ee473d",
    provider
  );

  const tokenAddress = "0xB07f84cab9f875Cd9296dF70c9863F023BBCfaA4";
  const contract = new ethers.Contract(tokenAddress, tokenAbi, signer);

  async function transfer(contract) {
    console.log("sending tokens...")
    try {
      const response = await contract.transfer(recipient, amount, {
        gasLimit: 5000000,
        // maxFeePerGas: 150000000000,
        // maxPriorityFeePerGas: 150000000000,
      });
      const receipt = await response.wait(3);
      console.log("tokens sent", receipt.transactionHash)
    } catch (error) {
      console.log("error", error)
    }
  }

  await transfer(contract);
}


