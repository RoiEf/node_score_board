const storage = require("node-persist");

exports.get10 = async (req, res) => {
  await storage.init(/* options ... */);

  let highScoreData = await storage.getItem("highScore");
  console.log("\ncurrent highScoreData: " + JSON.stringify(highScoreData));

  if (!highScoreData) {
    console.log("get10 GET :: No data saved");
    return res.status(200).json({
      message: "get10 GET :: No data saved",
    });
  }

  // highScoreData.list.sort((a, b) => b.score - a.score);

  return res.status(200).json({
    message: "get10 GET sucess",
    data: highScoreData.list,
  });
};
