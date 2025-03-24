import { readFile } from "fs";
import * as path from "path";
import * as process from "process";

/**
 * Varsdiable con los fargumentos de lnea de comandos
 */
const argv = process.argv;

console.log("## Argumentos recibidos:", argv);

if (argv.length < 4) {
  console.error("Uso: node programa.js <ruta-fichero> <palabra-a-buscar>");
  process.exit(1);
}

const filePath = path.resolve(argv[2]);
const searchWord = argv[3];

/**
 * s para contar las ocurrencias de una palabra
 * @param content - tring con todo el contenido del fichero
 * @param word - aalabsra a busscar
 * @returns Rtorsna el número de ocurrencias
 */
const countWordOccurrences = (content: string, word: string): number => {
  const words = content.split(" "); // Dividir el contenido en palabras
  return words.filter((w) => w === word).length;
};

/**
 * encapsulamiento del rread file
 * @param filePath - eta del archivo a leer
 * @param searchWord - alabra a buscar
 */
const processFile = (filePath: string, searchWord: string) => {
  readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.error(`Error al leer el fichero: ${err.message}`);
      process.exit(1);
    }

    const occurrences = countWordOccurrences(data, searchWord);
    console.log(`La palabra "${searchWord}" aparece ${occurrences} veces en el fichero.`);
  });
};

processFile(filePath, searchWord);
