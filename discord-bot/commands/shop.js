const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {
  store.read(`users/${message.author.id}`).then(data => {
    if(!data) return message.channel.send(`${message.author} Do \`m!start\` to begin your adventure!`);
  });
}

module.exports.config = {
  name: `shop`
}