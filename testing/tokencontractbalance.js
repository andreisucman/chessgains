async function withdraw() {
  const provider = ethers.getDefaultProvider(
    "https://nd-841-992-697.p2pify.com/1ad3b1a9d06fc505ddd4e196ec48e8e5"
  );

  const signer = new ethers.Wallet(
    "b88c5f901aace1ff059bfcafb54e034ff0542eef37cfb2f1b90bd09349ee473d",
    provider
  );

  const tokenAddress = "0x6cf09208a84b289922146e7847612ff59a1c92fe";
  const contract = new ethers.Contract(tokenAddress, tokenAbi, signer);

  async function withdrawBalance(contract) {
    console.log("withdrawing...");
    try {
      const response = await contract.withdrawBalance({
        gasLimit: 5000000,
        // maxFeePerGas: 150000000000,
        // maxPriorityFeePerGas: 150000000000,
      });
      const receipt = await response.wait(3);
      console.log("success", receipt.transactionHash);
    } catch (error) {
      console.log("error", error);
    }
  }

  withdrawBalance(contract);
}

async function getBalance() {
  const provider = ethers.getDefaultProvider(
    "https://nd-841-992-697.p2pify.com/1ad3b1a9d06fc505ddd4e196ec48e8e5"
  );

  const signer = new ethers.Wallet(
    "b88c5f901aace1ff059bfcafb54e034ff0542eef37cfb2f1b90bd09349ee473d",
    provider
  );

  const tokenAddress = "0x6cf09208a84b289922146e7847612ff59a1c92fe";
  const contract = new ethers.Contract(tokenAddress, tokenAbi, signer);

  const balance = await contract.getBalance();
  const readableBalance = ethers.utils.formatEther(balance);

  const balanceBoard = document.getElementById("balance");
  balanceBoard.innerHTML = `${readableBalance}`;
}

getBalance();
