const { SlashCommandBuilder, MessageFlags } = require('discord.js')

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
            console.error(`Error in skip command: ${error}`)
            
            if (error.errorCode === 'NO_UP_NEXT') {
                await interaction.editReply({content: 'There are no more songs in the queue!', flags: MessageFlags.Ephemeral})
            }
            else if (error.errorCode === 'NO_QUEUE') {
                await interaction.editReply({content: `Couldn't find current queue`, flags: MessageFlags.Ephemeral})
            } else {
                await interaction.editReply({content: `❌ There was an error during skip: ${error.message ? error.message.slice(0, 1000) : 'Unknown error'}`, flags: MessageFlags.Ephemeral})
            }
        }
    }
}