export const reorder = (list: any, startIndex: any, endIndex: any) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export const compareObjects = (initialState:any, updatedState:any) => {
    const editedFields:any = {};

    for (const key in initialState) {
      if (initialState[key] !== updatedState[key]) {
        editedFields[key] = updatedState[key];
      }
    }

    return editedFields;
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
    background: isDraggingOver ? "#c7002f71" : "#FFFFFF",
    border: '1px solid',
    borderRadius: '10px',
    padding: grid,
    margin: `0 0 20px 0`,
    width: "100%",
    alignItems: "center"
});

export const getCasesStyle = (isDraggingOver: any) => ({
    background: isDraggingOver ? "#FF7F7F" : "#FFFFFF",
    border: '1px solid',
    borderRadius: '10px',
    padding: grid,
    margin: `0 0 20px 0`,
    width: "100%",
});

export const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    borderRadius: '10px',
    width: isDragging ? '20%' : '100%',
    background: isDragging ? "#DD5041" : "#EED3D3",
    fontWeight: isDragging ? "bold" : "normal",
    ...draggableStyle
});
