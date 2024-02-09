import { Avito } from "../types/avito.namespace";

export abstract class Parser {
    protected baseUrl: string;
    protected timeout: number;
    protected cities: Avito.ParseAvitoCity[];
    protected timeDelay: any;
    protected worker: any;
    protected parser: any;
  
    constructor(options: Avito.ParserOptions) {
      this.baseUrl = options.baseUrl;
      this.timeout = options.timeout;
      this.timeDelay = options.timeDelay;
      this.worker = options.worker;
      this.parser = options.parser;
      this.cities = options.cities;
    }
  
    // Абстрактный метод, парсинга
    abstract parse(url: string, city: string): Promise<any>;
  
    // метод для загрузки\обработки файлов
    abstract downloadFile(url: string, array: any[], itemFullObject: any, outputObject: any): Promise<any>;
  
    // метод для работы с базами данных
    abstract databaseModeling(model, data): Promise<any>;
  
    // Метод для проверки доступности источника
    abstract checkingAvailabilitySource(url: string, config: {}): Promise<any>;
  
    // Кастомный метод получения данных
    abstract customFetchData(city: Avito.ParseAvitoCity): Promise<any>;
  }