const { SlashCommandBuilder, MessageFlags } = require('discord.js')

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
            console.error(`Error in stop command: ${error}`)
            
            if (error.errorCode === 'NO_QUEUE') {
                await interaction.editReply({content: `Couldn't find current queue`, flags: MessageFlags.Ephemeral})
            } else {
                await interaction.editReply({content: `❌ There was an error during stop: ${error.message ? error.message.slice(0, 1000) : 'Unknown error'}`, flags: MessageFlags.Ephemeral})
            }
        }
    }
}