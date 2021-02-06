module.exports = async (client, message, args) => {
    const save = (toSave, value) => {
        client.db.table('ServerSettings').filter(client.db.row('id').eq(message.guild.id)).update({[toSave]: value}).run(client.conn)
    }
    const settings = await client.db.table('ServerSettings').get(message.guild.id).run(client.conn)
    
    let what = false;
    let channel;
    let embed;
    switch (args[0]) { 
    case '1':
        if(!args[1]) return message.reply(`You didn't specify what to set to`)
            embed = new client.disc.MessageEmbed()
                .setTitle('Prefix changed')
                .setDescription(`From ${settings.prefix || "None"} to ${args[1]}`)
                .setFooter(client.footer)
                .setColor(client.color);
        save('prefix', args[1])
        message.channel.send(embed)
        break;
    case '2':
        if(!args[1]) return message.reply(`You didn't specify what to set to`)
        channel = message.mentions.channels.first() || client.channels.cache.get(args[0])
        if(!channel) return message.reply('You gave the wrong channel')
            embed = new client.disc.MessageEmbed()
                .setTitle('Welcome channel changed')
                .setDescription(`From ${client.channels.cache.get(settings.wchannel) || "None"} to ${channel}`)
                .setFooter(client.footer)
                .setColor(client.color);
        save('wchannel', args[1])
        message.channel.send(embed)
        break;
    case '3':
        if(!args[1]) return message.reply(`You didn't specify what to set to`)
        channel = message.mentions.channels.first() || client.channels.cache.get(args[0])
        if(!channel) return message.reply('You gave the wrong channel')
            embed = new client.disc.MessageEmbed()
                .setTitle('Goodbye channel changed')
                .setDescription(`From ${client.channels.cache.get(settings.gchannel) || "None"} to ${channel}`)
                .setFooter(client.footer)
                .setColor(client.color);
        save('gchannel', args[1])
        message.channel.send(embed)
        break;
    case '4':
        if(!args[1]) return message.reply(`You didn't specify what to set to`)
            embed = new client.disc.MessageEmbed()
                .setTitle('Welcome text changed')
                .setDescription(`From ${settings.wtext || "None"} to ${args[1]}`)
                .setFooter(client.footer)
                .setColor(client.color);
        save('wtext', args[1])
        message.channel.send(embed)
        break;
        case '5':
            
        if(!args[1]) return message.reply(`You didn't specify what to set to`)
            embed = new client.disc.MessageEmbed()
                .setTitle('Goodbye text changed')
                .setDescription(`From ${settings.gtext || "None"} to ${args[1]}`)
                .setFooter(client.footer)
                .setColor(client.color);
        save('gtext', args[1])
        message.channel.send(embed)
        break;
    case '6':
        if(settings.wenabled) what = true;
        if(!settings.wenabled) what = false;
            embed = new client.disc.MessageEmbed()
                .setTitle('Welcome status changed')
                .setDescription(`From ${settings.wenabled ? "enabled" : "disabled"} to ${what ? "enabled" : "disabled"}`)
                .setFooter(client.footer)
                .setColor(client.color);
            save('wenabled', what)
        message.channel.send(embed)
        break;
    case '7':
        if(settings.wenabled) what = true;
        if(!settings.wenabled) what = false;
            embed = new client.disc.MessageEmbed()
                .setTitle('Goodbye status changed')
                .setDescription(`From ${settings.genabled ? "enabled" : "disabled"} to ${what ? "enabled" : "disabled"}`)
                .setFooter(client.footer)
                .setColor(client.color);
            save('genabled', what)
        message.channel.send(embed)
        break;
        case '8':
            if (!args[1]) return message.reply("You didn't specify what to set to")
            embed = new client.disc.MessageEmbed()
                .setTitle("Guild language changed")
                .setDescription(`From ${settings.lang} to ${args[1]}`)
                .setFooter(client.footer)
                .setFooter(client.color)
            save('lang', args[1].toLowerCase())
            break;
    default:
            embed = new client.disc.MessageEmbed()
                .setTitle('Server settings')
                .setDescription('Set with a!config <number> <value>')
                .addField('Prefix - 1', settings.prefix || "a!")
                .addField('Welcome channel - 2', message.guild.channels.cache.get(settings.wchannel) || "None")
                .addField('Goodbye channel - 3', message.guild.channels.cache.get(settings.gchannel) || "None")
                .addField('Welcome text - 4', settings.wtext || "None")
                .addField('Goodbye text - 5', settings.gtext || "None")
                .addField('Welcome enabled - 6', settings.wenabled ? "Enabled" : "Disabled")
                .addField('Goodbye enabled - 7', settings.genabled ? "Enabled" : "Disabled")
                .setFooter(client.footer)
                .setColor(client.color);
            message.channel.send(embed)
}
}

module.exports.help = {
    name: "config",
    aliases: ["settings"],
    description: "Configure your server's settings!",
    category: "Tools",
    perm: "admin"
}