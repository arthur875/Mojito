const { Client, GatewayIntentBits, Collection, MessageFlags} = require('discord.js');
const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { YtDlpPlugin } = require('@distube/yt-dlp');
const keep_alive = require('./keep_alive.js')
const fs = require('node:fs')
const path = require('node:path')
require('dotenv').config();
const token = process.env.TOKEN;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent
    ],
});

const distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnEmpty: false, // Don't leave when voice channel is empty
    leaveOnFinish: false, // Don't auto-leave when queue finishes
    leaveOnStop: false, // Don't auto-leave when stopped
    savePreviousSongs: true, // Save previous songs
    plugins: [
        new SpotifyPlugin(),
        new SoundCloudPlugin(),
        new YtDlpPlugin()
    ],
});

// Increase max listeners to prevent warnings
distube.setMaxListeners(20);

// Global volume variable
let volume = 50;

// Make these instances accessible to slash commands
client.distube = distube;
client.globalVolume = volume;
/*
*********************************************
*               SLASH COMMANDS              *
*********************************************
*/

client.commands = new Collection()

const foldersPath = path.join(__dirname, 'commands')
const commandFolders = fs.readdirSync(foldersPath)

for (const Folder of commandFolders){
    const commandsPath =  path.join(foldersPath, Folder)
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))
    for (const file of commandFiles){
        const filePath = path.join(commandsPath, file)
        const command = require(filePath)
        if ('data' in command && 'execute' in command){
            client.commands.set(command.data.name, command)
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`)
        }
    }
}

const eventsPath = path.join(__dirname, 'events')
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'))

for (const file of eventFiles){
    const filePath = path.join(eventsPath, file)
    const event = require(filePath)
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
        if (event.distube) {
            distube.once(event.name, (...args) => event.execute(...args));
        }
    } else {
        client.on(event.name, (...args) => event.execute(...args));
        if (event.distube) {
            distube.on(event.name, (...args) => event.execute(...args));
        }
    }
}
client.login(token);