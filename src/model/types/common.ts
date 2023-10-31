export enum IRoles {
  ADMIN = "ADMIN",
  USER = "USER",
  CLIENT = "CLIENT",
}

export interface IAnyObject {
  [index: string | number]: any;
}
