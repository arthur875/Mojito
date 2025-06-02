const { Client, GatewayIntentBits, escapeBulletedList } = require('discord.js');
const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { YtDlpPlugin } = require('@distube/yt-dlp');
const voice = require('@discordjs/voice');
const chalk = require('chalk').default;
const keep_alive = require('./keep_alive.js')
require('dotenv').config();
const token = process.env.TOKEN;
const prefix = process.env.PREFIX;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent
    ],
});

const distube = new DisTube(client, {
    emitNewSongOnly: true,
    plugins: [
        new SpotifyPlugin(),
        new SoundCloudPlugin(),
        new YtDlpPlugin()
    ],
});

client.once('ready', () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async message => {
    if (message.author.bot || !message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    console.log(`Arguments: \n ${args}`)
    const command = args.shift().toLowerCase();

    const vc = message.member.voice.channel;

    if (command === 'help') {
        const helpEmbed = {
            color: 0x36d1dc,
            title: '🎵 Mojito Music Bot Commands 🎵',
            description: `All commands start with prefix: \`${prefix}\``,
            fields: [
                {
                    name: '**Music Controls**',
                    value: 
                        '`play [song/url]` - Plays a song from YouTube, Spotify, or SoundCloud\n' +
                        '`stop` - Stops the current song and clears queue\n' +
                        '`skip` - Skips to the next song\n' +
                        '`pause` - Pauses the current song\n' +
                        '`resume` - Resumes playback if paused\n' +
                        '`leave` - Disconnects the bot from voice channel'
                },
                {
                    name: '**Queue Management**',
                    value: 
                        '`queue` - Shows the current song queue\n' +
                        '`loop [off|song|queue|once]` - Sets loop mode\n' +
                        '• `off/0` - Disable looping\n' +
                        '• `song/1` - Loop current song\n' + 
                        '• `queue/2` - Loop entire queue\n' +
                        '• `once` - Replay current song once'
                }
            ],
            footer: {
                text: 'Made with ❤️ | Mojito Music Bot'
            }
        };
        message.channel.send({ embeds: [helpEmbed] });
    }

    if (command === 'play') {
        if (!vc) return message.channel.send('You need to be in a voice channel!');
        const options = {
            textChannel: message.channel,
            member: message.member,
        };
        
        // Log when song is requested
        console.log(`[${chalk.green(new Date().toISOString())}] Song requested: ${args.join(' ')}`);
        
        distube.play(vc, args.join(' '), options);

        // Listen for song playback progress
        let progressBar = ''
        let lastPercent = -1
        let trigger = false
        const progressListener = (queue) => {
            
            if (queue.songs && queue.songs[0]) {
            const song = queue.songs[0];
            const progress = queue.currentTime;
            const duration = song.duration;
            const percent = Math.floor((progress / duration) * 100);
            progressBar = '|' + '█'.repeat(percent) + ' '.repeat(100 - percent) + '|'

            if (lastPercent != percent) {
              trigger = false;
            }
            
            if (percent != 0 && !trigger) {
              trigger = true;
              lastPercent = percent;
            }

            if (percent === 100) {
                
                progressBar = ''; // Reset when complete
            
            }
            
            // Clear previous console lines more clearly
            const clearPreviousLines = (numLines = 5) => {
                // ANSI escape sequence to move up and clear lines
                for (let i = 0; i < numLines; i++) {
                    process.stdout.write('\x1b[1A\x1b[K');
                }
            };
            
            clearPreviousLines(); // Clear 3 previous lines
            
            console.log(`[${chalk.yellowBright(new Date().toISOString())}] Playing: ${chalk.cyan(song.name)} | ${Math.floor(progress)}s/${duration}s (${percent}%)
                         \n${chalk.greenBright(progressBar)}`);
            }
        };
        
        // Log progress every 15 seconds
        const progressInterval = setInterval(() => {
            const queue = distube.getQueue(message.guild);
            if (queue) progressListener(queue);
            else clearInterval(progressInterval);
        }, 5000);
        
        // Clear interval when song ends
    }

    if (command === 'stop') {
        distube.stop(message);
        message.channel.send('⏹️ Stopped the music!');
    }

    if (command === 'skip') {
        distube.skip(message);
        message.channel.send('⏭️ Skipped!');
    }

    if (command === 'queue') {
        const queue = distube.getQueue(message);
        if (!queue) return message.channel.send('Nothing is playing!');
        message.channel.send(
            `🎶 Queue:\n${queue.songs
                .map((song, i) => `${i === 0 ? '▶️' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
                .join('\n')}`
        );
    }

    if (command === 'pause') {
        distube.pause(message);
        message.channel.send('⏸️ Paused!');
    }

    if (command === 'resume') {
        distube.resume(message);
        message.channel.send('▶️ Resumed!');
    }

    if (command === 'leave') {
        distube.voices.leave(message.guild);
        message.channel.send('👋 Left the voice channel!');
    }

    if (command == 'loop') {
        let mode = args[0]
        const queue = distube.getQueue(message);
        if (!queue) return message.channel.send('Nothing is playing!')
        
        if (mode === 'once') {
            const currentSong = queue.songs[0]
            const replayOnce = () => {
                queue.addToQueue([currentSong], 0)
                message.channel.send(`🔂 Playing '${currentSong.name}' one more time`)
                
                // remove listener
                distube.removeListener('finishSong', replayOnce)
            }

            // Register the replay function
            distube.once('finishSong', (finishedQueue, song) => {
                if (finishedQueue.id == queue.id && song.id == currentSong.id) {
                    replayOnce()
                }
            })
            // confirm to user
             message.channel.send(`🔂 Will replay '${currentSong.name}' once after it finishes`);
        } else {
            // handle loop modes
            let newMode

            if (!mode || mode === 'off' || mode === '0') newMode = 0
            else if (mode === 'song' || mode === '1') newMode = 1
            else if (mode === 'queue' || mode === '2') newMode = 2
            else return message.channel.send('❌ Valid options: off, song, queue, once')

            queue.setRepeatMode(newMode)
            message.channel.send(`🔄 Loop mode set to '${
                                                        newMode === 0 ? 'off' 
                                                        : newMode === 1 ? 'song' 
                                                        : 'queue'
                                                        }'`)
        }


        
    }

    /*

    Updated filter command
    
    if (['3d', 'bassboost', 'echo', 'karaoke', 'nightcore', 'vaporwave'].includes(command)) {
        const queue = distube.getQueue(message);
        if (!queue) return message.channel.send('❌ Nothing playing right now!');
        
        if (command === 'off' || command === 'clear') {
            queue.filters.clear();
            message.channel.send('🎛️ Filters cleared');
        } else {
            const filter = queue.filters.toggle(command);
            message.channel.send(`🎛️ Filter ${command}: ${filter ? 'ON' : 'OFF'}`);
        }
    }
        
*/
});
// Helper status embed
const status = (queue) =>
  `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'}\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``;

// Events
distube
    .on('playSong', (queue, song) =>
        queue.textChannel.send(`🎶 Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`)
    )
    .on('addSong', (queue, song) =>
        queue.textChannel.send(`➕ Added \`${song.name}\` - \`${song.formattedDuration}\` to the queue by ${song.user}`)
    )
    .on('addList', (queue, playlist) =>
        queue.textChannel.send(`📀 Added playlist \`${playlist.name}\` (${playlist.songs.length} songs)\n${status(queue)}`)
    )

.on('error', (channel, error) => {
    console.log('=== ERROR EVENT ===');
    
    // Don't try to log the entire channel object
    console.log('Channel:', channel ? channel.id : 'No channel');
    
    // Format the error properly to get useful information
    let errorMsg;
    if (error instanceof Error) {
        errorMsg = `${error.name}: ${error.message}`;
    } else if (typeof error === 'object') {
        try {
            errorMsg = JSON.stringify(error, null, 2).slice(0, 1000);
        } catch (e) {
            errorMsg = 'Error could not be stringified - likely circular reference';
        }
    } else {
        errorMsg = String(error).slice(0, 1000);
    }
    
    console.log('Error:', errorMsg);

    if (channel && typeof channel.send === 'function') {
        channel.send(`❌ An error occurred: ${String(errorMsg).slice(0, 1500)}`);
    } else {
        console.error('❌ An error occurred (no valid channel to send to):', errorMsg);
    }
})



    .on('empty', queue =>
        queue.textChannel.send('🚪 Voice channel is empty, leaving...')
    )
    .on('searchResult', (message, results) => {
        let i = 0;
        message.channel.send(
            `🔎 **Choose an option:**\n${results
                .map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``)
                .join('\n')}\n*Type any other input or wait 30 seconds to cancel.*`
        );
    })
    .on('searchCancel', message => message.channel.send('❌ Search cancelled'))
    .on('searchNoResult', message => message.channel.send('❌ No results found'))
    .on('searchInvalidAnswer', message => message.channel.send('❌ Invalid response'))
    .on('finish', queue =>{
        distube.voices.get(queue.id).leave();
        queue.textChannel.send('✅ Queue finished')
    })

client.login(token);