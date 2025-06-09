module.exports = {
    name: 'finish',
    distube: true, // This tells the event handler this is a DisTube event
    async execute(queue) {
        console.log(`🏁 Queue finished event triggered for guild: ${queue.id}`);
        console.log(`Songs in queue: ${queue.songs.length}`);
        console.log(`Queue stopped: ${queue.stopped}`);
        console.log(`Queue playing: ${queue.playing}`);
        console.log(`Queue paused: ${queue.paused}`);
        
        // Only send the finished message if there are actually no songs left AND the queue was properly stopped
        if (queue.songs.length === 0 || queue.stopped) {
            queue.textChannel.send('🎵 Queue finished! All songs have been played.');
            queue.voice.leave();
        } else {
            console.log(`❌ Finish event triggered inappropriately - attempting to resume playback`);
            queue.textChannel.send('🔄 Playback interrupted, attempting to resume...');
            
            // Try to resume or restart the current song
            try {
                if (queue.paused) {
                    queue.resume();
                    console.log('✅ Resumed paused queue');
                } else if (queue.songs[0]) {
                    // Try to restart the current song
                    const currentSong = queue.songs[0];
                    console.log(`🔄 Attempting to restart: ${currentSong.name}`);
                    // Don't leave the voice channel, just restart playback
                    await queue.distube.play(queue.voice, currentSong.url || currentSong.streamURL, {
                        member: queue.songs[0].member,
                        textChannel: queue.textChannel,
                        skip: true // Skip to restart
                    });
                }
            } catch (resumeError) {
                console.error('Failed to resume playback:', resumeError);
                queue.textChannel.send('❌ Failed to resume playback. Please try the play command again.');
            }
        }
    }
}