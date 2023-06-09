import React, { useState, useEffect } from "react"
import { getAddJanijData } from "../../../../services/viewService";
import { Button, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Alert, Spinner } from 'reactstrap';
import CreatableSelectSearch from "../../Selects/CreatableSelect";
import { capitalizeAllWords, isEmptyOrSpaces } from "../../../../utils/misc/strings";
import { addFamily } from '../../../../services/familyService';
import { addJanij } from '../../../../services/janijService';
import GroupDTO from "../../../../dtos/GroupDTO";
import  JanijDTO  from "../../../../dtos/JanijDTO";

function AddJanijBody(props: any) {

    let initialFieldsState:JanijDTO = {
        name: "",
        group: "",
        fullName: "",
        birthday: "",
        nationalId: 0,
        address: "",
        email: "",
        cellphone: "",
        school: "",
        notes: "",
        mother: {
          name: "",
          cellphone: "",
          email: "",
        },
        father: {
          name: "",
          cellphone: "",
          email: "",
        },
      };
    const [fields, setFields] = useState<JanijDTO[]>([initialFieldsState])
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState(false)
    const [isAdding, setIsAdding] = useState(false)
    const [viewData, setViewData] = useState<any>([null])
    const [actualView,setActualView] = useState(0)

    async function fetchData() {
        setLoaded(false)
        setViewData(await getAddJanijData())
        setLoaded(true)
    }
    const agregarHandleChange = (e: any) => {
        const newFields = ()=>{
            setFields((prevState) => {
                const newFields = [...prevState, initialFieldsState];
                return newFields;
              });
        }


        if(e.target.name == 'nuevo'){
            newFields()
            setActualView(actualView+1)
        }
        
        if(e.target.name == 'anterior'){ 
            if(actualView>0){setActualView(actualView-1)};
        }
        if(e.target.name == 'siguiente'){
            if(fields.length < actualView+2){newFields()};
            setActualView(actualView+1);
        }
    }
    const addHandleChange = (e: any) => {
        setError(false);
        const { name, value } = e.target;
        const [actualV, fieldName, subFieldName] = name.split('.');
      
        if (subFieldName) {
          setFields((prevState) => {
            const updatedFields = [...prevState];
            updatedFields[actualV] = {
              ...updatedFields[actualV],
              [fieldName]: {
                ...(updatedFields[actualV] as any)[fieldName],
                [subFieldName]: value,
              },
            };
            return updatedFields;
          });
        } else {
          setFields((prevState) => {
            const updatedFields = [...prevState];
            updatedFields[actualV] = {
              ...updatedFields[actualV],
              [fieldName]: value,
            };
            return updatedFields;
          });
        }
      };

      const addJanijInBackground = async () => {
        try {
          await addJanij(fields);
          alert("Se agrego correctamente")
          props.refresh();
        } catch (error) {
          console.error(error);
          alert("no se pudo crear el/los janij/m")
          
        }
      };
      
    const postRequest = async () => {
        setError(false)
        if (isEmptyOrSpaces(fields[0].name) && fields[0].group === ""){
            setError(true)
            return
        }
        setIsAdding(true)
        addJanijInBackground();
        setIsAdding(false);
        // const janijToAdd = fields
        // console.log("R",janijToAdd)
        // await addJanij(janijToAdd)
        props.toggle()
        // setIsAdding(false)
        // props.refresh()
    }

    const toggleCancelAddModal = () => {
        setError(false)
        props.toggle()
    }
    useEffect(() => {
        fetchData()
    }, []);

    return (
        <>
            <ModalHeader toggle={toggleCancelAddModal} charcode="close">
                {props.title} Janij {(fields.length == 1)?"":` | ${actualView+1}`}
            </ModalHeader>
            <ModalBody>
                {error && <Alert color="danger">Error! Datos incorrectos</Alert>}
                <Form>
                    <FormGroup>
                    <Label for={`${actualView}.name`}>
                            Nombre y Apellido
                        </Label>
                        <Input
                            id={`${actualView}.name`}
                            disabled={!(loaded && viewData &&  viewData["groups"]) || isAdding}
                            name={`${actualView}.name`}
                            onChange={addHandleChange}
                            value={fields[actualView].name}
                            autoComplete="off"
                            placeholder={(!(loaded && viewData &&  viewData["groups"])) ? "Cargando..." : ""}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for={`${actualView}.group`}>Grupo</Label>
                        <Input
                            id={`${actualView}.group`}
                            name={`${actualView}.group`}
                            className="mb-3"
                            type="select"
                            onChange={addHandleChange}
                            value={fields[actualView].group ? fields[actualView].group : "-1"}                            
                            disabled={!(loaded && viewData && viewData["groups"]) || isAdding}
                        >
                            {(!(loaded && viewData && viewData["groups"])) &&
                                <option disabled selected>Cargando...</option>
                            }
                            {(loaded) &&
                            <option key="-1" value="-1" selected disabled >Elija un grupo</option>
                            }
                            {loaded && viewData && viewData["groups"].map((group: GroupDTO) => (
                                <option key={group.name.split(" ")[0]} value={group.name}>{group.name.split(" ")[1]}</option>
                            ))}
                        </Input>
                    </FormGroup>
                    {/* DATOS ADICIONALES 
                    <FormGroup>
                        <Label for={`${actualView}.group`}>
                            Nombre y apellido COMPLETOS
                        </Label>
                        <Input
                            id="fullName"
                            disabled={!(loaded && viewData &&  viewData["groups"]) || isAdding}
                            name="fullName"
                            onChange={addHandleChange}
                            autoComplete="off"
                            placeholder={(!(loaded && viewData &&  viewData["groups"])) ? "Cargando..." : ""}
                        />
                    </FormGroup>
*/}

                    <ModalFooter>
                        {(fields.length == 1)?
                            <Button
                            color="primary"
                            name="nuevo"
                            onClick={agregarHandleChange}
                            disabled={isAdding}
                            >
                            Agregar mas 
                            </Button>
                            :
                            < >
                                <Button
                                color="primary"
                                name="anterior"
                                onClick={agregarHandleChange}
                                disabled={isAdding}
                                >
                                anterior 
                                </Button>
                                <h3>{actualView+1}</h3>
                                <Button
                                color="primary"
                                name="siguiente"
                                onClick={agregarHandleChange}
                                disabled={isAdding}
                                > 
                                siguiente
                                </Button>
                            
                            </>
                        }
                        
                        <Button
                            onClick={toggleCancelAddModal}
                            disabled={isAdding}
                        >
                            Cancelar
                        </Button>
                        <Button
                            color={isAdding ? "success" : "danger"}
                            disabled={!(loaded && viewData && viewData["groups"]) || isAdding}
                            onClick={postRequest}
                        >
                            {isAdding ? <div>Guardando... <Spinner animation="border" variant="light" size="sm" /></div> : props.title}
                        </Button>
                    </ModalFooter>
                </Form>
            </ModalBody>

        </>
    );
}

export default AddJanijBody
