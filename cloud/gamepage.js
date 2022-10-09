Moralis.Cloud.define("saveNewGame", async (request) => {
  const sessionId = request.params.sessionId;
  const userAddress = request.params.userAddress;
  const aiLevel = request.params.aiLevel;

  const GameTable = Moralis.Object.extend("Game");
  const GameTableQuery = new Moralis.Query(GameTable);
  GameTableQuery.equalTo("sessionId", sessionId);

  const gameTableRow = await GameTableQuery.first();

  if (!gameTableRow) {
    const gameTableInstance = new GameTable();
    gameTableInstance.set("sessionId", sessionId);
    gameTableInstance.set("address", userAddress);
    gameTableInstance.set("aiLevel", aiLevel);
    await gameTableInstance.save(null, { useMasterKey: true });
  }
});

Moralis.Cloud.define("fetchSessionId", async (request) => {
  const userAddress = request.params.userAddress;

  const gameQuery = new Moralis.Query("Game");
  gameQuery.descending("createdAt");
  gameQuery.equalTo("address", userAddress);

  const result = await gameQuery.first();

  if (!result) return;

  const sessionId = result.attributes.sessionId;

  return sessionId;
});

Moralis.Cloud.define("fetchAiLevel", async (request) => {
  const sessionId = request.params.sessionId;

  const gameQuery = new Moralis.Query("Game");
  gameQuery.equalTo("sessionId", sessionId);
  const result = await gameQuery.first();

  const level = result.attributes.aiLevel;

  return `${level}`;
});

Moralis.Cloud.define("fetchScore", async (request) => {
  const sessionId = request.params.sessionId;

  const query = new Moralis.Query("Game");
  query.equalTo("sessionId", sessionId);
  const row = await query.first();

  if (!row) {
    console.log("data is undefined");
    return;
  }

  const score = row.attributes.score;
  return score;
});
