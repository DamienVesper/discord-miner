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
	developerTag: `#4927`,
	developerID: `386940319666667521`,
	prefix: `m!`,
	token: process.env.DISCORD_BOT_TOKEN,
  jsonstoreToken: process.env.JSONSTORE_TOKEN,
	version: `0.0.1`,
	footer: `© Discord Miner 2019 | Failed to load version.`
}
config.footer = `© Discord Miner 2019 | v${config.version}`
module.exports = { config };

/* Client Events */
client.on(`ready`, async () => {
		console.log(`${client.user.username}#${client.user.discriminator} has started, with ${client.users.size} users in ${client.guilds.size} servers.`);
		client.user.setActivity(`Minecraft`);
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
function refreshActivity() {
	let botGame = `Minecraft`;
	let memberCount = client.guilds.get(`641766195019644989`).memberCount || 0;
	client.user.setPresence({
			game: { 
					name: `${memberCount} users on ${botGame}.`,
					type: `WATCHING`
			},
			status: `dnd`
	});
}

//Refresh Activity on Member Event
client.on(`guildMemberAdd`, async () => refreshActivity());
client.on(`guildMemberRemove`, async () => refreshActivity());

//Send Message on Member Event
client.on(`guildMemberAdd`, member => bus.emit(`guildMemberAdd`, member));
client.on(`guildMemberRemove`, member => bus.emit(`guildMemberRemove`, member));
client.on(`guildCreate`, guild => bus.emit(`guildCreate`, guild));
client.on(`guildRemove`, guild => bus.emit(`guildRemove`, guild));

client.on(`message`, async message => {
	/* Botception & Message Handling */
	if(message.author.bot || message.channel.type == `dm`) return;
	if(message.content.slice(0, config.prefix.length) != config.prefix) return;

	/* Get Commands & Arguments */
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

  /* More Message Handling */
  if(message.guild.id == `641766195019644989` && message.channel.name.slice(0, 6) != `mining`) return message.delete();

  /* Command Shortcuts */
  if(command == `c`) client.commands.get(`chop`).run(client, message, args);
  if(command == `m`) client.commands.get(`mine`).run(client, message, args);
  if(command == `cd`) client.commands.get(`cooldown`).run(client, message, args);
  else {
    let cmd = client.commands.get(command);
	  if(cmd) cmd.run(client, message, args);
  }
});

client.login(config.token);