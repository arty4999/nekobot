# nekobot

Connects to a Twitch chat and listens to command to switch scene from broadcaster and/or moderators.

### Prerequisites

- [NodeJS](https://nodejs.org/en/) - NodeJS v.10 and above
- [OBS-Websocket Plugin](https://obsproject.com/forum/resources/obs-websocket-remote-control-of-obs-studio-made-easy.466/)

### Installing

Run npm install to download dependencies.

```
npm i
```

Configure OBS.

```
Tools -> Websocket server settings
Check "Enable Websocket server"
Check "Enable authentication"
Enter a password
```

rename the .envtemplate to .env and configure .env file

```
TWITCH_CHANNEL="" // <-- Your twitch username

OBS_URL="localhost:4444" // <-- OBS Plugin url. "localhost:4444" is the default url:port if connecting to OBS locally and using default port in plugin

OBS_PASSWORD="" // <-- OBS Plugin password
```

Configure line 11 on bot.js if you want to use the "!scene <scene name>" command to a different command name

```
const COMMAND_NAME = "!scene"; // Command to type in chat.
```

To run bot.js in command prompt / terminal

```
node bot.js
```
