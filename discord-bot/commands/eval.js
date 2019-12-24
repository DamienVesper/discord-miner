const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {
  try {
    if(message.author.id != config.developerID) return message.channel.send(`${message.author} You can't use that!`);

    const clean = text => {
      if(typeof(text) == `string`) return text.replace(/`/g, `\`` + String.fromCharCode(8203)).replace(/@/g, `@` + String.fromCharCode(8203));
      else return text;
    }  
    try {
      const code = args.join(` `);
      let evaled = eval(code);

      if (typeof evaled !== `string`) evaled = require(`util`).inspect(evaled);

      message.channel.send(clean(evaled), { code: `xl` }).catch(err => message.channel.send(`${message.author} Failed to send evaled code.`));
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  } catch(err) { console.log(err); }
}

module.exports.config = {
  name: `eval`
}