const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('skips the current song'),
    async execute(interaction) {
        const { client } = interaction
        const distube = client.distube

        try {
            await distube.skip(interaction)
            await interaction.reply('Skipped to the next song!')
        } catch (error) {
            if (error.errorCode === 'NO_UP_NEXT') {
                await interaction.reply('There are no more songs in the queue!')
            } else {
                console.error('Error skipping song:', error)
                await interaction.reply('An error occurred while trying to skip the song.')
            }
        }
    }
}