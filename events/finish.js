module.exports = {
    name: 'finish',
    distube: true, // This tells the event handler this is a DisTube event
    async execute(queue) {

        // Only send the finished message if there are actually no songs left AND the queue was properly stopped
        if ((queue.songs.length -1) === 0  && queue.textChannel) {
            queue.textChannel.send('🎵 Queue finished! All songs have been played.')
            queue.voice.leave()
        }
    }
}