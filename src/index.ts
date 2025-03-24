import { FileManager  } from './funkos/storage/fileManager.js';
import { Funko, FunkoType, FunkoGenre } from './funkos/models/funko.js';
import chalk from 'chalk';

// Crear una instancia de FileManager
const fileManager = new FileManager();

// Definir un usuario de prueba
const user = 'usuario1';

// Crear algunos Funkos de ejemplo
const funko1 = new Funko(
  '1', // ID
  'Classic Sonic', // Nombre
  'The best Sonic Funko ever', // Descripción
  FunkoType.Pop, // Tipo
  FunkoGenre.VideoGames, // Género
  'Sonic The Hedgehog', // Franquicia
  1, // Número
  true, // Exclusivo
  'Brilla en la oscuridad', // Características especiales
  150 // Valor de mercado
);

const funko2 = new Funko(
  '2', // ID
  'Batman', // Nombre
  'The Dark Knight', // Descripción
  FunkoType.Pop, // Tipo
  FunkoGenre.MoviesAndTV, // Género
  'DC Comics', // Franquicia
  2, // Número
  false, // Exclusivo
  'Cabeza balancea', // Características especiales
  75 // Valor de mercado
);

// Ejemplo de uso de FileManager
console.log(chalk.bold('=== Prueba de FileManager ===\n'));

// 1. Añadir Funkos
console.log(chalk.blue('1. Añadiendo Funkos...'));
console.log(fileManager.saveFunko(user, funko1)); // Añadir Funko 1
console.log(fileManager.saveFunko(user, funko2)); // Añadir Funko 2
console.log(fileManager.saveFunko(user, funko1)); // Intentar añadir Funko 1 de nuevo (debe dar error)

// 2. Listar Funkos
console.log(chalk.blue('\n2. Listando Funkos...'));
console.log(fileManager.listFunkos(user));

// 3. Mostrar información de un Funko
console.log(chalk.blue('\n3. Mostrando información de un Funko...'));
console.log(fileManager.showFunkoInfo(user, '1')); // Mostrar Funko 1
console.log(fileManager.showFunkoInfo(user, '3')); // Intentar mostrar un Funko que no existe (debe dar error)

// 4. Actualizar un Funko
console.log(chalk.blue('\n4. Actualizando un Funko...'));
const updatedFunko1 = new Funko(
  '1', // Mismo ID
  'Classic Sonic Updated', // Nuevo nombre
  'The best Sonic Funko ever (Updated)', // Nueva descripción
  FunkoType.Pop, // Tipo
  FunkoGenre.VideoGames, // Género
  'Sonic The Hedgehog', // Franquicia
  1, // Número
  true, // Exclusivo
  'Brilla en la oscuridad y cabeza balancea', // Nueva característica especial
  200 // Nuevo valor de mercado
);
console.log(fileManager.updateFunko(user, updatedFunko1)); // Actualizar Funko 1
console.log(fileManager.showFunkoInfo(user, '1')); // Mostrar Funko 1 actualizado

// 5. Eliminar un Funko
console.log(chalk.blue('\n5. Eliminando un Funko...'));
console.log(fileManager.listFunkos(user)); // Listar Funkos después de eliminar
console.log(fileManager.removeFunko(user, '3')); // Intentar eliminar un Funko que no existe (debe dar error)


