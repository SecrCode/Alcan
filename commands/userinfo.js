const dayjs = require('dayjs')
module.exports = async (client, message, args) => {

    let user = message.mentions.users.first() || await client.users.fetch(args[0]).catch(err=>{}) || message.author
    let member = await message.guild.members.fetch(args[0]).catch(err=>{})
    let embed = new client.disc.MessageEmbed()
    .setTitle('Userinfo')
    .setColor(client.color)
    .setFooter(client.footer)
    .setThumbnail(user.displayAvatarURL({dymamic: true}))
    .setDescription(`${user.tag}`)
    if(member.nickname) embed.addField("Nickname", member.nickname);
    embed.addField('Account created at', dayjs(user.createdTimestamp));
    if(member) embed.addField('Joined at', dayjs(member.joinedTimestamp));
    message.channel.send(embed)
    }
    
    module.exports.help = {
        name: "userinfo",
        aliases: ["ui"],
        description: "Info about  an user.",
        category: "Tools", // Tools, Moderation, 4fun, dev
        perm: "user" // user, admin, mod, tester, dev
    }