const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('repeat')
        .setDescription('Repeat the current song or queue')
        .addNumberOption(option => 
            option
                .setName('repeat_option')
                .setDescription('set the repeat option: none = 0, song = 1, queue = 2')
                .setRequired(true)
                .setMaxValue(2)
                .setMinValue(0)                
        ),
    async execute(interaction) {
        const { client } = interaction
        const distube = client.distube

        const repeatOption = interaction.options.getNumber('repeat_option')
        const queue = distube.getQueue(interaction.guild.id)

        if (!queue) {
            return interaction.reply({content: 'No music is currently playing!'})
        }

        distube.setRepeatMode(queue, repeatOption)
        const modeNames = ['none', 'song', 'queue']
        
        interaction.reply({content: `Repeat mode set to: ${modeNames[repeatOption]}`})
    }
}
