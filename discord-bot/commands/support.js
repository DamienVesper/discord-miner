const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {
  return message.channel.send(`Join our support server: https://disc-miner.glitch.me/support.`);
}

module.exports.config = {
  name: `support`
}