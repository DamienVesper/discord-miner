const DiscordBot = require(`./discord-bot/index.js`);

const fs = require(`fs`);
const express = require(`express`);
const app = express();

app.get(`/`, (req, res) => {
  fs.readFile(`./site/index.html`, `utf-8`, (err, data) => {
    if(err) console.log(err);
    res.send(data);
  });
});
app.get(`/invite`, (req, res) => {
  res.send(`<script> window.location.href = "https://discordapp.com/oauth2/authorize?client_id=${process.env.DISCORD_BOT_ID}&permissions=321600&scope=bot"; </script>`);
});
app.get(`/support`, (req, res) => {
  res.send(`<script> window.location.href = "https://discord.gg/${process.env.DISCORD_SERVER_INVITE}"; </script>`);
});
app.get(`/authorize`, (req, res) => {
  res.send(`<script> window.location.href = "https://discordapp.com/oauth2/authorize?client_id=${process.env.DISCORD_BOT_ID}&redirect_uri=https%3A%2F%2Fdisc-miner.glitch.me&response_type=code&scope=identify%20email"; </script>`);
});
const serverListener = app.listen(process.env.NODE_SERVER_PORT, () => console.log(`Server is running on port ${process.env.NODE_SERVER_PORT}`));