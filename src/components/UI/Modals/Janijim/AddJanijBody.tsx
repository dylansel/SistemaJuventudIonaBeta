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
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState(false)
    const [isAdding, setIsAdding] = useState(false)
    const [viewData, setViewData] = useState<any>([null])
    async function fetchData() {
        setLoaded(false)
        setViewData(await getAddJanijData())
        setLoaded(true)
    }
   
    const addHandleChange = (e: any) => {
        setError(false)
        let { name, value } = e.target
       
        setFields(prevState => ({
            ...prevState,
            [name]: value
        }))

    }

    const postRequest = async () => {
        setError(false)
        if (isEmptyOrSpaces(fields.name) && fields.group === ""){
            setError(true)
            return
        }
        setIsAdding(true)
        const name = capitalizeAllWords(fields.name)
       
        const janijToAdd = fields
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
                            Nombre y Apellido
                        </Label>
                        <Input
                            id="name"
                            disabled={!(loaded && viewData &&  viewData["groups"]) || isAdding}
                            name="name"
                            onChange={addHandleChange}
                            autoComplete="off"
                            placeholder={(!(loaded && viewData &&  viewData["groups"])) ? "Cargando..." : ""}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="group">Grupo</Label>
                        <Input
                            id="group"
                            name="group"
                            className="mb-3"
                            type="select"
                            onChange={addHandleChange}
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
                    <ModalFooter>
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
