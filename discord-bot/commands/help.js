const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {
  return message.channel.send(`${message.author} This command is not available!`);
}

module.exports.config = {
  name: `help`
}