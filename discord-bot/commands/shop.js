const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {
  store.read(`users/${message.author.id}`).then(data => {
    if(!data) return message.channel.send(`${message.author} Do \`m!start\` to begin your adventure!`);

    if(!args[0]) {
      let sEmbed = new Discord.RichEmbed()
        .setTitle(`Shops`)
        .setDescription(`A list of available shops.`)
        .addField(`m!shop pickaxe`, `Pickaxe shop.`)
        .addField(`m!shop axe`, `Axe shop.`)
        .setTimestamp(new Date())
        .setFooter(config.footer);

      return message.channel.send(sEmbed);
    }
    
    if(args[0] == `pickaxe`) return message.channel.send(`${message.author} Coming soon!`);
    else if(args[0] == `axe`) return message.channel.send(`${message.author} Coming soon!`);
 });
}

module.exports.config = {
  name: `shop`
}