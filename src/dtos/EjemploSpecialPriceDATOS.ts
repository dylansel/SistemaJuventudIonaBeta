import SpecialPriceDTO from "./SpecialPriceDTO";

export async function  getAllSpecialPriceEjemplo(){
    let data:SpecialPriceDTO[] = [
        { 
            id: 1,
            familyId: 8,
            familySurname: "robinski",
            janijim:["sofi","mati"],
            month: "6-2020",
            amount: 4000,
        },    
        { 
            id: 2,
            familyId: 9,
            familySurname: "martines",
            janijim:["mateo"],
            month: "5-2020",
            amount: 8000
        },
        { 
            id: 3,
            familyId: 12,
            familySurname: "levi",
            janijim:["juli","romi","macarena"],
            month: "5-2020",
            amount: 12000
        },
    ]

    return data
}

export async function  getAllSpecialPricebyid(id:number){
    let data:SpecialPriceDTO[] = [
        { 
            id: 0,
            familyId: 8,
            familySurname: "robinski",
            janijim:["sofi","mati"],
            month: "2025-2",
            amount: 4000,
        },    
        { 
            id: 1,
            familyId: 9,
            familySurname: "martines",
            janijim:["mateo"],
            month: "2022-6",
            amount: 8000
        },
        { 
            id: 2,
            familyId: 12,
            familySurname: "levi",
            janijim:["juli","romi","macarena"],
            month: "2019-10",
            amount: 12000
        }
    ]

    return data[id]
}