const Discord = require("discord.js");
require("dotenv").config();

const express = require("express");
const app = express();

app.listen(process.env.PORT || 3000);

const client = new Discord.Client();

var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression);

client.on("message", (message) => {
  if (message.author.bot) return;
  const args = message.content.split(" ");
  const command = args.shift().toLowerCase();

  // TODO SELECT CHANNEL
  const regex = /\link/g;

  if (message.channel.name.match(regex) || message.channel.name === "botzada") {
    console.table({
      "Author:": message.author.username,
      "Mensagem enviada:": message.content,
    });

    if (command.match(regex)) {
      console.log("Successful match");
    } else {
      console.log("No match");
      message.delete();
    }
  }
});

client.login(process.env.BOT_TOKEN);
