module.exports = {
    name: 'searchResult',
    distube: true,
    async execute(message, result) {
        console.log(`🔍 Search completed: Found ${result.length} results`);
        if (result.length > 0) {
            console.log(`First result: ${result[0].name} - ${result[0].url}`);
        }
    }
}
