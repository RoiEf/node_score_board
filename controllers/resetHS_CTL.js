const storage = require("node-persist");

exports.resetHS = async (req, res) => {
  await storage.init(/* options ... */);

  // verify data exist
  if (!req.fields.cmd) {
    console.log("No command submitted");
    return res.status(200).json({
      message: "No command submitted",
    });
  }
  console.log("req.fields.cmd: " + req.fields.cmd);

  if (req.fields.cmd === "resetBoard") {
    // reset score board
    console.log("delete data");
    storage.del("highScore");
  }

  return res.status(200).json({
    message: "delete HS POST sucess",
  });
};
