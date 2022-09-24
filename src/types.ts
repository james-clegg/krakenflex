export interface IOutage {
  id: string;
  begin: string;
  end: string;
  name?: string;
}

interface IDevice {
  id: string;
  name: string;
}

export interface ISiteInfo {
  id: string;
  name: string;
  devices: IDevice[];
}
