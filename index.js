const deelChecker = require('./deel');
require('dotenv').config();

const main = async () => {
  console.log(process.env.TEST);
  await deelChecker();
};

main();