module.exports = {
    name: 'finish',
    distube: true, // This tells the event handler this is a DisTube event
    async execute(queue) {
        console.log(`🏁 Queue finished event triggered for guild: ${queue.id}`);
        console.log(`Songs in queue: ${queue.songs.length}`);
        console.log(`Queue stopped: ${queue.stopped}`);
        console.log(`Queue playing: ${queue.playing}`);
        console.log(`Queue paused: ${queue.paused}`);
        
        // Add detailed diagnostics
        console.log(`Voice connection status: ${queue.voice?.connection?._state?.status}`);
        console.log(`Audio player status: ${queue.voice?.audioPlayer?._state?.status}`);
        console.log(`Stream status: ${queue.voice?.stream ? 'exists' : 'null'}`);
        console.log(`Current time: ${queue.currentTime}s`);
        
        if (queue.songs[0]) {
            console.log(`Current song: ${queue.songs[0].name}`);
            console.log(`Song duration: ${queue.songs[0].duration}s`);
            console.log(`Song seekTime: ${queue.songs[0].seekTime || 0}s`);
        }
        
        // Only send the finished message if there are actually no songs left AND the queue was properly stopped
        if (queue.songs.length === 0 || queue.stopped) {
            queue.textChannel.send('🎵 Queue finished! All songs have been played.');
            queue.voice.leave();
        } else {
            console.log(`❌ Finish event triggered inappropriately - ${queue.songs.length} songs still in queue`);
            
            // Check if the bot is still connected to voice
            if (queue.voice && queue.voice.connection && queue.voice.connection._state.status === 'ready') {
                queue.textChannel.send('🔄 Playback stopped unexpectedly. The bot is still connected. Please try using `/play` again or `/resume` if the song was paused.');
            } else {
                queue.textChannel.send('❌ Lost connection to voice channel. Please use `/play` again to restart playback.');
                // Clean up the disconnected queue
                try {
                    queue.voice?.leave();
                } catch (error) {
                    console.log('Could not leave voice channel:', error.message);
                }
            }
        }
    }
}