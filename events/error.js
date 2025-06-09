module.exports = {
    name: 'error',
    distube: true,
    async execute(error, queue) {
        // Called when DisTube encounters an error
        console.error('🚨 DisTube Error Details:');
        console.error('Error message:', error.message);
        console.error('Error code:', error.code);
        console.error('Error name:', error.name);
        console.error('Error stack:', error.stack);
        
        if (queue) {
            console.error(`Guild: ${queue.id}`);
            console.error(`Songs in queue: ${queue.songs.length}`);
            console.error(`Queue playing: ${queue.playing}`);
            console.error(`Queue stopped: ${queue.stopped}`);
            console.error(`Voice connection: ${queue.voice?.connection?._state?.status}`);
            console.error(`Audio player: ${queue.voice?.audioPlayer?._state?.status}`);
        }
        
        // Send error message to the text channel if queue exists
        if (queue && queue.textChannel) {
            // Don't spam with every error, only important ones
            if (error.message && !error.message.includes('Stream is not available')) {
                queue.textChannel.send(`❌ Playback error: ${error.message.slice(0, 100)}...`);
            }
        }
    }
}
