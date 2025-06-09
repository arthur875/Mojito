module.exports = {
    name: 'playSong',
    distube: true,
    async execute(queue, song) {
        // Called when a song starts playing
        console.log(`🎵 Now playing: ${song.name} - ${song.formattedDuration}`);
        console.log(`Song URL: ${song.url}`);
        console.log(`Song source: ${song.source}`);
        console.log(`Queue length: ${queue.songs.length}`);
        console.log(`Voice connection: ${queue.voice?.connection?._state?.status}`);
        console.log(`Audio player: ${queue.voice?.audioPlayer?._state?.status}`);
        
        queue.textChannel.send(`🎵 Now playing: **${song.name}** - \`${song.formattedDuration}\``);
    }
}