const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
const sellItems = require(`../databases/sellItems.json`);
const cooldowns = require(`../databases/cooldowns.json`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {
  try {
    store.read(`users/${message.author.id}`).then(data => {
      if(!data.cooldowns.sell) return store.write(`users/${message.author.id}/cooldowns/sell`, new Date());
      if(new Date() - new Date(data.cooldowns.sell) >= cooldowns.sell) {
        let sellItem = args[0];
        if(sellItem) sellItem = sellItem.toString().toLowerCase();
        if(!sellItem) return message.channel.send(`${message.author} You must specify what to sell!`);
        if(sellItems[sellItem] || sellItem == `all`) {
          if(sellItem == `all`) {
            let totalSell = 
                data.materials.buildingBlocks.oakLog * sellItems.oak +
                data.materials.buildingBlocks.birchLog * sellItems.birch +
                data.materials.buildingBlocks.spruceLog * sellItems.spruce +
                data.materials.buildingBlocks.darkOakLog * sellItems.darkOak +
                data.materials.buildingBlocks.acaciaLog * sellItems.acacia +
                data.materials.buildingBlocks.stone * sellItems.stone +

                data.materials.ores.coal * sellItems.coal + 
                data.materials.ores.iron * sellItems.iron + 
                data.materials.ores.gold * sellItems.gold + 
                data.materials.ores.diamond * sellItems.diamond;

            store.read(`users/${message.author.id}/money`).then(xData => {
                if(xData == null) store.write(`users/${message.author.id}/money`, totalSell);
                else if(xData.toString().slice(0, 15) == `[object Object]`) store.write(`users/${message.author.id}/money`, parseInt(xData.toString().slice(15)) + totalSell);
                else store.write(`users/${message.author.id}/money`, xData + totalSell);

              store.write(`users/${message.author.id}/materials/buildingBlocks/oakLog`, 0);
              store.write(`users/${message.author.id}/materials/buildingBlocks/spruceLog`, 0);
              store.write(`users/${message.author.id}/materials/buildingBlocks/acaciaLog`, 0);
              store.write(`users/${message.author.id}/materials/buildingBlocks/birchLog`, 0);
              store.write(`users/${message.author.id}/materials/buildingBlocks/darkOakLog`, 0);
              store.write(`users/${message.author.id}/materials/buildingBlocks/stone`, 0);

              store.write(`users/${message.author.id}/materials/ores/coal`, 0);
              store.write(`users/${message.author.id}/materials/ores/iron`, 0);
              store.write(`users/${message.author.id}/materials/ores/gold`, 0);
              store.write(`users/${message.author.id}/materials/ores/diamond`, 0);

              let sEmbed = new Discord.RichEmbed()
                .setAuthor(message.author.username, message.author.avatarURL)
                .setDescription(`You sold everything for $**${totalSell}**!`)
                .setTimestamp(new Date())
                .setFooter(config.footer);
              message.channel.send(sEmbed);
            });
          }
          else {
            let sellTotal;
            switch(sellItem) {
              case `acacia`: sellTotal = data.materials.buildingBlocks.acaciaLog; break;
              case `darkoak`: sellTotal = data.materials.buildingBlocks.darkOakLog; break;
              case `spruce`: sellTotal = data.materials.buildingBlocks.spruceLog; break;
              case `birch`: sellTotal = data.materials.buildingBlocks.birchLog; break;
              case `oak`: sellTotal = data.materials.buildingBlocks.oakLog; break;
              case `stone`: sellTotal = data.materials.buildingBlocks.stone; break;
              case `coal`: sellTotal = data.materials.ores.coal; break;
              case `iron`: sellTotal = data.materials.ores.iron; break;
              case `gold`: sellTotal = data.materials.ores.gold; break;
              case `diamond`: sellTotal = data.materials.ores.diamond; break;
              case `redstone`: sellTotal = data.materials.ores.redstone; break;
              case `lapis`: sellTotal = data.materials.ores.lapis; break;
              case `emerald`: sellTotal = data.materials.ores.emerald; break;
              default: return;
            }

            if(sellItem == `emerald` || sellItem == `lapis` || sellItem == `redstone` || sellItem == `diamond` || sellItem == `gold` || sellItem == `iron` || sellItem == `coal`) store.write(`users/${message.author.id}/materials/ores/${sellItem}`, 0);
            else if(sellItem == `acacia` || sellItem == `darkoak` || sellItem == `spruce` || sellItem == `birch` || sellItem == `oak`) store.write(`users/${message.author.id}/materials/buildingBlocks/${sellItem}Log`, 0);
            else if(sellItem == `stone`) store.write(`users/${message.author.id}/materials/buildingBlocks/stone`, 0);
            else return message.channel.send(`${message.author} That is an invalid item to sell!`);
            sellTotal *= sellItems[sellItem];
              
            store.read(`users/${message.author.id}/money`).then(xData => {
                if(xData == null) store.write(`users/${message.author.id}/money`, sellTotal);
                else if(xData.toString().slice(0, 15) == `[object Object]`) store.write(`users/${message.author.id}/money`, parseInt(xData.toString().slice(15)) + sellTotal);
                else store.write(`users/${message.author.id}/money`, xData + sellTotal);
            });
            let sEmbed = new Discord.RichEmbed()
              .setAuthor(message.author.username, message.author.avatarURL)
              .setDescription(`You sold *${sellItem}* for $**${sellTotal}**!`)
              .setTimestamp(new Date())
              .setFooter(config.footer);
            message.channel.send(sEmbed);
        }
        if(message.author.id != config.developerID) return store.write(`users/${message.author.id}/cooldowns/sell`, new Date());
        }
      }
      else {
        let xEmbed = new Discord.RichEmbed()
          .setAuthor(message.author.username, message.author.avatarURL)
          .setDescription(`You must wait \`${(cooldowns.sell + (new Date(data.cooldowns.sell) - new Date())) / 1000}\` seconds before you can sell items again!`)
          .setFooter(config.footer);
        return message.channel.send(xEmbed);
      }
    });
  } catch(err) { console.log(err); }
}

module.exports.config = {
  name: `sell`
}