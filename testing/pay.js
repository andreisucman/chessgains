async function pay() {
  // await Moralis.start({
  //   serverUrl: "https://rfoqdnxrqo9v.usemoralis.com:2053/server",
  //   appId: "631L5XogDOAuSaMnc8DQjoDTy8sSm0gHVH9ikeEh",
  // });

  // await Moralis.Cloud.run("triggerPayout");

  // console.log("paying...")
//   try {
//     const response = await fetch(`http://localhost:3001/pay`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json;charset=utf-8",
//       },
//       body: JSON.stringify({ receiver: "hello" }),
//     });
//     return response;
//   } catch (error) {
//     throw new Error(error);
//   }
}

async function test() {
  const getGasPrice = await fetch(
    `http://localhost:3001/gas`
  );
  const gas = await getGasPrice.json();
  const fastPriceInGwei = ethers.utils.parseUnits(`${gas}`, "gwei");

  console.log("fast price", fastPriceInGwei)

  // const getGasPrice = await fetch(
  //   `https://api.polygonscan.com/api?module=gastracker&action=gasoracle&apikey=${process.env.POLYGONSCAN_API_KEY}`
  // );
  // const jsonResult = await getGasPrice.json();
  // const fastPrice = jsonResult.result.FastGasPrice;
  // const uppedPrice = Math.round(Number(fastPrice) * 1.1);
  // const fastPriceInGwei = ethers.utils.parseUnits(`${uppedPrice}`, "gwei");
}




// test();