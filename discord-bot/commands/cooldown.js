const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
const Math = require(`math.js`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {  
  store.read(`users/${message.author.id}/cooldowns`).then(data => {
    if(!data) return message.channel.send(`Do \`${config.prefix}start\` to begin your adventure!`);
    let sEmbed = new Discord.RichEmbed()
      .setTitle(`User Cooldowns`)
      .setTimestamp(new Date())
      .setFooter(config.footer);
    
    let cd = {
      mine: Math.floor((3000 + (new Date(data[`mine`]) - new Date())) / 1000),
      chop: Math.floor((60000 + (new Date(data[`chop`]) - new Date())) / 1000)//,
      // dig: Math.round((60000 + (new Date(data[`dig`]) - new Date())) / 1000)
    }
    if(cd.mine > 0) sEmbed.addField(`${config.prefix}mine`, cd.mine, true);
    else sEmbed.addField(`${config.prefix}mine`, `Ready`, true);
    if(cd.chop > 0) sEmbed.addField(`${config.prefix}chop`, cd.chop, true);
    else sEmbed.addField(`${config.prefix}chop`, `Ready`, true);
    
    message.channel.send(sEmbed);
  });
}

module.exports.config = {
  name: `cooldown`
}