
const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
const itemCost = require(`../databases/buyItems.json`);
const Math = require(`math.js`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {
  try {
    if(message.author.id != config.developerID) return message.channel.send(`You can't use that!`);
    switch(args[0]) {
      case `destroy`:
        message.channel.send(`Shutting down bot...`);
        client.destroy();
        break;
      case `restart`:
        message.channel.send(`Restarting bot...`);
        client.destroy();
        client.login(config.token);
        client.on(`ready`, () => message.channel.send(`Bot has succesfully restarted.`));
        break;
      case `baledit`:
        console.log(args);
        if(isNaN(parseInt(args[1]))) return message.channel.send(`${message.author} UserID must be a valid ID!`);
        store.read(`users/${args[1]}`).then(data => {
          if(!data) return message.channel.send(`${message.author} That user doesn't exist!`);
          else if(!data.money) return message.channel.send(`That user has a balance of $0!`);
          store.write(`users/${args[1]}/money`, data.money += parseInt(args[2]));
          message.channel.send(`Succesfully edited balance of [**${args[1]}**].`);
        });
        break;
      case `createinv`:
        if(!client.guilds.get(args[1])) return message.channel.send(`${message.author} The bot is not in the guild that you sent!`);
        let requestedGuild = client.guilds.get(args[1]);

        let channel = client.channels.get(requestedGuild.systemChannelID);
        if(!channel) {
          let channelID;
          for(let i in requestedGuild.channels) if(requestedGuild.channels[i].type == `text`) channelID = Object.keys(requestedGuild.channels)[i];
          let invite = await client.channels.get(channelID).createInvite({
              maxAge: 86400,
              maxUses: 1
          }, `Requested with command by ${message.author.tag}`).catch(err => console.log(`Failed to create invite.`));
          message.channel.send(`${message.author} Here is the created invite: ${invite}.`);

          // return message.channel.send(`${message.author} Cannot get the default channel of that server!`);
        }
        let invite = await channel.createInvite({
            maxAge: 86400,
            maxUses: 1
        }, `Requested with command by ${message.author.tag}`).catch(err => console.log(`Failed to create invite.`));
        message.channel.send(`${message.author} Here is the created invite: ${invite}.`);
        break;
      case `leave`:
        message.channel.send(`Leaving guild...`);
        message.guild.leave();
        break;
      default: return message.channel.send(`${message.author} Invalid developer command.`);
    }
  } catch(err) { console.log(err); }
}

module.exports.config = {
  name: `dev`
}