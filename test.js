require("dotenv").config();
const Twitch = require("twitch-js");

const OBSWebSocket = require("obs-websocket-js");
const obs = new OBSWebSocket();

let obsScenes = [],
  obsScenesOriginalName = [];

// Command
const COMMAND_NAME = "!scene"; // Command to type in chat.

// Check .env
if (process.env.TWITCH_CHANNEL === "") {
  console.error(`You must enter a Twitch channel.`);
  process.exit();
}

// Connect to OBS
obs
  .connect({
    address: process.env.OBS_URL,
    password: process.env.OBS_PASSWORD,
  })
  .then(() => {
    console.log(`[OBS] (log): Connected to OBS.`);
    return obs.getSceneList();
  })
  .then((data) => {
    // Save scene names in lowercase and original name
    obsScenesOriginalName = data.scenes.map((i) => i.name);
    obsScenes = data.scenes.map((i) => i.name.toLowerCase());
  })
  .catch((e) => {
    console.log(`[OBS] (error): Could not connect to OBS.`);
    process.exit();
  });

console.log(obs.GetStreamingStatus.streaming);
