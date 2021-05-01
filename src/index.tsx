const express = require("express");
const Discord = require("discord.js");
require("dotenv").config();

const app = express();

app.listen(process.env.PORT || 3000);

const client = new Discord.Client();
const prefix = "!";

const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gim;
const regex = new RegExp(expression);

client.once("ready", () => {
  console.log("\x1b[42m\x1b[30m", "Ready!", "\x1b[40m\x1b[37m");
});

client.on("message", (message) => {
  if (message.author.bot) return;
  const args = message.content.split(/ +/);
  const command = args.shift().toLowerCase();

  // LIST ALL CHANNELS:
  console.log(message.guild.channels.cache.map((i) => i.name));
  console.log(
    message.guild.channels.cache.map((i) =>
      i.permissionOverwrites.map((p) => p)
    )
  );

  if (command === `${prefix}servers`) {
    return message.channel.send("Carregando listagem...");
  }

  // TODO SELECT CHANNEL
  const channelRegex = /\link/g;
  if (
    message.channel.name.match(channelRegex) ||
    message.channel.name === "botzada"
  ) {
    console.table({
      "Author:": `${message.author.username}#${message.author.discriminator}`,
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
