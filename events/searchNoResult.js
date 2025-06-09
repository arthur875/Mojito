module.exports = {
    name: 'searchNoResult',
    distube: true,
    async execute(message, query) {
        console.log(`❌ No search results found for: ${query}`);
    }
}
