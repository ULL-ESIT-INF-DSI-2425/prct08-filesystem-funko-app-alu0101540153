import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Funko, FunkoJSON } from '../models/funko.js';
import chalk from 'chalk';

/**
 * Clase que gestiona la persistencia de los Funko Pops en el sistema de archivos.
 */
export class FileManager {
  private readonly dataDir: string;

  /**
   * Constructor de la clase FileManager.
   * Verifica si el directorio de datos existe, y si no, lo crea.
   */
  constructor() {
    // Obtener la ruta del directorio actual usando import.meta.url
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    this.dataDir = path.join(__dirname, '../../../data');
    console.log(chalk.yellow(`Directorio de datos: ${this.dataDir}`)); // Depuración

    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
    }
  }

  /**
   * Guarda un Funko en un archivo JSON dentro del directorio del usuario.
   * @param user - Nombre del usuario.
   * @param funko - Instancia del Funko a guardar.
   * @returns Mensaje informativo o de error.
   */
  public saveFunko(user: string, funko: Funko): string {
    const userDir = path.join(this.dataDir, user);
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }

    const filePath = path.join(userDir, `${funko.id}.json`);
    if (fs.existsSync(filePath)) {
      return chalk.red(`Error: Ya existe un Funko con el ID ${funko.id} en la colección de ${user}.`);
    }

    fs.writeFileSync(filePath, JSON.stringify(funko.toJSON(), null, 2));
    return chalk.green(`Nuevo Funko añadido a la colección de ${user}.`);
  }

  /**
   * Actualiza un Funko existente en el directorio del usuario.
   * @param user - Nombre del usuario.
   * @param funko - Instancia del Funko a actualizar.
   * @returns Mensaje informativo o de error.
   */
  public updateFunko(user: string, funko: Funko): string {
    const filePath = path.join(this.dataDir, user, `${funko.id}.json`);
    if (!fs.existsSync(filePath)) {
      return chalk.red(`Error: No existe un Funko con el ID ${funko.id} en la colección de ${user}.`);
    }

    fs.writeFileSync(filePath, JSON.stringify(funko.toJSON(), null, 2));
    return chalk.green(`Funko actualizado en la colección de ${user}.`);
  }

  /**
   * Elimina un Funko del directorio del usuario.
   * @param user - Nombre del usuario.
   * @param id - ID del Funko a eliminar.
   * @returns Mensaje informativo o de error.
   */
  public removeFunko(user: string, id: string): string {
    const filePath = path.join(this.dataDir, user, `${id}.json`);
    if (!fs.existsSync(filePath)) {
      return chalk.red(`Error: No existe un Funko con el ID ${id} en la colección de ${user}.`);
    }

    fs.unlinkSync(filePath);
    return chalk.green(`Funko eliminado de la colección de ${user}.`);
  }

  /**
   * Lista todos los Funkos de un usuario.
   * @param user - Nombre del usuario.
   * @returns Lista de Funkos o mensaje de error.
   */
  public listFunkos(user: string): string {
    const userDir = path.join(this.dataDir, user);
    if (!fs.existsSync(userDir)) {
      return chalk.red(`Error: No existe una colección para el usuario ${user}.`);
    }

    const files = fs.readdirSync(userDir);
    if (files.length === 0) {
      return chalk.yellow(`La colección de ${user} está vacía.`);
    }

    let result = chalk.blue(`Colección de Funkos de ${user}:\n`);
    files.forEach(file => {
      const filePath = path.join(userDir, file);
      const funkoJSON = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as FunkoJSON;
      const funko = Funko.fromJSON(funkoJSON);
      result += this.formatFunkoInfo(funko) + '\n';
    });

    return result;
  }

  /**
   * Muestra la información de un Funko específico.
   * @param user - Nombre del usuario.
   * @param id - ID del Funko a mostrar.
   * @returns Información del Funko o mensaje de error.
   */
  public showFunkoInfo(user: string, id: string): string {
    const filePath = path.join(this.dataDir, user, `${id}.json`);
    if (!fs.existsSync(filePath)) {
      return chalk.red(`Error: No existe un Funko con el ID ${id} en la colección de ${user}.`);
    }

    const funkoJSON = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as FunkoJSON;
    const funko = Funko.fromJSON(funkoJSON);
    return this.formatFunkoInfo(funko);
  }

/**
 * Formatea la información de un Funko para mostrarla en la consola.
 * @param funko - Instancia del Funko.
 * @returns Información formateada del Funko.
 */
private formatFunkoInfo(funko: Funko): string {
  return chalk.blue(`ID: ${funko.id}\n`) +
    chalk.white(`Nombre: ${funko.name}\n`) +
    chalk.white(`Descripción: ${funko.description}\n`) +
    chalk.white(`Tipo: ${funko.type}\n`) +
    chalk.white(`Género: ${funko.genre}\n`) +
    chalk.white(`Franquicia: ${funko.franchise}\n`) +
    chalk.white(`Número: ${funko.number}\n`) +
    chalk.white(`Exclusivo: ${funko.isExclusive ? 'Sí' : 'No'}\n`) +
    chalk.white(`Características especiales: ${funko.specialFeatures}\n`) +
    `Valor de mercado: ${this.getMarketValueColor(funko.marketValue)}\n`;
}

  /**
   * Determina el color del valor de mercado basado en rangos predefinidos.
   * @param marketValue - Valor de mercado del Funko.
   * @returns Valor de mercado formateado con el color correspondiente.
   */
  private getMarketValueColor(marketValue: number): string {
    if (marketValue > 200) {
      return chalk.green(`${marketValue}€`);
    } else if (marketValue > 100) {
      return chalk.yellow(`${marketValue}€`);
    } else if (marketValue > 50) {
      return chalk.blue(`${marketValue}€`);
    } else {
      return chalk.red(`${marketValue}€`);
    }
  }
}