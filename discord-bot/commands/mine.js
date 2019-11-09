const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
const Math = require(`math.js`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {
  store.read(`users/${message.author.id}`).then(data => {
    if(!data) return message.channel.send(`${message.author} Do \`m!start\` to begin your adventure!`);
    if(data[`cooldowns`][`mine`] == 0) {
      if(data[`tools`][`pickaxe`][`type`] == `wood`) {
        let stonePickup = Math.floor(Math.random() * 10) * (data[`tools`][`pickaxe`][`enchantments`][`efficiency`] + 1);
        let coalPickup = Math.floor(Math.random() * 7) * (data[`tools`][`pickaxe`][`enchantments`][`efficiency`] + 1);
        
        store.write(`users/${message.author.id}/materials/buildingBlocks/stone`, data[`materials`][`buildingBlocks`][`stone`] += stonePickup);
        store.write(`users/${message.author.id}/materials/ores/coal`, data[`materials`][`ores`][`coal`] += coalPickup);
        
        message.channel.send(`You mined ${stonePickup} <:Stone:642139596670500890> and ${coalPickup} <:Coal:642139596615843840>.`);
      }
      else if(data[`tools`][`pickaxe`][`type`] == `stone`) {}
      else if(data[`tools`][`pickaxe`][`type`] == `iron`) {}
      else if(data[`tools`][`pickaxe`][`type`] == `gold`) {}
      else if(data[`tools`][`pickaxe`][`type`] == `diamond`) {}
    }
    else return message.channel.send(`You must wait 3 seconds in between mining!`);
  });
}

module.exports.config = {
  name: `mine`
}