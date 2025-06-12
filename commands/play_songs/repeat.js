const { SlashCommandBuilder, MessageFlags } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('loop')
        .setDescription('loops a song or a queue')
        
        .addNumberOption(option => 
            option
                  .setName('mode')
                  .setDescription('set the mode to the following options:{mode = 0 is disabled, mode = 1 is song, mode = 2 is queue}')
                  .setMaxValue(2)
                  .setMinValue(0)
                  .setRequired(true)
        ),
        async execute(interaction) {
            const { client } = interaction
            const distube  = client.distube

            const queue = distube.getQueue(interaction)

            if (!queue) {
                return interaction.reply({ content: 'There is no music playing in this server!', flags: MessageFlags.Ephemeral })
            }

            let mode = interaction.options.getNumber('mode')

            distube.setRepeatMode(interaction, mode)

            let modeText
            if (mode === 0) {
                modeText = 'disabled'
            } else if (mode === 1) {
                modeText = 'song'
            } else {
                modeText = 'queue'
            }

            interaction.reply(`set loop mode to: ${modeText}`)

        }
}