const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {
  try {
    if(args[0]) {
      let balUser = message.mentions.members.first();
      if(!balUser) balUser = client.users.get(args[0]);
      else balUser = balUser.user;
      
      if(!balUser) return message.channel.send(`${message.author} I cannot find that user!`);

      store.read(`users/${balUser.id}/money`).then(data => {
        if(!data) return message.channel.send(`That user either does not have an account or has a balance of $0!`);
        let sEmbed = new Discord.RichEmbed()
          .setAuthor(balUser.username, balUser.avatarURL)
          .setDescription(`**${balUser.username}#${balUser.discriminator}** has $**${data}**!`)
          .setTimestamp(new Date())
          .setFooter(config.footer);
        message.channel.send(sEmbed);
      });
    }
    else {
      store.read(`users/${message.author.id}/money`).then(data => {
        if(!data) return message.channel.send(`Do \`${config.prefix}sell all\` to start off your job!`);
        let xEmbed = new Discord.RichEmbed()
          .setAuthor(message.author.username, message.author.avatarURL)
          .setDescription(`You have $**${data}**!`)
          .setTimestamp(new Date())
          .setFooter(config.footer);
        message.channel.send(xEmbed);
      });
    }
  } catch(err) { console.log(err); }
}

module.exports.config = {
  name: `balance`
}