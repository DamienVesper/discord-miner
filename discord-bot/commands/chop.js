const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
const Math = require(`math.js`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {
  store.read(`users/${message.author.id}`).then(data => {
    if(!data) return message.channel.send(`${message.author} Do \`${config.prefix}start\` to begin your adventure!`);
    if(new Date() - new Date(data[`cooldowns`][`chop`]) >= 60000) {
      if(data[`tools`][`axe`][`type`] == `wood`) {
        let oakPickup = Math.floor((Math.random() * 15) + 1) * (data[`tools`][`axe`][`enchantments`][`efficiency`] + 1);
        
        store.write(`users/${message.author.id}/materials/buildingBlocks/oakLog`, data[`materials`][`buildingBlocks`][`oakLog`] += oakPickup);
        store.write(`users/${message.author.id}/cooldowns/chop`, new Date());
        
        message.channel.send(`You chopped ${oakPickup} <:OakLog:642139596645466113> with your <:WoodAxe:642139596557254656>.`);

      }
      else if(data[`tools`][`axe`][`type`] == `stone`) {}
      else if(data[`tools`][`axe`][`type`] == `iron`) {}
      else if(data[`tools`][`axe`][`type`] == `gold`) {}
      else if(data[`tools`][`axe`][`type`] == `diamond`) {}
    }
    else return message.channel.send(`You must wait 1 minute in between chopping!`);
  });
}

module.exports.config = {
  name: `chop`
}