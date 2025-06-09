module.exports = {
    name: 'finishSong',
    distube: true,
    async execute(queue, song) {
        // Called when a song finishes playing (not the whole queue)
        console.log(`✅ Finished playing: ${song.name}`);
        console.log(`Song duration: ${song.duration}s`);
        console.log(`Playback time: ${queue.currentTime}s`);
        console.log(`Songs remaining: ${queue.songs.length}`);
        console.log(`Next song: ${queue.songs[0] ? queue.songs[0].name : 'None'}`);
        console.log(`Queue playing status: ${queue.playing}`);
        console.log(`Queue stopped status: ${queue.stopped}`);
        // Don't send a message for individual songs finishing
    }
}
