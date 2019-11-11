const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
const Math = require(`math.js`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {
  if(args[0]) {
    if(!message.mentions.members.first() && isNaN(parseInt(args[0]))) return message.channel.send(`That is an invalid user!`);
    
    let invUser = message.mentions.members.first();
    
    if(!invUser) invUser = parseInt(args[0]);
    else invUser = invUser.user.id;

    store.read(`users/${invUser}`).then(data => {
      if(!data) return message.channel.send(`${message.author} That user does not have an account!`);
      /*
      let sEmbed = new Discord.RichEmbed(`Player Inventory`)
      .
      */

      let sEmbed = new Discord.RichEmbed()
        .setTitle(`Player Inventory: ${invUser}`)
        .addField(`**Essentials**:
Money: ${data[`money`]}
Pickaxe: <:WoodPick:642139596779683861>
Axe: <:WoodAxe:642139596557254656>
`, `\u200B`, true)
        .addField(`**Building Materials**:
<:OakLog:642139596645466113>: ${data[`materials`][`buildingBlocks`][`oakLog`]}
<:AcaciaLog:642139596624363520>: ${data[`materials`][`buildingBlocks`][`acaciaLog`]}
<:BirchLog:642139596620038167>: ${data[`materials`][`buildingBlocks`][`birchLog`]}
<:Stone:642139596670500890>: ${data[`materials`][`buildingBlocks`][`stone`]}
`, `\u200B`, true)
        .addField(`**Ores**:
<:Diamond:642139596586614824>: ${data[`materials`][`ores`][`diamond`]}
<:GoldIngot:642139596620300298>: ${data[`materials`][`ores`][`gold`]}
<:IronIngot:642139596653854730>: ${data[`materials`][`ores`][`iron`]}
<:Coal:642139596615843840>: ${data[`materials`][`ores`][`coal`]}
`, `\u200B`, true)
        .setTimestamp(new Date())
        .setFooter(config.footer);
      message.channel.send(sEmbed);
    });
  }
  else {
    store.read(`users/${message.author.id}`).then(data => {
      if(!data) return message.channel.send(`${message.author} Do \`m!start\` to begin your adventure!`);

      let sEmbed = new Discord.RichEmbed()
        .setTitle(`Player Inventory: ${message.author.username}#${message.author.discriminator}`)
        .addField(`**Essentials**:
Money: ${data[`money`]}
Pickaxe: <:WoodPick:642139596779683861>
Axe: <:WoodAxe:642139596557254656>
`, `\u200B`, true)
        .addField(`**Building Materials**:
<:OakLog:642139596645466113>: ${data[`materials`][`buildingBlocks`][`oakLog`]}
<:AcaciaLog:642139596624363520>: ${data[`materials`][`buildingBlocks`][`acaciaLog`]}
<:BirchLog:642139596620038167>: ${data[`materials`][`buildingBlocks`][`birchLog`]}
<:Stone:642139596670500890>: ${data[`materials`][`buildingBlocks`][`stone`]}
`, `\u200B`, true)
        .addField(`**Ores**:
<:Diamond:642139596586614824>: ${data[`materials`][`ores`][`diamond`]}
<:GoldIngot:642139596620300298>: ${data[`materials`][`ores`][`gold`]}
<:IronIngot:642139596653854730>: ${data[`materials`][`ores`][`iron`]}
<:Coal:642139596615843840>: ${data[`materials`][`ores`][`coal`]}
`, `\u200B`, true)
        .setTimestamp(new Date())
        .setFooter(config.footer);
      message.channel.send(sEmbed);
    });
  }
}

module.exports.config = {
  name: `inventory`
}