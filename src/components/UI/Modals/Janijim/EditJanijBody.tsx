import React, { useState, useEffect } from "react"
import { getEditJanijData } from "../../../../services/viewService";
import { Button, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Alert, Spinner } from 'reactstrap';
import CreatableSelectSearch from "../../Selects/CreatableSelect";
import { capitalizeAllWords, isEmptyOrSpaces } from "../../../../utils/misc/strings";
import { addFamily, getAllFamilies } from '../../../../services/familyService';
import { updateJanij } from '../../../../services/janijService';

function EditJanijBody(props: any) {

    const [loaded, setLoaded] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const [notEditedFields, setNotEditedFields] = useState<any>()
    const [firstLoad, setFirstLoad] = useState(false)
    const [error, setError] = useState(false)
    const [viewData, setViewData] = useState<any>([null])

    async function fetchData() {
        setLoaded(false)
        setViewData(await getEditJanijData(props.item.id))
        setLoaded(true)
    }

    useEffect(() => {
        fetchData()
    }, []);

    let initialFieldsState = {
        name: '',
        groupId: 1,
        leadersCourse: false,
        familyId: -1,
        familySurname: ''
    }

    const [fields, setFields] = useState(initialFieldsState)

    if (loaded && !firstLoad) {
        initialFieldsState = {
            name: viewData["janijData"].name,
            groupId: viewData["janijData"].groupId,
            leadersCourse: viewData["janijData"].leadersCourse,
            familyId: viewData["janijData"].familyId,
            familySurname: viewData["janijData"].familySurname
        }
        setNotEditedFields(initialFieldsState)
        setFields(initialFieldsState)
        setFirstLoad(true)
    }

    const editChangeFamily = (e: any) => {
        const nameToFill = isNaN(e.value) ? "familySurname" : "familyId"
        const nameToErase = !isNaN(e.value) ? "familySurname" : "familyId"
        setFields(prevState => ({
            ...prevState,
            [nameToFill]: e.value,
            [nameToErase]: ""
        }))
    }

    const editHandleChange = (e: any) => {
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

    const toggleCancelEditModal = () => {
        setError(false)
        setFields(initialFieldsState)
        props.toggle()
    }

    const updateRequest = async () => {
        setError(false)
        if (isEmptyOrSpaces(fields.name) || (isEmptyOrSpaces(fields.familySurname) && fields.familyId === -1)) {
            setError(true)
            return
        }
        setIsUpdating(true)
        const name = capitalizeAllWords(fields.name)
        let familyId
        if (fields.familySurname === "" && fields.familyId !== 0) {
            familyId = fields.familyId
        }
        else {
            const surname = capitalizeAllWords(fields.familySurname)
            familyId = await addFamily({ surname })
        }
        const janijToEdit = {
            groupId: fields.groupId,
            name,
            leadersCourse: fields.leadersCourse,
            familyId
        }
        if (JSON.stringify(janijToEdit) != JSON.stringify(notEditedFields)) {
            await updateJanij(props.item.id, janijToEdit)
        }
        setIsUpdating(false)
        props.toggle()
        setFields(initialFieldsState)
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
                            Nombre
                        </Label>
                        <Input
                            id="name"
                            disabled={isUpdating || !firstLoad}
                            name="name"
                            onChange={editHandleChange}
                            autoComplete="off"
                            value={viewData["janijData"] && fields.name}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="familyId">
                            Apellido
                        </Label>
                        <CreatableSelectSearch
                            data={(loaded && viewData && viewData["families"]) ? viewData["families"] : []}
                            disabled={!(loaded && viewData && viewData["families"]) || isUpdating || !firstLoad}
                            display="fullFamily"
                            id="family"
                            name="family"
                            className="mb-3"
                            onChange={editChangeFamily}
                            placeholder={(loaded && viewData && viewData["families"]) ? fields.familySurname : "Cargando..."}
                            value={viewData["janijData"] && fields.familyId}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="group">Grupo</Label>
                        <Input
                            id="group"
                            name="groupId"
                            className="mb-3"
                            type="select"
                            onChange={editHandleChange}
                            disabled={!(loaded && viewData && viewData["groups"]) || isUpdating || !firstLoad}
                            value={viewData["janijData"] && fields.groupId}
                        >
                            {loaded && viewData && viewData["groups"].map((grupo: any) => (
                                <option key={grupo.id} value={grupo.id}>{grupo.name}</option>
                            ))}
                        </Input>
                    </FormGroup>
                    <FormGroup check>
                        <Input type="checkbox" id="leadersCourse" name="leadersCourse" data-val="true" value="true" onChange={editHandleChange} checked={viewData["janijData"] && fields.leadersCourse} />
                        <Label for="leadersCourse" check>
                            Curso de Madrijim
                        </Label>
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
                            disabled={isUpdating}
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