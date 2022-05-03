import SpecialPriceDTO from "./SpecialPriceDTO";

export async function  getAllSpecialPriceEjemplo(){
    let data:SpecialPriceDTO[] = [
        { 
            id: 1,
            familyId: 8,
            familySurname: "Robinski",
            janijim:["sofi","mati"],
            month: "2025-02",
            amount: 4000,
        },    
        { 
            id: 2,
            familyId: 9,
            familySurname: "Martines",
            janijim:["mateo"],
            month: "2022-06",
            amount: 8000
        },
        { 
            id: 3,
            familyId: 12,
            familySurname: "Levi",
            janijim:["juli","romi","macarena"],
            month: "2021-05",
            amount: 12000
        }
    ]

    return data
}

export async function  getAllSpecialPricebyid(id:number){
    let data:SpecialPriceDTO[] = [
        { 
            id: 1,
            familyId: 8,
            familySurname: "Robinski",
            janijim:["sofi","mati"],
            month: "2025-02",
            amount: 4000,
        },    
        { 
            id: 2,
            familyId: 9,
            familySurname: "Martines",
            janijim:["mateo"],
            month: "2022-06",
            amount: 8000
        },
        { 
            id: 3,
            familyId: 12,
            familySurname: "Levi",
            janijim:["juli","romi","macarena"],
            month: "2021-05",
            amount: 12000
        }
    ]

    return data[id-1]
}