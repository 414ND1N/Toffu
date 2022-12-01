const {EmbedBuilder} = require('discord.js')
module.exports = {
    
    DESCRIPTION: "Sirve para que toffu diga el texto dicho",
    
    async execute(client, message, args, prefix){
        try{
            let argumento = args[0]?.toLowerCase()
            if (!argumento) return message.reply(`No hay mensaje que pueda decir, escribe algo 😊`);
            if (!argumento) {
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(process.env.COLOR)
                            .setDescription(`No hay mensaje que pueda decir, escribe algo 😊`)
                    ],
                    ephemeral: true
                })
            }
            message.reply(argumento)
            return;

        }catch(e){
            message.reply({content: `**Ha ocurrido un error al recargar el bot**\nMira la consola para mas detalle :P`});
            console.log(e);
            return;
        }
    }
} 