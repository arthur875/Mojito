const { SlashCommandBuilder, MessageFlags } = require('discord.js')

module.exports =  {
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
                interaction: interaction,
                volume: volume,
            };
              // First reply to the user
            await interaction.reply(`🎵 Searching for: **${query}**`);
            
            // Play the song
            await distube.play(vc, query, options);
            
        } catch (error) {
            console.error('Error in play command:', error);
            
            // If we've already replied, use followUp instead of editReply
            if (interaction.replied) {
                await interaction.followUp({
                    content: `❌ Error playing that song: ${error.message ? error.message.slice(0, 1000) : 'Unknown error'}`,
                    ephemeral: true
                });
            } else {
                await interaction.reply({
                    content: `❌ Error playing that song: ${error.message ? error.message.slice(0, 1000) : 'Unknown error'}`,
                    ephemeral: true
                });
            }
        }
    }
}