import React, { useState, useEffect } from "react"
import { getAddJanijData } from "../../../../services/viewService";
import { Button, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Alert, Spinner } from 'reactstrap';
import CreatableSelectSearch from "../../Selects/CreatableSelect";

function AddJanijBody(props: any) {
    const [loaded, setLoaded] = useState(false)
    const [viewData, setViewData] = useState<any>([null])
    async function fetchData() {
        setLoaded(false)
        setViewData(await getAddJanijData())
        setLoaded(true)
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <>
            <ModalHeader toggle={props.toggler} charcode="close">
                {props.title} Janij
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
                        <Label for="familyId">
                            Apellido
                        </Label>
                        <CreatableSelectSearch
                            data={(loaded && viewData && viewData["families"]) ? viewData["families"] : []}
                            disabled={!(loaded && viewData && viewData["families"]) || props.isSaving}
                            display="fullFamily"
                            id="family"
                            name="family"
                            className="mb-3"
                            onChange={props.changeFamily}
                            placeholder={(loaded && viewData && viewData["families"]) ? "Busca apellido o escribe uno nuevo..." : "Cargando..."}
                        />
                    </FormGroup>
                    <Label for="group">Grupo</Label>
                    <Input
                        id="group"
                        name="groupId"
                        className="mb-3"
                        type="select"
                        onChange={props.change}
                        disabled={!(loaded && viewData && viewData["groups"]) || props.isSaving}
                    >
                        {loaded && viewData && viewData["groups"].map((grupo: any) => (
                            <option key={grupo.id} value={grupo.id}>{grupo.name}</option>
                        ))}
                    </Input>
                    <FormGroup check>
                        <Input type="checkbox" id="leadersCourse" name="leadersCourse" data-val="true" value="true" onChange={props.change} />
                        <Label for="leadersCourse" check>
                            Curso de Madrijim
                        </Label>
                    </FormGroup>
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

export default AddJanijBody