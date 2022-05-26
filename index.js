const app = require("express")()

app.get(`/`, (req, res) => {
  res.send("Hello World")
})

app.listen(3000, () => {
})
const Database = require("@replit/database");
const db = new Database()
const Discord = require("discord.js");
const client = new Discord.Client();
const ms = require(`ms`)
const prefix = "-"



client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`)
})







//Message Event
client.on("message", async message => {


//balance 
  if (message.content.toLowerCase().startsWith(prefix + "bal") || message.content.toLowerCase().startsWith(prefix + "balance")) {
    let Coins = await db.get(`coins_${message.author.id}`);
    if (Coins === null) Coins = 0
    let embed = new Discord.MessageEmbed()
      .setTitle(`${message.author.username}'s Balance`)
      .setColor("#05fff7")
      .setDescription(`Coins: ${Coins}`)
      .setTimestamp()
    message.channel.send(embed)
  }
  //daily
  
  if (message.content.toLowerCase().startsWith(prefix + "daily")) {

    let Coins = await db.get(`coins_${message.author.id}`);
    if (Coins === null) Coins = 0
    let timeout = 8.64e+7;
    let dailycheck = await db.get(`dailycheck_${message.author.id}`)
    let timeLeft = ms(timeout - (Date.now() - dailycheck))
 
    if (dailycheck !== null && timeout - (Date.now() - dailycheck) > 0) return message.channel.send(`Please wait ${timeLeft} to use this command again!`)


    let embed = new Discord.MessageEmbed()
      .setColor("#05fff7")
      .setDescription(`You Claimed Your daily reward and got 50 coins`)
      .setTimestamp()
    message.channel.send(embed)
    await db.set(`coins_${message.author.id}`, Coins + 50)
    await db.set(`dailycheck_${message.author.id}`, Date.now())
  }

}) //end of message event




client.login(process.env.token)