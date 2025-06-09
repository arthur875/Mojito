module.exports = {
    name: 'disconnect',
    distube: true,
    async execute(queue) {
        // Called when the bot disconnects from voice channel
        if (queue.textChannel) {
            queue.textChannel.send('🔌 Disconnected from voice channel.');
        }
    }
}
