import React, { useState, useEffect } from "react"
import { getEditJanijData } from "../../../../services/viewService";
import { Button, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Alert, Spinner } from 'reactstrap';
import CreatableSelectSearch from "../../Selects/CreatableSelect";
import { capitalizeAllWords, isEmptyOrSpaces } from "../../../../utils/misc/strings";
import { addFamily } from '../../../../services/familyService';
import { updateJanij } from '../../../../services/janijService';
import GroupDTO from "../../../../dtos/GroupDTO";

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

    let initialFieldsState = {
        name: "",
        group: "",
        fullName: "",
        birthday: "",
        nationalId: 0,
        address: "",
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
        setFields(prevState => ({
            ...prevState,
            [name]: value
        }))
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
                            autoComplete="off"
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
