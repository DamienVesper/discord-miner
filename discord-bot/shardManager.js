// require(`dotenv`).config();
const { ShardingManager } = require(`discord.js`);
const shardManager = new ShardingManager(`./discord-bot/index.js`, { token: process.env.DISCORD_BOT_TOKEN });

shardManager.spawn();
shardManager.on(`launch`, shard => console.log(`Launched Shard: ${shard.id}.`));