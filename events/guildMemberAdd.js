module.exports = async (client, member) => {
    let settings = await client.db.table('ServerSettings').get(member.guild.id).run(client.conn)
    if(!settings.wenabled) return
    let text = settings.wtext
    .replaceAll('{mention}', member.user)
    .replaceAll('{nick}', member.user.username)
    .replaceAll('{username}', member.user.tag)
    .replaceAll('{memberCount}', member.guild.memberCount)
    .replaceAll('{serverName}', member.guild.name)
    let embed = new client.disc.MessageEmbed()
    .setTitle('Welcome')
    .setAuthor(member.user.tag, member.user.displayAvatarURL({dynamic: true}))
    .setDescription(text)
    .setFooter(client.footer)
    .setColor(client.color)
    client.channels.cache.get(settings.wchannel).send(embed)
}