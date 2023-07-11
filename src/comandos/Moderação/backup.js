const { MessageEmbed } = require('discord.js')
var mysqldump = require('mysqldump');
const { conexaodb, userdb, senhadb, db } = require("../../../config.json")
const colors = require('colors');
const data = new Date();

data.toLocaleString('pt-br', {timezone: 'Brazil/brt'})
const data2 = data.getUTCDate();
const mes = data.getUTCMonth() + 1;
const hora = data.getHours();
const minuto = data.getMinutes();
module.exports = {
    config: {
      nome: 'backup',
      aliases: ['backup'],
      descricao: 'Comando que faz o backup da DB.',
      utilizacao: '!whitelist',
      cooldown: 10
    },

  run: async (client, message, args) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Sem permissão')

   mysqldump(
        {
        connection: {
            host: conexaodb,
            user: userdb,
            password: senhadb,
            database: db,
        },
        dumpToFile: `backup-${data2}-${mes}.sql`,
    }
    );
    
console.log(colors.blue(`Backup de DB backup-${data2}-${mes}.sql criado com sucesso!`));

    const opa = new MessageEmbed()
    .addField("Aguarde!", "Devido ao excesso de tamanho do SQL, esse comando irá durar 10 segundos até o resultado final. Obrigado!")
    .setColor('RANDOM')
    .setTimestamp()
    message.channel.send(opa).then(i => i.delete({timeout: 10000}));
    setTimeout(Enviar, 10000);

function Enviar(){
  message.channel.send({
        embed:  new MessageEmbed()
          .setTitle('Backup de DB')
          .setColor('RANDOM')
          .setThumbnail('https://www.macworld.co.uk/cmsdata/features/3638150/setup_learn_sql_mac_thumb1200_4-3.jpg')
          .setTimestamp()
          .setDescription(`Backup da DB do dia ${data2}/${mes} - ${hora}:${minuto} criado com sucesso!`),
        files: [{
          attachment: `./backup-${data2}-${mes}.sql`,
          name: `./backup-${data2}-${mes}.sql`
        }]
      })
    }
  }
}