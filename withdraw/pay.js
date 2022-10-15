async function pay() {
  // await Moralis.start({
  //   serverUrl: "https://rfoqdnxrqo9v.usemoralis.com:2053/server",
  //   appId: "631L5XogDOAuSaMnc8DQjoDTy8sSm0gHVH9ikeEh",
  //   masterKey: "3YiQTciXk54wmcBT26JgI3rYCsifTG4WFWDzApuP",
  // });

  // await Moralis.Cloud.run("triggerPayout");

  console.log("paying...")
  try {
    const response = await fetch(`http://localhost:3001/pay`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ receiver: "hello" }),
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

async function test() {
  const getGasPrice = await fetch(`https://api.polygonscan.com/api?module=gastracker&action=gasoracle&apikey=EHNGM8NFC93N6IBF548SI12D67UTTET4YS`);
  const jsonResult = await getGasPrice.json();
  const fastPrice = jsonResult.result.FastGasPrice;
  const uppedFastPrice = Number(fastPrice) * 1.15;
  const fastPriceInGwei = ethers.utils.parseUnits(`${uppedFastPrice}`, "gwei");
  console.log(fastPriceInGwei)
}

test();