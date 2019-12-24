const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {
  try {
    if(message.author.id != config.developerID) return message.channel.send(`${message.author} You can't use that!`);
    
    store.read(`users/${message.author.id}`).then(data => {
      let sEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .addField(`\u200B`, `
Money: ${data.money}
Level: 0 [0 XP / 0 XP]
`)
        .setFooter(config.footer);
      message.channel.send(sEmbed);
    });
  }
  catch(err) { console.log(err); }
}

module.exports.config = {
  name: `profile`
}