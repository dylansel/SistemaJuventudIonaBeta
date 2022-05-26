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


export const listArrToString = (arr: string[],connector:string) => {
    let string = "";
    for (let e in arr) {
        e = e[0].toUpperCase() + e.slice(1);
    }
    arr.sort();
    arr.map((n, i) => string += n + ((i !== arr.length - 1) ? connector : ""))
    return string
}
