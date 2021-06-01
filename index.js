//index

const express = require('express');
const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT)

const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const config = require('./config.json');
let token = config.token;
const db = require('quick.db');

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync(`./comandos/`);

['command', 'event'].forEach(x => require(`./handlers/${x}`)(client));



//level
client.on('message', message => {
	if (message.author.bot) return;
	if (!message.guild) return;
	let user = message.author;
	let level = db.get(`lvls_${message.guild.id}-${user.id}`) || 0;

	var xps = db.get(`xxps_${message.guild.id}-${user.id}`) || 0;

	let add = Math.floor(Math.random() * 1) + 2;
	db.add(`xxps_${message.guild.id}-${user.id}`, add);

	let xpneeded = level * 100;

	if (xpneeded < xps) {
		db.add(`lvls_${message.guild.id}-${user.id}`, 1);
		db.subtract(`xxps_${message.guild.id}-${user.id}`, xpneeded);

		let canal = message.guild.channels.cache.get(
			db.get(`lvlC_${message.guild.id}`)
		);
		if (canal) {
			let msg2 =
				db.get(`lvlM_${message.guild.id}`) ||
				`**Level Up ${user.username} Upou para o nivel ${level}[${xps}]**`;
			canal.send(
				msg2
					.replace('{member:mention}', `${user}`)
					.replace('{member:username}', `${user.username}`)
					.replace('{member:level}', `${level}`)
					.replace('{member:xp}', `${xps}`)
			);
		} else {
			return;
		}
	}
});


//menção 

client.on ("message", message =>
 {


let prefix = db.get(`${message.guild.id}.prefix`) || "°";

if(message.author.bot) return;

if(message.content == `<@!${client.user.id}>`  || message.content == `<@${client.user.id}>`) return message.channel.send(`> *Por que me mencionou?*`)
});

 




//index test

client.config = config;
client.queue = new Map()




//t kkkk




client.login(token) 