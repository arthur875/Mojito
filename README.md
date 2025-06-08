# Mojito 🍹

A feature-rich Discord music bot that plays music from YouTube, Spotify, and SoundCloud using modern slash commands.

![Bot Logo](assets/images/bot_profile_image.png)

## Features

- 🎵 **Multi-Platform Support**: Play music from YouTube, Spotify, and SoundCloud with seamless integration
- 📋 **Queue Management**: Easily manage and view your playlist of songs
- 🔄 **Flexible Loop Options**: Loop functionality planned for future updates
- ⏯️ **Comprehensive Playback Controls**: Full suite of commands (play, pause, resume, skip, stop)
- 🎚️ **Volume Control**: Adjust volume from 0-100% to suit your environment
- 🖥️ **Visual Playback Tracking**: Real-time progress bar in console shows song position
- ⚡ **Modern Slash Commands**: Uses Discord's latest slash command system for better user experience
- 🎨 **Rich Embeds**: Beautiful Discord embeds with thumbnails and formatting

## Commands

### Slash Commands
All bot functionality is accessed through Discord's modern slash command system:

- `/play [query]` - Plays a song from YouTube, Spotify, or SoundCloud
- `/skip` - Skips to the next song
- `/stop` - Stops playback and clears the queue
- `/pause` - Pauses the current song
- `/resume` - Resumes playback if paused
- `/leave` - Disconnects the bot from voice channel
- `/queue` - Shows the current song queue
- `/volume [intensity]` - Sets the volume (0-100)
- `/help` - Provides documentation on how to use the bot with rich embed visuals

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/arthur875/Mojito.git
   cd Mojito
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Add useful npm scripts (optional) by updating your `package.json`:
   ```json
   "scripts": {
     "start": "node index.js",
     "deploy": "node deploy.js",
     "dev": "node index.js"
   }
   ```

4. Create a `.env` file with the following:
   ```env
   TOKEN=your_discord_bot_token
   clientId=your_discord_client_id
   ```
   > **Security Note**: Never share your `.env` file or commit it to version control. The `.env` file variables are case-sensitive. Make sure to use `clientId` exactly as shown.
   
5. Make sure you have the following directory structure:
   ```
   assets/
     images/
       bot_profile_image.png
       bot_profile_wallpaper_image.png
   commands/
     play_songs/
       leave.js
       pause.js
       play.js
       queue.js
       resume.js
       skip.js
       stop.js
       volume.js
     utility/
       help.js
   events/
     interactionCreate.js
     ready.js
   ```
   > The images are needed for rich embed visuals in help commands.

6. Deploy slash commands to your Discord server:
   ```bash
   npm run deploy
   # or
   node deploy.js
   ```

7. Start the bot:
   ```bash
   npm start
   # or
   node index.js
   ```
   
## Console Features

The bot includes a real-time console display showing:

- Current song progress with a visual progress bar
- Song playback status with timestamps
- Connection status and error reports
- Command logs with timestamps

## Current Status & Known Issues

### ✅ Working Features:
- ✅ Slash commands for all music controls
- ✅ Multi-platform music playback (YouTube, Spotify, SoundCloud)
- ✅ Real-time console progress tracking
- ✅ Volume control and queue management
- ✅ Rich Discord embeds with bot images

### ⚠️ Known Limitations:
- ⚠️ Loop functionality is referenced in help but not implemented
- ⚠️ No persistent settings or database storage

### 🔄 Future Enhancements:
- Loop modes (off, song, queue, once)
- Playlist saving/loading
- Music filters and effects
- Web dashboard interface

## Hosting Notes

The bot includes a simple HTTP server in `keep_alive.js` which helps with keeping the bot running on hosting platforms that require regular HTTP traffic. This server runs on port 8080 and responds with "I'm alive :D" to any incoming requests.

## Dependencies

- **discord.js** (^14.19.3) - Discord API client for bot functionality
- **distube** (^5.0.7) - Music playback and queue management system
- **@discordjs/voice** (^0.18.0) - Voice connection handling
- **@discordjs/opus** (^0.10.0) - Opus encoding for high quality audio
- **@distube/spotify** (^2.0.2) - Plugin for Spotify support
- **@distube/soundcloud** (^2.0.4) - Plugin for SoundCloud support
- **@distube/yt-dlp** (^2.0.1) - Enhanced YouTube download plugin
- **dotenv** (^16.5.0) - Environment variable management
- **chalk** (^5.4.1) - Terminal text formatting for playback status
- **sodium-native** (^5.0.3) - Native sodium bindings for enhanced performance

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Created by [Arthur](https://github.com/arthur875)

This project is licensed under the MIT License.
