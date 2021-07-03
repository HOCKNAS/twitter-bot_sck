const functions = require("./functions");
const xlsxFile = require('read-excel-file/node');
const argv = require('yargs').argv;

(async function () {

  let count = 0

  if (argv.count !== undefined) {
    console.log(argv.count)
    count = parseInt(argv.count)
  } else {
    console.log("Falta la cuenta, tienes que ingresarla");
    process.exit(1);
  }

  const file = await xlsxFile('./cuentas.xlsm', { sheet: 'BOT' }).catch(function (err) { throw createError(500, "El archivo no corresponde a un reporte válido.") })

  const stdin = process.stdin;

  stdin.resume();
  stdin.setEncoding('utf8');

  stdin.on('data', function () {
    const name = `${file[count][2]} ${file[count][3]} ${file[count][4]} ${file[count][5]}`
    const birthDate = file[count][6]
    const email = file[count][10]

    console.log('Oprime una tecla para continuar con el siguiente bot');
    process.stdin.once('data', function () {
      functions.bot(name, email, "Ab12345@", birthDate)
    });
  });

})()

