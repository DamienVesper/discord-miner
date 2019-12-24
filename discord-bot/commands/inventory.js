const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const emojis = require(`../databases/emojis.json`);
const jsonstore = require(`jsonstore.io`);
const Math = require(`math.js`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {
  try {
    if(args[0]) {
      let invUser = message.mentions.members.first();
      if(!invUser) invUser = client.users.get(args[0]);
      else invUser = invUser.user;
      
      if(!invUser) return message.channel.send(`${message.author} I cannot find that user!`);

      store.read(`users/${invUser.id}`).then(data => {
        if(!data) return message.channel.send(`${message.author} That user does not have an account!`);

        if(!data.materials.buildingBlocks.dirt) store.write(`users/${invUser.id}/materials/buildingBlocks/dirt`, 0);
        if(!data.materials.ores.emerald) store.write(`users/${invUser.id}/materials/ores/emerald`, 0);

        let pfe = {
          sword: null,
          pickaxe: null,
          shovel: null,
          axe: null,
          hoe: null
        }

        pfe.sword = emojis.tools.sword[data.tools.sword.type];
        pfe.pickaxe = emojis.tools.pickaxe[data.tools.pickaxe.type];
        pfe.shovel = emojis.tools.shovel[data.tools.shovel.type];
        pfe.axe = emojis.tools.axe[data.tools.axe.type];
        pfe.hoe = emojis.tools.hoe[data.tools.hoe.type];

        let sEmbed = new Discord.RichEmbed()
          .setAuthor(invUser.username, invUser.avatarURL)
        .addField(`Tools:`, `
Sword: ${pfe.sword}
Pickaxe: ${pfe.pickaxe}
Shovel: ${pfe.shovel}
Axe: ${pfe.axe}
Hoe: ${pfe.hoe}
`, true)
          .addField(`Building Materials:`, `
<:OakLog:642139596645466113>: ${data.materials.buildingBlocks.oakLog}
<:AcaciaLog:642139596624363520>: ${data.materials.buildingBlocks.acaciaLog}
<:BirchLog:642139596620038167>: ${data.materials.buildingBlocks.birchLog}
<:SpruceLog:643964296082096148>: ${data.materials.buildingBlocks.spruceLog}
<:Stone:642139596670500890>: ${data.materials.buildingBlocks.stone}
<:Dirt:649415909579948042>: ${data.materials.buildingBlocks.dirt}
`, true)
          .addField(`Ores:`, `
<:Diamond:642139596586614824>: ${data.materials.ores.diamond}
<:GoldIngot:642139596620300298>: ${data.materials.ores.gold}
<:IronIngot:642139596653854730>: ${data.materials.ores.iron}
<:Coal:642139596615843840>: ${data.materials.ores.coal}
<:Redstone:648241201803165706>: ${data.materials.ores.redstone}
<:LapisLazuli:648241201832656920>: ${data.materials.ores.lapis}
<:Emerald:649423239029981204>: ${data.materials.ores.emerald}
`, true)
          .setTimestamp(new Date())
          .setFooter(config.footer);
        message.channel.send(sEmbed);
      });
    }
    else {
      store.read(`users/${message.author.id}`).then(data => {

        if(!data.materials.buildingBlocks.dirt) store.write(`users/${message.author.id}/materials/buildingBlocks/dirt`, 0);
        if(!data.materials.ores.emerald) store.write(`users/${message.author.id}/materials/ores/emerald`, 0);

        let pfe = {
          sword: null,
          pickaxe: null,
          shovel: null,
          axe: null,
          hoe: null
        }

        pfe.sword = emojis.tools.sword[data.tools.sword.type];
        pfe.pickaxe = emojis.tools.pickaxe[data.tools.pickaxe.type];
        pfe.shovel = emojis.tools.shovel[data.tools.shovel.type];
        pfe.axe = emojis.tools.axe[data.tools.axe.type];
        pfe.hoe = emojis.tools.hoe[data.tools.hoe.type];

        let sEmbed = new Discord.RichEmbed()
          .setAuthor(message.author.username, message.author.avatarURL)
        .addField(`Tools:`, `
Sword: ${pfe.sword}
Pickaxe: ${pfe.pickaxe}
Shovel: ${pfe.shovel}
Axe: ${pfe.axe}
Hoe: ${pfe.hoe}
`, true)
          .addField(`Building Materials:`, `
<:OakLog:642139596645466113>: ${data.materials.buildingBlocks.oakLog}
<:AcaciaLog:642139596624363520>: ${data.materials.buildingBlocks.acaciaLog}
<:BirchLog:642139596620038167>: ${data.materials.buildingBlocks.birchLog}
<:SpruceLog:643964296082096148>: ${data.materials.buildingBlocks.spruceLog}
<:Stone:642139596670500890>: ${data.materials.buildingBlocks.stone}
<:Dirt:649415909579948042>: ${data.materials.buildingBlocks.dirt}
`, true)
          .addField(`Ores:`, `
<:Diamond:642139596586614824>: ${data.materials.ores.diamond}
<:GoldIngot:642139596620300298>: ${data.materials.ores.gold}
<:IronIngot:642139596653854730>: ${data.materials.ores.iron}
<:Coal:642139596615843840>: ${data.materials.ores.coal}
<:Redstone:648241201803165706>: ${data.materials.ores.redstone}
<:LapisLazuli:648241201832656920>: ${data.materials.ores.lapis}
<:Emerald:649423239029981204>: ${data.materials.ores.emerald}
`, true)
          .setTimestamp(new Date())
          .setFooter(config.footer);
        message.channel.send(sEmbed);
      });
    }
  } catch(err) { console.log(err); }
}

module.exports.config = {
  name: `inventory`
}