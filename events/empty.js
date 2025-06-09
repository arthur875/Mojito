module.exports = {
    name: 'empty',
    distube: true,
    async execute(queue) {
        console.log(`📭 Queue is empty for guild: ${queue.id}`);
        console.log(`Voice connection status: ${queue.voice?.connection?._state?.status}`);
        console.log(`Audio player status: ${queue.voice?.audioPlayer?._state?.status}`);
        
        if (queue.textChannel) {
            queue.textChannel.send('📭 Queue is empty! Add some songs with `/play`');
        }
    }
}
