const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('pause the current song.'),
        async execute(interaction) {
            
            const { client } = interaction
            distube = client.distube

            interaction.deferReply()

            try {
                await distube.pause(interaction)
                await interaction.editReply('⏸️ paused the song.')
            } catch (error) {
                console.error(`there was an error: ${error}`)
            }

        }
}