//Recibe la direccion de la api del servidor

const fs = require('fs');

fs.writeFileSync('./env',`API =${process.env.API}\n`);