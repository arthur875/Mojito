module.exports = {
    name: 'error',
    distube: true,
    async execute(error, queue) {
        // Called when DisTube encounters an error
        console.error('DisTube Error:', error);
        
        // Send error message to the text channel if queue exists
        if (queue && queue.textChannel) {
            queue.textChannel.send(`❌ An error occurred: ${error.message || 'Unknown error'}`);
        }
    }
}
