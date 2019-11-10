const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {  
  store.read(`users/${message.author.id}/cooldowns`).then(data => {
    if(!data) return message.channel.send(`Do \`${config.prefix}start\` to begin your adventure!`);
    let sEmbed = new Discord.RichEmbed()
      .setTitle(`User Cooldowns`)
      .addField(`${config.prefix}mine`, new Date() - data[`mine`])
      .addField(`${config.prefix}chop`, new Date() - data[`chop`])
      .setTimestamp(new Date())
      .setFooter(config.footer);
    
    message.channel.send(sEmbed);
  });
}

module.exports.config = {
  name: `cooldown`
}