const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Provides the necessary documentation to use the bot'),
    async execute(Interaction) {
        const helpEmbed = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle('Some title')
            .setURL('https://discord.js.org')
            .setAuthor({ 
                name: 'Some name', 
                iconURL: 'https://i.imgur.com/AfFp7pu.png', 
                url: 'https://discord.js.org' 
            })
            .setDescription('Some description here')
            .setThumbnail('https://i.imgur.com/AfFp7pu.png')
            .addFields(
                { name: 'Regular field title', value: 'Some value here' },
                { name: '\u200b', value: '\u200b', inline: false },
                { name: 'Inline field title', value: 'Some value here', inline: true },
                { name: 'Inline field title', value: 'Some value here', inline: true },
                { name: 'Inline field title', value: 'Some value here', inline: true }
            )
            .setImage('https://i.imgur.com/AfFp7pu.png')
            .setTimestamp()
            .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

        Interaction.reply({ embeds: [helpEmbed] });

    }
}