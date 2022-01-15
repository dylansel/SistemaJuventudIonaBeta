import React, { useState, useEffect } from "react"
import { getAddJanijData } from "../../services/viewService";
import { Button, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from 'reactstrap';

function AddBody(props: any) {
    const [loaded, setLoaded] = useState(false)
    const [viewData, setViewData] = useState<any>([null])
    //let action: any = props.title.split(' ')[0]
    async function fetchData() {
        setLoaded(false)
        setViewData(await getAddJanijData())
        setLoaded(true)
        console.log(viewData);
        
    }

    useEffect(() => {
        //action = props.title.split(' ')[0]
        fetchData()
    }, []);

    return (
        <>
            <ModalHeader toggle={props.toggler} charcode="close">
                {props.title} Janij
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="name">
                            Nombre
                        </Label>
                        <Input
                            id="name"
                            name="name"
                            onChange={props.change}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="familyId">
                            Apellido
                        </Label>
                        <Input
                            id="familyId"
                        />
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
                            onClick={props.function}
                        >
                            {props.title}
                        </Button>
                    </ModalFooter>
                </Form>
            </ModalBody>

        </>
    );
}

export default AddBody