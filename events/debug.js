module.exports = {
    name: 'debug',
    distube: true,
    async execute(debug) {
        // Log DisTube debug information
        console.log(`🐛 DisTube Debug: ${debug}`);
    }
}
