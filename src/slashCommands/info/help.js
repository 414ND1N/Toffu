const {SlashCommandBuilder, EmbedBuilder,} = require('discord.js')
const { ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');
module.exports = {
    CMD: new SlashCommandBuilder()
    .setDescription("Sirve para ver los comandos disponibles"),
    async execute(client, interaction, prefix){
        
        let btn_menu = new ButtonBuilder()
            .setCustomId('menu')
            .setLabel('Men煤')
            .setStyle(ButtonStyle.Danger)
            .setEmoji(`馃彔`);
        
        let btn_info =  new ButtonBuilder()
            .setCustomId('info')
            .setLabel('Informaci贸n')
            .setStyle(ButtonStyle.Primary)
            .setEmoji(`<:facts:1061057414876639292>`);

        let btn_music =  new ButtonBuilder()
            .setCustomId('music')
            .setLabel('M煤sica')
            .setStyle(ButtonStyle.Primary)
            .setEmoji(`<:rolas:1051012560054407219>`);

        let btn_var =  new ButtonBuilder()
            .setCustomId('var')
            .setLabel('Variedad')
            .setStyle(ButtonStyle.Primary)
            .setEmoji(`<:sus:1061064541179486218>`);

        const row = new ActionRowBuilder().addComponents(btn_menu,btn_info,btn_music,btn_var);    

        const embed_menu = new EmbedBuilder()
        .setTitle('Men煤')
        .setDescription(`Los comandos compatibles con **Toffu**, tanto con \`/\` o con \`tf.\``)
        .setColor(process.env.COLOR)
        .addFields(
            {name: `\`Informaci贸n\``, value: `Comandos que brindan informaci贸n del bot y/o servidor`},
            {name: `\`M煤sica\``, value: `Comandos para reproducir m煤sica en el canal de voz que te encuentres conectado`},
            {name: `\`Variedad\``, value: `Comandos para funci贸nes miscelaneo`}
        ) 
        .setThumbnail("https://i.imgur.com/WHCwA6t.gif");

        const embed_menu1 = new EmbedBuilder()
        .setTitle('Informaci贸n')
        .setDescription(`Comandos que brindan informaci贸n del bot y/o servidor`)
        .setColor(`#3a7c21`)
        .addFields(
            {name: `help`, value:`\`Sirve para ver el men煤 de ayuda con los comandos\``},
            {name: `ping`, value:`\`Sirve para ver el ping en ms de Toffu\``},
            {name: `pagina`, value:`\`Muestra el link de la pana p谩gina\``},
            {name: `codigo`, value:`\`Muestra el link del repositorio con el c贸digo de Toffu\``}
        ) 
        .setThumbnail(`https://i.imgur.com/Ud2cXN5.jpg`);

        const embed_menu2 = new EmbedBuilder()
        .setTitle('M煤sica')
        .setDescription(`Comandos para reproducir m煤sica en el canal de voz en el que te encuentres conectado`)
        .setColor(`#c72a2a`)
        .addFields(
            {name: `djpanas`, value:`\`Sirve para reproducir DJPANAS \`\n> Se puede elegir entre las distintas variaciones`},
            {name: `play`, value:`\`Sirve para reproducir una canci贸n dada \`\n> Admite links de Youtube, Spotify, Soundcloud o nombres`},
            {name: `pause`, value:`\`Sirve para pausar la m煤sica en reproducci贸n\``},
            {name: `skip`, value:`\`Sirve para saltar a la siguiente canci贸n en la lista de reproducci贸n\``},
            {name: `previous`, value:`\`Sirve para saltar a la canci贸n anterior en la lista de reproducci贸n\``},
            {name: `volume`, value:`\`Sirve para indicar el volumen de la canci贸n \`\n> Admite de 0% a 200%`},
            {name: `shuffle`, value:`\`Sirve para mezclar las canci贸nes de la lista\``},
            {name: `queue`, value:`\`Sirve para ver la lista de canciones \`\n> Muestra un men煤 con botones de navegaci贸n`},
            {name: `jump`, value:`\`Sirve para saltar a una canci贸n de la lista en reproducci贸n \`\n> El n煤mero de canci贸n se puede ver en la queue`},
            {name: `stop`, value:`\`Sirve para desconectar al bot de la sala de voz\``}
        ) 
        .setThumbnail(`https://i.imgur.com/GLPfwSa.jpg`);

        const embed_menu3 = new EmbedBuilder()
        .setTitle('Variedad')
        .setDescription(`Comandos para funci贸nes miscelaneo`)
        .setColor(`#0c6bc2`)
        .addFields(
            {name: `decir`, value:`\`Sirve para que Toffu diga el texto dado\``},
            {name: `elegir`, value:`\`Sirve para que Toffu eliga entre las opciones dadas \`\n> Las opciones se dan separadas por coma`},
            {name: `8ball`, value:`\`Sirve para que la bola 8 de una respuesta a una pregunta\``},
            {name: `sugerir`, value:`\`Sirve para dar una sugerencia para poder votar\``}
        ) 
        .setThumbnail(`https://i.imgur.com/s2lV0y5.png`);

        let embed_help = await interaction.channel.send({
            content: `**Navega con los _botones_ en el men煤**`,
            embeds: [embed_menu],
            components: [row]
        });

        await interaction.reply('<:dudas:1061075189347123271> Lista de comandos');

        const collector = embed_help.createMessageComponentCollector({time: 30e3});  
        
        collector.on("collect", async (i) => {
            if(i?.user.id != interaction.user.id){
                return await i.reply({content: `鉂? Solo quien uso el comando de queue puede navegar entre p谩ginas`, ephemeral: true});
            }
            switch (i?.customId){
                case 'menu':{
                    collector.resetTimer();
                    await i.update({embeds: [embed_menu], components:[row]})
                }
                    break;
                case 'info':{
                    collector.resetTimer();
                    await i.update({embeds: [embed_menu1], components:[row]})
                }
                    break;
                case 'music':{
                    collector.resetTimer();
                    await i.update({embeds: [embed_menu2], components:[row]})
                }
                    break;
                case 'var':{
                    collector.resetTimer();
                    await i.update({embeds: [embed_menu3], components:[row]})
                }
                    break;
                default:
                    break;
            }
        });
        collector.on("end", async () => {
            //desactivamos botones y editamos el mensaje
            embed_help.edit({content: "El tiempo ha expirado 鈴?, utiliza denuevo el comando help  馃槉", components:[], ephemeral: true}).catch(() => {});
            embed_help.suppressEmbeds(true);
            await interaction.deleteReply();
        });
    }
}