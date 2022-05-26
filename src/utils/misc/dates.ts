export const dateToEsString = (date: string) => {
    return new Date(date.replace(/-/g, '\/')).toLocaleDateString([], { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })
}

export const dateToUsString = (date: string) => {
    return new Date(date.replace(/-/g, '\/')).toLocaleDateString([], { year: 'numeric', month: 'long', day: '2-digit' })
}

export const formatDateUsToEs = (date: string) => {
    const dArr = date.split("-");
    return dArr[2] + "/" + dArr[1] + "/" + dArr[0]
}

export const formatDateEsToUs = (date: string) => {
    const dArr = date.split("-");
    return dArr[0] + "-" + dArr[1] + "-" + dArr[2]
}

export const formatDateMonthUsToEs = (date: string) => {
    const dArr = date.split("-");
    return dArr[1] + "/" + dArr[0]
}

export const formatDateToEsYearMonth = (dateS: string,sConcat :string)=>{
    let date = dateS.split("-") 
    return new Date(Number(date[0]), Number(date[1]) - 1, 1).toLocaleDateString('default', { month: 'long', year: 'numeric' }).replace('de', sConcat)
}