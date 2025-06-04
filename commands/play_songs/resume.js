const { SlashCommandBuilder } = require('discord.js')

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
                console.error(`there was an error during the execution of this command: ${error}`)
                await interaction.editReply('there was an error during the execution of resume')
            }

        }
}