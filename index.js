let discord = require("discord.js-light")
let fs = require("fs")
let r = require('rethinkdb')
let Statcord = require("statcord.js")
let client = new discord.Client({
    cacheGuilds: true,
    cacheChannels: false,
    cacheOverwrites: false,
    cacheRoles: false,
    cacheEmojis: false,
    cachePresences: false
})
client.config = require("./config.json")
const statcord = new Statcord.Client({
    client,    key: client.config.statcord,
    postCpuStatistics: true, /* Whether to post memory statistics or not, defaults to true */
    postMemStatistics: true, /* Whether to post memory statistics or not, defaults to true */
    postNetworkStatistics: true, /* Whether to post memory statistics or not, defaults to true */
});
client.disc = discord;
client.cmds = new Map();
client.aliases = new Map();
client.statcord = statcord
client.color = "#6600ff";
client.version = "1.0.0";
client.footer = `Alcan ${client.version}`;
client.functions = require('./functions.js')
client.on("ready", function() {
    client.channels.fetch('806900774105251860');
    console.log("Gotowy")
    statcord.autopost()
})

// baza danych
client.db = r
r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
    if (err) throw err;
    client.conn = conn;
    console.log('Połączono z bazą danych')
})
// commands handler
let commands = fs.readdirSync("./commands")
commands.forEach(function (cmd) {
    try {
        code = require(`./commands/${cmd}`)
        cmdname = cmd.split(".")[0]
        client.cmds.set(cmdname, code)
        // aliasy
        code.help.aliases.forEach(function(alias){
            client.aliases.set(alias, cmdname)
        })
    }
    catch (e) {
        console.error(e)
    }
})

// events handler
let events = fs.readdirSync("./events")
events.forEach(function (evt) {
    try {
        let code = require(`./events/${evt}`)   
        let evtname = evt.split(".")[0]
        client.on(evtname, code.bind(null, client))
    }
    catch (e) {
        console.error(e)
    }
})
// error handler
process.on("unhandledRejection", err => {
    console.error(`Unhandled rejection: ${err}`);
    client.channels.cache.get('806900774105251860').send(`Błąd: \n\`\`\`${err.stack}\`\`\``)
  }); 
client.login(client.config.token)

statcord.on("post", status => {
    // status = false if the post was successful
    // status = "Error message" or status = Error if there was an error
    if (!status) console.log("Successful post");
    else console.error(status);
});
