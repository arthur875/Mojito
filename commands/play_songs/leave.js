const { SlashCommandBuilder, MessageFlags } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leave')
        .setDescription('leaves the current voice channel'),
        async execute(interaction) {
            const { client } = interaction
            const distube = client.distube

            await interaction.deferReply()

            try {
                const botVoiceChannel = interaction.guild.members.me.voice.channel;
                if (botVoiceChannel) {
                    await distube.voices.leave(interaction)
                    await interaction.editReply('👋 Left the voice channel!')
                } else {
                    await interaction.editReply('❌ I am not in a voice channel!')
                }
            } catch (error) {
                console.error(`there was an error during the execution of this command: ${error}`)
                await interaction.editReply('there was an error during the execution of leave', MessageFlags.Ephemeral)
            }
        }
}