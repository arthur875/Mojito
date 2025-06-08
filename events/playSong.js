module.exports = {
    name: 'playSong',
    distube: true,
    async execute(queue, song) {
        // Called when a new song starts playing
        queue.textChannel.send(`🎵 Now playing: **${song.name}** - \`${song.formattedDuration}\``);
    }
}
