export const filterActive = (tableFilter: string, item: any) => {
    return (tableFilter === 'Todos' || ((tableFilter === 'Activos' && item.active) || (tableFilter === 'Inactivos' && !item.active)))
}

export const isActiveToMonth = (date1: string, date2: string)=>{
    const today = new Date();
    const d1 = date1.split("-");
    const d2 = date2.split("-");
    const d_1 = new Date(parseInt(d1[0]), parseInt(d1[1])-1);
    const d_2 = new Date(parseInt(d2[0]), parseInt(d2[1]),0);
    return (today >= d_1 && today <= d_2)
}

export const filterActiveToMonth = (tableFilter: string,date1: string, date2: string) => {
    const isActive = isActiveToMonth(date1,date2)
    return (tableFilter === 'Todos' || ((tableFilter === 'Activos' && isActive) || (tableFilter === 'Inactivos' && !isActive)))
}


   