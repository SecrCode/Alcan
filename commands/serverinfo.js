const dayjs = require('dayjs')
module.exports = async (client, message, args) => {
    let embed = new client.disc.MessageEmbed()
    .setTitle('Userinfo')
    .setColor(client.color)
    .setFooter(client.footer)
    .setThumbnail(message.guild.iconURL({dymamic: true}))
    .setDescription(`${message.guild.name}`)
    .addField('Server created at', dayjs(message.guil.createdTimestamp))
    .addField('Owner', message.guild.owner.user.tag)
    .addField('Region', message.guild.region)
    .addField('Member count', message.guild.memberCount)
    .addField('Channels count', member.guild.channels.cache.size)
    .addField('Roles count', member.guild.roles.cache.size)
if(message.guild.vanityURLCode) embed.addField('Vanity invite URL', message.guild.vanityURLCode)
    message.channel.send(embed)
    }
    
    module.exports.help = {
        name: "serverinfo",
        description: "Info about server.",
        category: "Tools", // Tools, Moderation, 4fun, dev
        perm: "user" // user, admin, mod, tester, dev
    }