module.exports = {
    name: 'addSong',
    distube: true,
    async execute(queue, song) {
        // Called when a song is added to the queue
        if (queue.songs.length > 1 && queue.textChannel) {
            console.log(`✅ Added to queue: **${song.name}** - \`${song.formattedDuration}\``);
        }
    }
}
