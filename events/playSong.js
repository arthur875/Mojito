module.exports = {
    name: 'playSong',
    distube: true,
    async execute(queue, song) {
        // Called when a song starts playing
        if (queue.textChannel) {
            queue.textChannel.send(`🎵 Now playing: **${song.name}** - \`${song.formattedDuration}\``);
        }
    }
}