const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
const itemCost = require(`../databases/buyItems.json`);
const Math = require(`math.js`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {
  try {
    store.read(`users/${message.author.id}`).then(data => {
      if(!data) return message.channel.send(`Do \`${config.prefix}start\` to begin your adventure!`);
      else if(!data[`money`]) return message.channel.send(`${message.author} Do \`${config.prefix}sell all\` to get your money!`)

      let buyItemType = args[0];
      let buyItem = args[1];

      if(!buyItemType) return message.channel.send(`${message.author} Please specify what tool you want to buy!`)
      else if(!buyItem) return message.channel.send(`${message.channel.send} Please specify the grade of the tool you want to buy!`);
      else if(!itemCost[buyItemType]) return message.channel.send(`That is an invalid tool!`);
      else if(!itemCost[buyItemType][buyItem]) return message.channel.send(`That is an invalid tool grade!`);
      else if(buyItem == data[`tools`][buyItemType][`type`]) return message.channel.send(`${message.author} You already own that tool!`)
      if(message.author.id != config.developerID) {
        if(itemCost[buyItemType][buyItem] > data[`money`]) return message.channel.send(`${message.author} You are too poor!`);
      }

      store.write(`users/${message.author.id}/money`, data[`money`] - itemCost[buyItemType][buyItem]);
      store.write(`users/${message.author.id}/tools/${buyItemType}/type`, buyItem);

      return message.channel.send(`You have bought a **${buyItem} ${buyItemType}** for $**${itemCost[buyItemType][buyItem]}**.`);
    });
  } catch(err) { console.log(err); }
}

module.exports.config = {
  name: `buy`
}