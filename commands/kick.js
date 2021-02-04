module.exports = async (client, message, args) => {

    let member = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(err=>{})
    let reason = args.slice(1).join(' ') || "No reason provided"
    let casecreate = await client.functions.createCase(client, guild, member, message.author.tag, "kick", reason)
    let id = casecreate.id
    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("I don't have permission to kick members!")
    if(!member) return message.channel.send("You didn't give a person to kick")
    member.kick(`Kicked by ${message.author.tag} | ${reason||"No reason provided"}`).then(()=>{
        let embed = new client.disc.MessageEmbed()
        .setColor(client.color)
        .setFooter(client.footer)
        .setTitle('Member has been kicked')
        .addField('Moderator', message.author.tag)
        .addField('Kicked person', member.user.tag)
        .addField('Reason', reason||"No reason provided")
    message.channel.send(embed)
    }).catch(err=>{
        embed = new client.disc.MessageEmbed()
        .setTitle("An error occured!")
        .setDescription(err)
        .setFooter(client.footer)
        .setColor('#ff0000')
        message.channel.send(embed)
    })
        
    }
    
    module.exports.help = {
        name: "kick",
        description: "Kick an user in your guild.",
        category: "Moderation", // Tools, Moderation, 4fun, dev
        perm: "admin" // user, admin, mod, tester, dev
    }