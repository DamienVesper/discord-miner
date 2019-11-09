const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {
  store.read(`users/${message.author.id}`).then(data => {
    if(data) return message.channel.send(`${message.author} You already have an account!`);
    store.write(`users/${message.author.id}`, {
      "tools": {
        "sword": {
          "type": "wood",
          "enchantments": {
            "efficiency": 0,
            "fortune": 0,
            "unbreaking": 0
          }
        },
        "pickaxe": {
          "type": "wood",
          "enchantments": {
            "efficiency": 0,
            "fortune": 0,
            "unbreaking": 0
          }
        },
        "shovel": {
          "type": "wood",
          "enchantments": {
            "efficiency": 0,
            "fortune": 0,
            "unbreaking": 0
          }
        },
        "axe": {
          "type": "wood",
          "enchantments": {
            "efficiency": 0,
            "fortune": 0,
            "unbreaking": 0
          }
        },
        "hoe": {
          "type": "wood",
          "enchantments": {
            "efficiency": 0,
            "fortune": 0,
            "unbreaking": 0
          }
        },
      },
      "cooldowns": {
        "mine": 0,
        "chop": 0,
        "daily": 0,
        "dig": 0
      },
      "materials": {
        "buildingBlocks": {
          "oakLog": 0,
          "spurceLog": 0,
          "darkOakLog": 0,
          "acaciaLog": 0,
          "jungleLog": 0,
          "birchLog": 0,
          "stone": 0,
          "dirt": 0
        },
        "ores": {
          "redstone": 0,
          "lapis": 0,
          "diamond": 0,
          "gold": 0,
          "iron": 0,
          "coal": 0
        }
      },
      "banned": false
    });
  });
  
  message.channel.send(`You have received your <:WoodPick:642139596779683861> and your <:WoodAxe:642139596557254656>. Happy mining!`);
}

module.exports.config = {
  name: `start`
}