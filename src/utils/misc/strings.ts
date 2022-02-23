export const capitalizeAllWords = (str: string) => {
    const words = str.split(" ")
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(" ")
}

export const isEmptyOrSpaces = (str : string) => {
    return (str.length === 0 || !str.trim());
}

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