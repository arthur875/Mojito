module.exports = {
    name: 'finish',
    distube: true, // This tells the event handler this is a DisTube event
    async execute(queue) {
        queue.textChannel.send('🎵 Queue finished! All songs have been played.');
        queue.voice.leave()
    }
}