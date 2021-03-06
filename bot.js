require('dotenv').config()
const Twitch  = require("twitch-js");

const OBSWebSocket = require('obs-websocket-js');
const obs = new OBSWebSocket();

let obsScenes = [],
    obsScenesOriginalName = [];

// Command
const COMMAND_NAME = "!scene"; // Command to type in chat.

// Check .env 
if(process.env.TWITCH_CHANNEL === "") {
  console.error(`You must enter a Twitch channel.`);
  process.exit();
}

// Command cooldown
const COMMAND_COOLDOWN = Number(process.env.COMMAND_COOLDOWN);
let commandLastUsed = 0;

// Connect to OBS
obs.connect({ address: process.env.OBS_URL, password: process.env.OBS_PASSWORD })
  .then(() => {
    console.log(`[OBS] (log): Connected to OBS.`);
    return obs.getSceneList();
  })
  .then(data => {
    // Save scene names in lowercase and original name
    obsScenesOriginalName = data.scenes.map(i => i.name);
    obsScenes = data.scenes.map(i => i.name.toLowerCase());
  })
  .catch(e => { 
    console.log(`[OBS] (error): Could not connect to OBS.`); 
    process.exit(); 
  });

const client = new Twitch.client({
  channels: [`#${process.env.TWITCH_CHANNEL}`]
});

// Twitch chat listener
client.on('chat', (channel, userstate, message, self) => {

  // Is user that's posting a mod or broadcaster?
  if(Math.round((new Date()).getTime() / 1000) > commandLastUsed + COMMAND_COOLDOWN) {
    if(userstate.badges != null && userstate.badges.hasOwnProperty("broadcaster") && userstate.badges.broadcaster === '1' || userstate.mod === true) {
      message = message.toLowerCase();
      if(message.indexOf(COMMAND_NAME) === 0) { // sent !scene command
        message = message.split(" ");
        if(message.length > 1) { // sent which scene to switch to
          message.shift();
          message = message.join(" ");
          if(obsScenes.indexOf(message) >= 0 ) { // scene with name exists, switch to it.
            const sceneName = obsScenesOriginalName[obsScenes.indexOf(message)];
            obs.setCurrentScene({'scene-name': sceneName});
            console.log(`[OBS] (log): Switching to scene: ${sceneName}, command sent from ${userstate.username}.`);
            commandLastUsed = Math.round((new Date()).getTime() / 1000);
          }
        }
      }
    }
  }
  
});

obs.on('error', err => {
  console.error(`[OBS] (error):`, err);
});

//When OBS exits, so does the bot
obs.on("Exiting", () => {
  console.log("[OBS] (Exit): Good work streaming");
  process.exit();
});

// Connect to twitch chat
client.connect();