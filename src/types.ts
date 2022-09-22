export interface IOutage {
    id: string;
    begin: string; 
    end: string;
}

interface IDevice {
    id: string;
    name: string;
}

export interface ISite {
    id: string;
    name: string;
    devices: IDevice[];
}

export interface IEnhancedOutage {
    id: string;
    name: string;
    begin: string;
    end: string;
}
