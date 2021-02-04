module.exports.checkPerms = function (client, user, guild) {
    perms = new Array()
    perms.push("user")
    if (client.config.developer.includes(user.user.id)) perms.push("dev")
    if (client.config.tester.includes(user.user.id)) perms.push("tester")
    if (user.hasPermission("ADMINISTRATOR")) perms.push("admin")
    if (user.hasPermission("MANAGE_MESSAGES")) perms.push("moderator")
    return perms;
}

module.exports.clean = async (client, text) => {
    if (text && text.constructor.name == "Promise") text = await text;
    if (typeof text !== "string")
      text = require("util").inspect(text, { depth: 1 });
  
    text = text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203))
      .replaceAll(
        client.token,
        "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0"
      );
  
    
    
    return text;
    
  };

module.exports.createCase = async function (client, guild, user, creator, type, dscp) {
  let values = await client.db.table("Case").filter({ id: guild.id }).orderBy(client.db.desc("nr")).filter(1).run(client.conn)
  if (values[0] && values[0].nr) nr1 = values[0].nr
else nr1 = "1"
  let obj = { nr: nr1, id: guild.id, user: user.tag, creator: creator, type: type, dscp: dscp }
  return obj;
}

module.exports.requireUncached = function(module) {
    delete require.cache[require.resolve(module)];
    return require(module);
}
