module.exports = (client, message, args) => {
    let cmds = Array.from(client.cmds.values())
    let fun = cmds.filter(cmd => cmd.help.category === "4fun").map(c => `${c.help.name} - ${c.help.description}`).join(` \n`) || "None"
    let tools = cmds.filter(cmd => cmd.help.category === "Tools").map(c => `${c.help.name} - ${c.help.description}`).join(` \n`) || "None"
    let moderation = cmds.filter(cmd => cmd.help.category === "admin").map(c => `${c.help.name} - ${c.help.description}`).join(` \n`) || "None"
    let dev = cmds.filter(cmd => cmd.help.category === "dev").map(c => `${c.help.name} - ${c.help.description}`).join(` \n`)  || "None"
    
    let embed = new client.disc.MessageEmbed()
        .setTitle("Alcan")
        .setDescription("All categories:")
        .addField("4Fun", `\`\`\`${message.guild.settings.prefix}help 4fun\`\`\``)
        .addField("Tools", `\`\`\`${message.guild.settings.prefix}help tools\`\`\``)
        .addField("Moderation", `\`\`\`${message.guild.settings.prefix}help mod\`\`\``)
        .setFooter(client.footer)
        .setColor(client.color);
    let funembed = new client.disc.MessageEmbed()
        .setTitle("4Fun")
        .setDescription(fun)
        .setFooter(client.footer)
        .setColor(client.color);
    
    let toolsembed = new client.disc.MessageEmbed()
        .setTitle("Tools")
        .setDescription(tools)
        .setFooter(client.footer)
        .setColor(client.color);
    
    let modembed = new client.disc.MessageEmbed()
        .setTitle("Moderation")
        .setDescription(moderation)
        .setFooter(client.footer)
        .setColor(client.color);
    
    
    let devembed = new client.disc.MessageEmbed()
        .setTitle("Developer Tools")
        .setDescription(dev)
        .setFooter(client.footer)
        .setColor(client.color);
    
    
    if (!args[0]) {
        message.channel.send(embed)
        return;
    }
    
    
    
    switch (args[0].toLowerCase()) {
        case "4fun":
            message.channel.send(funembed)
            break;
        
            case "tools":
                message.channel.send(toolsembed)
            break;
        
            case "mod":
                message.channel.send(modembed)
            break;
            case "dev":
                message.channel.send(devembed)
                break;
        
}
}

module.exports.help = {
    name: "help",
    description: "All commands listed!",
    category: "Tools",
    perm: "user"
}
