const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('returns the current queue'),
        async execute(interaction){
            const { client } = interaction
            const distube = client.distube
            
            queue = distube.getQueue(interaction)
            if (!queue) return interaction.reply('Nothing is playing!')

            await interaction.reply(
                `🎶 Queue:\n${queue.songs
                    .map((song, i) => `${i === 0 ? '▶️' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
                    .join('\n')}`
            )
            
        }
}
