const { SlashCommandBuilder, MessageFlags } = require('discord.js')
const chalk = require('chalk').default;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song from YouTube, Spotify, or SoundCloud')
        .addStringOption(option => 
            option
                .setName('query')
                .setDescription('The song name or URL to play')
                .setRequired(true)
        ),
    async execute(interaction) {
        // Check if user is in a voice channel
        if (!interaction.member.voice.channel) {
            return interaction.reply({ 
                content: 'You need to be in a voice channel!', 
            });
        }
        
        // Get the user input
        const query = interaction.options.getString('query');
          try {
            // Get the client from interaction
            const { client } = interaction;
            
            const distube = client.distube;
            const volume = client.globalVolume || 50; // Use the global volume or default to 50
            
            const vc = interaction.member.voice.channel;
            const options = {
                member: interaction.member,
                textChannel: interaction.channel,
                volume: volume,
            };
            
            // First reply to the user
            await interaction.reply(`🎵 Searching for: **${query}**`);
            
            // Play the song (don't pass interaction to avoid conflicts)
            await distube.play(vc, query, options);

            /*
            *********************************************
            *               PROGRESS BAR                *
            *********************************************
            */

            let progressBar = ''
            let lastPercent = -1
            let trigger = false
            const progressListener = (queue) => {
                if (queue.songs && queue.songs[0]) {
                    const song = queue.songs[0];
                    const progress = queue.currentTime;
                    const duration = song.duration;
                    const percent = Math.floor((progress / duration) * 100);
                    progressBar = '|' + '█'.repeat(percent) + ' '.repeat(Math.min(percent, 100)) + '|'

                    if (lastPercent != percent) {
                        trigger = false;
                    }
                
                    if (percent != 0 && !trigger) {
                        trigger = true;
                        lastPercent = percent;
                    }

                    if (percent === 100) {
                        progressBar = '';
                    }
                
                    // Clear previous console lines more clearly
                    const clearPreviousLines = (numLines = 3) => {
                        // ANSI escape sequence to move up and clear lines
                        for (let i = 0; i < numLines; i++) {
                            process.stdout.write('\x1b[1A\x1b[K');
                        }
                    };
                
                    clearPreviousLines();
                
                    console.log(`[${chalk.yellowBright(new Date().toISOString())}] Playing: ${chalk.cyan(song.name)} | ${Math.floor(progress)}s/${duration}s (${percent}%)
                         \n${chalk.greenBright(progressBar)}`);
                }
            };
            
            // Log progress every 5 seconds
            const progressInterval = setInterval(() => {
                const queue = distube.getQueue(interaction.guildId);
                if (queue) progressListener(queue);
                else clearInterval(progressInterval);
            }, 5000);


            
          } catch (error) {
            console.error(`Error in play command: ${error}`);
            
            // If we've already replied, use followUp instead of reply
            if (interaction.replied) {
                await interaction.followUp({
                    content: `❌ Error playing that song: ${error.message ? error.message.slice(0, 1000) : 'Unknown error'}`,
                    flags: MessageFlags.Ephemeral
                });
            } else {
                await interaction.reply({
                    content: `❌ Error playing that song: ${error.message ? error.message.slice(0, 1000) : 'Unknown error'}`,
                    flags: MessageFlags.Ephemeral
                });
            }
        }
    }
}