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
const move = (source:any, destination:any, droppableSource:any, droppableDestination:any) => {
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
    background: isDraggingOver ? "#FF7F7F" : "lightgrey",
    padding: grid,
    margin:`0 0 20px 0`,
    width: 250
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
    const [ActivePricingCases, setActivePricingCases] = useState<PricingCaseDTO[]>([])
    
    const [loaded, setLoaded] = useState<boolean>(false)
    const onDragEnd = (result: any) => {
        const { source, destination } = result;
        // dropped outside the list
        if (!destination) {
        return;
        }
        const sInd = +source.droppableId;
        const dInd = +destination.droppableId; 

        if (sInd === dInd) {
            if(sInd == -1){
                const items:any = reorder(groupCases, source.index, destination.index);
                const newState:any = [...groupCases];   
                newState[sInd] = items;
                setGroupCases(newState[-1]);
            }else{

                const items:any = reorder(ActivePricingCases[sInd].pricingCaseGroups, source.index, destination.index);
                const newState:any = [...ActivePricingCases];
                newState[sInd].pricingCaseGroups = items;
                setActivePricingCases(newState);
            }
            
        }else{
              
            if(sInd == -1){
                const result:any = move(groupCases, ActivePricingCases[dInd].pricingCaseGroups, source, destination);
                let newStateGroup:any = groupCases;
                const newStateCases:any = ActivePricingCases;
                newStateGroup = result[sInd]; 
                newStateCases[dInd].pricingCaseGroups = result[dInd];
                setGroupCases(newStateGroup)
                setActivePricingCases(newStateCases)

            }else if(dInd == -1){
                const result:any = move(ActivePricingCases[sInd].pricingCaseGroups,groupCases, source, destination);
                let newStateGroup:any = groupCases;
                const newStateCases:any = ActivePricingCases;
                newStateGroup = result[dInd]; 
                newStateCases[sInd].pricingCaseGroups = result[sInd];
                setGroupCases(newStateGroup)
                setActivePricingCases(newStateCases)
            }else{
                const result:any = move(ActivePricingCases[sInd].pricingCaseGroups,ActivePricingCases[dInd].pricingCaseGroups, source, destination);
                const newStateCases:any = ActivePricingCases;
                newStateCases[sInd].pricingCaseGroups = result[sInd];
                newStateCases[dInd].pricingCaseGroups = result[dInd];
                setActivePricingCases(newStateCases)
            }

            
      
            
          }

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
                                <div className='col-4'>
                                    <Droppable droppableId="-1">
                                        {(provided, snapshot) => (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                style={getListStyle(snapshot.isDraggingOver)}
                                            >
                                                <h3>Grupos</h3>
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
                                                                {item.group.name + (item.leadersCourse ? " (Curso de Madrijim)" : "")}
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







                            {ActivePricingCases &&
                                <div className='col-8'>
                                    <h3>Casos</h3>
                                    {ActivePricingCases.map((el, ind) => (
                                                    <Droppable key={ind} droppableId={`${ind}`}>
                                                        {(provided, snapshot) => (
                                                            <div
                                                            
                                                            ref={provided.innerRef}
                                                            style={getListStyle(snapshot.isDraggingOver)}
                                                            className="BodyPricingCases"
                                                            {...provided.droppableProps}
                                                           
                                                            >
                                                                
                                                                <h3>{el.name}</h3>
                                                                

                                                                {el.pricingCaseGroups.map((item, index) => (
                                                                    <Draggable
                                                                    draggableId={`${item.group.name+index}`}
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