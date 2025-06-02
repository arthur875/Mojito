const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
require('dotenv').config();
const prefix = process.env.PREFIX || '!'; // Default to ! if PREFIX not defined

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Provides the necessary documentation to use the bot'),
    async execute(Interaction) {

        const botAvatarAttachment = new AttachmentBuilder('assets/images/bot_profile_image.png', { name: 'botAvatar.png' })
        const botAvatarWallpaperAttachment = new AttachmentBuilder('assets/images/bot_profile_wallpaper_image.png', { name: 'botWallpaper.png' })


        const helpEmbed = new EmbedBuilder()
            .setColor('DarkOrange')
            .setTitle('🎵 Music Bot Commands 🎵')
            .setURL('https://discord.js.org')
            .setDescription(`All prefix commands start with \`${prefix}\`\nYou can also use slash commands like \`/help\``)
            .setThumbnail('attachment://botAvatar.png')
            .addFields(
                { name: '**Music Controls**', 
                  value: 
                    `\`${prefix}play [song/url]\` - Plays a song from YouTube, Spotify, or SoundCloud\n` +
                    `\`${prefix}stop\` - Stops the current song and clears queue\n` +
                    `\`${prefix}skip\` - Skips to the next song\n` +
                    `\`${prefix}pause\` - Pauses the current song\n` +
                    `\`${prefix}resume\` - Resumes playback if paused\n` +
                    `\`${prefix}leave\` - Disconnects the bot from voice channel\n` +
                    `\`${prefix}volume [0-100]\` - Sets the volume level`
                },
                { name: '\u200b', value: '\u200b', inline: false },
                { name: '**Queue Management**', 
                  value: 
                    `\`${prefix}queue\` - Shows the current song queue\n` +
                    `\`${prefix}loop [mode]\` - Sets loop mode:\n` +
                    `• \`off/0\` - Disable looping\n` +
                    `• \`song/1\` - Loop current song\n` + 
                    `• \`queue/2\` - Loop entire queue\n` +
                    `• \`once\` - Replay current song once`,
                  inline: true
                },
                { name: '**Audio Filters**', 
                  value: 
                    `Filter commands are currently commented out but include:\n` +
                    `• 3D, bassboost, echo\n` + 
                    `• karaoke, nightcore\n` +
                    `• vaporwave, and more`,
                  inline: true
                }
            )
            .setImage('attachment://botWallpaper.png')
            .setTimestamp()
            .setFooter({ text: 'Made with ❤️ | Use /help for this menu anytime', iconURL: 'attachment://botAvatar.png' });

        await Interaction.reply({ embeds: [helpEmbed], files: [botAvatarAttachment, botAvatarWallpaperAttachment] });
    }
}