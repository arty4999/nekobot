require('dotenv').config();
const Twitch = require('twitch-js');
const OBSWebSocket = require('obs-websocket-js');

const obs = new OBSWebSocket();
let obsScenes = [];
let obsScenesOriginalName = [];

const COMMAND_NAME = '!scene';
const COMMAND_COOLDOWN = Number(process.env.COMMAND_COOLDOWN) || 10;
let commandLastUsed = 0;

(async () => {
  try {
    await obs.connect({ address: process.env.OBS_URL, password: process.env.OBS_PASSWORD });
    console.log('[OBS] (log): Connected to OBS.');
    const data = await obs.getSceneList();
    obsScenesOriginalName = data.scenes.map(i => i.name);
    obsScenes = data.scenes.map(i => i.name.toLowerCase());
  } catch (e) {
    console.log('[OBS] (error): Could not connect to OBS.');
    process.exit();
  }
})();

const client = new Twitch.Client({
  channels: [`#${process.env.TWITCH_CHANNEL}`],
});

client.on('message', (channel, userstate, message, self) => {
  if (Math.round(new Date().getTime() / 1000) > commandLastUsed + COMMAND_COOLDOWN) {
    if (
      (userstate.badges != null && userstate.badges.hasOwnProperty('broadcaster') && userstate.badges.broadcaster === '1') ||
      userstate.mod === true
    ) {
      message = message.toLowerCase();
      if (message.indexOf(COMMAND_NAME) === 0) {
        message = message.split(' ');
        if (message.length > 1) {
          message.shift();
          const sceneName = message.join(' ');
          const sceneIndex = obsScenes.indexOf(sceneName);
          if (sceneIndex >= 0) {
            const sceneNameOriginal = obsScenesOriginalName[sceneIndex];
            obs.setCurrentScene({ 'scene-name': sceneNameOriginal });
            console.log(`[OBS] (log): Switching to scene: ${sceneNameOriginal}, command sent from ${userstate.username}.`);
            commandLastUsed = Math.round(new Date().getTime() / 1000);
          }
        }
      }
    }
  }
});

obs.on('error', err => {
  console.error('[OBS] (error):', err);
});

obs.on('Exiting', () => {
  console.log('[OBS] (Exit): Good work streaming');
  process.exit();
});

client.connect();
