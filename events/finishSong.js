module.exports = {
    name: 'finishSong',
    distube: true,
    async execute(queue, song) {
        // Called when a song finishes playing (not the whole queue)
        // Don't send a message for individual songs finishing
    }
}
