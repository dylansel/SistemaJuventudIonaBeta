export const reorder = (list: any, startIndex: any, endIndex: any) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export const move = (source: any, destination: any, droppableSource: any, droppableDestination: any) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result: any = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;

export const getListStyle = (isDraggingOver: any) => ({
    background: isDraggingOver ? "#c7002f71" : "#9202245d",
    padding: grid,
    margin: `0 0 20px 0`,
    width: "100%",
});

export const getCasesStyle = (isDraggingOver: any) => ({
    background: isDraggingOver ? "#FF7F7F" : "lightgrey",
    padding: grid,
    margin: `0 0 20px 0`,
    width: "100%",
});

export const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    userSelect: "none",
    padding: grid * 3,
    margin: `0 0 ${grid}px 0`,

    background: isDragging ? "lightgreen" : "#EED3D3",
    fontWeight: isDragging ? "bold" : "normal",

    ...draggableStyle
});
