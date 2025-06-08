module.exports = {
    name: 'error',
    distube: true,
    async execute(error) {
        // Called when DisTube encounters an error
        console.error('DisTube Error:', error);
    }
}
