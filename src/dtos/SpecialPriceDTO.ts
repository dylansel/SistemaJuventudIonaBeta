export default interface SpecialPriceDTO {
    id: number,
    payments: PaymentsDTO[],
    month: string,
    amount: number,
}

interface PaymentsDTO {
    family: FamilyDTO
}

interface FamilyDTO {
    id: number,
    surname: string,
    janijim: JanijDTO[]
}

interface JanijDTO {
    name: string
}