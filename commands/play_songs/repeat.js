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
            try {
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

            interaction.reply({
                embeds: [{
                color: 0x00ff00,
                title: '🔄 Loop Mode Updated',
                description: `Loop mode has been set to: **${modeText}**`,
                footer: {
                    text: `Set by ${interaction.user.username}`,
                    icon_url: interaction.user.displayAvatarURL()
                }
                }]
            })
            } catch (error) {
            console.error(error)
            interaction.reply({ content: 'An error occurred while setting the loop mode.', flags: MessageFlags.Ephemeral })
                        // Check for specific ffmpeg exit code 8
            
            if (error.message && error.message.includes('ffmpeg') && error.message.includes('exit code 8')) {
                console.log('[DisTube ERROR] Detected ffmpeg exit code 8');

                await distube.setRepeatMode(interaction, mode)
            }
            }
        }
}