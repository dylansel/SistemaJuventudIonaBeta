export const filterActive = (tableFilter: string, item: any) => {
    return (tableFilter === 'Todos' || ((tableFilter === 'Activos' && item.active) || (tableFilter === 'Inactivos' && !item.active)))
}