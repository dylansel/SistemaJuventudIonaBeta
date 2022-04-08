export const filterActive = (tableFilter: string, item: any) => {
    return (!((tableFilter === 'Inactivos' && item.active) || (tableFilter === 'Activos' && !item.active)))
}