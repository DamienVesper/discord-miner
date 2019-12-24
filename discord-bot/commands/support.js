const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {
  try { return message.channel.send(`Join our support server: https://disc-miner.glitch.me/support.`); }
  catch(err) { console.log(err); }
}

module.exports.config = {
  name: `support`
}