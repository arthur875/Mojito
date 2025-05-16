const { Client, GatewayIntentBits } = require('discord.js')
const Distube = require('distube')
const {prefix, token} = require('./config.json')

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
    ]
})

const distube = new Distube.default(client)

client.once('ready', () =>{
    console.log(`Logged in with prefix '${prefix}'`)
})


client.on('messageCreate', message => {
    if(!message.content.startsWith(prefix) || message.author.bot)
        return

    const args = message.content
        .slice(prefix.length)
        .trim()
        .split(' ')
    const command = args.shift().toLowerCase()
    console.log('X')
    if (command == 'play')
    distube
        .play(message.member.voice.channel, args.join(' '), {
            message,
            textChannel: message.channel,
            member: message.member,
        })
        .catch(err => {
            message.reply(err.message)
        })

})



client.login(token)