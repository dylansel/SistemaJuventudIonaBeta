import React, { useState, useEffect } from "react"
import { getAddJanijData } from "../../../services/viewService";
import { Button, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Alert } from 'reactstrap';
//import SearchSelect from "../Selects/SearchSelect";
import CreatableSelectSearch from "../Selects/CreatableSelect";

function AddJanijBody(props: any) {
    const [loaded, setLoaded] = useState(false)
    //const [existingFamily, setExistingFamily] = useState(false)
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
                            name="name"
                            onChange={props.change}
                            autoComplete="off"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="familyId">
                            Apellido
                        </Label>
                        {/*<div className="d-flex flex-row justify-content-left">
                            <Label for="familyOption1">
                                <Input
                                    id="familyOption1"
                                    name="familyOption"
                                    type="radio"
                                    onChange={(e) => {
                                        props.familyOption(e)
                                        setExistingFamily(!existingFamily)
                                    }}
                                    defaultChecked
                                    value="existingFamily"
                                />
                                {" "}Familia Existente
                            </Label>

                            <Label for="familyOption2" className="mx-4">
                                <Input
                                    id="familyOption2"
                                    name="familyOption"
                                    type="radio"
                                    onChange={(e) => {
                                        props.familyOption(e)
                                        setExistingFamily(!existingFamily)
                                    }}
                                    value="newFamily"
                                />
                                {" "}Nueva Familia
                            </Label>
                        </div>
                        {loaded && viewData && viewData["families"] && !existingFamily &&
                            <SearchSelect
                                data={viewData["families"]}
                                display="surname"
                                id="familyId"
                                name="familyId"
                                className="mb-3"
                                onChange={props.changeFamily}
                                placeholder="Buscar un apellido..."
                            />
                                */}
                        {loaded && viewData && viewData["families"] && /*!existingFamily &&*/
                            <CreatableSelectSearch
                                data={viewData["families"]}
                                display="surname"
                                id="family"
                                name="family"
                                className="mb-3"
                                onChange={props.changeFamily}
                                placeholder="Busca apellido o escribe uno nuevo..."
                            />
                        }
                        {/*<Input
                            id="familySurname"
                            name="familySurname"
                            type="text"
                            hidden={!existingFamily}
                            onChange={props.changeFamily}
                        />*/}
                    </FormGroup>
                    <Label for="group">Grupo</Label>
                    <Input
                        id="group"
                        name="groupId"
                        className="mb-3"
                        type="select"
                        onChange={props.change}
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
                        <Button onClick={props.toggler}>
                            Cancelar
                        </Button>
                        <Button
                            color="danger"
                            onClick={props.action}
                        >
                            {props.title}
                        </Button>
                    </ModalFooter>
                </Form>
            </ModalBody>

        </>
    );
}

export default AddJanijBody