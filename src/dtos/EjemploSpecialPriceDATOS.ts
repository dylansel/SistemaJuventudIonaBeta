import SpecialPriceDTO from "./SpecialPriceDTO";

export async function  getAllSpecialPriceEjemplo(){
    let data:SpecialPriceDTO[] = [
        {
          id: 236,
          payments: [
            {
              family: {
                id: 2,
                surname: "Risnik",
                janijim: [
                  {
                    name: "Iara"
                  },
                  {
                    name: "Sofia"
                  }
                ]
              }
            },
            {
              family: {
                id: 3,
                surname: "Ostrowisky",
                janijim: [
                  {
                    name: "Mati"
                  },
                  {
                    name: "Tiago"
                  }
                ]
              }
            }
          ],
          month: "2022-02",
          amount: 2000
        },
        {
          id: 237,
          payments: [
            {
              family: {
                id: 3,
                surname: "Ducach",
                janijim: [
                  {
                    name: "Kiara"
                  }
                ]
              }
            }
          ],
          month: "2022-03",
          amount: 3000
        },
        {
          id: 238,
          payments: [
            {
              family: {
                id: 1,
                surname: "Dautowitz",
                janijim: [
                  {
                    name: "Ariel"
                  }
                ]
              }
            }
          ],
          month: "2022-02",
          amount: 4000
        },
        {
          id: 239,
          payments: [
            {
              family: {
                id: 1,
                surname: "Dautowitz",
                janijim: [
                  {
                    name: "Ariel"
                  }
                ]
              }
            }
          ],
          month: "2022-01",
          amount: 5000
        }
      ]

    return data
}

export async function  getAllSpecialPricebyid(id:number){
    let data:SpecialPriceDTO[] = [
        {
          id: 236,
          payments: [
            {
              family: {
                id: 2,
                surname: "Risnik",
                janijim: [
                  {
                    name: "Iara"
                  }
                ]
              }
            }
          ],
          month: "2022-02",
          amount: 2000
        },
        {
          id: 237,
          payments: [
            {
              family: {
                id: 3,
                surname: "Ducach",
                janijim: [
                  {
                    name: "Kiara"
                  }
                ]
              }
            }
          ],
          month: "2022-03",
          amount: 3000
        },
        {
          id: 238,
          payments: [
            {
              family: {
                id: 1,
                surname: "Dautowitz",
                janijim: [
                  {
                    name: "Ariel"
                  }
                ]
              }
            }
          ],
          month: "2022-02",
          amount: 4000
        },
        {
          id: 239,
          payments: [
            {
              family: {
                id: 1,
                surname: "Dautowitz",
                janijim: [
                  {
                    name: "Ariel"
                  }
                ]
              }
            }
          ],
          month: "2022-01",
          amount: 5000
        }
      ]

    return data[id-1]
}