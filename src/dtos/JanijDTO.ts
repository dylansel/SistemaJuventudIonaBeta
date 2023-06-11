export default interface JanijDTO {
  name: string,
  group: string,
  fullName: string,
  birthday: string,
  nationalId: string,
  address: string,
  email: string
  cellphone: string,
  school: string,
  notes: string,
  mother: {
    name: string,
    cellphone: string,
    email: string
  },
  father: {
    name: string,
    cellphone: string,
    email: string
  }
}

