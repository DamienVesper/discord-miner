const DiscordBot = require(`./discord-bot/index.js`);

const express = require(`express`);
const app = express();

app.get(`/`, (req, res) => {
  res.send(`Initialize bot server.`);
});

const serverListener = app.listen(process.env.NODE_SERVER_PORT, () => console.log(`Server is running on port ${process.env.NODE_SERVER_PORT}`));