module.exports = async (client, message, args) => {
let user =  message.mentions.users.first() || await client.users.fetch(args[0]).catch(err=>{})
let reason = args.slice(1).join(" ") || "No reason provided.";
    if (!user) return message.channel.send("You need to specify an user!")
    // console.log(user)
let casecreate = await client.functions.createCase(client, message.guild, user.tag, message.author.tag, "ban", reason);
    client.db.table("Case").insert(casecreate).run(client.conn);
try {
    message.guild.members.ban(user, {reason: reason})
}
catch(e) {
    let error = new client.disc.MessageEmbed()
        .setTitle("An error occured while running the command!")
        .setDescription("Check if the bot has required permissions to ban this user")
        .setColor(client.color)
        .setFooter(client.footer)
    message.channel.send(error)
}
let banembed = new client.disc.MessageEmbed()
.setColor(client.color)
.setFooter(client.setFooter)
.setTitle("Ban")
.addField("Banned:", user.tag)
.addField("Banned by:", message.author.tag)
.addField("Reason:", reason);
message.channel.send(banembed)
    client.db.table("Case").insert(casecreate).run(client.conn);
}

module.exports.help = {
    name: "ban",
    description: "Ban an user in your guild.",
    category: "Moderation", // Tools, Moderation, 4fun, dev
    perm: "admin" // user, admin, mod, tester, dev
}