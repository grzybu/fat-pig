export interface UserDataInterface {
  uid: string;
  email: string;
  displayName?: string;
  weight?: number;
  height?: number;
}

export class UserData implements UserDataInterface {
  constructor(
    public uid: string,
    public email: string,
    public displayName?: string,
    public weight?: number,
    public height?: number,
    public dupa?: string,
  ) {
    this.dupa = 'dupa';
  }

  getBmi(): number {
    return parseFloat(Math.round(this.weight / ((this.height / 100) ** 2)).toFixed(2));
  }
}
