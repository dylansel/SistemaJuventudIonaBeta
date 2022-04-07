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
import { useCallbackPrompt } from '../customHooks/useCallbackPrompts';
import DialogBox from '../components/UI/Modals/DialogBox';

function PricingCases() {
    const [filteredGroupCases, setFilteredGroupCases] = useState<PricingCaseGroupDTO[]>([])
    const [previousPricingCases, setPreviousPricingCases] = useState<PricingCaseDTO[]>([])
    const [activePricingCases, setActivePricingCases] = useState<PricingCaseDTO[]>([])
    const [isSaving, setIsSaving] = useState<boolean>(false)
    const [loaded, setLoaded] = useState<boolean>(false)
    const [caseName, setCaseName] = useState<string>('')
    const [handleAddCaseActive, setHandleAddCaseActive] = useState<boolean>(false)
    const [isCreating, setIsCreating] = useState<boolean>(false)
    const [indexSelectCase, setIndexSelectCase] = useState(-1)

    const [showDialog, setShowDialog] = useState(false)
    const [showPrompt, confirmNavigation, cancelNavigation] =
        useCallbackPrompt(showDialog)

    const refresh = () => {
        setTimeout(() => {
            setCaseName('')
            setHandleAddCaseActive(false)
        }, 1);
    }

    const processReorder = (list: any, source: any, destination: any) => {
        const items: any = reorder(list, source.index, destination.index);
        const newState: any = [...list];
        newState[+source.droppableId] = items;
        return newState
    }

    const onDragEnd = (result: any) => {
        console.log(result)
        const { source, destination } = result;
        //El grupo se suelta fuera de cualquier droppable
        if (!destination) {
            return;
        }
        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        if (sInd === dInd) {
            if (sInd === -1) {
                //Invierto el orden de la lista de grupos
                const newState = processReorder(filteredGroupCases, source, destination)
                setFilteredGroupCases(newState[-1]);
            } else {
                //Invierto el orden de grupos de un caso de precio
                const newState = processReorder(activePricingCases, source, destination)
                setActivePricingCases(newState);
            }
        } else {
            let newStateCases: PricingCaseDTO[]
            if (sInd === -1 && dInd !== -1 || sInd !== -1 && dInd === -1) {
                //El grupo se movió entre la lista de grupos y los casos de precios
                let newStateGroup: PricingCaseGroupDTO[]
                if (sInd === -1) {
                    //Muevo un grupo de la lista de grupos a un caso de precio
                    const result: any = move(filteredGroupCases, activePricingCases[dInd].pricingCaseGroups, source, destination);
                    newStateGroup = filteredGroupCases;
                    newStateCases = [...activePricingCases];
                    newStateGroup = result[sInd];
                    newStateCases[dInd].pricingCaseGroups = result[dInd];
                } else {
                    //Muevo un grupo de un caso de precio a la lista de grupos
                    const result: any = move(activePricingCases[sInd].pricingCaseGroups, filteredGroupCases, source, destination);
                    newStateGroup = filteredGroupCases;
                    newStateCases = [...activePricingCases];
                    newStateGroup = result[dInd];
                    newStateCases[sInd].pricingCaseGroups = result[sInd];
                }
                setFilteredGroupCases(newStateGroup)
            }
            else {
                //Muevo un grupo de un caso de precio a otro
                const result: any = move(activePricingCases[sInd].pricingCaseGroups, activePricingCases[dInd].pricingCaseGroups, source, destination);
                newStateCases = [...activePricingCases];
                newStateCases[sInd].pricingCaseGroups = result[sInd];
                newStateCases[dInd].pricingCaseGroups = result[dInd];
            }
            setActivePricingCases(newStateCases)
        }
    }

    const filterGroupCases = async () => {
        const groupCases = await getGroupCases()
        const pricingCases = await getActive()
        let filteredGroupCases: PricingCaseGroupDTO[] = []
        for (const groupCase of groupCases) {
            let isInAnyPricingCase: boolean = false
            let i = 0
            while (!isInAnyPricingCase && i < pricingCases.length) {
                let j = 0
                while (!isInAnyPricingCase && j < pricingCases[i].pricingCaseGroups.length) {
                    if (pricingCases[i].pricingCaseGroups[j].group.name ===
                        groupCase.group.name && pricingCases[i].pricingCaseGroups[j].leadersCourse === groupCase.leadersCourse) {
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
        return filteredGroupCases
    }

    const handleChangeName = (e: any) => {
        setCaseName(e.target.value)
    }

    const handleSaveCase = (i: any) => {
        setHandleAddCaseActive(true);
        const pricingCase = activePricingCases.find((pricingCase: PricingCaseDTO) => pricingCase.name === caseName)
        if (pricingCase) {
            alert("Este nombre ya existe")
            return
        }
        setIsCreating(true)
        const newStateCases: any = activePricingCases;
        newStateCases[i].name = caseName;
        setActivePricingCases(newStateCases)
        setIsCreating(false)
        if (!caseName) {
            setIsCreating(true)
            setIndexSelectCase(i)
        }
        refresh()
    }

    const handleAddCase = () => {
        setIsCreating(true)
        setHandleAddCaseActive(true);
        activePricingCases.push({
            name: ``,
            pricingCaseGroups: []
        })
        setIndexSelectCase(activePricingCases.length - 1)
        refresh()
    }

    const handleDeleteCase = (name: string) => {
        const pricingCase = activePricingCases.find((pricingCase: PricingCaseDTO) => pricingCase.name === name)
        if (pricingCase) {
            pricingCase.pricingCaseGroups.forEach((groupCase: PricingCaseGroupDTO) => {
                filteredGroupCases.push(groupCase)
            })
            setActivePricingCases(activePricingCases.filter(pricingCase => pricingCase.name !== name))
            setIsCreating(false)
            setHandleAddCaseActive(false)
            refresh()
        }
    }

    async function handleSaveCases() {
        setIsSaving(true)
        setLoaded(false)
        let newPricingCases: any = [...activePricingCases]
        newPricingCases.forEach((e: any) => {
            e.pricingCaseGroups.forEach((el: any) => {
                el.groupId = el.group.id
                delete el.group
            })
        })
        await savePricingCases(newPricingCases)
        setIsSaving(false)
        fetchData()
    }

    async function fetchData() {
        setLoaded(false)
        setPreviousPricingCases(await getActive())
        setActivePricingCases(await getActive())
        setFilteredGroupCases(await filterGroupCases())
        setLoaded(true)
    }

    useEffect(() => {
        fetchData()
    }, []);

    useEffect(() => {
        console.log(activePricingCases)
        console.log(previousPricingCases)
        setShowDialog(JSON.stringify(previousPricingCases) !== JSON.stringify(activePricingCases))
    }, [activePricingCases])

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
                                                                <button type='button' title={(handleAddCaseActive) ? 'Guardar' : 'Editar'} disabled={isCreating && index !== indexSelectCase} className="btn btn-danger m-1 " onClick={() => { handleSaveCase(index) }} ><i className={`fas fa-${(isCreating && index === indexSelectCase) ? "save" : "edit"}`}></i></button>
                                                                <button type='button' title='Eliminar' className="btn btn-danger" onClick={() => { handleDeleteCase(element.name) }} ><i className="fas fa-trash"></i></button>
                                                            </div>

                                                        </div>
                                                        <div className="collapse show" id={`case${index}`}>
                                                            {element.pricingCaseGroups.map((item, index) => (
                                                                <Draggable
                                                                    draggableId={`${item.group.name + index}`}
                                                                    index={index}
                                                                    key={index}
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
            <DialogBox
                title='Alerta'
                showDialog={showPrompt}
                confirmNavigation={confirmNavigation}
                cancelNavigation={cancelNavigation}
            />
            <Scroll showBelow={250} />
        </main >
    );
}

export default withAuthenticationRequired(PricingCases, {
    onRedirecting: () => <Loading />,
});