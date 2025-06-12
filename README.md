# Mojito 🍹

A feature-rich Discord music bot that brings high-quality music streaming to your Discord server. Built with modern Discord.js v14 and slash commands, Mojito supports multiple platforms and provides a seamless music experience.

![Bot Logo](assets/images/bot_profile_image.png)



## Features ✨

### 🎵 **Multi-Platform Music Streaming**
- **YouTube**: Direct links, search queries, and playlists
- **Spotify**: Track, and playlist support with seamless integration
- **SoundCloud**: Track and playlist compatibility

### 🎛️ **Advanced Playback Controls**
- **Full Control Suite**: Play, pause, resume, skip, stop functionality
- **Volume Management**: Precise volume control (0-100%)
- **Loop System**: Complete loop functionality with multiple modes:
  - Mode 0: Loop disabled
  - Mode 1: Single song repeat
  - Mode 2: Queue/playlist repeat
- **Queue Management**: View, manage, and navigate your playlist

### ⚡ **Modern Discord Integration**
- **Slash Commands**: Full Discord slash command implementation
- **Rich Embeds**: Beautiful, interactive Discord embeds with bot branding
- **Real-time Updates**: Live playback status and progress tracking
- **Visual Feedback**: Comprehensive user interface with thumbnails and formatting

### 🖥️ **Advanced Console Features**
- **Real-time Progress Bars**: Visual song progress tracking in console
- **Debug Logging**: Comprehensive DisTube debug information
- **Status Monitoring**: Connection status and error reporting
- **Command Logging**: Timestamped command execution tracking

## Commands 🎮

### Music Playback
- `/play [query]` - Stream music from YouTube, Spotify, or SoundCloud
- `/pause` - Pause the current track
- `/resume` - Resume paused playback
- `/skip` - Skip to the next song in queue
- `/stop` - Stop playback and clear the entire queue
- `/leave` - Disconnect bot from voice channel

### Queue & Loop Management
- `/queue` - Display current song queue with track information
- `/loop [mode]` - Set loop mode (0: off, 1: song, 2: queue)

### Audio Control
- `/volume [0-100]` - Adjust playback volume

### Utility
- `/help` - Comprehensive help documentation with rich embeds

## Setup & Installation 🚀

### Prerequisites
- Node.js v16.9.0 or higher
- Discord Bot Token and Client ID
- Git (for cloning the repository)

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/arthur875/Mojito.git
   cd Mojito
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   TOKEN=your_discord_bot_token
   clientId=your_discord_client_id
   ```
   > ⚠️ **Security Notice**: Keep your `.env` file private and never commit it to version control
   
4. **Deploy Slash Commands**
   ```bash
   npm run deploy
   ```

5. **Start the Bot**
   ```bash
   npm start
   ```

### Npm Scripts
The project includes the following pre-configured scripts:
```json
{
  "start": "node index.js",
  "deploy": "node deploy.js", 
  "dev": "node index.js"
}
```
### Core Components
- **DisTube Integration**: Advanced music streaming with multi-platform support
- **Command Handler**: Dynamic slash command loading and execution
- **Event System**: Comprehensive event handling for music playback
- **Rich Embeds**: Custom Discord embeds with bot branding

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
- ✅ Loop functionality with multiple modes (off, song, queue)
- ✅ Rich Discord embeds with bot images

### ⚠️ Known Limitations:
- ⚠️ No persistent settings or database storage

### 🔄 Future Enhancements:
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
