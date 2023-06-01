import React, { useState, useEffect } from "react"
import { getEditJanijData } from "../../../../services/viewService";
import { Button, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Alert, Spinner } from 'reactstrap';
import CreatableSelectSearch from "../../Selects/CreatableSelect";
import { capitalizeAllWords, isEmptyOrSpaces } from "../../../../utils/misc/strings";
import { addFamily } from '../../../../services/familyService';
import { updateJanij } from '../../../../services/janijService';
import GroupDTO from "../../../../dtos/GroupDTO";
import { fileURLToPath } from "url";
import JanijDTO from "../../../../dtos/JanijDTO";

function EditJanijBody(props: any) {

    const [loaded, setLoaded] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const [notEditedFields, setNotEditedFields] = useState<any>()
    const [firstLoad, setFirstLoad] = useState(false)
    const [error, setError] = useState(false)
    const [viewData, setViewData] = useState<any>([null])

    async function fetchData() {
        setLoaded(false)
        setViewData(await getEditJanijData(props.item.name))
        setLoaded(true)
    }

    useEffect(() => {
        fetchData()
    }, []);

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

    const [fields, setFields] = useState(initialFieldsState)

    if (loaded && !firstLoad) {

        initialFieldsState = {
            name: viewData["janijData"].name,
            group: viewData["janijData"].group,
            fullName: viewData["janijData"].fullName,
            birthday: viewData["janijData"].birthday,
            nationalId: viewData["janijData"].nationalId,
            address: viewData["janijData"].address,
            email: viewData["janijData"].email,
            cellphone: viewData["janijData"].cellphone,
            school: viewData["janijData"].school,
            notes: viewData["janijData"].notes,
            mother: {
              name: viewData["janijData"].mother.name,
              cellphone: viewData["janijData"].mother.cellphone,
              email: viewData["janijData"].mother.email,
            },
            father: {
              name: viewData["janijData"].father.name,
              cellphone: viewData["janijData"].father.cellphone,
              email: viewData["janijData"].father.email,
            },
          };
        setNotEditedFields(initialFieldsState)
        setFields(initialFieldsState)
        setFirstLoad(true)
        
    }


    const editHandleChange = (e: any) => {
        setError(false)
        let { name, value } = e.target
        let [fieldName, subFieldName] = name.split('.'); 

        if(subFieldName){
            setFields(prevState => ({
                ...prevState,
                [fieldName]: {
                    ...(prevState as any)[fieldName],
                    [subFieldName]: value
                }
            }))
        }else{
          setFields(prevState => ({
            ...prevState,
            [name]: value
        }))  
        }
        
        console.log(fields)
    }

    const toggleCancelEditModal = () => {
        setError(false)
        props.toggle()
    }

    const updateRequest = async () => {
        setError(false)
        if (isEmptyOrSpaces(fields.name)) {
            setError(true)
            return
        }
        setIsUpdating(true)
        const name = capitalizeAllWords(fields.name)
        let familyId
     
        const janijToEdit = {
            groupId: fields.group,
            name,
            familyId
        }
        if (JSON.stringify(janijToEdit) != JSON.stringify(notEditedFields)) {
            //await updateJanij(props.item.id, janijToEdit)
        }
        setIsUpdating(false)
        props.toggle()
        props.refresh()
    }

    return (
        <>
            <ModalHeader toggle={toggleCancelEditModal} charcode="close">
                {props.title} Janij
            </ModalHeader>
            <ModalBody>
                {error && <Alert color="danger">Error! Datos incorrectos</Alert>}
                <Form>
                    <FormGroup>
                        <Label for="name">
                            Nombre Y Apellido
                        </Label>
                        <Input
                            id="name"
                            disabled={!(loaded && viewData && viewData["groups"] && viewData["janijData"]) || isUpdating || !firstLoad}
                            name="name"
                            onChange={editHandleChange}
                            autoComplete="false"
                            placeholder={(!(loaded && viewData && viewData["families"] && viewData["groups"])) ? "Cargando..." : ""}
                            value={viewData["janijData"] && fields.name}
                        />
                    </FormGroup>
                    {/* <FormGroup>
                        <Label for="familyId">
                            Apellido
                        </Label>
                        <CreatableSelectSearch
                            data={(loaded && viewData && viewData["families"]) ? viewData["families"] : []}
                            disabled={!(loaded && viewData && viewData["families"]) || isUpdating || !firstLoad}
                            display="fullFamily"
                            label="Crear Familia:"
                            id="family"
                            name="family"
                            className="mb-3"
                            onChange={editChangeFamily}
                            placeholder={(loaded && viewData && viewData["families"]) ? fields.familySurname : "Cargando..."}
                            value={viewData["janijData"] && fields.familyId}
                        />
                    </FormGroup> */}
                    <FormGroup>
                        <Label for="group">Grupo</Label>
                        <Input
                            id="group"
                            name="group"
                            className="mb-3"
                            type="select"
                            onChange={editHandleChange}
                            disabled={!(loaded && viewData && viewData["groups"]) || isUpdating || !firstLoad}
                            value={viewData["janijData"] && fields.group}
                        >
                            {(!(loaded && viewData && viewData["groups"])) &&
                                <option disabled selected>Cargando...</option>
                            }

                            {loaded && viewData && viewData["groups"].map((group: GroupDTO,index:number) => (
                                <option key={index} value={group.name}>{group.name.split(" ")[1]}</option>
                            ))}
                        </Input>
                    </FormGroup>
                    {/* Informacion Adicional */}
                    <FormGroup>
                        <Label for="birthday">
                            Cumpleaños
                        </Label>
                        <Input
                            id="birthday"
                            disabled={!(loaded && viewData && viewData["groups"] && viewData["janijData"]) || isUpdating || !firstLoad}
                            name="birthday"
                            type="date"
                            onChange={editHandleChange}
                            autoComplete="false"
                            placeholder={(!(loaded && viewData && viewData["groups"])) ? "Cargando..." : ""}
                            value={viewData["janijData"] && fields.birthday}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="address">
                            Direccion 
                        </Label>
                        <Input
                            id="address"
                            disabled={!(loaded && viewData && viewData["groups"] && viewData["janijData"]) || isUpdating || !firstLoad}
                            name="address"
                            onChange={editHandleChange}
                            autoComplete="false"
                            placeholder={(!(loaded && viewData && viewData["groups"])) ? "Cargando..." : ""}
                            value={viewData["janijData"] && fields.address}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="school">
                            Escuela
                        </Label>
                        <Input
                            id="school"
                            disabled={!(loaded && viewData && viewData["groups"] && viewData["janijData"]) || isUpdating || !firstLoad}
                            name="school"
                            onChange={editHandleChange}
                            autoComplete="false"
                            placeholder={(!(loaded && viewData && viewData["groups"])) ? "Cargando..." : ""}
                            value={viewData["janijData"] && fields.school}
                        />
                    </FormGroup>

                    {/* INFO DE CONTACTO */}
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseContact`} aria-expanded="false" aria-controls={`collapseContact`}><span >Datos de Contacto</span></button>

                    <div className="collapse" id={`collapseContact`}>
                        <div className="card card-body">
                            {/* Informacion Padres */}
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseMadre`} aria-expanded="false" aria-controls={`collapseMadre`}><span >Datos Madre</span></button>

                            <div className="collapse" id={`collapseMadre`}>
                                <div className="card card-body">
                                    <FormGroup>
                                    <Label for="mother.name">
                                        Nombre
                                    </Label>
                                    <Input
                                        id="mother.name"
                                        disabled={!(loaded && viewData && viewData["groups"] && viewData["janijData"]) || isUpdating || !firstLoad}
                                        name="mother.name"
                                        onChange={editHandleChange}
                                        autoComplete="false"
                                        placeholder={(!(loaded && viewData &&  viewData["groups"])) ? "Cargando..." : ""}
                                        value={viewData["janijData"] && fields.mother.name}
                                    />
                                    </FormGroup>
                                    <FormGroup>
                                    <Label for="mother.name">
                                        Telefono
                                    </Label>
                                    <Input
                                        id="mother.cellphone"
                                        disabled={!(loaded && viewData && viewData["groups"] && viewData["janijData"]) || isUpdating || !firstLoad}
                                        name="mother.cellphone"
                                        onChange={editHandleChange}
                                        autoComplete="false"
                                        placeholder={(!(loaded && viewData && viewData["groups"])) ? "Cargando..." : ""}
                                        value={viewData["janijData"] && fields.mother.cellphone}
                                    />
                                    </FormGroup>   
                                    <FormGroup>
                                    <Label for="mother.name">
                                        Email
                                    </Label>
                                    <Input
                                        id="mother.email"
                                        disabled={!(loaded && viewData && viewData["groups"] && viewData["janijData"]) || isUpdating || !firstLoad}
                                        name="mother.email"
                                        onChange={editHandleChange}
                                        autoComplete="false"
                                        placeholder={(!(loaded && viewData && viewData["groups"])) ? "Cargando..." : ""}
                                        value={viewData["janijData"] && fields.mother.email}
                                    />
                                    </FormGroup>     
                                </div>
                            </div>

                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapsePadre`} aria-expanded="false" aria-controls={`collapsePadre`}><span >Datos Padre</span></button>

                            <div className="collapse" id={`collapsePadre`}>
                                <div className="card card-body">
                                    <FormGroup>
                                    <Label for="father.name">
                                        Nombre
                                    </Label>
                                    <Input
                                        id="father.name"
                                        disabled={!(loaded && viewData && viewData["groups"] && viewData["janijData"]) || isUpdating || !firstLoad}
                                        name="father.name"
                                        onChange={editHandleChange}
                                        autoComplete="false"
                                        placeholder={(!(loaded && viewData &&  viewData["groups"])) ? "Cargando..." : ""}
                                        value={viewData["janijData"] && fields.father.name}
                                    />
                                    </FormGroup>
                                    <FormGroup>
                                    <Label for="father.name">
                                        Telefono
                                    </Label>
                                    <Input
                                        id="father.cellphone"
                                        disabled={!(loaded && viewData && viewData["groups"] && viewData["janijData"]) || isUpdating || !firstLoad}
                                        name="father.cellphone"
                                        onChange={editHandleChange}
                                        autoComplete="false"
                                        placeholder={(!(loaded && viewData && viewData["groups"])) ? "Cargando..." : ""}
                                        value={viewData["janijData"] && fields.father.cellphone}
                                    />
                                    </FormGroup>   
                                    <FormGroup>
                                    <Label for="father.name">
                                        Email
                                    </Label>
                                    <Input
                                        id="father.email"
                                        disabled={!(loaded && viewData && viewData["groups"] && viewData["janijData"]) || isUpdating || !firstLoad}
                                        name="father.email"
                                        onChange={editHandleChange}
                                        autoComplete="false"
                                        placeholder={(!(loaded && viewData && viewData["groups"])) ? "Cargando..." : ""}
                                        value={viewData["janijData"] && fields.father.email}
                                    />
                                    </FormGroup>         
                                </div>
                            </div>

                        </div>
                    </div>

                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseAdditional`} aria-expanded="false" aria-controls={`collapseAdditional`}><span >Datos Adicionales</span></button>

                            <div className="collapse" id={`collapseAdditional`}>
                                <div className="card card-body">
                                    <FormGroup>
                                    <Label for="fullName">
                                        Nombre Completo
                                    </Label>
                                    <Input
                                        id="fullName"
                                        disabled={!(loaded && viewData && viewData["groups"] && viewData["janijData"]) || isUpdating || !firstLoad}
                                        name="fullName"
                                        onChange={editHandleChange}
                                        autoComplete="false"
                                        placeholder={(!(loaded && viewData &&  viewData["groups"])) ? "Cargando..." : ""}
                                        value={viewData["janijData"] && fields.fullName}
                                    />
                                    </FormGroup>
                                    <FormGroup>
                                    <Label for="nationalId">
                                        DNI
                                    </Label>
                                    <Input
                                        id="nationalId"
                                        disabled={!(loaded && viewData && viewData["groups"] && viewData["janijData"]) || isUpdating || !firstLoad}
                                        name="nationalId"
                                        onChange={editHandleChange}
                                        autoComplete="false"
                                        placeholder={(!(loaded && viewData && viewData["groups"])) ? "Cargando..." : ""}
                                        value={viewData["janijData"] && fields.nationalId}
                                    />
                                    </FormGroup>   
                                    <FormGroup>
                                    <Label for="email">
                                        Email Janij
                                    </Label>
                                    <Input
                                        id="email"
                                        disabled={!(loaded && viewData && viewData["groups"] && viewData["janijData"]) || isUpdating || !firstLoad}
                                        name="email"
                                        onChange={editHandleChange}
                                        autoComplete="off"
                                        placeholder={(!(loaded && viewData && viewData["groups"])) ? "Cargando..." : ""}
                                        value={viewData["janijData"] && fields.email}
                                    />
                                    </FormGroup>     
                                    <FormGroup>
                                    <Label for="cellphone">
                                        Telefono Janij
                                    </Label>
                                    <Input
                                        id="cellphone"
                                        disabled={!(loaded && viewData && viewData["groups"] && viewData["janijData"]) || isUpdating || !firstLoad}
                                        name="cellphone"
                                        onChange={editHandleChange}
                                        autoComplete="false"
                                        placeholder={(!(loaded && viewData && viewData["groups"])) ? "Cargando..." : ""}
                                        value={viewData["janijData"] && fields.cellphone}
                                    />
                                    </FormGroup> 
                                    <FormGroup>
                                    <Label for="cellphone">
                                        Nota
                                    </Label>
                                    <Input
                                        id="notes"
                                        disabled={!(loaded && viewData && viewData["groups"] && viewData["janijData"]) || isUpdating || !firstLoad}
                                        name="notes"
                                        onChange={editHandleChange}
                                        autoComplete="false"
                                        placeholder={(!(loaded && viewData && viewData["groups"])) ? "Cargando..." : ""}
                                        value={viewData["janijData"] && fields.notes}
                                    />
                                    </FormGroup>    
                                </div>
                            </div>
                            
                    
                    <ModalFooter>
                        <Button
                            onClick={toggleCancelEditModal}
                            disabled={isUpdating}
                        >
                            Cancelar
                        </Button>
                        <Button
                            color={isUpdating ? "warning" : "danger"}
                            disabled={!(loaded && viewData && viewData["groups"] && viewData["janijData"]) || isUpdating || !firstLoad}
                            onClick={updateRequest}
                        >
                            {isUpdating ? <div>Editando... <Spinner animation="border" variant="light" size="sm" /></div> : props.title}
                        </Button>
                    </ModalFooter>
                </Form>
            </ModalBody>

        </>
    );
}

export default EditJanijBody
