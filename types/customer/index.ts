export interface Customer {
  _id: string,
  fullname: string, 
  cellphone: string,
  address: string,
  status: number,
  cars: Array<string>,
  date: string
}