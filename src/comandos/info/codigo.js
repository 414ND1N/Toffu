const {EmbedBuilder} = require('discord.js')
module.exports = {
    ALIASES: ["code"],
    DESCRIPTION: "Muestra el repositorio de mi código ☺",
    async execute(client, message, args, prefix){
        return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(process.env.COLOR)
                    .setDescription('Puedes encontrar mi código fuente en:\n https://github.com/414ND1N/Toffu.git')
                    .setThumbnail('https://i.imgur.com/zMV9yIP.png')
            ]
        })
    }
}
