const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('stop the current song'),
    async execute(interaction) {
        const { client } = interaction
        const distube = client.distube

        await interaction.deferReply()

        try {
            await distube.stop(interaction)
            await interaction.editReply('⏹️ Stopped the song!')
        } catch (error) {
            if (error.errorCode === 'NO_QUEUE') {
                await interaction.editReply(`Couldn't find current queue`)
            }
            console.error('Error skipping song:', error)
            await interaction.editReply('An error occurred while trying to stop the song.')
        }
    }
}