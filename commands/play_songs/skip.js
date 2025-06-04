const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('skips the current song'),
    async execute(interaction) {
        const { client } = interaction
        const distube = client.distube

        await interaction.deferReply()

        try {
            await distube.skip(interaction)
            await interaction.editReply('Skipped to the next song!')
        } catch (error) {
            if (error.errorCode === 'NO_UP_NEXT') {
                await interaction.editReply('There are no more songs in the queue!')
            }
            if (error.errorCode === 'NO_QUEUE') {
                await interaction.editReply(`Couldn't find current queue`)
            } else {
                console.error('Error skipping song:', error)
                await interaction.editReply('An error occurred while trying to skip the song.')
            }
        }
    }
}