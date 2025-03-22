//  src/funkos/models/funko.ts

   /**
     * Enum que representa los diferentes tipos de Funkos.
     */
    export enum FunkoType {
    Pop = "Pop!",
    PopRides = "Pop! Rides",
    VinylSoda = "Vinyl Soda",
    VinylGold = "Vinyl Gold"
  }
  
  /**
   * Enum que representa los diferentes géneros de Funkos.
   */
  export enum FunkoGenre {
    Animation = "Animación",
    MoviesAndTV = "Películas y TV",
    VideoGames = "Videojuegos",
    Sports = "Deportes",
    Music = "Música",
    Anime = "Ánime"
  }


  /**
 * Interface to define the structure of a Funko object in JSON format.
 */
  export interface FunkoJSON {
    id: string;
    name: string;
    description: string;
    type: FunkoType;
    genre: FunkoGenre;
    franchise: string;
    number: number;
    isExclusive: boolean;
    specialFeatures: string;
    marketValue: number;
  }
  
  /**
   * Clase que representa un Funko.
   */
  export class Funko {
    /**
     * Constructor de la clase Funko.
     * @param id - Identificador único del Funko.
     * @param name - Nombre del Funko.
     * @param description - Descripción del Funko.
     * @param type - Tipo del Funko (Pop!, Pop! Rides, etc.).
     * @param genre - Género del Funko (Animación, Películas, etc.).
     * @param franchise - Franquicia del Funko (Marvel, Star Wars, etc.).
     * @param number - Número del Funko dentro de su franquicia.
     * @param isExclusive - Indica si el Funko es exclusivo.
     * @param specialFeatures - Características especiales del Funko.
     * @param marketValue - Valor de mercado del Funko.
     */
    constructor(
      public id: string,
      public name: string,
      public description: string,
      public type: FunkoType,
      public genre: FunkoGenre,
      public franchise: string,
      public number: number,
      public isExclusive: boolean,
      public specialFeatures: string,
      public marketValue: number
    ) {
      if (marketValue < 0) {
        throw new Error("El valor de mercado no puede ser negativo.");
      }
    }
  
    /**
     * Devuelve una representación en cadena del Funko.
     * @returns Información del Funko en formato legible.
     */
    public toString(): string {
      return `Funko: ${this.name}\n` +
        `ID: ${this.id}\n` +
        `Descripción: ${this.description}\n` +
        `Tipo: ${this.type}\n` +
        `Género: ${this.genre}\n` +
        `Franquicia: ${this.franchise}\n` +
        `Número: ${this.number}\n` +
        `Exclusivo: ${this.isExclusive ? "Sí" : "No"}\n` +
        `Características especiales: ${this.specialFeatures}\n` +
        `Valor de mercado: ${this.marketValue}€`;
    }
  
    /**
     * Convierte la instancia del Funko en un objeto JSON.
     * @returns Objeto JSON representando el Funko.
     */
    public toJSON(): object {
      return {
        id: this.id,
        name: this.name,
        description: this.description,
        type: this.type,
        genre: this.genre,
        franchise: this.franchise,
        number: this.number,
        isExclusive: this.isExclusive,
        specialFeatures: this.specialFeatures,
        marketValue: this.marketValue
      };
    }
  

    /**
     * Creates a Funko instance from a JSON object.
     * @param json - The JSON object to convert into a Funko instance.
     * @returns A new Funko instance.
     */
    public static fromJSON(json: FunkoJSON): Funko {
      return new Funko(
        json.id,
        json.name,
        json.description,
        json.type,
        json.genre,
        json.franchise,
        json.number,
        json.isExclusive,
        json.specialFeatures,
        json.marketValue
      );
    }
  }
  