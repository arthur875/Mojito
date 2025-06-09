module.exports = {
    name: 'finishSong',
    distube: true,
    async execute(queue, song) {
        // Called when a song finishes playing (not the whole queue)
        console.log(`✅ Finished playing: ${song.name}`);
        // Don't send a message for individual songs finishing
    }
}
