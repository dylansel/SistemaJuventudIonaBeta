import React, { useState, useEffect } from "react";
import { getAddJanijData } from "../../../../services/viewService";
import {
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
  Alert,
  Spinner,
} from "reactstrap";
import CreatableSelectSearch from "../../Selects/CreatableSelect";
import {
  capitalizeAllWords,
  isEmptyOrSpaces,
} from "../../../../utils/misc/strings";
import { addFamily } from "../../../../services/familyService";
import { addJanij } from "../../../../services/janijService";
import GroupDTO from "../../../../dtos/GroupDTO";
import JanijDTO from "../../../../dtos/JanijDTO";

function AddJanijBody(props: any) {
  let initialFieldsState: JanijDTO = {
    name: "",
    group: "",
    fullName: "",
    birthday: "",
    nationalId: "",
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
  const [fields, setFields] = useState<JanijDTO[]>([initialFieldsState]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [viewData, setViewData] = useState<any>([null]);
  const [actualView, setActualView] = useState(0);
  const [viewCompletData, setViewCompletData] = useState(false);

  async function fetchData() {
    setLoaded(false);
    setViewData(await getAddJanijData());
    setLoaded(true);
  }
  const agregarHandleChange = (e: any) => {
    const newFields = () => {
      setFields((prevState) => {
        const newFields = [...prevState, initialFieldsState];
        return newFields;
      });
    };

    if (e.target.name == "nuevo") {
      newFields();
      setActualView(actualView + 1);
    }

    if (e.target.name == "anterior") {
      if (actualView > 0) {
        setActualView(actualView - 1);
      }
    }
    if (e.target.name == "siguiente") {
      if (fields.length < actualView + 2) {
        newFields();
      }
      setActualView(actualView + 1);
    }
  };
  const addHandleChange = (e: any) => {
    setError(false);
    const { name, value } = e.target;
    const [actualV, fieldName, subFieldName] = name.split(".");

    if (subFieldName) {
      setFields((prevState) => {
        const updatedFields = [...prevState];
        updatedFields[actualV] = {
          ...updatedFields[actualV],
          [fieldName]: {
            ...(updatedFields[actualV] as any)[fieldName],
            [subFieldName]: value,
          },
        };
        return updatedFields;
      });
    } else {
      setFields((prevState) => {
        const updatedFields = [...prevState];
        updatedFields[actualV] = {
          ...updatedFields[actualV],
          [fieldName]: value,
        };
        return updatedFields;
      });
    }
  };


  const addJanijInBackground = async () => {
    try {
      await addJanij(fields);
      props.avisoAlert({show:true,message:`Se agrego Correctamente`,status:"succes"})
      props.refresh();
    } catch (error) {
      console.error(error);
      props.avisoAlert({show:true,message:`Error Al agregar`,status:"danger"})
    }finally{
        setTimeout(() =>props.avisoAlert({show:false}),5000)
    }
  };

  

  const postRequest = async () => {
    setError(false);
    if (isEmptyOrSpaces(fields[0].name) && fields[0].group === "") {
      setError(true);
      return;
    }
    setIsAdding(true);
    addJanijInBackground();
    props.avisoAlert({show:true,message:`Agregando Janij`,status:"warning", extraMessage:<Spinner animation="border" variant="light" size="sm" />})
    setIsAdding(false);
    // const janijToAdd = fields
    // console.log("R",janijToAdd)
    // await addJanij(janijToAdd)
    props.toggle();
    // setIsAdding(false)
    // props.refresh()
  };

  const toggleCancelAddModal = () => {
    setError(false);
    props.toggle();
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <ModalHeader toggle={toggleCancelAddModal} charcode="close">
        {props.title} Janij {fields.length == 1 ? "" : ` | ${actualView + 1}`}
      </ModalHeader>
      <ModalBody>
        {error && <Alert color="danger">Error! Datos incorrectos</Alert>}
        <Form>
          <FormGroup>
            <Label for={`${actualView}.name`}>Nombre y Apellido</Label>
            <Input
              id={`${actualView}.name`}
              disabled={!(loaded && viewData && viewData["groups"]) || isAdding}
              name={`${actualView}.name`}
              onChange={addHandleChange}
              value={fields[actualView].name}
              autoComplete="off"
              placeholder={
                !(loaded && viewData && viewData["groups"]) ? "Cargando..." : ""
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for={`${actualView}.group`}>Grupo</Label>
            <Input
              id={`${actualView}.group`}
              name={`${actualView}.group`}
              className="mb-3"
              type="select"
              onChange={addHandleChange}
              value={fields[actualView].group ? fields[actualView].group : "-1"}
              disabled={!(loaded && viewData && viewData["groups"]) || isAdding}
            >
              {!(loaded && viewData && viewData["groups"]) && (
                <option disabled selected>
                  Cargando...
                </option>
              )}
              {loaded && (
                <option key="-1" value="-1" selected disabled>
                  Elija un grupo
                </option>
              )}
              {loaded &&
                viewData &&
                viewData["groups"].map((group: GroupDTO) => (
                  <option key={group.name.split(" ")[0]} value={group.name}>
                    {group.name.split(" ")[1]}
                  </option>
                ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for={`viweCompletData`}>Toda la informacion </Label>
            <Input
              id={`viweCompletData`}
              type="checkbox"
              name="viweCompletData"
              color="danger"
              className="ms-2"
              onChange={() => setViewCompletData(!viewCompletData)}
              disabled={!(loaded && viewData && viewData["groups"]) || isAdding}
              checked={viewCompletData}
            />
          </FormGroup>
          {/* DATOS ADICIONALES */}
          {viewCompletData ? (
            <>
              <FormGroup>
                <Label for={`${actualView}.birthday`}>Cumpleaños</Label>
                <Input
                  id={`${actualView}.birthday`}
                  disabled={!(loaded && viewData && viewData["groups"]) || isAdding}
                  name={`${actualView}.birthday`}
                  type="date"
                  onChange={addHandleChange}
                  value={fields[actualView].birthday}
                  autoComplete="off"
                  placeholder={!(loaded && viewData && viewData["groups"])? "Cargando...": ""}
                />
              </FormGroup>
              <FormGroup>
                <Label for={`${actualView}.address`}>Direccion</Label>
                <Input
                  id={`${actualView}.address`}
                  disabled={!(loaded && viewData && viewData["groups"]) || isAdding}
                  name={`${actualView}.address`}
                  onChange={addHandleChange}
                  value={fields[actualView].address}
                  autoComplete="off"
                  placeholder={!(loaded && viewData && viewData["groups"])? "Cargando...": ""}
                />
              </FormGroup>
              <FormGroup>
                <Label for={`${actualView}.school`}>Escuela</Label>
                <Input
                  id={`${actualView}.school`}
                  disabled={!(loaded && viewData && viewData["groups"]) || isAdding}
                  name={`${actualView}.school`}
                  onChange={addHandleChange}
                  value={fields[actualView].school}
                  autoComplete="off"
                  placeholder={!(loaded && viewData && viewData["groups"])? "Cargando...": ""}
                />
              </FormGroup>
              
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseContact`} aria-expanded="false" aria-controls={`collapseContact`}><span >Datos de Contacto</span></button>
            <div className="collapse" id={`collapseContact`}>
                <div className="card card-body">
                    <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapseMadre`}
                        aria-expanded="false"
                        aria-controls={`collapseMadre`}
                    >
                        <span>Datos Madre</span>
                    </button>
                    <div className="collapse" id={`collapseMadre`}>
                        <div className="card card-body">
                        <FormGroup>
                            <Label for={`${actualView}.mother.name`}>Nombre</Label>
                            <Input
                            id={`${actualView}.father.name`}
                            disabled={
                                !(loaded && viewData && viewData["groups"]) || isAdding
                            }
                            name={`${actualView}.mother.name`}
                            onChange={addHandleChange}
                            value={fields[actualView].mother.name}
                            autoComplete="off"
                            placeholder={
                                !(loaded && viewData && viewData["groups"])
                                ? "Cargando..."
                                : ""
                            }
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for={`${actualView}.mother.cellphone`}>
                            Telefono
                            </Label>
                            <Input
                            id={`${actualView}.mother.cellphone`}
                            disabled={
                                !(loaded && viewData && viewData["groups"]) || isAdding
                            }
                            name={`${actualView}.mother.cellphone`}
                            onChange={addHandleChange}
                            value={fields[actualView].mother.cellphone}
                            autoComplete="off"
                            placeholder={
                                !(loaded && viewData && viewData["groups"])
                                ? "Cargando..."
                                : ""
                            }
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for={`${actualView}.mother.email`}>Email</Label>
                            <Input
                            id={`${actualView}.mother.email`}
                            disabled={
                                !(loaded && viewData && viewData["groups"]) || isAdding
                            }
                            name={`${actualView}.mother.email`}
                            onChange={addHandleChange}
                            value={fields[actualView].mother.email}
                            autoComplete="off"
                            placeholder={
                                !(loaded && viewData && viewData["groups"])
                                ? "Cargando..."
                                : ""
                            }
                            />
                        </FormGroup>
                        </div>
                    </div>


                    <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapsePadre`}
                        aria-expanded="false"
                        aria-controls={`collapsePadre`}
                    >
                        <span>Datos Padre</span>
                    </button>
                    <div className="collapse" id={`collapsePadre`}>
                        <div className="card card-body">
                        <FormGroup>
                            <Label for={`${actualView}.father.name`}>Nombre</Label>
                            <Input
                            id={`${actualView}.father.name`}
                            disabled={
                                !(loaded && viewData && viewData["groups"]) || isAdding
                            }
                            name={`${actualView}.father.name`}
                            onChange={addHandleChange}
                            value={fields[actualView].father.name}
                            autoComplete="off"
                            placeholder={
                                !(loaded && viewData && viewData["groups"])
                                ? "Cargando..."
                                : ""
                            }
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for={`${actualView}.father.cellphone`}>
                            Telefono
                            </Label>
                            <Input
                            id={`${actualView}.father.cellphone`}
                            disabled={
                                !(loaded && viewData && viewData["groups"]) || isAdding
                            }
                            name={`${actualView}.father.cellphone`}
                            onChange={addHandleChange}
                            value={fields[actualView].father.cellphone}
                            autoComplete="off"
                            placeholder={
                                !(loaded && viewData && viewData["groups"])
                                ? "Cargando..."
                                : ""
                            }
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for={`${actualView}.father.email`}>Email</Label>
                            <Input
                            id={`${actualView}.father.email`}
                            disabled={
                                !(loaded && viewData && viewData["groups"]) || isAdding
                            }
                            name={`${actualView}.father.email`}
                            onChange={addHandleChange}
                            value={fields[actualView].father.email}
                            autoComplete="off"
                            placeholder={
                                !(loaded && viewData && viewData["groups"])
                                ? "Cargando..."
                                : ""
                            }
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
                <Label for={`${actualView}.fullName`}>Nombre Completo</Label>
                <Input
                  id={`${actualView}.fullName`}
                  disabled={!(loaded && viewData && viewData["groups"]) || isAdding}
                  name={`${actualView}.fullName`}
                  onChange={addHandleChange}
                  value={fields[actualView].fullName}
                  autoComplete="off"
                  placeholder={!(loaded && viewData && viewData["groups"])? "Cargando...": ""}
                />
              </FormGroup>
                <FormGroup>
                <Label for={`${actualView}.nationalId`}>DNI</Label>
                <Input
                  id={`${actualView}.nationalId`}
                  disabled={!(loaded && viewData && viewData["groups"]) || isAdding}
                  name={`${actualView}.nationalId`}
                  onChange={addHandleChange}
                  value={fields[actualView].nationalId}
                  autoComplete="off"
                  placeholder={!(loaded && viewData && viewData["groups"])? "Cargando...": ""}
                />
              </FormGroup>
                <FormGroup>
                <Label for={`${actualView}.email`}>Email Janij</Label>
                <Input
                  id={`${actualView}.email`}
                  disabled={!(loaded && viewData && viewData["groups"]) || isAdding}
                  name={`${actualView}.email`}
                  onChange={addHandleChange}
                  value={fields[actualView].email}
                  autoComplete="off"
                  placeholder={!(loaded && viewData && viewData["groups"])? "Cargando...": ""}
                />
              </FormGroup>
                <FormGroup>
                <Label for={`${actualView}.cellphone`}>Telefono Janij</Label>
                <Input
                  id={`${actualView}.cellphone`}
                  disabled={!(loaded && viewData && viewData["groups"]) || isAdding}
                  name={`${actualView}.cellphone`}
                  onChange={addHandleChange}
                  value={fields[actualView].cellphone}
                  autoComplete="off"
                  placeholder={!(loaded && viewData && viewData["groups"])? "Cargando...": ""}
                />
              </FormGroup>
                <FormGroup>
                <Label for={`${actualView}.notes`}>Notas</Label>
                <Input
                  id={`${actualView}.notes`}
                  disabled={!(loaded && viewData && viewData["groups"]) || isAdding}
                  name={`${actualView}.notes`}
                  onChange={addHandleChange}
                  value={fields[actualView].notes}
                  autoComplete="off"
                  placeholder={!(loaded && viewData && viewData["groups"])? "Cargando...": ""}
                />
              </FormGroup>
                </div>
            </div>



            </>
          ) : (
            ""
          )}
          <ModalFooter>
            {fields.length == 1 ? (
              <Button
                color="primary"
                name="nuevo"
                onClick={agregarHandleChange}
                disabled={isAdding}
              >
                Agregar mas
              </Button>
            ) : (
              <>
                <Button
                  color="primary"
                  name="anterior"
                  onClick={agregarHandleChange}
                  disabled={isAdding}
                >
                  anterior
                </Button>
                <h3>{actualView + 1}</h3>
                <Button
                  color="primary"
                  name="siguiente"
                  onClick={agregarHandleChange}
                  disabled={isAdding}
                >
                  siguiente
                </Button>
              </>
            )}

            <Button onClick={toggleCancelAddModal} disabled={isAdding}>
              Cancelar
            </Button>
            <Button
              color={isAdding ? "success" : "danger"}
              disabled={!(loaded && viewData && viewData["groups"]) || isAdding}
              onClick={postRequest}
            >
              {isAdding ? (
                <div>
                  Guardando...{" "}
                  <Spinner animation="border" variant="light" size="sm" />
                </div>
              ) : (
                props.title
              )}
            </Button>
          </ModalFooter>
        </Form>
      </ModalBody>
    </>
  );
}

export default AddJanijBody;
