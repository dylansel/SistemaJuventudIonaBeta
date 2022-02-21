import React, { useState, useEffect } from "react"
import { getAddJanijData } from "../../../../services/viewService";
import { Button, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Alert, Spinner } from 'reactstrap';
import CreatableSelectSearch from "../../Selects/CreatableSelect";
import { capitalizeAllWords, isEmptyOrSpaces } from "../../../../utils/misc/strings";
import { addFamily } from '../../../../services/familyService';
import { addJanij } from '../../../../services/janijService';

function AddMultipleActivitiesBody(props: any) {

    const initialFieldsState = {
        name: '',
        groupId: -1,
        leadersCourse: false,
        familyId: -1,
        familySurname: ''
    }
    const [fields, setFields] = useState(initialFieldsState)
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState(false)
    const [isAdding, setIsAdding] = useState(false)
    const [viewData, setViewData] = useState<any>([null])
    async function fetchData() {
        setLoaded(false)
        setViewData(await getAddJanijData())
        setLoaded(true)
    }
    const addChangeFamily = (e: any) => {
        const nameToFill = isNaN(e.value) ? "familySurname" : "familyId"
        const nameToErase = !isNaN(e.value) ? "familySurname" : "familyId"
        setFields(prevState => ({
            ...prevState,
            [nameToFill]: e.value,
            [nameToErase]: ""
        }))
    }
    const addHandleChange = (e: any) => {
        setError(false)
        let { name, value } = e.target
        if (name === "groupId") {
            value = parseInt(value)
        } else if (name === "leadersCourse") {
            value = e.target.checked
        }
        setFields(prevState => ({
            ...prevState,
            [name]: value
        }))

    }

    const postRequest = async () => {
        setError(false)
        if (isEmptyOrSpaces(fields.name) || (isEmptyOrSpaces(fields.familySurname) && fields.familyId === -1 ) || fields.groupId === -1){
            setError(true)
            return
        }
        setIsAdding(true)
        const name = capitalizeAllWords(fields.name)
        let familyId
        if (fields.familySurname === "" && fields.familyId !== 0) {
            familyId = fields.familyId
        }
        else {
            const surname = capitalizeAllWords(fields.familySurname)
            familyId = await addFamily({ surname })
        }
        const janijToAdd = {
            groupId: fields.groupId,
            name,
            leadersCourse: fields.leadersCourse,
            familyId
        }
        await addJanij(janijToAdd)
        props.toggle()
        setIsAdding(false)
        props.refresh()
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
                {props.title} Janij
            </ModalHeader>
            <ModalBody>
                {error && <Alert color="danger">Error! Datos incorrectos</Alert>}
                <Form>
                    <FormGroup>
                        <Label for="name">
                            Nombre
                        </Label>
                        <Input
                            id="name"
                            disabled={!(loaded && viewData && viewData["families"] && viewData["groups"]) || isAdding}
                            name="name"
                            onChange={addHandleChange}
                            autoComplete="off"
                            placeholder={(!(loaded && viewData && viewData["families"] && viewData["groups"])) ? "Cargando..." : ""}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="familyId">
                            Apellido
                        </Label>
                        <CreatableSelectSearch
                            data={(loaded && viewData && viewData["families"]) ? viewData["families"] : []}
                            disabled={!(loaded && viewData && viewData["families"]) || isAdding}
                            display="fullFamily"
                            label="Crear Familia:"
                            id="family"
                            name="family"
                            className="mb-3"
                            onChange={addChangeFamily}
                            placeholder={(loaded && viewData && viewData["families"]) ? "Busca apellido o escribe uno nuevo..." : "Cargando..."}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="group">Grupo</Label>
                        <Input
                            id="group"
                            name="groupId"
                            className="mb-3"
                            type="select"
                            onChange={addHandleChange}
                            disabled={!(loaded && viewData && viewData["groups"]) || isAdding}
                        >
                            {(!(loaded && viewData && viewData["families"] && viewData["groups"])) &&
                                <option disabled selected>Cargando...</option>
                            }
                            {(loaded) &&
                            <option key="-1" value="-1" selected disabled >Elija un grupo</option>
                            }
                            {loaded && viewData && viewData["groups"].map((grupo: any) => (
                                <option key={grupo.id} value={grupo.id}>{grupo.name}</option>
                            ))}
                        </Input>
                    </FormGroup>
                    <FormGroup check>
                        <Input
                            type="checkbox"
                            id="leadersCourse"
                            name="leadersCourse"
                            disabled={!(loaded && viewData && viewData["groups"]) || isAdding}
                            data-val="true"
                            value="true"
                            onChange={addHandleChange}
                        />
                        <Label for="leadersCourse" check>
                            Curso de Madrijim 2
                        </Label>
                    </FormGroup>
                    <ModalFooter>
                        <Button
                            onClick={toggleCancelAddModal}
                            disabled={isAdding}
                        >
                            Cancelarrr
                        </Button>
                        <Button
                            color={isAdding ? "success" : "danger"}
                            disabled={!(loaded && viewData && viewData["families"] && viewData["groups"]) || isAdding}
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

export default AddMultipleActivitiesBody
