module.exports = async (client, message, args) => {
    let embed = new client.disc.MessageEmbed()
    .setTitle('Ping')
    .setColor(client.color)
    .setFooter(client.footer)
    .setDescription("Pong")
    .addField('My ping is', client.ws.ping+'ms')
    message.channel.send(embed)
    }
    
    module.exports.help = {
        name: "ping",
        description: "Check bot ping",
        category: "Tools", // Tools, Moderation, 4fun, dev
        perm: "user" // user, admin, mod, tester, dev
    }