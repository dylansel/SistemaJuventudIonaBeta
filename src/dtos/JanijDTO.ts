export default interface JanijDTO {
    name: string,
    group: string,
    fullName: string,
    birthday: string,
    nationalId: number,
    address: string,
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

