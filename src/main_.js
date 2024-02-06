"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvitoSellParser = void 0;
var dom_parser_1 = __importDefault(require("dom-parser"));
var playwright_1 = require("playwright");
var tesseract_js_1 = require("tesseract.js");
var axios_https_proxy_fix_1 = __importDefault(require("axios-https-proxy-fix"));
var proxy_1 = require("./utils/proxy");
var readline = __importStar(require("readline"));
function input_params() {
    return new Promise(function (resolve) {
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.question('Введите город: ', function (answer) {
            rl.close();
            resolve(answer);
        });
    });
}
var getActiveProxies = function () { return __awaiter(void 0, void 0, void 0, function () {
    var result, proxyList_1, proxyList_1_1, item, proxy, err_1, e_1_1;
    var e_1, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                result = [];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 8, 9, 10]);
                proxyList_1 = __values(proxy_1.proxyList), proxyList_1_1 = proxyList_1.next();
                _b.label = 2;
            case 2:
                if (!!proxyList_1_1.done) return [3 /*break*/, 7];
                item = proxyList_1_1.value;
                proxy = {
                    host: item.split('@')[0].split(':')[0],
                    port: Number(item.split('@')[0].split(':')[1]),
                    auth: {
                        username: item.split('@')[1].split(':')[0],
                        password: item.split('@')[1].split(':')[1],
                    },
                };
                _b.label = 3;
            case 3:
                _b.trys.push([3, 5, , 6]);
                return [4 /*yield*/, axios_https_proxy_fix_1.default.post("https://www.avito.ru/krasnodar/kvartiry/prodam", {
                        proxy: proxy,
                        timeout: 30000,
                    })];
            case 4:
                _b.sent();
                result.push(proxy);
                return [3 /*break*/, 6];
            case 5:
                err_1 = _b.sent();
                if (err_1.response && err_1.response.status !== 403) {
                    result.push(proxy);
                }
                return [3 /*break*/, 6];
            case 6:
                proxyList_1_1 = proxyList_1.next();
                return [3 /*break*/, 2];
            case 7: return [3 /*break*/, 10];
            case 8:
                e_1_1 = _b.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 10];
            case 9:
                try {
                    if (proxyList_1_1 && !proxyList_1_1.done && (_a = proxyList_1.return)) _a.call(proxyList_1);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 10: return [2 /*return*/, result];
        }
    });
}); };
var Parser = /** @class */ (function () {
    function Parser(options) {
        this.baseUrl = options.baseUrl;
        this.timeout = options.timeout;
        this.timeDelay = options.timeDelay;
        this.worker = options.worker;
        this.parser = options.parser;
        this.cities = options.cities;
    }
    return Parser;
}());
var AvitoSellParser = /** @class */ (function (_super) {
    __extends(AvitoSellParser, _super);
    function AvitoSellParser(options) {
        return _super.call(this, options) || this;
        // Дополнительная инициализация для вашего парсера
    }
    AvitoSellParser.prototype.parse = function (url, city) {
        return __awaiter(this, void 0, void 0, function () {
            var city_, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        city_ = this.cities.find(function (el) { return el.link === city; });
                        return [4 /*yield*/, this.customFetchData(url, city_)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Parsing failed:', error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, {}];
                }
            });
        });
    };
    AvitoSellParser.prototype.downloadFile = function (itemFullObject, outputObject) {
        return __awaiter(this, void 0, void 0, function () {
            var images, imagesFiles, _a, _b, _c, index, image, proxies, proxy, response, e_2_1, FullOutputObject;
            var e_2, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        images = [];
                        imagesFiles = [];
                        itemFullObject.item.imageUrls.forEach(function (el) { return images.push(el); });
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 7, 8, 9]);
                        _a = __values(images.entries()), _b = _a.next();
                        _e.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 6];
                        _c = __read(_b.value, 2), index = _c[0], image = _c[1];
                        return [4 /*yield*/, getActiveProxies()];
                    case 3:
                        proxies = _e.sent();
                        proxy = proxies[Math.floor(Math.random() * 10)];
                        // const galleryImageName = crypto.randomUUID() + '.png'
                        if (index === 2) {
                            console.log(index, " : index \n");
                            return [3 /*break*/, 6];
                        }
                        return [4 /*yield*/, (0, axios_https_proxy_fix_1.default)({
                                method: 'get',
                                url: image['640x480'],
                                responseType: 'arraybuffer',
                                proxy: proxy,
                                timeout: 30000,
                            })];
                    case 4:
                        response = _e.sent();
                        imagesFiles.push(response.data);
                        _e.label = 5;
                    case 5:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_2_1 = _e.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 9:
                        FullOutputObject = Object.assign({}, outputObject, {
                            imageResponseData: imagesFiles,
                            imagesUrls: images
                        });
                        return [2 /*return*/, FullOutputObject];
                }
            });
        });
    };
    AvitoSellParser.prototype.databaseModeling = function (model, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log(model, data);
                throw new Error("Method not realized.");
            });
        });
    };
    AvitoSellParser.prototype.checkingAvailabilitySource = function (url, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log(url, config);
                throw new Error("Method not realized.");
            });
        });
    };
    AvitoSellParser.prototype.customFetchData = function (url, city) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var browser, context, pagePlaywright, url_, firstPageHtml, firstPageDom, navigation, spans, lastSpan, lastPage, page, pageHtml, pageDom, items, items_1, items_1_1, item, links, titleNode, href, itemId, itemHtml, itemDom, phoneItemHtml, phone, avitoImageBuffer, phoneData, err_2, scripts, itemFullObject, aboutBlock, hasFurniture, pledge, commission, _d, _e, depItem, addressArr, _f, addressDistrict, addressStreet, houseNumber, outputObject, fullObject, error_2, e_3_1, error_3;
            var e_3, _g, e_4, _h;
            var _this = this;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0: return [4 /*yield*/, playwright_1.chromium.launch({})];
                    case 1:
                        browser = _j.sent();
                        return [4 /*yield*/, browser.newContext()];
                    case 2:
                        context = _j.sent();
                        return [4 /*yield*/, context.newPage()];
                    case 3:
                        pagePlaywright = _j.sent();
                        url_ = url.replace('{city}', city.link);
                        return [4 /*yield*/, pagePlaywright.goto(url_, {
                                timeout: this.timeout,
                                waitUntil: 'load',
                            })];
                    case 4:
                        _j.sent();
                        return [4 /*yield*/, pagePlaywright.content()];
                    case 5:
                        firstPageHtml = _j.sent();
                        firstPageDom = this.parser.parseFromString(firstPageHtml);
                        navigation = firstPageDom.getElementsByAttribute('data-marker', 'pagination-button');
                        spans = (_a = navigation[0]) === null || _a === void 0 ? void 0 : _a.getElementsByTagName('span');
                        if (!spans)
                            return [2 /*return*/];
                        lastSpan = spans.pop();
                        lastPage = Math.min(Number(lastSpan.textContent), 25);
                        page = 1;
                        _j.label = 6;
                    case 6:
                        if (!(page <= lastPage)) return [3 /*break*/, 41];
                        _j.label = 7;
                    case 7:
                        _j.trys.push([7, 35, 36, 40]);
                        return [4 /*yield*/, pagePlaywright.goto("".concat(url_, "?p=").concat(page), {
                                timeout: this.timeout,
                                waitUntil: 'domcontentloaded',
                            })
                            // Даем у костра посидеть программке
                        ];
                    case 8:
                        _j.sent();
                        // Даем у костра посидеть программке
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, _this.timeDelay); })
                            // Здесь получаем контент из предыдушего запроса
                        ];
                    case 9:
                        // Даем у костра посидеть программке
                        _j.sent();
                        return [4 /*yield*/, pagePlaywright.content()];
                    case 10:
                        pageHtml = _j.sent();
                        pageDom = this.parser.parseFromString(pageHtml);
                        items = pageDom.getElementsByAttribute('data-marker', 'item');
                        // Завершаем цикл, если объектов нет
                        if (!items || items.length === 0)
                            return [3 /*break*/, 41];
                        _j.label = 11;
                    case 11:
                        _j.trys.push([11, 32, 33, 34]);
                        items_1 = (e_3 = void 0, __values(items)), items_1_1 = items_1.next();
                        _j.label = 12;
                    case 12:
                        if (!!items_1_1.done) return [3 /*break*/, 31];
                        item = items_1_1.value;
                        _j.label = 13;
                    case 13:
                        _j.trys.push([13, 29, , 30]);
                        links = item.getElementsByTagName('a');
                        if (!links)
                            return [3 /*break*/, 30];
                        titleNode = links[0];
                        href = titleNode.getAttribute('href');
                        if (!href)
                            return [3 /*break*/, 30];
                        itemId = Number(item.getAttribute('data-item-id'));
                        // Здесь проверка есть ли объект с данных id в базе
                        // Здесь мы идем заходим на страницу объекта через полученный href
                        return [4 /*yield*/, pagePlaywright.goto("https://www.avito.ru".concat(href), {
                                timeout: this.timeout,
                                waitUntil: 'domcontentloaded',
                            })
                            // Здесь даем продыщаться программке
                        ];
                    case 14:
                        // Здесь проверка есть ли объект с данных id в базе
                        // Здесь мы идем заходим на страницу объекта через полученный href
                        _j.sent();
                        // Здесь даем продыщаться программке
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, _this.timeDelay); })
                            // Здесь мы будет работать с самим объектом(получать всю инфу о нем)
                            // Здесь мы получаем строку imgBase64 и извлекаем из него телефон с помощью tesseract.js
                        ];
                    case 15:
                        // Здесь даем продыщаться программке
                        _j.sent();
                        return [4 /*yield*/, pagePlaywright.content()];
                    case 16:
                        itemHtml = _j.sent();
                        itemDom = this.parser.parseFromString(itemHtml);
                        // переходим на странцу где содержиться представление фото в виде текста кодировки base64
                        // Ибо телефон объекта(владельца быть точнее) в виде фото генериться
                        return [4 /*yield*/, pagePlaywright.goto("https://www.avito.ru/web/1/items/phone/".concat(itemId, "?vsrc=r"), {
                                timeout: this.timeout,
                                waitUntil: 'domcontentloaded',
                            })
                            // Получаем содержимое - оно в виде текстового представления
                        ];
                    case 17:
                        // переходим на странцу где содержиться представление фото в виде текста кодировки base64
                        // Ибо телефон объекта(владельца быть точнее) в виде фото генериться
                        _j.sent();
                        return [4 /*yield*/, pagePlaywright.content()];
                    case 18:
                        phoneItemHtml = _j.sent();
                        phone = '';
                        _j.label = 19;
                    case 19:
                        _j.trys.push([19, 22, , 23]);
                        if (!phoneItemHtml) return [3 /*break*/, 21];
                        avitoImageBuffer = this.getItemPhone(phoneItemHtml);
                        return [4 /*yield*/, this.recognizeText(avitoImageBuffer)];
                    case 20:
                        phoneData = _j.sent();
                        phone = phoneData;
                        _j.label = 21;
                    case 21: return [3 /*break*/, 23];
                    case 22:
                        err_2 = _j.sent();
                        console.log(err_2);
                        return [3 /*break*/, 23];
                    case 23: 
                    // Даем отдышаться
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, _this.timeDelay); })
                        // Здесь мы пытаемся получить из тега скрипт все данные объекта
                    ];
                    case 24:
                        // Даем отдышаться
                        _j.sent();
                        scripts = itemDom.getElementsByTagName('script');
                        itemFullObject = this.getItemFullObject(scripts).itemFullObject;
                        if (!itemFullObject) {
                            console.log('Нет объекта \n');
                            console.log(itemFullObject);
                            return [3 /*break*/, 30];
                        }
                        // Возможен случай, что объект не той локации, так что делаем проверку
                        if (itemFullObject.item.location.name !== city.name) {
                            console.log('Не совпадает локация \n');
                            console.log(itemFullObject.item.location.name);
                            return [3 /*break*/, 30];
                        }
                        aboutBlock = {
                            objectId: null,
                            area: null,
                            areaLiving: null,
                            areaKitchen: null,
                            storey: null,
                            storeyNumber: null,
                            repairId: null,
                            furniture: null,
                        };
                        return [4 /*yield*/, this.fillObjectId(aboutBlock, itemFullObject)
                            // Если у объекта нету id, то выходим из цикла
                        ];
                    case 25:
                        _j.sent();
                        // Если у объекта нету id, то выходим из цикла
                        if (!aboutBlock.objectId) {
                            console.log('Неверный objectId');
                            console.log(itemFullObject.ga[1]);
                            console.log('\n');
                            return [3 /*break*/, 30];
                        }
                        // Заполняем основной инфой объект
                        return [4 /*yield*/, this.fillObjectBaseInfo(aboutBlock, itemFullObject)
                            // Здесь проверка, есть ли у объекта мебель
                        ];
                    case 26:
                        // Заполняем основной инфой объект
                        _j.sent();
                        hasFurniture = itemFullObject.paramsBlock.items.find(function (el) { return el.attributeId === 118596; });
                        aboutBlock.furniture = !!hasFurniture;
                        pledge = 0 // Залог
                        ;
                        commission = 0 // Коммисия
                        ;
                        // Здесь проверяем есть ли коммисия на объект
                        if ((_b = itemFullObject.priceDataDTO) === null || _b === void 0 ? void 0 : _b.depositCommission) {
                            try {
                                for (_d = (e_4 = void 0, __values(itemFullObject.priceDataDTO.depositCommission
                                    .split(',')
                                    .map(function (el) { return el.trim(); }))), _e = _d.next(); !_e.done; _e = _d.next()) {
                                    depItem = _e.value;
                                    if (depItem.includes('залог&nbsp;')) {
                                        pledge = Number(depItem.replace(/\D/g, ''));
                                    }
                                    if (depItem.includes('комиссия&nbsp;')) {
                                        commission = Number(depItem.replace(/\D/g, ''));
                                    }
                                }
                            }
                            catch (e_4_1) { e_4 = { error: e_4_1 }; }
                            finally {
                                try {
                                    if (_e && !_e.done && (_h = _d.return)) _h.call(_d);
                                }
                                finally { if (e_4) throw e_4.error; }
                            }
                        }
                        // Здесь мы пропускаем объект с коммисией (ее нужно перенести на самый вверх после получения объекта из json)
                        // Нет смысла проделывать лишние действия выше, если у объекта иммется коммисия и мы его пропускаем
                        if (commission) {
                            console.log('Объект с комиссией');
                            console.log((_c = itemFullObject.priceDataDTO) === null || _c === void 0 ? void 0 : _c.depositCommission);
                            return [3 /*break*/, 30];
                        }
                        addressArr = itemFullObject.item.address
                            .split(', ')
                            .filter(function (el) { return ![city.region, city.name].includes(el); });
                        _f = this.extractObjectGeoInfo(addressArr), addressDistrict = _f.addressDistrict, addressStreet = _f.addressStreet, houseNumber = _f.houseNumber;
                        return [4 /*yield*/, this.outputObject({
                                itemFullObject: itemFullObject,
                                phone: phone,
                                aboutBlock: aboutBlock,
                                pledge: pledge,
                                commission: commission,
                                href: href,
                                addressDistrict: addressDistrict,
                                addressStreet: addressStreet,
                                houseNumber: houseNumber,
                            })];
                    case 27:
                        outputObject = _j.sent();
                        return [4 /*yield*/, this.downloadFile(itemFullObject, outputObject)];
                    case 28:
                        fullObject = _j.sent();
                        console.log(fullObject, ' fullObject');
                        return [3 /*break*/, 30];
                    case 29:
                        error_2 = _j.sent();
                        console.log(error_2);
                        return [3 /*break*/, 30];
                    case 30:
                        items_1_1 = items_1.next();
                        return [3 /*break*/, 12];
                    case 31: return [3 /*break*/, 34];
                    case 32:
                        e_3_1 = _j.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 34];
                    case 33:
                        try {
                            if (items_1_1 && !items_1_1.done && (_g = items_1.return)) _g.call(items_1);
                        }
                        finally { if (e_3) throw e_3.error; }
                        return [7 /*endfinally*/];
                    case 34: return [3 /*break*/, 40];
                    case 35:
                        error_3 = _j.sent();
                        console.log(error_3);
                        return [3 /*break*/, 40];
                    case 36: return [4 /*yield*/, context.close()];
                    case 37:
                        _j.sent();
                        return [4 /*yield*/, browser.close()];
                    case 38:
                        _j.sent();
                        return [4 /*yield*/, this.worker.terminate()];
                    case 39:
                        _j.sent();
                        return [7 /*endfinally*/];
                    case 40:
                        page++;
                        return [3 /*break*/, 6];
                    case 41: 
                    // Возвращаем результат парсинга
                    return [2 /*return*/, {}];
                }
            });
        });
    };
    AvitoSellParser.prototype.outputObject = function (_a) {
        var itemFullObject = _a.itemFullObject, phone = _a.phone, aboutBlock = _a.aboutBlock, pledge = _a.pledge, commission = _a.commission, href = _a.href, houseNumber = _a.houseNumber, addressDistrict = _a.addressDistrict, addressStreet = _a.addressStreet;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, {
                        parseSourceId: 1,
                        foreignId: itemFullObject.item.id,
                        title: itemFullObject.item.title,
                        price: itemFullObject.item.price,
                        name: 'Арендодатель',
                        phone: Number(phone.replace(/\D/g, '')) || undefined,
                        description: itemFullObject.item.description,
                        objectTypeId: aboutBlock.objectId,
                        repairId: aboutBlock.repairId,
                        // regionId: addressRegion.id,
                        // cityId: addressCity.id,
                        districtId: addressDistrict === null || addressDistrict === void 0 ? void 0 : addressDistrict.id,
                        streetId: addressStreet === null || addressStreet === void 0 ? void 0 : addressStreet.id,
                        houseNumber: houseNumber,
                        storey: Number(aboutBlock.storey),
                        storeyNumber: Number(aboutBlock.storeyNumber),
                        areaLiving: Number(aboutBlock.areaLiving),
                        areaKitchen: Number(aboutBlock.areaKitchen),
                        pledge: pledge,
                        commission: commission,
                        fullObject: JSON.stringify({}),
                        src: "https://www.avito.ru".concat(href),
                    }];
            });
        });
    };
    AvitoSellParser.prototype.extractObjectGeoInfo = function (addressArr) {
        var houseNumber = null;
        var addressStreet = null;
        var addressDistrict = null;
        if (addressArr.length > 0) {
            if (addressArr[addressArr.length - 1].includes('подъезд')) {
                addressArr.pop();
            }
            if (addressArr.length > 1 &&
                !addressArr[addressArr.length - 1].includes('ул.', 'жил', 'б-р', 'пр-т')) {
                houseNumber = addressArr.pop();
            }
        }
        return {
            houseNumber: houseNumber,
            addressDistrict: addressDistrict,
            addressStreet: addressStreet,
        };
    };
    AvitoSellParser.prototype.fillObjectBaseInfo = function (aboutBlock, itemFullObject) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function () {
            var hasRepair;
            return __generator(this, function (_j) {
                aboutBlock.area =
                    Number((_b = (_a = itemFullObject.ga[1]) === null || _a === void 0 ? void 0 : _a.area) === null || _b === void 0 ? void 0 : _b.replace(/\D/g, '')) || null;
                aboutBlock.areaKitchen =
                    Number((_d = (_c = itemFullObject.ga[1]) === null || _c === void 0 ? void 0 : _c.area_kitchen) === null || _d === void 0 ? void 0 : _d.replace(/\D/g, '')) || null;
                aboutBlock.areaLiving =
                    Number((_f = (_e = itemFullObject.ga[1]) === null || _e === void 0 ? void 0 : _e.area_live) === null || _f === void 0 ? void 0 : _f.replace(/\D/g, '')) ||
                        null;
                aboutBlock.storey = Number((_g = itemFullObject.ga[1]) === null || _g === void 0 ? void 0 : _g.floor) || null;
                aboutBlock.storeyNumber =
                    Number((_h = itemFullObject.ga[1]) === null || _h === void 0 ? void 0 : _h.floors_count) || null;
                hasRepair = itemFullObject.paramsBlock.items.find(function (el) { return el.attributeId === 110710; });
                switch (true) {
                    case hasRepair && hasRepair.description === 'дизайнерский':
                        aboutBlock.repairId = 9;
                        break;
                    case hasRepair && hasRepair.description === 'евро':
                        aboutBlock.repairId = 8;
                        break;
                    case hasRepair && hasRepair.description === 'косметический':
                        aboutBlock.repairId = 6;
                        break;
                    case hasRepair &&
                        (hasRepair.description === 'требуется' ||
                            hasRepair.description === 'требует ремонта'):
                        aboutBlock.repairId = 5;
                        break;
                    default:
                        console.log('REPAIR:\n');
                        console.log(hasRepair);
                        console.log('\n');
                }
                return [2 /*return*/];
            });
        });
    };
    AvitoSellParser.prototype.fillObjectId = function (aboutBlock, itemFullObject) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (true) {
                    case Number(itemFullObject.ga[1].categoryId) === 24 &&
                        Number(itemFullObject.ga[1].rooms) >= 5:
                        aboutBlock.objectId = 5;
                        break;
                    case Number(itemFullObject.ga[1].categoryId) === 24 &&
                        Number(itemFullObject.ga[1].rooms) === 4:
                        aboutBlock.objectId = 4;
                        break;
                    case Number(itemFullObject.ga[1].categoryId) === 24 &&
                        Number(itemFullObject.ga[1].rooms) === 3:
                        aboutBlock.objectId = 3;
                        break;
                    case Number(itemFullObject.ga[1].categoryId) === 24 &&
                        Number(itemFullObject.ga[1].rooms) === 2:
                        aboutBlock.objectId = 2;
                        break;
                    case Number(itemFullObject.ga[1].categoryId) === 24 &&
                        Number(itemFullObject.ga[1].rooms) === 1:
                        aboutBlock.objectId = 1;
                        break;
                    case Number(itemFullObject.ga[1].categoryId) === 24 &&
                        itemFullObject.ga[1].rooms === 'Студия':
                        aboutBlock.objectId = 20;
                        break;
                    case [24, 25].includes(Number(itemFullObject.ga[1].categoryId)) && itemFullObject.ga[1].type === 'Дом':
                        aboutBlock.objectId = 11;
                        break;
                    case [24, 25].includes(Number(itemFullObject.ga[1].categoryId)) && itemFullObject.ga[1].type === 'Коттедж':
                        aboutBlock.objectId = 17;
                        break;
                    case [24, 25].includes(Number(itemFullObject.ga[1].categoryId)) && itemFullObject.ga[1].type === 'Таунхаус':
                        aboutBlock.objectId = 12;
                        break;
                    case Number(itemFullObject.ga[1].categoryId) === 23 &&
                        itemFullObject.ga[1].type === 'Комната':
                        aboutBlock.objectId = 16;
                        break;
                    case Number(itemFullObject.ga[1].categoryId) === 23 &&
                        itemFullObject.ga[1].tip_zhilya === 'Комната':
                        aboutBlock.objectId = 16;
                        break;
                    case Number(itemFullObject.ga[1].categoryId) === 23 &&
                        itemFullObject.ga[1].tip_zhilya === 'Койко-место':
                        aboutBlock.objectId = 14;
                        break;
                    case Number(itemFullObject.ga[1].categoryId) === 25 &&
                        itemFullObject.ga[1].type === 'Дача':
                        aboutBlock.objectId = 9;
                        break;
                }
                return [2 /*return*/];
            });
        });
    };
    AvitoSellParser.prototype.getItemFullObject = function (scripts) {
        var result = null;
        var resultPlus = null;
        scripts.forEach(function (el) {
            if (el.textContent.includes('__initialData__')) {
                var str = el.textContent.split('"')[1];
                console.log(str.slice(0, 100));
                var obj = JSON.parse(decodeURIComponent(str));
                var prop = '@avito/bx-item-view';
                for (var key in obj) {
                    if (key.includes('bx-item-view'))
                        prop = key;
                }
                result = obj[prop].buyerItem;
                resultPlus = obj;
            }
        });
        return {
            itemFullObject: result,
            itemFullObjectPlus: resultPlus,
        };
    };
    AvitoSellParser.prototype.recognizeText = function (imagePath) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, text;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, (0, tesseract_js_1.createWorker)('eng')];
                    case 1:
                        _a.worker = _b.sent();
                        return [4 /*yield*/, this.worker.recognize(imagePath)];
                    case 2:
                        text = (_b.sent()).data.text;
                        return [2 /*return*/, text];
                }
            });
        });
    };
    AvitoSellParser.prototype.getItemPhone = function (html) {
        console.log(html.slice(0, 50), ' : html');
        var jsonString = html
            .replace('<html><head><meta name="color-scheme" content="light dark"></head><body><pre style="word-wrap: break-word; white-space: pre-wrap;">', '');
        var cleanedJsonString = jsonString.replace('</pre></body></html>', '');
        var resultObj;
        try {
            resultObj = JSON.parse(cleanedJsonString);
        }
        catch (error) {
            console.error('Ошибка при разборе JSON:', error);
        }
        var phoneImageBuffer = Buffer.from(resultObj.anonymImage64.replace(/^data:image\/png;base64,/, ''), 'base64');
        return phoneImageBuffer;
    };
    return AvitoSellParser;
}(Parser));
exports.AvitoSellParser = AvitoSellParser;
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var answer, options, parser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, input_params()];
                case 1:
                    answer = _a.sent();
                    console.log("\u0412\u044B \u0432\u0432\u0435\u043B\u0438: ".concat(answer), '\n');
                    options = {
                        baseUrl: "https://www.avito.ru/{city}/kvartiry/prodam",
                        timeout: 0,
                        timeDelay: 3000,
                        parser: new dom_parser_1.default(),
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
                    parser = new AvitoSellParser(options);
                    return [4 /*yield*/, parser.parse("https://www.avito.ru/{city}/kvartiry/prodam", answer).then(function (result) {
                            console.log(result);
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main();
