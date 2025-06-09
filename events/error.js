module.exports = {
    name: 'error',
    distube: true,
    async execute(error, queue) {
        // Called when DisTube encounters an error
        console.error('DisTube Error:', error);
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        
        // Send error message to the text channel if queue exists
        if (queue && queue.textChannel) {
            // Don't spam with every error, only important ones
            if (error.message && !error.message.includes('Stream is not available')) {
                queue.textChannel.send(`❌ Playback error: ${error.message.slice(0, 100)}...`);
            }
        }
    }
}
