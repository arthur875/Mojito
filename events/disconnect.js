module.exports = {
    name: 'disconnect',
    distube: true,
    async execute(queue) {
        // Called when the bot disconnects from voice channel
        console.log(`🔌 Disconnected from voice channel in guild: ${queue.id}`);
    }
}
