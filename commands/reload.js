module.exports = (client, message, args) => {
    let start = Date.now();
    message.channel.send("Przeładowywanie komendy...")
    client.cmds.delete(args[0])

    try {
        code = client.functions.requireUncached(`./commands/${args}.js`)
    }

    catch {
        message.channel.send("Wystąpił błąd podczas wczytywania (Czy napewno istnieje taki plik?)")
    }

   client.cmds.set(args[0], code)
    let czas = Date.now() - start;
    message.channel.send(`Przeładowano komendę. Zajęło mi to ${czas}ms `)
}

module.exports.help = {
    name: "reload",
    description: "Reload a command!",
    category: "dev", // Tools, moderation, 4fun, dev
    perm: "dev" // user, admin, mod, tester, dev
}