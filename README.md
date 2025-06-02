# Mojito
A feature-rich Discord music bot that plays music from YouTube, Spotify, and SoundCloud

## Features

- 🎵 **Multi-Platform Support**: Play music from YouTube, Spotify, and SoundCloud with seamless integration
- 📋 **Queue Management**: Easily manage and view your playlist of songs
- 🔄 **Flexible Loop Options**: Four loop modes to customize your listening experience
  - Off: Play each song once
  - Song: Repeat the current song indefinitely
  - Queue: Loop through the entire queue repeatedly
  - Once: Play the current song one additional time
- ⏯️ **Comprehensive Playback Controls**: Full suite of commands (play, pause, resume, skip, stop)
- 🎚️ **Volume Control**: Adjust volume from 0-100% to suit your environment
- 🖥️ **Visual Playback Tracking**: Real-time progress bar in console shows song position
- 🎮 **Rich Embeds**: Beautiful Discord embeds with thumbnails and formatting for the help command

## Commands

### Prefix Commands
All commands start with the configurable prefix (default: `!`)

#### Music Controls
- `!play [song/url]` - Plays a song from YouTube, Spotify, or SoundCloud
- `!stop` - Stops the current song and clears queue
- `!skip` - Skips to the next song
- `!pause` - Pauses the current song
- `!resume` - Resumes playback if paused
- `!leave` - Disconnects the bot from voice channel
- `!volume [0-100]` - Sets the volume level

#### Queue Management
- `!queue` - Shows the current song queue
- `!loop [mode]` - Sets loop mode
  - `off/0` - Disable looping
  - `song/1` - Loop current song
  - `queue/2` - Loop entire queue
  - `once` - Replay current song once
- `!help` - Displays help information with embedded images

### Slash Commands
- `/play [query]` - Plays a song from YouTube, Spotify, or SoundCloud
- `/volume [intensity]` - Sets the volume (0-100)
- `/help` - Provides documentation on how to use the bot with rich embed visuals

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/arthur875/Mojito.git
   cd Mojito
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with the following:
   ```
   TOKEN=your_discord_bot_token
   PREFIX=!
   clientId=your_discord_client_id
   ```
   > Note: The `.env` file variables are case-sensitive. Make sure to use `clientId` exactly as shown.
   
4. Make sure you have the following directories structure:
   ```
   assets/
     images/
       bot_profile_image.png
       bot_profile_wallpaper_image.png
   ```
   > These images are needed for the help command embed visuals.

5. Deploy slash commands:
   ```
   node deploy.js
   ```
6. Start the bot:
   ```
   node index.js
   ```
   
## Hosting Notes

The bot includes a simple HTTP server in `keep_alive.js` which helps with keeping the bot running on certain hosting platforms that require regular HTTP traffic. This server runs on port 8080 and responds with "I'm alive :D" to any incoming requests.

## Dependencies

- discord.js - Discord API client for bot functionality
- distube - Music playback and queue management system
- @discordjs/voice - Voice connection handling
- @discordjs/opus - Opus encoding for high quality audio
- @distube/spotify - Plugin for Spotify support
- @distube/soundcloud - Plugin for SoundCloud support
- @distube/yt-dlp - Enhanced YouTube download plugin
- dotenv - Environment variable management
- chalk - Terminal text formatting for playback status
- sodium-native - Encryption library for voice connections

## License

This project is licensed under the MIT License.
