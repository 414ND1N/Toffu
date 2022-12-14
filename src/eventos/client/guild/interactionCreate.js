module.exports = async(client, interaction) => {
    if(!interaction.guild || !interaction.channel) return;

    const COMANDO = client.slashCommands.get(interaction?.commandName);

    if(COMANDO){
        if(COMANDO.OWNER) {
            const DUENOS = process.env.OWNER_IDS.split(" ");
            if (!DUENOS.include(interaction.user.id)) return interaction.reply({content: `โ **Solo los dueรฑos del bot pueden ejecutar este comando! ๐คจ**\nFirma ${DUENOS.map(DUENO => `<@${DUENO}>`).join(", ")}`})

        }

        if(COMANDO.BOT_PERMISSIONS) {
            if (!interaction.guild.members.me.permissions.has(COMANDO.BOT_PERMISSIONS)) return interaction.reply({content: `โ **Necesito los siguientes permisos para ejecutar este comando ๐ :**\n${COMANDO.BOT_PERMISSIONS.map(PERMISO => `\`${PERMISO}\``).join(", ")}`})

        }

        if(COMANDO.PERMISSIONS) {
            if (!interaction.members.permissions.has(COMANDO.PERMISSIONS)) return interaction.reply({content: `โ **Necesitas los siguientes permisos para ejecutar este comando  :**\n${COMANDO.PERMISSIONS.map(PERMISO => `\`${PERMISO}\``).join(", ")}`})

        }

        try{
            COMANDO.execute(client, interaction, "/");
        }catch (e){
            interaction.reply({content: `**Ha ocurrido un error al ejecutar el comando!**\n*Mira la consola para mas detalle ๐*`});
            console.log(e)
            return;
        }

    }

}