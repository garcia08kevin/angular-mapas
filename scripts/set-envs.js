const { writeFileSync, mkdirSync } = require('fs');

require('dotenv').config()


const targetPath = './src/enviroments/enviroments.ts'

const envFileContent = `
export const enviroments = {
  mapbox_key: "${process.env['MAPBOX_KEY']}",
  otra: 'Ser',
}
`;

mkdirSync('./src/enviroments', { recursive: true })

writeFileSync(targetPath, envFileContent);
