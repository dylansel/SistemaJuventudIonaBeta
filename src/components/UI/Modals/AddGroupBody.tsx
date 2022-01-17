import React, { useState, useEffect } from "react"
import { getAddGroupData } from "../../../services/viewService";
import { Button, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Alert, Spinner } from 'reactstrap';

function AddGroupBody(props: any) {
    const [loaded, setLoaded] = useState(false)
    const [viewData, setViewData] = useState<any>([null])
    async function fetchData() {
        setLoaded(false)
        setViewData(await getAddGroupData())
        setLoaded(true)
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <>
            <ModalHeader toggle={props.toggler} charcode="close">
                {props.title} Grupo
            </ModalHeader>
            <ModalBody>
                {props.error && <Alert color="danger">Error! Datos incorrectos</Alert>}
                <Form>
                    <FormGroup>
                        <Label for="name">
                            Nombre
                        </Label>
                        <Input
                            id="name"
                            disabled={props.isSaving}
                            name="name"
                            onChange={props.change}
                            autoComplete="off"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="ordinal">
                            Ordinal
                        </Label>
                        <Input
                            id="ordinal"
                            disabled={props.isSaving}
                            name="ordinal"
                            type="number"
                            onChange={props.change}
                            autoComplete="off"
                        />
                    </FormGroup>
                    <Label for="areaId">Area</Label>
                    <Input
                        id="areaId"
                        name="areaId"
                        className="mb-3"
                        type="select"
                        onChange={props.change}
                        disabled={!(loaded && viewData && viewData["areas"]) || props.isSaving}
                    >
                        {loaded && viewData && viewData["areas"].map((area: any) => (
                            <option key={area.id} value={area.id}>{area.name}</option>
                        ))}
                    </Input>
                    <ModalFooter>
                        <Button
                            onClick={props.toggler}
                            disabled={props.isSaving}
                        >
                            Cancelar
                        </Button>
                        <Button
                            color={props.isSaving ? "success" : "danger"}
                            disabled={props.isSaving}
                            onClick={props.action}
                        >
                            {props.isSaving ? <div>Guardando... <Spinner animation="border" variant="light" size="sm" /></div> : props.title}
                        </Button>
                    </ModalFooter>
                </Form>
            </ModalBody>

        </>
    );
}

export default AddGroupBody