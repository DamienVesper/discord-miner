const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {
  try {
    let giveUser = message.mentions.members.first();
    if(!giveUser) return message.channel.send(`${message.author} Please mention a valid member of this server!`);
    if(giveUser.user == message.author) return message.channel.send(`${message.author} You cannot give money to yourself!`);
    giveUser = giveUser.user;

    let giveAmt = parseInt(args[1]);
    if(!giveAmt || isNaN(giveAmt)) return message.channel.send(`${message.author} You must specify how much money you are giving!`);

    store.read(`users/${message.author.id}/money`).then(data => {
      if(data < giveAmt) return message.channel.send(`You cannot give more money than you own!`);
      else if(config.developerID != message.author.id && giveAmt < 0) return message.channel.send(`You cannot give negative money!`);

      store.read(`users/${giveUser.id}/money`).then(vData => {
        if(!vData) return message.channel.send(`That user does not have an account!`); 
        store.write(`users/${message.author.id}/money`, data - giveAmt);
        store.write(`users/${giveUser.id}/money`, vData + giveAmt);

        return message.channel.send(`You gave **${giveUser.username}#${giveUser.discriminator}** *$${giveAmt}*, now they have *$${vData + giveAmt}* and you have *$${data - giveAmt}*.`);
      });
    });
  } catch(err) { console.log(err); }
}

module.exports.config = {
  name: `give`
}