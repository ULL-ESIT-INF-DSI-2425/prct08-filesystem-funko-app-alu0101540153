import * as fs from "fs";
import * as path from "path";
import * as process from "process";

const argv = process.argv;

if (argv.length < 4) {
  console.error("Uso: node programa.js <ruta-archivo-json> <ruta-archivo-csv>");
  process.exit(1);
}

const inputJsonPath = path.resolve(argv[2]);
const outputCsvPath = path.resolve(argv[3]);

/**
 * funcion encapsula para hace el write
 * @param filePath - ruta del archvio
 * @param csvData - ruta del csv que se va a escrivir
 */
const writeInFile = (filePath: string, csvData: string) => {
  fs.writeFile(filePath, csvData, "utf-8", (err) => {
    if (err) {
      console.error(`Eror al guardar el archivo CSV: ${err.message}`);
      process.exit(1);
    }
    console.log(`archivo CSV ha sido guardado en: ${filePath}`);
  });
};

/**
 * Función que procesa el archivo JSON y lo convierte a formato CSV
 * @param filePath - Ruta del archivo JSON a leer
 * @param outputPath - Ruta del archivo CSV donde se guardará la salida
 */
const processFile = (filePath: string, outputPath: string) => {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.error(`rror al leer el archivo JSON: ${err.message}`);
      process.exit(1);
    }

    let jsonData;
    jsonData = JSON.parse(data);
    
    if (!Array.isArray(jsonData)) {
      console.error(" achivo JSON no tiene el formato adecuado.");
      process.exit(1);
    }

    const headers = "fecha,ubicacion,temperatura,humedad,precipitacion,viento_kmh";

    let rows = "";

    for (let i = 0; i < jsonData.length; i++) {
      const item = jsonData[i];

      const row = `"${item.fecha}","${item.ubicacion}",${item.temperatura},${item.humedad},${item.precipitacion},${item.viento_kmh}`;

      if (i === jsonData.length - 1) {
        rows += row; 
      } else {
        rows += row + "\n"; 
      }
    }

    const csvData = `${headers}\n ${rows}`;
    writeInFile(outputPath, csvData);
  });
};

processFile(inputJsonPath, outputCsvPath);
