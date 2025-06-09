module.exports = {
    name: 'playSong',
    distube: true,
    async execute(queue, song) {
        // Called when a song starts playing
        console.log(`🎵 Now playing: ${song.name} - ${song.formattedDuration}`);
        queue.textChannel.send(`🎵 Now playing: **${song.name}** - \`${song.formattedDuration}\``);
    }
}