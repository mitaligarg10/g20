  const readline = require('readline');
  const fs = require('fs');
  let dataOne = [];
  let i = 0;
  let a = [];
  let b = [];
  let aJson = [];
  let bJson = [];
  let countryIndex;
  let populationIndex;
  let gdpIndex;
  module.exports = function convert(startYear)
  {
  if(typeof startYear === 'string') {
    return '';
  }
  if(typeof startYear !== 'number' || isNaN(startYear)) {
    throw new Error('Not a number');
  }
  const rl = readline.createInterface({
    input: fs.createReadStream('Table1.3_g20_2013.csv')
  });
  rl.on('line', (line) => {
  if (i === 0)
   {
      dataOne = line.split(',');
      countryIndex = dataOne.indexOf('Country Name');
      populationIndex = dataOne.indexOf('Population (Millions) - 2013');
      gdpIndex = dataOne.indexOf('GDP Billions (US$) - 2013');
      i = 1;
    }

  dataOne = line.split(',');
  a.push({country: dataOne[countryIndex], gdp: dataOne[gdpIndex]});
  b.push({country: dataOne[countryIndex], population: dataOne[populationIndex]});
   });


  setTimeout(function() {
          a.pop();
      a.pop();
      b.pop();
      b.pop();
      a.shift();
      b.shift();
       a.sort(function(x, y) {return parseFloat(y.gdp) - parseFloat(x.gdp);});
      b.sort(function(x, y) {return parseFloat(y.population) - parseFloat(x.population);});
   //    console.log(a);
      // console.log(b);
      aJson = JSON.stringify(a);
      bJson = JSON.stringify(b);

      fs.writeFile('output1.json', aJson);
      fs.writeFile('output2.json', bJson);
  }, 500);
  return 'JSON written successfully';
};

