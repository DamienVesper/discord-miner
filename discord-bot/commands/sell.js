const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
const sellItems = require(`../databases/sellItems.json`)
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {  
  store.read(`users/${message.author.id}/materials`).then(data => {
    if(!data) return message.channel.send(`${message.author} Do \`${config.prefix}start\` to begin your adventure!`);
    let sellItem = args[0];

    if(!sellItem) return message.channel.send(`${message.author} You must specify what to sell!`);
    if(sellItems[sellItem]) return message.channel.send(`Selling individual materials will be later implemented!`);
    else if(sellItem == `all`) {
      
      let totalSell = 
          data[`buildingBlocks`][`oakLog`] * sellItems[`oak`] +
          data[`buildingBlocks`][`stone`] * sellItems[`stone`] +
          data[`ores`][`coal`] * sellItems[`coal`];
      
      store.read(`users/${message.author.id}/money`).then(data => {
        if(data == null) store.write(`users/${message.author.id}/money`, totalSell);
        else store.write(`users/${message.author.id}/money`, data + totalSell);
        
        store.write(`users/${message.author.id}/materials/buildingBlocks/oakLog`, 0);
        store.write(`users/${message.author.id}/materials/buildingBlocks/spruceLog`, 0);
        store.write(`users/${message.author.id}/materials/buildingBlocks/acaciaLog`, 0);
        store.write(`users/${message.author.id}/materials/buildingBlocks/birchLog`, 0);
        store.write(`users/${message.author.id}/materials/buildingBlocks/darkOakLog`, 0);
        store.write(`users/${message.author.id}/materials/buildingBlocks/stone`, 0);

        store.write(`users/${message.author.id}/materials/ores/coal`, 0);
        store.write(`users/${message.author.id}/materials/ores/iron`, 0);
        store.write(`users/${message.author.id}/materials/ores/gold`, 0);
        store.write(`users/${message.author.id}/materials/ores/diamond`, 0);

        message.channel.send(`You sold everything for $**${totalSell}**!`);
      });
    }
    else return message.channel.send(`That is not a valid item to sell!`);
  });
}

module.exports.config = {
  name: `sell`
}