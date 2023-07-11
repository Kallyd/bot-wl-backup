const colors = require('colors');
const { MessageEmbed } = require ('discord.js');
const { CategoryChannel, Message } = require('discord.js');
var mysqldump = require('mysqldump');
const data = new Date();

data.toLocaleString('pt-br', {timezone: 'Brazil/brt'})
const data2 = data.getUTCDate();
const mes = data.getUTCMonth() + 1;
const hora = data.getHours();
const minuto = data.getMinutes();

const mysql = require("mysql");
const { conexaodb, userdb, senhadb, db } = require("../../../config.json")

const connection = mysql.createPool({
connectionLimit : 10,
  host: conexaodb,
  user: userdb,
  password: senhadb,
  database: db
});
connection.getConnection(function(err, connection) {
  if (err) throw err;

  console.log(colors.green(`[Módulo MYSQL] Conectado com sucesso ao Host: ${conexaodb}, usuário: ${userdb} na database: ${db}`))
});



module.exports = async (client) => { 

  console.log(colors.green(`\n[CLIENT READY] Source HypeBot - ${client.user.tag} está ligado com sucesso!\nDetalhes: ${client.guilds.cache.size} servidor(es), ${client.users.cache.size} membros, e ${client.channels.cache.size} canais!\n`))


  console.log(colors.yellow("\n\n========================== BUSCANDO CONFIGURAÇÕES... =========================="))
 
 
  connection.query(`SELECT * from bot_cfg`, function(err, result, fields){
    if (err) throw err;

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

  setTimeout(() => {
    if(result[0].instalado === "1"){

    client.users.fetch(result[0].dono).then((user) => {
      user.send({
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
    })
  }
  console.log(colors.blue('Backup ao iniciar feito com sucesso! Enviando no privado do dono!'))
  }, 5000);


  // FUNCTION FAZERBACKUP

    function FazerBackup(){
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
    
    setTimeout(() => {
      if(result[0].instalado === "1"){

      client.users.fetch(result[0].dono).then((user) => {
        user.send({
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
      })
    }
    console.log(colors.blue('Backup de 3 horas feito com sucesso! Enviando no privado do dono!'))
    }, 5000);
    
    }

    setInterval(FazerBackup, 10800000);
    // IP

    if(result[0].ip === null || result[0].ip === undefined || !result[0].ip || result[0].ip === false){
      console.log(colors.red('O IP do servidor na database não existe!'))
    }else{
      console.log(colors.green("IP setado com sucesso! IP atual: " + result[0].ip))
    }

    // PORTA

    if(result[0].porta === null || result[0].porta === undefined || !result[0].porta || result[0].porta === false){
      console.log(colors.red('A porta do servidor na database não existe!'))
    }else{
      console.log(colors.green("Porta setada com sucesso! Porta atual: " + `${result[0].porta}`))
    }

    // MARGEM DE ACERTOS

    if(result[0].margemdeacertos === null || result[0].margemdeacertos === undefined || !result[0].margemdeacertos || result[0].margemdeacertos === false){
      console.log(colors.red('Margem de acertos para aprovação não encontrada! Sete na DB.'))
    }else{
      console.log(colors.green("Margem de acertos para aprovação setado com sucesso! Margem de Acertos: " + `${result[0].margemdeacertos}`))
    }

    // resultadowlstaff

    if(result[0].resultadowlstaff === null || result[0].resultadowlstaff === undefined || !result[0].resultadowlstaff || result[0].resultadowlstaff === false){
      console.log(colors.red('O canal de "Resultados Whitelist - Staffs" não foi setado!'))
    }
    else{
      const canal1 = client.channels.cache.get(result[0].resultadowlstaff)
      if(canal1.type !== 'text'){
        console.log('Esse ID (RESULTADO WHITELIST - STAFF) não é um canal de texto')
      }
  if(canal1.type === 'category' || canal1 === null || canal1 === undefined || !canal1 || canal1 === 0){
    console.log(colors.red('O canal de "Resultados Whitelist - Staffs" foi setado com sucesso, porém, não foi encontrado nada para esse canal. '  + `ID: ${result[0].resultadowlstaff}`))
  } 
  else{
    console.log(colors.green('O canal de "Resultados Whitelist - Staffs" foi setado com sucesso. '  + `ID: ${result[0].resultadowlstaff} - nome do canal: ${canal1.name}`))
  }
    } 
    
   // ID DA CATEGORIA

   if(result[0].iddacategoria === null || result[0].iddacategoria === undefined || !result[0].iddacategoria || result[0].iddacategoria === false){
    console.log(colors.red('O ID da categoria de "WHITELIST" não foi setado!'))
  }
  else{
    const categoriawl = client.channels.cache.get(result[0].iddacategoria)
    if(categoriawl.type !== 'category'){
      console.log(colors.red('ESSE ID (CATEGORIA - WHITELIST) NÃO É UMA CATEGORIA!'))
    }
if(categoriawl.type === 'text' || categoriawl === null || categoriawl === undefined || !categoriawl || categoriawl === 0){
  console.log(colors.red('A categoria de "CATEGORIA - WHITELIST" foi setado com sucesso, porém, não foi encontrado nada para essa categoria. '  + `ID: ${result[0].iddacategoria}`))
} 
else{
  console.log(colors.green('A categoria de "CATEGORIA - WHITELIST" foi setado com sucesso. '  + `ID: ${result[0].iddacategoria} - nome da categoria: ${categoriawl.name}`))
}
  }
 
      // CANAL FAZER WHITELIST

      if(result[0].canal_fazer_whitelist === null || result[0].canal_fazer_whitelist === undefined || !result[0].canal_fazer_whitelist || result[0].canal_fazer_whitelist === false){
        console.log(colors.red('O canal de "Fazer Whitelist" não foi setado!'))
      }
      else{
        const canalwhitelist = client.channels.cache.get(result[0].canal_fazer_whitelist)
        if(canalwhitelist.type !== 'text'){
          console.log('Esse ID (CANAL DE FAZER WHITELIST) não é um canal de texto')
        }
    if(canalwhitelist.type === 'category' || canalwhitelist === null || canalwhitelist === undefined || !canalwhitelist || canalwhitelist === 0){
      console.log(colors.red('O canal de "Fazer Whitelist" foi setado com sucesso, porém, não foi encontrado nada para esse canal. '  + `ID: ${result[0].canal_fazer_whitelist}`))
    } 
    else{
      console.log(colors.green('O canal de "Fazer Whitelist" foi setado com sucesso. '  + `ID: ${result[0].canal_fazer_whitelist} - nome do canal: ${canalwhitelist.name}`))
    }
      } 

       // ID DO SERVIDOR

 if(result[0].iddoservidor === null || result[0].iddoservidor === undefined || !result[0].iddoservidor || result[0].iddoservidor === false){
  console.log(colors.red('O ID do servidor não foi setado!'))
}
else{
  console.log(colors.green('O ID do servidor foi setado com sucesso! ID: ' + result[0].iddoservidor+ ', observe: **SETADO NÃO SIGNIFICA FUNCIONANDO!**'))
}

    // CANAL FAZER STAFF TICKETs FECHADOS 

    if(result[0].channel_staff_fticket === null || result[0].channel_staff_fticket === undefined || !result[0].channel_staff_fticket || result[0].channel_staff_fticket === false){
      console.log(colors.red('O canal de "Tickets Fechados - Staffs" não foi setado!'))
    }
    else{
      const channelfticket = client.channels.cache.get(result[0].channel_staff_fticket)
      if(channelfticket.type !== 'text'){
        console.log('Esse ID (CANAL DE TICKETS FECHADOS - STAFFS) não é um canal de texto')
      }
  if(channelfticket.type === 'category' || channelfticket === null || channelfticket === undefined || !channelfticket || channelfticket === 0){
    console.log(colors.red('O canal de "Tickets Fechados - Staffs" foi setado com sucesso, porém, não foi encontrado nada para esse canal. '  + `ID: ${result[0].channel_staff_fticket}`))
  } 
  else{
    console.log(colors.green('O canal de "Tickets Fechados - Staffs" foi setado com sucesso. '  + `ID: ${result[0].channel_staff_fticket} - nome do canal: ${channelfticket.name}`))
  }
    } 

 // ID DA CATEGORIA ticket

 if(result[0].id_categoria_ticket === null || result[0].id_categoria_ticket === undefined || !result[0].id_categoria_ticket || result[0].id_categoria_ticket === false){
  console.log(colors.red('O ID da categoria de "TICKET" não foi setado!'))
}
else{
  const categoriaticket = client.channels.cache.get(result[0].id_categoria_ticket)
  if(categoriaticket.type !== 'category'){
    console.log(colors.red('ESSE ID (CATEGORIA - TICKET) NÃO É UMA CATEGORIA!'))
  }
if(categoriaticket.type === 'text' || categoriaticket === null || categoriaticket === undefined || !categoriaticket || categoriaticket === 0){
console.log(colors.red('A categoria de "CATEGORIA - TICKET" foi setado com sucesso, porém, não foi encontrado nada para essa categoria. '  + `ID: ${result[0].id_categoria_ticket}`))
} 
else{
console.log(colors.green('A categoria de "CATEGORIA - TICKET" foi setado com sucesso. '  + `ID: ${result[0].id_categoria_ticket} - nome da categoria: ${categoriaticket.name}`))
}
}

        // CANAL FAZER resultado_wl aprovados 

        if(result[0].resultadowl_acertos === null || result[0].resultadowl_acertos === undefined || !result[0].resultadowl_acertos || result[0].resultadowl_acertos === false){
          console.log(colors.red('O canal de "Resultados de Whitelist - Aprovados" não foi setado!'))
        }
        else{
          const channelfticket = client.channels.cache.get(result[0].resultadowl_acertos)
          if(channelfticket.type !== 'text'){
            console.log('Esse ID (RESULTADOS DE WHITELIST - RESULTADOS) não é um canal de texto')
          }
      if(channelfticket.type === 'category' || channelfticket === null || channelfticket === undefined || !channelfticket || channelfticket === 0){
        console.log(colors.red('O canal de "Resultados de Whitelist - Aprovados" foi setado com sucesso, porém, não foi encontrado nada para esse canal. '  + `ID: ${result[0].resultadowl_acertos}`))
      } 
      else{
        console.log(colors.green('O canal de "Resultados de Whitelist - Aprovados" foi setado com sucesso. '  + `ID: ${result[0].resultadowl_acertos} - nome do canal: ${channelfticket.name}`))
      }
        } 

        // CANAL FAZER resultado_wl Reprovados 

        if(result[0].resultadowl_errados === null || result[0].resultadowl_errados === undefined || !result[0].resultadowl_errados || result[0].resultadowl_errados === false){
          console.log(colors.red('O canal de "Resultados de Whitelist - Reprovados" não foi setado!'))
        }
        else{
          const channelfticket = client.channels.cache.get(result[0].resultadowl_errados)
          if(channelfticket.type !== 'text'){
            console.log('Esse ID (RESULTADOS DE WHITELIST - REPROVADOS) não é um canal de texto')
          }
      if(channelfticket.type === 'category' || channelfticket === null || channelfticket === undefined || !channelfticket || channelfticket === 0){
        console.log(colors.red('O canal de "Resultados de Whitelist - Reprovados" foi setado com sucesso, porém, não foi encontrado nada para esse canal. '  + `ID: ${result[0].resultadowl_errados}`))
      } 
      else{
        console.log(colors.green('O canal de "Resultados de Whitelist - Reprovados" foi setado com sucesso. '  + `ID: ${result[0].resultadowl_errados} - nome do canal: ${channelfticket.name}`))
      }
        } 


        console.log(colors.red("\nSE ESSA É A SUA PRIMEIRA INSTALAÇÃO, POR FAVOR, DIGITE !instalar EM QUALQUER CANAL DO SEU DISCORD!"))
  })
}
