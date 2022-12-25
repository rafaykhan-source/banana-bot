const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

require('dotenv').config();



client.login(process.env.BOTTOKEN);
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
})
    
