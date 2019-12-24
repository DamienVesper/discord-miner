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
      stone: 0,
      iron: 0,
      gold: 0,
      diamond: 0,
      coal: 0,
      redstone: 0,
      lapis: 0,
      emerald: 0
    }

    store.read(`users/${message.author.id}`).then(data => {
      if(new Date() - new Date(data.cooldowns.mine) >= cooldowns.mine) {
        switch(data.tools.pickaxe.type) {
          case `wood`:
            pickups.stone = Math.floor((Math.random() * 10) + 1) * (data.tools.pickaxe.enchantments.fortune + 1);
            pickups.coal = Math.floor((Math.random() * 7) + 1) * (data.tools.pickaxe.enchantments.fortune + 1);
            toolEmoji = `<:WoodPick:642139596779683861>`;
            break;
          case `stone`:
            pickups.stone = Math.floor((Math.random() * 18) + 1) * (data.tools.pickaxe.enchantments.fortune + 1);
            pickups.coal = Math.floor((Math.random() * 12) + 1) * (data.tools.pickaxe.enchantments.fortune + 1);
            toolEmoji =  `<:StonePick:642139596645466131>`;
            break;
          case `iron`:
            pickups.stone = Math.floor((Math.random() * 40) + 1) * (data.tools.pickaxe.enchantments.fortune + 1);
            pickups.iron = Math.floor((Math.random() * 8) + 1) * (data.tools.pickaxe.enchantments.fortune + 1);
            pickups.coal = Math.floor((Math.random() * 20) + 1) * (data.tools.pickaxe.enchantments.fortune + 1);
            toolEmoji =  `<:IronPick:642139596322373663>`;
            break;
          case `gold`:
            pickups.gold = Math.floor((Math.random() * 7) + 1) * (data.tools.pickaxe.enchantments.fortune + 1);
            pickups.iron = Math.floor((Math.random() * 16) + 1) * (data.tools.pickaxe.enchantments.fortune + 1);
            pickups.stone = Math.floor((Math.random() * 55) + 1) * (data.tools.pickaxe.enchantments.fortune + 1);
            pickups.coal = Math.floor((Math.random() * 33) + 1) * (data.tools.pickaxe.enchantments.fortune + 1);
            toolEmoji = `<:GoldPick:642139596355797027>`;
            break;
          case `diamond`:
            pickups.diamond = Math.floor((Math.random() * 7) + 1) * (data.tools.pickaxe.enchantments.fortune + 1);
            pickups.gold = Math.floor((Math.random() * 14) + 1) * (data.tools.pickaxe.enchantments.fortune + 1);
            pickups.iron = Math.floor((Math.random() * 32) + 1) * (data.tools.pickaxe.enchantments.fortune + 1);
            pickups.stone = Math.floor((Math.random() * 110) + 1) * (data.tools.pickaxe.enchantments.fortune + 1);
            pickups.coal = Math.floor((Math.random() * 66) + 1) * (data.tools.pickaxe.enchantments.fortune + 1);
            toolEmoji = `<:DiamondPick:642139596683214848>`;
            break;
        }

        store.write(`users/${message.author.id}/materials/ores/diamond`, data.materials.ores.diamond += pickups.diamond);
        store.write(`users/${message.author.id}/materials/ores/gold`, data.materials.ores.gold += pickups.gold);
        store.write(`users/${message.author.id}/materials/ores/iron`, data.materials.ores.iron += pickups.iron);
        store.write(`users/${message.author.id}/materials/ores/coal`, data.materials.ores.coal += pickups.coal);
        store.write(`users/${message.author.id}/materials/buildingBlocks/stone`, data.materials.buildingBlocks.stone += pickups.stone);
        
        let sEmbed = new Discord.RichEmbed()
          .setAuthor(message.author.username, message.author.avatarURL)
          .setDescription(`Used ${toolEmoji} to mine:`)
          .addField(`Normal`, `
<:Diamond:642139596586614824>: ${pickups.diamond} 
<:GoldIngot:642139596620300298>: ${pickups.gold}
<:IronIngot:642139596653854730>: ${pickups.iron}
<:Coal:642139596615843840>: ${pickups.coal}
<:Stone:642139596670500890>: ${pickups.stone} 
`, true)
        .addField(`Special`, `
<:Redstone:648241201803165706>: ${pickups.redstone}
<:LapisLazuli:648241201832656920>: ${pickups.lapis}
<:Emerald:649423239029981204>: ${pickups.emerald}
`, true)
        .setTimestamp(new Date())
        .setFooter(config.footer);
        message.channel.send(sEmbed).catch(err => message.channel.send(`You mined...nothing???`));
        if(message.author.id != config.developerID) store.write(`users/${message.author.id}/cooldowns/mine`, new Date());
      }
      else {
        let xEmbed = new Discord.RichEmbed()
          .setAuthor(message.author.username, message.author.avatarURL)
          .setDescription(`You must wait \`${(cooldowns.mine + (new Date(data.cooldowns.mine) - new Date())) / 1000}\` seconds before you can mine again!`)
        .setTimestamp(new Date())
          .setFooter(config.footer);
        return message.channel.send(xEmbed);
      }
    }); //158.69.226.220:41258
  } catch(err) { console.log(err); }
}

module.exports.config = {
  name: `mine`
}