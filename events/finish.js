module.exports = {
    name: 'finish',
    distube: true, // This tells the event handler this is a DisTube event
    async execute(queue) {
        console.log(`🏁 Queue finished event triggered for guild: ${queue.id}`);
        console.log(`Songs in queue: ${queue.songs.length}`);
        console.log(`Queue stopped: ${queue.stopped}`);
        
        // Only send the finished message if there are actually no songs left
        if (queue.songs.length === 0) {
            queue.textChannel.send('🎵 Queue finished! All songs have been played.');
            queue.voice.leave();
        } else {
            console.log(`❌ Finish event triggered but ${queue.songs.length} songs still in queue`);
        }
    }
}