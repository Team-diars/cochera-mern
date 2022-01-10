interface Car {
  brand: string,
  model: string,
  licenceplate: string,
  color: string,
  image: Array<string>
}

export interface Customer {
  _id: string,
  fullname: string, 
  cellphone: string,
  address: string,
  status: number,
  cars: Array<Car>,
  date: Date
}