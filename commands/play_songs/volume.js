const { SlashCommandBuilder, MessageFlags } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('volume')
        .setDescription('Set the volume for the music bot')
        .addNumberOption(option => 
            option
                .setName('intensity')
                .setDescription('set a number from 0 to 100')
                .setRequired(false)
                .setMinValue(0)
                .setMaxValue(100)
        ),
        async execute(interaction){

            let volume = interaction.options.getNumber('intensity')

            try {
                const { client, guildId } = interaction
                const queue = client.distube.getQueue(interaction)
                
                const currentVolume = queue ? queue.volume : (client.globalVolumes.get(guildId) || 50);
                
                if (volume === null) { 
                    return interaction.reply(`🔊 The current volume is **${currentVolume}%**.`);
                }

                
                client.globalVolumes.set(guildId, volume);
                return interaction.reply(`🔊 Volume has been set to **${volume}%**.`);

            } catch(error) {
                interaction.reply({
                    content: `❌ There was an error during volume set: ${error.message ? error.message.slice(0, 1000) : 'Unknown error'}`,
                    flags: MessageFlags.Ephemeral })
            }
            
        }
}