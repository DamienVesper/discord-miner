const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const itemCost = require(`../databases/buyItems.json`);
const jsonstore = require(`jsonstore.io`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {
  try {
    store.read(`users/${message.author.id}`).then(data => {

      if(!args[0]) {
        let sEmbed = new Discord.RichEmbed()
          .setTitle(`Shops`)
          .setDescription(`A list of available shops.`)
          .addField(`\u200B`, `
**${config.prefix}shop pickaxe**: Pickaxe shop.
**${config.prefix}shop axe**: Axe shop.
`)
          .setTimestamp(new Date())
          .setFooter(config.footer);

        return message.channel.send(sEmbed);
      }

    else if(args[0] == `pickaxe`) {
        let sEmbed = new Discord.RichEmbed()
        .setTitle(`Pickaxe Shop`)
        .setDescription(`Do ${config.prefix}buy  pickaxe [type] to buy.`)
        .addField( `\u200B`, `
<:StonePick:642139596645466131> - $${itemCost.pickaxe.stone}
<:IronPick:642139596322373663> - $${itemCost.pickaxe.iron}
<:GoldPick:642139596355797027> - $${itemCost.pickaxe.gold}
<:DiamondPick:642139596683214848> - $${itemCost.pickaxe.diamond}
`)
        .setTimestamp(new Date())
        .setFooter(config.footer);

        return message.channel.send(sEmbed);
      }
      else if(args[0] == `axe`) {
        let sEmbed = new Discord.RichEmbed()
        .setTitle(`Axe Shop`)
        .setDescription(`Do ${config.prefix}buy axe [type] to buy.`)
        .addField(`\u200B`, `
<:StoneAxe:642139596645203978> - $${itemCost.axe.stone}
<:IronAxe:642139596662112266> - $${itemCost.axe.iron}
<:GoldAxe:642139596377030667> - $${itemCost.axe.gold}
<:DiamondAxe:642139596632752128> - $${itemCost.axe.diamond}
`)
        .setTimestamp(new Date())
        .setFooter(config.footer);

        return message.channel.send(sEmbed);
      }
    });
  } catch(err) { console.log(err); }
}

module.exports.config = {
  name: `shop`
}