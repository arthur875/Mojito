module.exports = {
    name: 'disconnect',
    distube: true,
    async execute(queue) {
        // Called when the bot disconnects from voice channel
        console.log(`🔌 Disconnected from voice channel in guild: ${queue.id}`);
        console.log(`Reason: Voice connection lost`);
        console.log(`Songs in queue at disconnect: ${queue.songs.length}`);
        console.log(`Was playing: ${queue.playing}`);
        console.log(`Was stopped: ${queue.stopped}`);
        
        if (queue.textChannel) {
            queue.textChannel.send('🔌 Disconnected from voice channel.');
        }
    }
}
