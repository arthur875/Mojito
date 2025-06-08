const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Provides the necessary documentation to use the bot'),
    async execute(Interaction) {

        const botAvatarAttachment = new AttachmentBuilder('assets/images/bot_profile_image.png', { name: 'botAvatar.png' })
        const botAvatarWallpaperAttachment = new AttachmentBuilder('assets/images/bot_profile_wallpaper_image.png', { name: 'botWallpaper.png' })
        const helpEmbed = new EmbedBuilder()
            .setColor('DarkOrange')
            .setTitle('🎵 Mojito Music Bot Commands 🎵')
            .setURL('https://discord.js.org')
            .setDescription('Use slash commands to control the music bot!')
            .setThumbnail('attachment://botAvatar.png')
            .addFields(
                { name: '**Music Controls**', 
                  value: 
                    `\`/play [query]\` - Plays a song from YouTube, Spotify, or SoundCloud\n` +
                    `\`/stop\` - Stops the current song and clears queue\n` +
                    `\`/skip\` - Skips to the next song\n` +
                    `\`/pause\` - Pauses the current song\n` +
                    `\`/resume\` - Resumes playback if paused\n` +
                    `\`/leave\` - Disconnects the bot from voice channel\n` +
                    `\`/volume [0-100]\` - Sets the volume level`,
                  inline: true
                },
                { name: '**Queue Management**', 
                  value: 
                    `\`/queue\` - Shows the current song queue\n` +
                    `\`/help\` - Shows this help menu`,
                  inline: true
                },
                { name: '**Supported Platforms**', 
                  value: 
                    `🎵 **YouTube** - Direct links or search terms\n` +
                    `🎵 **Spotify** - Track, album, and playlist links\n` + 
                    `🎵 **SoundCloud** - Track and playlist links`,
                  inline: false
                }
            )
            .setImage('attachment://botWallpaper.png')
            .setTimestamp()
            .setFooter({ text: 'Made with ❤️ | Use /help for this menu anytime', iconURL: 'attachment://botAvatar.png' });

        await Interaction.reply({ embeds: [helpEmbed], files: [botAvatarAttachment, botAvatarWallpaperAttachment] });
    }
}