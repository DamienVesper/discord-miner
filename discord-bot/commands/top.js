const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {
  try { if(message.author.id != config.developerID) return message.channel.send(`${message.author} You can't use that!`); }
  catch(err) { console.log(err); }
}

module.exports.config = {
  name: `top`
}