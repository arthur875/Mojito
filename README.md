# Mojito
A feature-rich Discord music bot that plays music from YouTube, Spotify, and SoundCloud.

## Features

- 🎵 Play music from YouTube, Spotify, and SoundCloud
- 📋 Queue management system
- 🔄 Multiple loop modes (song, queue, once)
- ⏯️ Full playback controls (play, pause, resume, skip, stop)
- 💬 Both prefix commands and slash commands
- 🖥️ Detailed playback progress in console

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

#### Queue Management
- `!queue` - Shows the current song queue
- `!loop [off|song|queue|once]` - Sets loop mode
  - `off/0` - Disable looping
  - `song/1` - Loop current song
  - `queue/2` - Loop entire queue
  - `once` - Replay current song once
- `!help` - Displays help information

### Slash Commands
- `/help` - Provides documentation on how to use the bot

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with the following:
   ```
   TOKEN=your_discord_bot_token
   PREFIX=!
   CLIENT_ID=your_discord_client_id
   ```
4. Deploy slash commands:
   ```
   node deploy.js
   ```
5. Start the bot:
   ```
   node index.js
   ```

## Dependencies

- discord.js - Discord API client
- distube - Music playback system
- @discordjs/voice - Voice connection management
- @distube/spotify - Spotify plugin
- @distube/soundcloud - SoundCloud plugin
- @distube/yt-dlp - YouTube download plugin
- dotenv - Environment variable management
- chalk - Terminal text formatting

## License

This project is licensed under the MIT License.
