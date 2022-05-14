export default interface SpecialPriceRequestDTO {
    payments:PaymentsDTO[],
    month: string,
    amount: number,
}

interface PaymentsDTO{
    family:FamilyDTO
}

interface FamilyDTO{
    id:number,
    surname:String,
    janijim:JanijimDTO[]
}

interface JanijimDTO{
    name:String
}