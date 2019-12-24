const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {
  try { message.channel.send(`You can invite the bot from this link: https://disc-miner.glitch.me/invite.`); }
  catch(err) { console.log(err); }
}

module.exports.config = {
  name: `invite`
}