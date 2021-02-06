module.exports = async (client, message) => {
    if (message.mentions.members.first()) await message.guild.members.fetch(message.mentions.members.first().id)
    let dayjs = require('dayjs');
    let duration = require('dayjs/plugin/duration');
    let relativeTime = require('dayjs/plugin/relativeTime');

    dayjs.extend(duration)
    dayjs.extend(relativeTime)

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let settings = await client.db.table('ServerSettings').get(message.guild.id).run(client.conn)

    let prefix =  settings.prefix || "a!"
    let args = message.content.slice(prefix.length). trim().split(/ +/g);

    let cmdname = args.shift().toLowerCase();

    message.guild.settings = settings;
    message.member.perms = client.functions.checkPerms(client, message.member, message.guild)

    let uptime = dayjs.duration(client.uptime).humanize();

    if (message.content === "<@!804027083642109964>") {
        let embed = new client.disc.MessageEmbed()
            .setTitle("Alcan")
            .setDescription(`Hi! I'm Alcan, a multi-functional Discord bot!\nMy prefix on this guild is ${prefix}`)
            .addField("Guilds", client.guilds.cache.size)
            .addField("Users", client.users.cache.size)
            .addField("Channels", client.channels.cache.size)
            .addField("Uptime", uptime||"?")
        message.channel.send(embed)
    }
    
    if (message.content.startsWith(prefix)) { // wtf
    let perm;
        let cmd = client.cmds.get(cmdname ) || client.cmds.get(client.aliases.get(cmdname))
        if (!cmd) return;

        let permsNeeded = cmd.help.perm
        switch (permsNeeded) {
            case "admin":
               perm = "Administrator"
                break;
            case "dev":
                perm = "Developer"
                break;
            case "moderator":
                perm = "Moderator"
                break;
            case "user":
                perm = "User"
                break;
            case "tester":
                perm = "Tester"
                break;
        }
        if (!message.member.perms.includes(permsNeeded)) {
            embed = new client.disc.MessageEmbed()
                .setTitle("You can't do that!")
                .setDescription(`You are missing following permission: ${perm}`)
                .setFooter(client.footer)
                .setColor(client.color)
            message.channel.send(embed)
            return;
        }
        
        cmd(client, message, args)
        if(cmd.help.category == "dev") return;
    client.statcord.postCommand(cmd.help.name, message.author.id)

    }
}
