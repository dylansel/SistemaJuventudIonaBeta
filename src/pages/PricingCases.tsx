import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from './misc/Loading';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';
import PricingCaseGroupDTO from '../dtos/PricingCaseGroupDTO';
import { getGroupCases, getActive, savePricingCases } from '../services/pricingCaseService';
import Scroll from '../components/UI/Layout/Scroll';
import PricingCaseDTO from '../dtos/PricingCaseDTO';
import { Button, Input, Spinner } from 'reactstrap';
import { reorder, move, getListStyle, getCasesStyle, getItemStyle } from '../utils/dnd/dnd-functions';

function PricingCases() {
    const [filteredGroupCases, setFilteredGroupCases] = useState<PricingCaseGroupDTO[]>([])
    const [activePricingCases, setActivePricingCases] = useState<PricingCaseDTO[]>([])
    const [isSaving, setIsSaving] = useState<boolean>(false)
    const [loaded, setLoaded] = useState<boolean>(false)
    const [caseName, setCaseName] = useState<string>('')
    const [handleAddCaseActive, setHandleAddCaseActive] = useState<boolean>(false)
    const [isCreating, setIsCreating] = useState<boolean>(false)

    const refresh = () => {
        setTimeout(() => {
            setCaseName('')
            setHandleAddCaseActive(false)
        }, 1);
    }

    const onDragEnd = (result: any) => {
        const { source, destination } = result;
        if (!destination) {
            return;
        }
        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        if (sInd === dInd) {
            if (sInd === -1) {
                const items: any = reorder(filteredGroupCases, source.index, destination.index);
                const newState: any = [...filteredGroupCases];
                newState[sInd] = items;
                setFilteredGroupCases(newState[-1]);
            } else {
                const items: any = reorder(activePricingCases[sInd].pricingCaseGroups, source.index, destination.index);
                const newState: any = [...activePricingCases];
                newState[sInd].pricingCaseGroups = items;
                setActivePricingCases(newState);
            }
        } else {
            if (sInd === -1) {
                const result: any = move(filteredGroupCases, activePricingCases[dInd].pricingCaseGroups, source, destination);
                let newStateGroup: any = filteredGroupCases;
                const newStateCases: any = activePricingCases;
                newStateGroup = result[sInd];
                newStateCases[dInd].pricingCaseGroups = result[dInd];
                setFilteredGroupCases(newStateGroup)
                setActivePricingCases(newStateCases)

            } else if (dInd === -1) {
                const result: any = move(activePricingCases[sInd].pricingCaseGroups, filteredGroupCases, source, destination);
                let newStateGroup: any = filteredGroupCases;
                const newStateCases: any = activePricingCases;
                newStateGroup = result[dInd];
                newStateCases[sInd].pricingCaseGroups = result[sInd];
                setFilteredGroupCases(newStateGroup)
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

    const filterGroupCases = async () => {
        const groupCases = await getGroupCases()
        let filteredGroupCases: PricingCaseGroupDTO[] = []
        for (const groupCase of groupCases) {
            let isInAnyPricingCase: boolean = false
            let i = 0
            while (!isInAnyPricingCase && i < activePricingCases.length) {
                let j = 0
                while (!isInAnyPricingCase && j < activePricingCases[i].pricingCaseGroups.length) {
                    if (activePricingCases[i].pricingCaseGroups[j].group.name ===
                        groupCase.group.name && activePricingCases[i].pricingCaseGroups[j].leadersCourse === groupCase.leadersCourse) {
                        isInAnyPricingCase = true
                    }
                    else {
                        j++
                    }
                }
                i++
            }
            if (!isInAnyPricingCase) {
                filteredGroupCases.push(groupCase)
            }
        }
        console.log(filteredGroupCases)
        return filteredGroupCases
    }

    const handleChangeName = (e: any) => {
        setCaseName(e.target.value)
    }

    const handleSaveCase = (i: any) => {
        const newStateCases: any = activePricingCases;
        newStateCases[i].name = caseName;
        setActivePricingCases(newStateCases)
        setCaseName('')
        setHandleAddCaseActive(false)
        setIsCreating(false)
        refresh()
    }

    const handleAddCase = () => {
        setIsCreating(true)
        setHandleAddCaseActive(true);
        activePricingCases.push({
            name: ``,
            pricingCaseGroups: []
        })
        refresh()
    }

    const handleDeleteCase = (name: string) => {
        setActivePricingCases(activePricingCases.filter(pricingCase => pricingCase.name !== name))
        setIsCreating(false)
        setHandleAddCaseActive(false)
        refresh()
    }

    async function handleSaveCases() {
        setIsSaving(true)
        let newPricingCases: any = [...activePricingCases]
        newPricingCases.map((e: any, i: any) => {
            e.pricingCaseGroups.map((el: any) => {
                el.groupId = el.group.id
                delete el.group
                console.log(el)
            })
        })
        console.log(newPricingCases)
        await savePricingCases(newPricingCases)
        setIsSaving(false)
        window.location.reload() //Not the best way to refresh page
    }

    async function fetchData() {
        setLoaded(false)
        setActivePricingCases(await getActive())
        setFilteredGroupCases(await filterGroupCases())
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

                            {filteredGroupCases &&
                                <div className='col-12 col-md-3'>
                                    <Droppable droppableId="-1">
                                        {(provided, snapshot) => (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                style={getListStyle(snapshot.isDraggingOver)}
                                            >
                                                <h2 className='py-3'>Grupos</h2>
                                                {filteredGroupCases.map((item, index) => (
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
                                <div className='col-12 col-md-7 padrepricingCasesActive-custom mx-auto'>
                                    <div className='justify-content-center d-flex py-3'>
                                        <h2 className='px-5'>Casos</h2>
                                        <button type='button' title='Agregar' className="btn btn-danger mx-2" onClick={handleAddCase} disabled={isCreating}><i className="fas fa-plus"></i> Agregar Nuevo Caso</button>
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
                                                            <div className='d-flex flex-row'>
                                                                {element.name !== "" ?
                                                                    <a data-bs-toggle="collapse" href={`#case${index}`} role="button" aria-expanded="false" aria-controls={`#case${index}`}>
                                                                        <h3 className='px-5'>{element.name}</h3>
                                                                    </a>
                                                                    : <>
                                                                        <Input
                                                                            type='text'
                                                                            id={`${index}`}
                                                                            className="w-100"
                                                                            name={`pricingCaseName${index}`}
                                                                            value={caseName}
                                                                            placeholder='Nombre del caso'
                                                                            onChange={handleChangeName}
                                                                        />
                                                                    </>

                                                                }
                                                                <a data-bs-toggle="collapse" href={`#case${index}`} role="button" aria-expanded="false" aria-controls={`#case${index}`}>
                                                                    <i className="fas fa-angle-down mx-5"></i>
                                                                </a>
                                                            </div>
                                                            <div>
                                                                <button type='button' title={(handleAddCaseActive) ? 'Guardar' : 'Editar'} className="btn btn-danger m-1 " onClick={() => { handleSaveCase(index) }} ><i className="fas fa-edit"></i></button>
                                                                <button type='button' title='Eliminar' className="btn btn-danger" onClick={() => { handleDeleteCase(element.name) }} ><i className="fas fa-trash"></i></button>
                                                            </div>

                                                        </div>
                                                        <div className="collapse show" id={`case${index}`}>
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
                                                                            {item.group.name + (item.leadersCourse ? " (Curso)" : "")}
                                                                        </div>
                                                                    )}

                                                                </Draggable>
                                                            ))}
                                                            {provided.placeholder}
                                                        </div>
                                                    </div>
                                                )}
                                            </Droppable>
                                        ))}
                                    </div>
                                    <Button
                                        onClick={handleSaveCases}
                                        className='my-3'
                                        color={isSaving ? 'success' : 'danger'}
                                        disabled={isSaving || activePricingCases.length === 0 || isCreating}
                                        type='button'
                                    >{isSaving ? <div>Guardando... <Spinner animation="border" variant="light" size="sm" /></div> : "Guardar Casos de Precios"}</Button>

                                </div>
                            }
                        </DragDropContext>
                    </div >
                    :
                    <Loading />
            }
            <Scroll showBelow={250} />
        </main >
    );
}

export default withAuthenticationRequired(PricingCases, {
    onRedirecting: () => <Loading />,
});