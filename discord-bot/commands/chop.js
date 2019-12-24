const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
const Math = require(`math.js`);
const cooldowns = require(`../databases/cooldowns.json`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {
  try {
    let toolEmoji;
    let pickups = {
      oak: 0,
      birch: 0,
      spruce: 0,
      darkOak: 0,
      acacia: 0
    }

    store.read(`users/${message.author.id}`).then(data => {
      if(!data) return message.channel.send(`${message.author} Do \`${config.prefix}start\` to begin your adventure!`);
      if(new Date() - new Date(data.cooldowns.chop) >= cooldowns.chop) {
        switch(data.tools.axe.type) {
          case `wood`:
            pickups.oak = Math.floor((Math.random() * 15) + 1) * (data[`tools`][`axe`][`enchantments`][`fortune`] + 1);
            toolEmoji = `<:WoodAxe:642139596557254656>`;
            break;
          case `stone`:
            pickups.oak = Math.floor((Math.random() * 25) + 1) * (data.tools.axe.enchantments.fortune + 1);
            pickups.birch = Math.floor((Math.random() * 15) + 1) * (data.tools.axe.enchantments.fortune + 1);
            toolEmoji = `<:StoneAxe:642139596645203978>`;
            break;
          case `iron`:
            pickups.oak = Math.floor((Math.random() * 50) + 1) * (data.tools.axe.enchantments.fortune + 1);
            pickups.birch = Math.floor((Math.random() * 30) + 1) * (data.tools.axe.enchantments.fortune + 1);
            pickups.spruce = Math.floor((Math.random() * 10) + 1) * (data.tools.axe.enchantments.fortune + 1);
            toolEmoji = `<:IronAxe:642139596662112266>`;
            break;
          case `gold`:
            pickups.oak = Math.floor((Math.random() * 80) + 1) * (data.tools.axe.enchantments.fortune + 1);
            pickups.birch = Math.floor((Math.random() * 50) + 1) * (data.tools.axe.enchantments.fortune + 1);
            pickups.spruce = Math.floor((Math.random() * 18) + 1) * (data.tools.axe.enchantments.fortune + 1);
            pickups.darkOak = Math.floor((Math.random() * 10) + 1) * (data.tools.axe.enchantments.fortune + 1);
            toolEmoji = `<:GoldAxe:642139596377030667>`;
            break;
          case `diamond`:
            pickups.oak = Math.floor((Math.random() * 160) + 1) * (data.tools.axe.enchantments.fortune + 1);
            pickups.birch = Math.floor((Math.random() * 100) + 1) * (data.tools.axe.enchantments.fortune + 1);
            pickups.spruce = Math.floor((Math.random() * 40) + 1) * (data.tools.axe.enchantments.fortune + 1);
            pickups.darkOak = Math.floor((Math.random() * 20) + 1) * (data.tools.axe.enchantments.fortune + 1);
            pickups.acacia = Math.floor((Math.random() * 17) + 1) * (data.tools.axe.enchantments.fortune + 1);
            toolEmoji =  `<:DiamondAxe:642139596632752128>`;
            break;
          case 0:
            store.write(`users/${message.author.id}/tools/sword/type`, `wood`);
            store.write(`users/${message.author.id}/tools/pickaxe/type`, `wood`);
            store.write(`users/${message.author.id}/tools/shovel/type`, `wood`);
            store.write(`users/${message.author.id}/tools/axe/type`, `wood`);
            store.write(`users/${message.author.id}/tools/hoe/type`, `wood`);
            message.channel.send(`${message.author.id} Whoops, something went wrong. Try doing that again?`);
            break;
          default: return;
        }

        if(message.author.id != config.developerID) store.write(`users/${message.author.id}/cooldowns/chop`, new Date());
        store.write(`users/${message.author.id}/materials/buildingBlocks/oakLog`, data.materials.buildingBlocks.oakLog += pickups.oak);
        store.write(`users/${message.author.id}/materials/buildingBlocks/birchLog`, data.materials.buildingBlocks.birchLog += pickups.birch);
        store.write(`users/${message.author.id}/materials/buildingBlocks/spruceLog`, data.materials.buildingBlocks.spruceLog += pickups.spruce);
        store.write(`users/${message.author.id}/materials/buildingBlocks/darkOakLog`, data.materials.buildingBlocks.darkOakLog += pickups.darkOak);
        store.write(`users/${message.author.id}/materials/buildingBlocks/acaciaLog`, data.materials.buildingBlocks.acaciaLog += pickups.acacia);

        let sEmbed = new Discord.RichEmbed()
          .setAuthor(message.author.username, message.author.avatarURL)
          .setDescription(`Used ${toolEmoji} to chop:`)
          .addField(`\u200B`, `
<:AcaciaLog:642139596624363520>: ${pickups.acacia}
<:DarkOakLog:644006992301522963>: ${pickups.darkOak}
<:SpruceLog:643964296082096148>: ${pickups.spruce}
`, true)
          .addField(`\u200B`, `
<:BirchLog:642139596620038167>: ${pickups.birch}
<:OakLog:642139596645466113>: ${pickups.oak}
`, true)
        .setTimestamp(new Date())
        .setFooter(config.footer);
        message.channel.send(sEmbed).catch(err => message.channel.send(`You chopped...nothing?`));
        }
      else {
        let xEmbed = new Discord.RichEmbed()
          .setAuthor(message.author.username, message.author.avatarURL)
          .setDescription(`You must wait \`${(cooldowns.chop + (new Date(data.cooldowns.chop) - new Date())) / 1000}\` seconds before you can chop again!`)
          .setTimestamp(new Date())
          .setFooter(config.footer);
        return message.channel.send(xEmbed);
      }
    });
  } catch(err) { console.log(err); }
}

module.exports.config = {
  name: `chop`
}