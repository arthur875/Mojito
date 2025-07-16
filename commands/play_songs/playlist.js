const { SlashCommandBuilder, MessageFlags } = require('discord.js')
const ytpl = require("@distube/ytpl");

module.exports = {
    data: new SlashCommandBuilder()
            .setName('playlist')
            .setDescription('Adds a YouTube playlist to the queue.')
            .addStringOption(option =>  
                option
                .setName('url')
                .setDescription('The URL of the YouTube playlist')
                .setRequired(true)   
            ),
    async execute(interaction) {
        if (!interaction.member.voice.channel) {
            return interaction.reply({
                content: 'You need to be in a voice channel to play music!',
                flags: MessageFlags.Ephemeral
            });
        }

        await interaction.deferReply();

        const voiceChannel = interaction.member.voice.channel;
        const { client } = interaction;
        const distube = client.distube;
        const url = interaction.options.getString('url');

        try {
            // Validate if it's a valid playlist URL before processing
            if (!ytpl.validateID(url)) {
                return interaction.editReply({ content: '❌ Please provide a valid YouTube playlist URL.', flags: MessageFlags.Ephemeral });
            }

            const playlist = await ytpl(url, { limit: Infinity });
            // Use `shortUrl` to prevent DisTube from re-interpreting it as a playlist
            const songs = playlist.items.map(item => ({ url: item.shortUrl, title: item.title }));

            if (songs.length === 0) {
                return interaction.editReply({ content: '❌ Could not find any songs in that playlist.', flags: MessageFlags.Ephemeral });
            }

            // Take the first song out of the array to play it immediately
            const firstSong = songs.shift();
            // The first `play` is awaited to ensure the queue is created and the song starts.
            await distube.play(voiceChannel, firstSong.url, { member: interaction.member, textChannel: interaction.channel });
            await interaction.editReply(`▶️ Now playing **${firstSong.title}** and adding ${songs.length} more songs to the queue...`);
            
            // Use a self-invoking async function to add the rest of the songs in the background
            // without blocking the main thread. This prevents the bot from being unresponsive.
            (async () => {
                let retries = 3
                for (const song of songs) {
                    while(retries > 0) {
                        try {
                            await distube.play(voiceChannel, song.url, { member: interaction.member, textChannel: interaction.channel });
                            break
                        } catch (error) {
                            retries--
                            if(retries == 0) throw error
                        }
                    }
                }
                // Once all songs are added, send a confirmation.
                await interaction.followUp(`✅ Successfully added all ${songs.length + 1} songs from the playlist to the queue!`);
            })();

        } catch (error) {
            console.error("Error processing playlist:", error);
            await interaction.editReply({ content: `❌ An error occurred: ${error.message}`, flags: MessageFlags.Ephemeral });
        }
    }
}