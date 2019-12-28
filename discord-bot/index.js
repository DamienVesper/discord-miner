/* Network-Installed Dependencies */
const Discord = require(`discord.js`);
const Math = require(`math.js`);
const jsonstore = require(`jsonstore.io`);
const fs = require(`fs`);

/* Local Dependencies */
const bus = require(`./messageBus.js`);

/* Client Config */
let client = new Discord.Client({ disableEveryone: true });
var config = {
	developer: `DamienVesper`,
	developerTag: `4927`,
	// developerID: `386940319666667521`,
  developerID: `652273636924719105`,
	prefix: `v!`,
	token: process.env.DISCORD_BOT_TOKEN,
  jsonstoreToken: process.env.JSONSTORE_TOKEN,
	version: `0.1.6`,
	footer: `© Discord Miner 2019`
}
config.footer = `© Discord Miner 2019 | v${config.version}`;
module.exports = { config };

let store = new jsonstore(config.jsonstoreToken);

/* Client Events */
client.on(`ready`, async () => {
  console.log(`${client.user.username}#${client.user.discriminator} has started, with ${client.users.size} users in ${client.guilds.size} servers.`);
	client.user.setActivity(`on ${client.guilds.size} servers. Farm update coming soon!`);
	refreshActivity();
});

/* Other Client Events */
let guildMemberJoin = require(`./clientEvents/guildMemberAdd.js`);
let guildMemberLeave = require(`./clientEvents/guildMemberRemove.js`);
let guildCreate = require(`./clientEvents/guildCreate.js`);
let guildRemove = require(`./clientEvents/guildCreate.js`);

/* Client Commands */
client.commands = new Discord.Collection();
fs.readdir(`./discord-bot/commands/`, (err, files) => {
		if(err) console.error(err);

		let jsfiles = files.filter(f => f.split(`.`).pop() == `js`);
		if(jsfiles.length <= 0) {
			console.log(`No commands to load!`);
			return;
		}

		/* Load Commands */
		console.log(`Loading ${jsfiles.length} command(s)!`);
		jsfiles.forEach((f, i) => {
				let props = require(`./commands/${f}`);
				console.log(`${i + 1}: ${f} loaded!`);
				client.commands.set(props.config.name, props);
		});
});

/* Client Checks */
const refreshActivity = async() => {
  const botGame = `Discord Miner`;

  const getGuilds = await client.shard.fetchClientValues(`guilds.size`);
  const guildCount = getGuilds.reduce((prev, guildCount) => prev + guildCount, 0);

	client.user.setPresence({
			game: {
					name: `on ${guildCount} servers`,
					// name: `the skies for data...`,
					type: `PLAYING`
			},
			status: `dnd`
	});
}

//Refresh Activity on Member Event
client.on(`guildMemberAdd`, async member => refreshActivity());
client.on(`guildMemberRemove`, async member => refreshActivity());

client.on(`message`, async message => {
	/* Botception & Message Handling */
	if(message.author.bot || message.channel.type == `dm`) return;
  if(message.content.slice(0, config.prefix.length).toString().toLowerCase() != config.prefix) return;

	/* Get Commands & Arguments */
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

  /* More Message Handling */
  if(message.guild.id == `641766195019644989` && message.channel.name.slice(0, 6) != `mining`) return message.delete();
  
  console.log(`[${new Date()}] [${message.guild.name} (${message.guild.id})] ${message.author.username}#${message.author.discriminator} ran command ${command}.`);
  // return message.channel.send(`${message.author} The bot's database is currently experiencing issues, please go to https://disc-miner.glitch.me/support/ for more details.`);
  store.read(`users/${message.author.id}`).then(data => {
    if(!data && command != `start`) {
      let sEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setDescription(`Do \`${config.prefix}start\` to begin your adventure!`)
        .setFooter(config.footer);
      return message.channel.send(sEmbed);
    }
    else if(!data && command == `start`) return client.commands.get(`start`).run(client, message, args);

    if(data.banned && config.developerID != message.author.id) return;
    else if(!data.id) store.write(`users/${message.author.id}/id`, message.author.id);
    else if(message.guild.id == `641766195019644989`) {
      switch(data.tools.pickaxe.type) {
        case `wood`: if(!message.member.roles.has(`643218595522019328`)) message.member.addRole(`643218595522019328`); break;
        case `stone`: if(!message.member.roles.has(`641766391443357696`)) message.member.addRole(`641766391443357696`); break;
        case `iron`: if(!message.member.roles.has(`641766389488549888`)) message.member.addRole(`641766389488549888`); break;
        case `gold`: if(!message.member.roles.has(`641766388830044160`)) message.member.addRole(`641766388830044160`); break;
        case `diamond`: if(!message.member.roles.has(`641766387769147424`)) message.member.addRole(`641766387769147424`); break;
      }
    }

    /* Command Shortcuts */
    if(command == ``) return;
    else if(command == `c`) client.commands.get(`chop`).run(client, message, args);
    else if(command == `m`) client.commands.get(`mine`).run(client, message, args);
    else if(command == `p`) client.commands.get(`profile`).run(client, message, args);
    else if(command == `inv` || command == `i`) client.commands.get(`inventory`).run(client, message, args);
    else if(command == `cd`) client.commands.get(`cooldown`).run(client, message, args);
    else if(command == `bal`) client.commands.get(`balance`).run(client, message, args);
    else {
      let cmd = client.commands.get(command);
      if(cmd) cmd.run(client, message, args);
      else return;
    }
  }).catch(err => message.channel.send(`Failed to load user profile. The bot may be down.`));
});

client.login(config.token);