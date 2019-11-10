const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {  
  let sEmbed = new Discord.RichEmbed()
    .setTitle(`Bot Help`)
    .addField(`${config.prefix}help`, `This command.`, true)
    .addField(`${config.prefix}start`, `Register account.`, true)
    .addField(`${config.prefix}mine`, `Mine ores and stone.`, true)
    .addField(`${config.prefix}chop`, `Chop some wood!.`, true)
    .addField(`${config.prefix}inventory (user)`, `Get a user's inventory.`, true)
    .addField(`${config.prefix}support`, `Join our support server!`, true)
    .addField(`${config.prefix}invite`, `Invite the bot!`, true)
    .setTimestamp(new Date())
    .setFooter(config.footer);
  
  message.channel.send(sEmbed);
}

module.exports.config = {
  name: `help`
}