import React, { useEffect, useState } from "react"
import { Button, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Alert, Spinner } from 'reactstrap';
import { capitalizeAllWords, isEmptyOrSpaces } from "../../../../utils/misc/strings";
import { updateGroup } from "../../../../services/groupService";
import { getEditGroupData } from "../../../../services/viewService";

function EditGroupBody(props: any) {
    const [loaded, setLoaded] = useState(false)
    const [notEditedFields, setNotEditedFields] = useState<any>()
    const [firstLoad, setFirstLoad] = useState(false)
    const [viewData, setViewData] = useState<any>(null)
    const [error, setError] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)

    async function fetchData() {
        setLoaded(false)
        setViewData(await getEditGroupData(props.item.id))
        setLoaded(true)
    }

    useEffect(() => {
        fetchData()
    }, []);

    let initialFieldsState = {
        name: "",
        ordinal: -1,
        areaId: -1,
    }
    const [fields, setFields] = useState(initialFieldsState)

    if (loaded && !firstLoad) {
        initialFieldsState = {
            name: viewData["groupData"].name,
            ordinal: viewData["groupData"].ordinal,
            areaId: viewData["groupData"].areaId
        }
        setNotEditedFields(initialFieldsState)
        setFields(initialFieldsState)
        setFirstLoad(true)
    }

    const handleChange = (e: any) => {
        setError(false)
        let { name, value } = e.target
        if (name === "ordinal" || name === "areaId") {
            value = parseInt(value)
        }
        setFields(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleCancel = () => {
        setError(false)
        props.toggle()
    }

    const editRequest = async () => {
        setError(false)
        if (isEmptyOrSpaces(fields.name) || fields.ordinal <= 0 || fields.areaId === -1) {
            setError(true)
            return
        }
        setIsUpdating(true)
        const name = capitalizeAllWords(fields.name)
        const groupToUpdate = {
            name,
            areaId: fields.areaId,
            ordinal: fields.ordinal,
        }
        if (JSON.stringify(groupToUpdate) != JSON.stringify(notEditedFields)) {
            await updateGroup(props.item.id, groupToUpdate)
        }
        setIsUpdating(false)
        props.toggle()
        props.refresh()
    }

    return (
        <>
            <ModalHeader toggle={props.toggle} charcode="close">
                {props.title} Grupo
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
                            name="name"
                            onChange={handleChange}
                            disabled={!(loaded && viewData && viewData["areas"] && viewData["groupData"]) || isUpdating || !firstLoad}
                            autoComplete="off"
                            placeholder={(!(loaded && viewData && viewData["areas"] && viewData["groupData"]) || !firstLoad) ? "Cargando..." : ""}
                            value={loaded && viewData && viewData["areas"] && viewData["groupData"] && firstLoad ? fields.name : "Cargando..."}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="ordinal">
                            Ordinal
                        </Label>
                        <Input
                            id="ordinal"
                            name="ordinal"
                            type="number"
                            disabled={!(loaded && viewData && viewData["areas"] && viewData["groupData"]) || isUpdating}
                            onChange={handleChange}
                            autoComplete="off"
                            placeholder={(!(loaded && viewData && viewData["areas"] && viewData["groupData"])) ? "Cargando..." : ""}
                            value={loaded && viewData && viewData["groupData"] && fields.ordinal}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="areaId">Area</Label>
                        <Input
                            id="areaId"
                            name="areaId"
                            className="mb-3"
                            type="select"
                            disabled={!(loaded && viewData && viewData["areas"] && viewData["groupData"]) || isUpdating || !firstLoad}
                            onChange={handleChange}
                            placeholder={(!(loaded && viewData && viewData["areas"] && viewData["groupData"])) ? "Cargando..." : ""}
                            value={viewData && viewData["areas"] && fields.areaId}

                        >
                            {(!(loaded && viewData && viewData["areas"])) &&
                                <option disabled selected>Cargando...</option>
                            }
                            {loaded && viewData && viewData["areas"].map((area: any) => (
                                <option key={area.id} value={area.id}>{area.name}</option>
                            ))}

                        </Input>
                    </FormGroup>
                    <ModalFooter>
                        <Button
                            onClick={handleCancel}
                            disabled={isUpdating}
                        >
                            Cancelar
                        </Button>
                        <Button
                            color={isUpdating ? "warning" : "danger"}
                            disabled={!(loaded && viewData && viewData["areas"]) || isUpdating}
                            onClick={editRequest}
                        >
                            {isUpdating ? <div>Editando... <Spinner animation="border" variant="light" size="sm" /></div> : props.title}
                        </Button>
                    </ModalFooter>
                </Form>
            </ModalBody>

        </>
    );
}

export default EditGroupBody