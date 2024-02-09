export namespace Avito {
    export interface RentObject {
        title: string | null | undefined;
        parseSourceId: number | null | undefined;
        foreignId: number | null | undefined;
        regionId: number | null | undefined;
        cityId: number | null | undefined;
        districtId: number | null | undefined;
        streetId: number | null | undefined;
        houseNumber: string | null | undefined;
        name: string | null | undefined;
        phone: number | null | undefined;
        price: number | null | undefined;
        objectTypeId: number | null | undefined;
        pledge: string | null | undefined;
        src: string | null | undefined;
        area: number | null | undefined;
        areaKitchen: number | null | undefined;
        areaLiving: number | null | undefined;
        description: string | null | undefined;
        storey: number | null | undefined;
        storeyNumber: number | null | undefined;
        fullObject: string | null | undefined;
        repairId: number | null | undefined;
        commission: number | null | undefined;
        furniture: boolean | null | undefined;
        objectId: number | null | undefined;
    }

    export interface ParserOptions {
        baseUrl: string;
        timeout: number;
        timeDelay: any;
        worker: any;
        parser: any;
        cities: ParseAvitoCity[];
    }
    
    export interface AboutBlock {
      objectId: null | number
      area: null | number
      areaLiving: null | number
      areaKitchen: null | number
      storey: null | number
      storeyNumber: null | number
      repairId: null | number
      furniture: null | boolean
    }
    
    export type ParseAvitoCity = {
      region: string
      name: string
      link: string
    }
}