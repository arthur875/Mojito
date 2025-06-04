const { SlashCommandBuilder, MessageFlags } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription('resume the current song.'),
        async execute(interaction) {

            const { client } = interaction
            distube = client.distube
            
            await interaction.deferReply()            
            try {
                await distube.resume(interaction)
                await interaction.editReply('▶️ resumed the current song')
            } catch (error) {
                console.error(`Error in resume command: ${error}`)
                await interaction.editReply({content: `❌ There was an error during resume: ${error.message ? error.message.slice(0, 1000) : 'Unknown error'}`, flags: MessageFlags.Ephemeral})
            }

        }
}