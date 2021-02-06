module.exports = async (client, message, args) => {

    let embed = new client.disc.MessageEmbed()
    .setTitle(args.join(' '))
    .setColor(client.color)
    .setFooter(client.footer)
    .setDescription(responses[Math.floor(Math.random() * responses.length)])
    message.channel.send(embed)
    }
    
    module.exports.help = {
        name: "8ball",
        aliases: [],
        description: "Ask bot",
        category: "4fun", // Tools, Moderation, 4fun, dev
        perm: "user" // user, admin, mod, tester, dev
    }
