const { SlashCommandBuilder, MessageFlags } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('pause the current song.'),
        async execute(interaction) {
            
            const { client } = interaction
            const distube = client.distube

            await interaction.deferReply()            
            try {
                await distube.pause(interaction)
                await interaction.editReply('⏸️ paused the song.')
            } catch (error) {
                console.error(`Error in pause command: ${error}`)
                await interaction.editReply({content: `❌ There was an error during pause: ${error.message ? error.message.slice(0, 1000) : 'Unknown error'}`, flags: MessageFlags.Ephemeral})
            }

        }
}