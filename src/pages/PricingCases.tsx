import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from './misc/Loading';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';
import PricingCaseGroupDTO from '../dtos/PricingCaseGroupDTO';
import { getGroupCases, getActive } from '../services/pricingCaseService';
import Scroll from '../components/UI/Layout/Scroll';
import PricingCaseDTO from '../dtos/PricingCaseDTO';

const reorder = (list: any, startIndex: any, endIndex: any) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const grid = 8;

const getListStyle = (isDraggingOver: any) => ({
    background: isDraggingOver ? "#FF7F7F" : "lightgrey",
    padding: grid,
    width: 250
});

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "#EED3D3",

    // styles we need to apply on draggables
    ...draggableStyle
});

function PricingCases() {
    const [groupCases, setGroupCases] = useState<PricingCaseGroupDTO[]>()
    const [previousActivePricingCases, setPreviousActivePricingCases] = useState<PricingCaseDTO[]>()

    const [loaded, setLoaded] = useState<boolean>(false)
    const onDragGroupCaseEnd = (result: any) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items: PricingCaseGroupDTO[] = reorder(
            groupCases,
            result.source.index,
            result.destination.index
        ) as PricingCaseGroupDTO[];

        setGroupCases(items)
    }

    async function fetchData() {
        setLoaded(false)
        setGroupCases(await getGroupCases())
        setPreviousActivePricingCases(await getActive())
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
                        <div className='col-4'>
                            {groupCases &&
                                <DragDropContext onDragEnd={onDragGroupCaseEnd}>
                                    <Droppable droppableId="droppable">
                                        {(provided, snapshot) => (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                style={getListStyle(snapshot.isDraggingOver)}
                                            >
                                                {groupCases.map((item, index) => (
                                                    <Draggable key={index} draggableId={index.toString()} index={index}>
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
                                                                {item.group.name + (item.leadersCourse ? "(Curso de Madrijim)" : "")}
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                            }
                        </div>
                        <div className='col-8'>
                            <h4>Casos de Precios</h4>
                            {previousActivePricingCases &&
                                <DragDropContext onDragEnd={onDragGroupCaseEnd}>
                                    <Droppable droppableId="droppable">
                                        {(provided, snapshot) => (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                style={getListStyle(snapshot.isDraggingOver)}
                                            >
                                                {previousActivePricingCases.map((item, index) => (
                                                    <Draggable key={index} draggableId={index.toString()} index={index}>
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
                                                                {item.pricingCaseGroups.map(groupCase => (
                                                                    <p>{groupCase.group.name}</p>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                            }
                        </div>
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