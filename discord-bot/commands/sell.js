const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
const sellItems = require(`../databases/sellItems.json`)
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {
  return message.channel.send(`${message.author} This command is not available!`);
  
  let sellItem = args[0];
  if(!sellItem) return message.channel.send(`${message.author} You must specify what to sell!`);
  if(sellItems[sellItem]) {}
  else return message.channel.send(`That is not a valid item to sell!`);
}

module.exports.config = {
  name: `sell`
}