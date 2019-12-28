const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
const Math = require(`math.js`);
const cooldowns = require(`../databases/cooldowns.json`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {
  try {
    store.read(`users/${message.author.id}/cooldowns`).then(data => {
      let sEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTimestamp(new Date())
        .setFooter(config.footer);

      let cd = {
        mine: Math.floor((cooldowns.mine + (new Date(data.mine) - new Date())) / 1000),
        chop: Math.floor((cooldowns.chop + (new Date(data.chop) - new Date())) / 1000),
        sell: Math.floor((cooldowns.sell + (new Date(data.sell) - new Date())) / 1000)//,
        // dig: Math.round((60000 + (new Date(data[`dig`]) - new Date())) / 1000)
      }
      if(cd.mine > 1) sEmbed.addField(`${config.prefix}mine`, `\`${cd.mine} second${cd.mine == 1 ? ``: `s`}\``, true);
      else sEmbed.addField(`${config.prefix}mine`, `\`Ready\``, true);
      if(cd.chop > 1) sEmbed.addField(`${config.prefix}chop`, `\`${cd.chop} second${cd.chop == 1 ? ``: `s`}\``, true);
      else sEmbed.addField(`${config.prefix}chop`, `\`Ready\``, true);
      if(cd.sell > 1) sEmbed.addField(`${config.prefix}sell`, `\`${cd.sell} second${cd.sell == 1 ? ``: `s`}\``, true);
      else sEmbed.addField(`${config.prefix}sell`, `\`Ready\``, true);

      message.channel.send(sEmbed);
    });
  } catch(err) { console.log(err); }
}

module.exports.config = {
  name: `cooldown`
}