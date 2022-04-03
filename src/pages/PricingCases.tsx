import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from './misc/Loading';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';
import PricingCaseGroupDTO from '../dtos/PricingCaseGroupDTO';
import { getGroupCases, getActive, savePricingCases } from '../services/pricingCaseService';
import Scroll from '../components/UI/Layout/Scroll';
import PricingCaseDTO from '../dtos/PricingCaseDTO';
import { Button, Input, Spinner } from 'reactstrap';

const reorder = (list: any, startIndex: any, endIndex: any) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};
const move = (source: any, destination: any, droppableSource: any, droppableDestination: any) => {
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

const getListStyle = (isDraggingOver: any) => ({
    background: isDraggingOver ? "#c7002f71" : "#9202245d",
    padding: grid,
    margin: `0 0 20px 0`,
    width: "100%",
});

const getCasesStyle = (isDraggingOver: any) => ({
    background: isDraggingOver ? "#FF7F7F" : "lightgrey",
    padding: grid,
    margin: `0 0 20px 0`,
    width: "100%",
});

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 3,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "#EED3D3",

    // styles we need to apply on draggables
    ...draggableStyle
});

function PricingCases() {
    const [groupCases, setGroupCases] = useState<PricingCaseGroupDTO[]>([])
    const [activePricingCases, setActivePricingCases] = useState<PricingCaseDTO[]>([])
    const [isSaving, setIsSaving] = useState(false)
    const [loaded, setLoaded] = useState<boolean>(false)
    const [caseName, setCaseName] = useState('')
    const [handleAddCaseActive,setHandleAddCaseActive] = useState<boolean>(false)
    const refresh = () => {
        setLoaded(false)
        setTimeout(() => {
          setLoaded(true)  
        }, 1);
    }
    const onDragEnd = (result: any) => {
        const { source, destination } = result;
        // dropped outside the list
        if (!destination) {
            return;
        }
        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        if (sInd === dInd) {
            if (sInd === -1) {
                const items: any = reorder(groupCases, source.index, destination.index);
                const newState: any = [...groupCases];
                newState[sInd] = items;
                setGroupCases(newState[-1]);
            } else {
                const items: any = reorder(activePricingCases[sInd].pricingCaseGroups, source.index, destination.index);
                const newState: any = [...activePricingCases];
                newState[sInd].pricingCaseGroups = items;
                setActivePricingCases(newState);
            }
        } else {
            if (sInd === -1) {
                const result: any = move(groupCases, activePricingCases[dInd].pricingCaseGroups, source, destination);
                let newStateGroup: any = groupCases;
                const newStateCases: any = activePricingCases;
                newStateGroup = result[sInd];
                newStateCases[dInd].pricingCaseGroups = result[dInd];
                setGroupCases(newStateGroup)
                setActivePricingCases(newStateCases)

            } else if (dInd === -1) {
                const result: any = move(activePricingCases[sInd].pricingCaseGroups, groupCases, source, destination);
                let newStateGroup: any = groupCases;
                const newStateCases: any = activePricingCases;
                newStateGroup = result[dInd];
                newStateCases[sInd].pricingCaseGroups = result[sInd];
                setGroupCases(newStateGroup)
                setActivePricingCases(newStateCases)
            } else {
                const result: any = move(activePricingCases[sInd].pricingCaseGroups, activePricingCases[dInd].pricingCaseGroups, source, destination);
                const newStateCases: any = activePricingCases;
                newStateCases[sInd].pricingCaseGroups = result[sInd];
                newStateCases[dInd].pricingCaseGroups = result[dInd];
                setActivePricingCases(newStateCases)
            }
        }
    }

    const handleChangeName =(e: any) =>{
       setCaseName(e.target.value)
    }
    const handleSaveCase =(i: any) =>{
        console.log(activePricingCases[i].name)
        const newStateCases: any = activePricingCases;
        newStateCases[i].name=caseName; //hay que captar el value del input
        setActivePricingCases(newStateCases)
        setCaseName('')
        setHandleAddCaseActive(false)
        refresh()

    }
    const handleAddCase = () => {
        setHandleAddCaseActive(true);
        activePricingCases.push({
            name: ``,
            pricingCaseGroups: []
        })
        refresh()
    }

    const handleDeleteCase = (name: string) => {
        setActivePricingCases(activePricingCases.filter(pricingCase => pricingCase.name !== name))
        
    }

    const handleSaveCases = () => {
        setIsSaving(true)
        //call savePricingCases...
        console.log(activePricingCases)
        setIsSaving(false)
    }

    async function fetchData() {
        setLoaded(false)
        setActivePricingCases(await getActive())
        setGroupCases(await getGroupCases())
        setLoaded(true)
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <main>
            {
                loaded ?

                    <div className="main-container row justify-content-center text-center px-5">
                        <DragDropContext onDragEnd={onDragEnd}>

                            {groupCases &&
                                <div className='col-12 col-md-3'>
                                    <Droppable droppableId="-1">
                                        {(provided, snapshot) => (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                style={getListStyle(snapshot.isDraggingOver)}
                                            >
                                                <h2 className='py-3'>Grupos</h2>
                                                {groupCases.map((item, index) => (
                                                    <Draggable key={index} draggableId={`g${index}`} index={index}>
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={getItemStyle(
                                                                    snapshot.isDragging,
                                                                    provided.draggableProps.style
                                                                )}
                                                            >
                                                                {item.group.name + (item.leadersCourse ? " (Curso)" : "")}
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </div>
                            }
                            <div className="d-xs-none col-1"></div>

                            {activePricingCases &&
                                <div className='col-12 col-md-7 padrepricingCasesActive-custom'>
                                    <div className='justify-content-center d-flex py-3'>
                                    <h2>Casos</h2>
                                    <button type='button' title='Agregar' className="btn btn-danger mx-2" onClick={handleAddCase} disabled={handleAddCaseActive}><i className="fas fa-plus"></i> Agregar Caso</button>
                                    </div>
                                    <div className='pricingCasesActive-custom'>
                                        {activePricingCases.map((element, index) => (
                                            <Droppable key={index} droppableId={`${index}`}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        style={getCasesStyle(snapshot.isDraggingOver)}
                                                        className="bodyPricingCases"
                                                        {...provided.droppableProps}
                                                    >
                                                        <div className='justify-content-center d-flex flex-row py-3 '>

                                                            {element.name !== "" ?
                                                                <h3 className='px-5'>{element.name}</h3>
                                                                :<>
                                                                <Input
                                                                    type='text'
                                                                    id={`${index}`}
                                                                    className="w-50"
                                                                    name={`pricingCaseName${index}`}
                                                                    value={caseName}
                                                                    placeholder='Nombre del caso'
                                                                    onChange={handleChangeName}
                                                                />
                                                                </>

                                                            }
                                                            <div>
                                                                <button type='button' title={(handleAddCaseActive)?'Guardar':'Editar'} className="btn btn-danger m-1 " onClick={() => { handleSaveCase(index) }} ><i className="fas fa-edit"></i></button>
                                                                <button type='button' title='Eliminar' className="btn btn-danger" onClick={() => { handleDeleteCase(element.name) }} ><i className="fas fa-trash"></i></button>
                                                            </div>
                                                            
                                                        </div>

                                                        {element.pricingCaseGroups.map((item, index) => (
                                                            <Draggable
                                                                draggableId={`${item.group.name + index}`}
                                                                index={index}
                                                            >
                                                                {(provided, snapshot) => (

                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        style={getItemStyle(
                                                                            snapshot.isDragging,
                                                                            provided.draggableProps.style
                                                                        )}
                                                                    >
                                                                        {item.group.name}
                                                                    </div>
                                                                )}

                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                        ))}
                                    </div>
                                        <Button
                                            onClick={handleSaveCases}
                                            className='my-3'
                                            color={isSaving ? 'success' : 'danger'}
                                            disabled={isSaving}
                                            type='button'
                                        >{isSaving ? <div>Guardando... <Spinner animation="border" variant="light" size="sm" /></div> : "Guardar Casos de Precios"}</Button>
                                    
                                </div>
                            }
                        </DragDropContext>
                    </div>
                    :
                    <Loading />
            }
            <Scroll showBelow={250} />
        </main>
    );
}

export default withAuthenticationRequired(PricingCases, {
    onRedirecting: () => <Loading />,
});