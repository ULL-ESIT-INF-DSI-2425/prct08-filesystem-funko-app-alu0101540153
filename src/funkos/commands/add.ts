import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { FileManager } from '../storage/fileManager.js';
import { Funko, FunkoType, FunkoGenre } from '../models/funko.js';

// Crear una instancia de FileManager
const fileManager = new FileManager();

/**
 * Configuración de los comandos de yargs.
 */
yargs(hideBin(process.argv))
  // Comando: add
  .command(
    'add',
    'Añade un nuevo Funko a la colección de un usuario',
    {
      user: {
        description: 'Nombre del usuario',
        type: 'string',
        demandOption: true,
      },
      id: {
        description: 'ID único del Funko',
        type: 'string',
        demandOption: true,
      },
      name: {
        description: 'Nombre del Funko',
        type: 'string',
        demandOption: true,
      },
      desc: {
        description: 'Descripción del Funko',
        type: 'string',
        demandOption: true,
      },
      type: {
        description: 'Tipo de Funko (Pop!, Pop! Rides, Vinyl Soda, Vinyl Gold)',
        type: 'string',
        demandOption: true,
      },
      genre: {
        description: 'Género del Funko (Animación, Películas y TV, Videojuegos, Deportes, Música, Ánime)',
        type: 'string',
        demandOption: true,
      },
      franchise: {
        description: 'Franquicia del Funko',
        type: 'string',
        demandOption: true,
      },
      number: {
        description: 'Número identificativo del Funko dentro de la franquicia',
        type: 'number',
        demandOption: true,
      },
      exclusive: {
        description: 'Indica si el Funko es exclusivo (true/false)',
        type: 'boolean',
        demandOption: true,
      },
      specialFeatures: {
        description: 'Características especiales del Funko',
        type: 'string',
        demandOption: true,
      },
      marketValue: {
        description: 'Valor de mercado del Funko',
        type: 'number',
        demandOption: true,
      },
    },
    (argv) => {
      // Convertir el tipo y género a los valores del enumerado
      const type = argv.type as FunkoType;
      const genre = argv.genre as FunkoGenre;

      // Crear una instancia de Funko
      const funko = new Funko(
        argv.id,
        argv.name,
        argv.desc,
        type,
        genre,
        argv.franchise,
        argv.number,
        argv.exclusive,
        argv.specialFeatures,
        argv.marketValue
      );

      // Intentar añadir el Funko
      const result = fileManager.saveFunko(argv.user, funko);
      console.log(result);
    }
  )

  // Comando: list
  .command(
    'list',
    'Lista todos los Funkos de un usuario',
    {
      user: {
        description: 'Nombre del usuario',
        type: 'string',
        demandOption: true,
      },
    },
    (argv) => {
      const result = fileManager.listFunkos(argv.user);
      console.log(result);
    }
  )

  // Comando: update
  .command(
    'update',
    'Actualiza un Funko existente en la colección de un usuario',
    {
      user: {
        description: 'Nombre del usuario',
        type: 'string',
        demandOption: true,
      },
      id: {
        description: 'ID único del Funko',
        type: 'string',
        demandOption: true,
      },
      name: {
        description: 'Nombre del Funko',
        type: 'string',
      },
      desc: {
        description: 'Descripción del Funko',
        type: 'string',
      },
      type: {
        description: 'Tipo de Funko (Pop!, Pop! Rides, Vinyl Soda, Vinyl Gold)',
        type: 'string',
      },
      genre: {
        description: 'Género del Funko (Animación, Películas y TV, Videojuegos, Deportes, Música, Ánime)',
        type: 'string',
      },
      franchise: {
        description: 'Franquicia del Funko',
        type: 'string',
      },
      number: {
        description: 'Número identificativo del Funko dentro de la franquicia',
        type: 'number',
      },
      exclusive: {
        description: 'Indica si el Funko es exclusivo (true/false)',
        type: 'boolean',
      },
      specialFeatures: {
        description: 'Características especiales del Funko',
        type: 'string',
      },
      marketValue: {
        description: 'Valor de mercado del Funko',
        type: 'number',
      },
    },
    (argv) => {
      // Convertir el tipo y género a los valores del enumerado
      const type = argv.type as FunkoType;
      const genre = argv.genre as FunkoGenre;

      // Crear una instancia de Funko con los nuevos datos
      const updatedFunko = new Funko(
        argv.id,
        argv.name || '', // Usar el valor actual si no se proporciona uno nuevo
        argv.desc || '',
        type || FunkoType.Pop,
        genre || FunkoGenre.Animation,
        argv.franchise || '',
        argv.number || 0,
        argv.exclusive || false,
        argv.specialFeatures || '',
        argv.marketValue || 0
      );

      // Intentar actualizar el Funko
      const result = fileManager.updateFunko(argv.user, updatedFunko);
      console.log(result);
    }
  )

  // Comando: read
  .command(
    'read',
    'Muestra la información de un Funko específico',
    {
      user: {
        description: 'Nombre del usuario',
        type: 'string',
        demandOption: true,
      },
      id: {
        description: 'ID único del Funko',
        type: 'string',
        demandOption: true,
      },
    },
    (argv) => {
      const result = fileManager.showFunkoInfo(argv.user, argv.id);
      console.log(result);
    }
  )

  // Comando: remove
  .command(
    'remove',
    'Elimina un Funko de la colección de un usuario',
    {
      user: {
        description: 'Nombre del usuario',
        type: 'string',
        demandOption: true,
      },
      id: {
        description: 'ID único del Funko',
        type: 'string',
        demandOption: true,
      },
    },
    (argv) => {
      const result = fileManager.removeFunko(argv.user, argv.id);
      console.log(result);
    }
  )

  .help() // Habilitar la opción --help
  .parse(); // Ejecutar yargs