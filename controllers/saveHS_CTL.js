const storage = require("node-persist");

exports.saveSC = async (req, res) => {
  await storage.init(/* options ... */);

  // verify data exist
  if (!req.fields.playerName || !req.fields.score) {
    console.log("No data submitted");
    return res.status(200).json({
      message: "No data submitted",
    });
  }
  console.log("req.fields.playerName: " + req.fields.playerName);
  console.log("req.fields.score: " + req.fields.score);

  let scoreNumber = 0;
  if (typeof req.fields.score === "number") {
    console.log("is a number");
    scoreNumber = req.fields.score;
  } else {
    scoreNumber = +req.fields.score;
  }

  let highScoreData = await storage.getItem("highScore");
  let saveFlag = false;

  if (!highScoreData) {
    console.log("No data saved");
    highScoreData = {
      list: [{ playerName: req.fields.playerName, score: scoreNumber }],
    };

    saveFlag = true;
  }

  console.log("current highScoreData: " + JSON.stringify(highScoreData));

  let size = highScoreData.list.length;
  console.log("size: " + size);

  // find if name allready exist
  if (!saveFlag) {
    for (let index = 0; index < size; index++) {
      if (highScoreData.list[index].playerName === req.fields.playerName) {
        console.log("Name already exist");

        if (highScoreData.list[index].score < scoreNumber) {
          console.log("updating new high score for player");
          highScoreData.list[index].score = scoreNumber;

          saveFlag = true;
        }
      }
    }
  }

  if (size < 10 && !saveFlag) {
    // save score
    console.log("size < 10,  save score");
    highScoreData.list.push({
      playerName: req.fields.playerName,
      score: scoreNumber,
    });

    saveFlag = true;
  }

  if (highScoreData.list[size - 1].score < scoreNumber && !saveFlag) {
    // update score
    console.log("minimum <,  update score");
    highScoreData.list[size - 1].score = scoreNumber;
    highScoreData.list[size - 1].playerName = req.fields.playerName;

    saveFlag = true;
  }

  if (saveFlag) {
    highScoreData.list.sort((a, b) => b.score - a.score);
    console.log("New highScoreData: " + JSON.stringify(highScoreData));
    await storage.setItem("highScore", highScoreData);
    return res.status(200).json({
      message: "save HS POST sucess",
    });
  }
};
