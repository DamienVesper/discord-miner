const DiscordBot = require(`./discord-bot/shardManager.js`);

const fs = require(`fs`);
const express = require(`express`);
const app = express();

//Pages
app.get(`/`, (req, res) => fs.readFile(`./site/index.html`, `utf-8`, (err, data) => res.send(data)));
app.get(`/about`, (req, res) => fs.readFile(`./site/about.html`, `utf-8`, (err, data) => res.send(data)));
app.get(`/documentation`, (req, res) => fs.readFile(`./site/documentation.html`, `utf-8`, (err, data) => res.send(data)));

//Redirects
app.get(`/invite`, (req, res) => res.send(`<script> window.location.href = "https://discordapp.com/oauth2/authorize?client_id=${process.env.DISCORD_BOT_ID}&permissions=321600&scope=bot"; </script>`));
app.get(`/upvote`, (req, res) => res.send(`<script> window.location.href = "https://top.gg/bot/${process.env.DISCORD_BOT_ID}/vote"; </script>`));
app.get(`/support`, (req, res) => res.send(`<script> window.location.href = "https://discord.gg/${process.env.DISCORD_SERVER_INVITE}"; </script>`));
app.get(`/authorize`, (req, res) => res.send(`<script> window.location.href = "https://discordapp.com/oauth2/authorize?client_id=${process.env.DISCORD_BOT_ID}&redirect_uri=https%3A%2F%2Fdisc-miner.glitch.me&response_type=code&scope=identify%20email"; </script>`));

//Initialize app
const serverListener = app.listen(process.env.NODE_SERVER_PORT, () => console.log(`Your app is running on port ${serverListener.address().port}`));