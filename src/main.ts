import DomParser from 'dom-parser';
import { chromium } from "playwright";
import { createWorker } from 'tesseract.js';
import axios from 'axios-https-proxy-fix';
import * as readline from 'readline';
import { Avito } from './types/avito.namespace';
import { Parser } from './abstract/parser.abstract';
// import { proxyList, getRandomProxy } from './utils/proxy';


function input_params(): Promise<string> {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question('Введите город: ', (answer: string) => {
      rl.close();
      resolve(answer);
    });
  });
}

export class AvitoSellParser extends Parser {
    constructor(options: Avito.ParserOptions) {
        super(options);
        // Дополнительная инициализация для вашего парсера
    }
    
    async parse(city: string): Promise<any> {
        try {
            const city_ = this.cities.find((el) => el.link === city)!
            await this.customFetchData(city_);
        } catch (error) {
            console.error('Parsing failed:', error);
        }
        return {};
    }
    
    async downloadFile(
            itemFullObject: any, 
            outputObject: any
        ): Promise<any> {
        // Здесь работаем с images
        const images: Array<any> = []
        const imagesFiles: Array<any> = []
        itemFullObject.item.imageUrls.forEach((el: any) => images.push(el))

        // Здесь пробегаемся по объектам в массиве
        for (const [index, image] of images.entries()) {
            // Прокси не работают

            // const galleryImageName = crypto.randomUUID() + '.png'
            if(index === 2) {
                console.log(index, " : index \n")
                break
            }
            const response = await axios({
                method: 'get',
                url: image['640x480'],
                responseType: 'arraybuffer',
                timeout: 30_000,
                // proxy: getRandomProxy(),
            })
            imagesFiles.push(response.data)
        }

        const FullOutputObject = Object.assign({}, outputObject, {
            imageResponseData: imagesFiles,
            imagesUrls: images
        })

        return FullOutputObject;
    }
    
    async databaseModeling(model: any, data: any) {
        console.log(model, data)
        throw new Error("Method not realized.",);
    }
    
    async checkingAvailabilitySource(url: string, config: {}): Promise<any> {
        console.log(url, config)
        throw new Error("Method not realized.");
    }

    async customFetchData(city: Avito.ParseAvitoCity): Promise<any> {
        // код для получения данных по заданному URL
        // Например, используя axios или fetch или playweight

        const browser = await chromium.launch({})
        const context = await browser.newContext()
        const pagePlaywright = await context.newPage()

        const url_ = this.baseUrl.replace('{city}', city.link)
        
        await pagePlaywright.goto(url_, {
            timeout: this.timeout,
            waitUntil: 'load',
        })

        const firstPageHtml = await pagePlaywright.content()
        const firstPageDom = this.parser.parseFromString(firstPageHtml)
        const navigation = firstPageDom.getElementsByAttribute(
            'data-marker',
            'pagination-button'
        )!

        const spans = navigation[0]?.getElementsByTagName('span')
        if (!spans) return
        const lastSpan = spans!.pop()
        const lastPage = Math.min(Number(lastSpan!.textContent), 25)

        // Начало обхода всех объектов на сайте
        for (let page = 1; page <= lastPage; page++) {
            try {
                console.log('start goto')
                await pagePlaywright.goto(`${url_}?p=${page}`, {
                    timeout: this.timeout,
                    waitUntil: 'domcontentloaded',
                })
                console.log('end goto')
                // Даем у костра посидеть программке
                await new Promise((resolve) => setTimeout(resolve, this.timeDelay))
                console.log('start promise delay')
    
                // Здесь получаем контент из предыдушего запроса
                const pageHtml = await pagePlaywright.content()
                const pageDom = this.parser.parseFromString(pageHtml)
                // получаем массив всех объектов со странице
                const items = pageDom.getElementsByAttribute('data-marker', 'item')
        
                // Завершаем цикл, если объектов нет
                if (!items || items.length === 0) break
    
                // Гуляем по объектам
                for (const item of items) {
                    try {
                        // получаем ссылку для перехода на страницу самого объекта
                        const links = item.getElementsByTagName('a')
                        if(!links) continue
            
                        const titleNode = links[0]
                        const href = titleNode.getAttribute('href')
                        if (!href) continue
            
                        const itemId = Number(item.getAttribute('data-item-id'))
                        // Здесь проверка есть ли объект с данных id в базе
            
                        // Здесь мы идем заходим на страницу объекта через полученный href
                        await pagePlaywright.goto(`https://www.avito.ru${href}`, {
                            timeout: this.timeout,
                            waitUntil: 'domcontentloaded',
                        })
                        // Здесь даем продыщаться программке
                        await new Promise((resolve) => setTimeout(resolve, this.timeDelay))
            
                        // Здесь мы будет работать с самим объектом(получать всю инфу о нем)
            
                        // Здесь мы получаем строку imgBase64 и извлекаем из него телефон с помощью tesseract.js
                        const itemHtml = await pagePlaywright.content()
                        const itemDom = this.parser.parseFromString(itemHtml)
                        // переходим на странцу где содержиться представление фото в виде текста кодировки base64
                        // Ибо телефон объекта(владельца быть точнее) в виде фото генериться
                        await pagePlaywright.goto(
                            `https://www.avito.ru/web/1/items/phone/${itemId}?vsrc=r`,
                            {
                                timeout: this.timeout,
                                waitUntil: 'domcontentloaded',
                            }
                        )
                        // Получаем содержимое - оно в виде текстового представления
                        const phoneItemHtml: string = await pagePlaywright.content()
                        let phone: any = ''
                        try {
                            // Здесь под вопросом, если нету номера или т.п, то пропускать ли элемент?
                            if(phoneItemHtml) {
                                const avitoImageBuffer: Buffer = await this.getItemPhone(phoneItemHtml)
                                const phoneData: string = await this.recognizeText(avitoImageBuffer)
                                phone = phoneData
                            } 
                            // else {
                            //     console.log('html представление телефона null, возможна ошибка из-за временной блокировки ip-адреса', phone, '\n')
                            //     continue
                            // }
                        } catch (err) {
                            console.log(err)
                        }
                        // Даем отдышаться
                        await new Promise((resolve) => setTimeout(resolve, this.timeDelay))
            
                        // Здесь мы пытаемся получить из тега скрипт все данные объекта
                        const scripts = itemDom.getElementsByTagName('script')
                        const { itemFullObject } = this.getItemFullObject(scripts)
                        if (!itemFullObject) {
                            console.log('Нет объекта \n')
                            console.log(itemFullObject)
                            continue
                        }
                        // Возможен случай, что объект не той локации, так что делаем проверку
                        if (itemFullObject.item.location.name !== city.name) {
                            console.log('Не совпадает локация \n')
                            console.log(itemFullObject.item.location.name)
                            continue
                        }
            
                        const aboutBlock: Avito.AboutBlock = {
                            objectId: null,
                            area: null,
                            areaLiving: null,
                            areaKitchen: null,
                            storey: null,
                            storeyNumber: null,
                            repairId: null,
                            furniture: null,
                        }
                        await this.fillObjectId(aboutBlock, itemFullObject)
                        // Если у объекта нету id, то выходим из цикла
                        if (!aboutBlock.objectId) {
                            console.log('Неверный objectId')
                            console.log(itemFullObject.ga[1])
                            console.log('\n')
                            continue
                        }
                        // Заполняем основной инфой объект
                        await this.fillObjectBaseInfo(aboutBlock, itemFullObject)
            
                        // Здесь проверка, есть ли у объекта мебель
                        const hasFurniture = itemFullObject.paramsBlock.items.find(
                            (el: any) => el.attributeId === 118596
                        )
                        aboutBlock.furniture = !!hasFurniture
            
                        let pledge = 0 // Залог
                        let commission = 0 // Коммисия
            
                        // Здесь проверяем есть ли коммисия на объект
                        if (itemFullObject.priceDataDTO?.depositCommission) {
                            for (const depItem of itemFullObject.priceDataDTO.depositCommission
                                .split(',')
                                .map((el: string) => el.trim())) {
                                if (depItem.includes('залог&nbsp;')) {
                                    pledge = Number(depItem.replace(/\D/g, ''))
                                }
                                if (depItem.includes('комиссия&nbsp;')) {
                                    commission = Number(depItem.replace(/\D/g, ''))
                                }
                            }
                        }
            
                        // Здесь мы пропускаем объект с коммисией (ее нужно перенести на самый вверх после получения объекта из json)
                        // Нет смысла проделывать лишние действия выше, если у объекта иммется коммисия и мы его пропускаем
                        if (commission) {
                            console.log('Объект с комиссией')
                            console.log(itemFullObject.priceDataDTO?.depositCommission)
                            continue
                        }
            
                        // Здесь идет запись данных в бд и тд
            
                        // Здесь мы формируем адрес
                        const addressArr = itemFullObject.item.address
                        .split(', ')
                        .filter((el: string) => ![city.region, city.name].includes(el))
            
                        // Здесь мы вытягиваем номер дома, адрес улицу, район
                        const {
                            addressDistrict, 
                            addressStreet, 
                            houseNumber
                        } = this.extractObjectGeoInfo(addressArr)
            
                        // Получаем итоговый объект
                        const outputObject = await this.outputObject({
                            itemFullObject: itemFullObject,
                            phone: phone,
                            aboutBlock: aboutBlock,
                            pledge: pledge,
                            commission: commission,
                            href: href,
                            addressDistrict: addressDistrict,
                            addressStreet: addressStreet,
                            houseNumber: houseNumber,
                        })
                        
                        const fullObject = await this.downloadFile(itemFullObject, outputObject)
                        console.log(fullObject, ' fullObject')
            
                    } catch (error) {
                        console.log(error)
                    }
                }
            } catch (error) {
                console.log(error)
            } finally {
                await context.close()
                await browser.close()
                await this.worker.terminate()
            }
        }

        // Возвращаем результат парсинга
        return {};
    }

    protected async outputObject(
        {
          itemFullObject, 
          phone, 
          aboutBlock, 
          pledge, 
          commission, 
          href,
          houseNumber,
          addressDistrict,
          addressStreet,
        }
      ) : Promise<Avito.RentObject> {
        return {
          parseSourceId: 1,
          foreignId: itemFullObject.item.id,
          title: itemFullObject.item.title,
          price: itemFullObject.item.price,
          name: 'Арендодатель',
          phone: Number(phone.replace(/\D/g, '')) || undefined,
          description: itemFullObject.item.description,
          objectTypeId: aboutBlock.objectId!,
          repairId: aboutBlock.repairId!,
          // regionId: addressRegion.id,
          // cityId: addressCity.id,
            regionId: null,
            cityId: null,
          districtId: addressDistrict?.id,
          streetId: addressStreet?.id,
          houseNumber: houseNumber,
          storey: Number(aboutBlock.storey),
          storeyNumber: Number(aboutBlock.storeyNumber),
          areaLiving: Number(aboutBlock.areaLiving),
          areaKitchen: Number(aboutBlock.areaKitchen),
          pledge: pledge,
          furniture: aboutBlock.furniture,
          area: aboutBlock.area,
          objectId: aboutBlock.objectId,
          commission: commission,
          fullObject: JSON.stringify({}),
          src: `https://www.avito.ru${href}`,
        }
    }
  
    protected extractObjectGeoInfo(addressArr:any) : {
        houseNumber: any
        addressDistrict: any
        addressStreet: any
      } {
        let houseNumber: any = null
        let addressStreet: any = null
        let addressDistrict: any = null
  
        if (addressArr.length > 0) {
          if (addressArr[addressArr.length - 1].includes('подъезд')) {
              addressArr.pop()
          }
  
          if (
              addressArr.length > 1 &&
              !addressArr[addressArr.length - 1].includes(
                  'ул.',
                  'жил',
                  'б-р',
                  'пр-т'
              )
          ) {
              houseNumber = addressArr.pop()
          }
      }
  
        return {
          houseNumber,
          addressDistrict,
          addressStreet,
        }
    }
  
    protected async fillObjectBaseInfo(aboutBlock: Avito.AboutBlock, itemFullObject: any) : Promise<void> {
      aboutBlock.area =
          Number(itemFullObject.ga[1]?.area?.replace(/\D/g, '')) || null
      aboutBlock.areaKitchen =
          Number(
              itemFullObject.ga[1]?.area_kitchen?.replace(/\D/g, '')
          ) || null
      aboutBlock.areaLiving =
          Number(itemFullObject.ga[1]?.area_live?.replace(/\D/g, '')) ||
          null
      aboutBlock.storey = Number(itemFullObject.ga[1]?.floor) || null
      aboutBlock.storeyNumber =
          Number(itemFullObject.ga[1]?.floors_count) || null
  
      const hasRepair = itemFullObject.paramsBlock.items.find(
          (el: any) => el.attributeId === 110710
      )
      switch (true) {
          case hasRepair && hasRepair.description === 'дизайнерский':
              aboutBlock.repairId = 9
              break
          case hasRepair && hasRepair.description === 'евро':
              aboutBlock.repairId = 8
              break
          case hasRepair && hasRepair.description === 'косметический':
              aboutBlock.repairId = 6
              break
          case hasRepair &&
              (hasRepair.description === 'требуется' ||
                  hasRepair.description === 'требует ремонта'):
              aboutBlock.repairId = 5
              break
          default:
              console.log('REPAIR:\n')
              console.log(hasRepair)
              console.log('\n')
      }
    }
  
    protected async fillObjectId(aboutBlock: Avito.AboutBlock, itemFullObject: any) {
      switch (true) {
        case Number(itemFullObject.ga[1].categoryId) === 24 &&
            Number(itemFullObject.ga[1].rooms) >= 5:
            aboutBlock.objectId = 5
            break
        case Number(itemFullObject.ga[1].categoryId) === 24 &&
            Number(itemFullObject.ga[1].rooms) === 4:
            aboutBlock.objectId = 4
            break
        case Number(itemFullObject.ga[1].categoryId) === 24 &&
            Number(itemFullObject.ga[1].rooms) === 3:
            aboutBlock.objectId = 3
            break
        case Number(itemFullObject.ga[1].categoryId) === 24 &&
            Number(itemFullObject.ga[1].rooms) === 2:
            aboutBlock.objectId = 2
            break
        case Number(itemFullObject.ga[1].categoryId) === 24 &&
            Number(itemFullObject.ga[1].rooms) === 1:
            aboutBlock.objectId = 1
            break
        case Number(itemFullObject.ga[1].categoryId) === 24 &&
            itemFullObject.ga[1].rooms === 'Студия':
            aboutBlock.objectId = 20
            break
        case [24, 25].includes(
            Number(itemFullObject.ga[1].categoryId)
        ) && itemFullObject.ga[1].type === 'Дом':
            aboutBlock.objectId = 11
            break
        case [24, 25].includes(
            Number(itemFullObject.ga[1].categoryId)
        ) && itemFullObject.ga[1].type === 'Коттедж':
            aboutBlock.objectId = 17
            break
        case [24, 25].includes(
            Number(itemFullObject.ga[1].categoryId)
        ) && itemFullObject.ga[1].type === 'Таунхаус':
            aboutBlock.objectId = 12
            break
        case Number(itemFullObject.ga[1].categoryId) === 23 &&
            itemFullObject.ga[1].type === 'Комната':
            aboutBlock.objectId = 16
            break
        case Number(itemFullObject.ga[1].categoryId) === 23 &&
            itemFullObject.ga[1].tip_zhilya === 'Комната':
            aboutBlock.objectId = 16
            break
        case Number(itemFullObject.ga[1].categoryId) === 23 &&
            itemFullObject.ga[1].tip_zhilya === 'Койко-место':
            aboutBlock.objectId = 14
            break
        case Number(itemFullObject.ga[1].categoryId) === 25 &&
            itemFullObject.ga[1].type === 'Дача':
            aboutBlock.objectId = 9
            break
      }
    }
  
    protected getItemFullObject(
      scripts: any
    ): { itemFullObject: any; itemFullObjectPlus: any } {
      let result = null
      let resultPlus = null
      scripts!.forEach((el: any) => {
          if (el.textContent.includes('__initialData__')) {
              const str = el.textContent.split('"')[1]
              console.log(str.slice(0, 100))
              const obj = JSON.parse(decodeURIComponent(str))
              let prop = '@avito/bx-item-view'
              for (const key in obj) {
                  if (key.includes('bx-item-view')) prop = key
              }
              result = obj[prop].buyerItem
              resultPlus = obj
          }
      })
    
      return {
          itemFullObject: result,
          itemFullObjectPlus: resultPlus,
      }
    }
  
    protected async recognizeText(imagePath: Buffer): Promise<string> {
      this.worker = await createWorker('eng');
  
      const { data: { text } } = await this.worker.recognize(imagePath);
      return text;
    }
  
    protected async getItemPhone(html: string) {
        console.log(html.slice(0, 50), ' : html \n')
        // Здесь желательно проверять, ограничили ли ip прокси и тд
        const jsonString = html
        .replace(
            '<html><head><meta name="color-scheme" content="light dark"></head><body><pre style="word-wrap: break-word; white-space: pre-wrap;">',
            ''
        );
        console.log(jsonString.slice(0, 200), '\n')
        const cleanedJsonString = jsonString.replace('</pre></body></html>', '');
        console.log(cleanedJsonString.slice(0, 400), '---------\n')
    
        let resultObj;
        try {
            resultObj = JSON.parse(cleanedJsonString);
        } catch (error) {
            console.error('Ошибка при разборе JSON:', error);
        }
        const phoneImageBuffer = Buffer.from(
            resultObj.anonymImage64.replace(/^data:image\/png;base64,/, ''),
            'base64'
        )
        return phoneImageBuffer
        }
}

async function main() {
    // Создание экземпляра парсера и вызов его метода parse()
    const answer: string = await input_params();
    console.log(`Вы ввели: ${answer}`, '\n');
    const options: Avito.ParserOptions = {
        baseUrl: "https://www.avito.ru/{city}/kvartiry/prodam",
        timeout: 0,
        timeDelay: 3_000,
        parser: new DomParser(),
        worker: null,
        cities: [
            {
                region: 'Краснодарский край',
                name: 'Краснодар',
                link: 'krasnodar',
            },
            {
                region: 'Ростовская область',
                name: 'Ростов-на-Дону',
                link: 'rostov-na-donu',
            },
            {
                region: 'Москва',
                name: 'Москва',
                link: 'moskva',
            },
        ]
    };
    
    const parser = new AvitoSellParser(options);
    await parser.parse(answer).then((result) => {
        console.log(result);
    });
}

main()