const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {
  try { return message.channel.send(`${message.author} Vote for the bot here: https://top.gg/bot/${process.env.DISCORD_BOT_ID}/vote.`); }
  catch(err) { console.log(err); }
}

module.exports.config = {
  name: `vote`
}