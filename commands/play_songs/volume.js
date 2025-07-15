const { SlashCommandBuilder, MessageFlags } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('volume')
        .setDescription('Set the volume for the music bot')
        .addNumberOption(option => 
            option
                .setName('intensity')
                .setDescription('set a number from 0 to 100')
                .setRequired(true)
                .setMinValue(0)
                .setMaxValue(100)
        ),
        async execute(interaction){

            const volume = interaction.options.getNumber('intensity')

            try {

                const { client, guildId } = interaction

                const queue = client.distube.getQueue(interaction)

                queue.setVolume(volume)

                client.globalVolumes.set(guildId, volume)
                
                interaction.reply({ 
                    content: `volume set to: ${queue.volume}%`})

            } catch(error) {
                interaction.reply({
                    content: `❌ There was an error during volume set: ${error.message ? error.message.slice(0, 1000) : 'Unknown error'}`,
                    flags: MessageFlags.Ephemeral })
            }
            
        }
}