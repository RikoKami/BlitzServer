const express = require("express");
const { Client, MessageEmbed } = require('discord.js');
require("dotenv").config();

const app = express();

app.listen(process.env.PORT || 3000);

const client = new Client();

// const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
const expression = /[A-Za-z]+:\/\/[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_:%&;\?\#\/.=]+/gmu;
const regex = new RegExp(expression);

client.once("ready", () => {
  console.log("\x1b[42m\x1b[30m", "Ready!", "\x1b[40m\x1b[37m");
});

client.on("message", async (message) => {
  if (message.author.bot) return;
  const args = message.content.split(/ +/);
  const command = args.shift().toLowerCase();

  const embedSuccess = new MessageEmbed()
  .setTitle("Sucesso")
  .setColor("#00A300")
  .addField("Link enviado!", true)
  

  const embedError = await new MessageEmbed()
  .setTitle("Erro")
  .setColor("#A30000")
  .addField("Este link não é um link", true)

  const regex = /\link/g;

  if (expression.test(message.channel.name.match) || message.channel.name === "botzada") {
    console.table({
      "Author:": message.author.username,
      "Mensagem enviada:": message.content,
    });

    if (command.match(regex)) {
      console.log("Successful match");
      return message.channel.send(embedSuccess);
    } else {
      console.log("Failed match");
      
      return message.channel.send(embedError).then(() => {}).catch(console.error);
      // message.delete();
    }
  }
});

client.login(process.env.BOT_TOKEN);
