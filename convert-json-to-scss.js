const fs = require('fs');

const jsonData = JSON.parse(fs.readFileSync('tokens.json', 'utf8'));

function convertToSassVariables(obj, prefix = '') {
  return Object.keys(obj)
    .map(key => {
      const variableName = `${prefix}${key}`;
      const value = obj[key];

      if (typeof value === 'object') {
        return convertToSassVariables(value, `${variableName}-`);
      } else {
        return `$${variableName}: ${JSON.stringify(value).replace(/"/g, '')};`;
      }
    })
    .join('\n');
}

const sassVariables = convertToSassVariables(jsonData);

fs.writeFileSync('./src/assets/scss/tokens.scss', sassVariables);

console.log('Conversion completed successfully.');