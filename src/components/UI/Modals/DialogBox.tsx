import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

interface DialogBoxProps {
    showDialog: boolean
    cancelNavigation: any
    confirmNavigation: any
    title: string
}

const DialogBox: React.FC<DialogBoxProps> = ({
    showDialog,
    cancelNavigation,
    confirmNavigation,
    title,
}) => {
    return (
        <Modal isOpen={showDialog}>
            <ModalHeader>
                {title}
            </ModalHeader>
            <ModalBody>
                <p>Estás seguro que deseas salir? Hay cambios sin guardar.</p>
            </ModalBody>
            <ModalFooter>
                <Button onClick={cancelNavigation}>
                    No
                </Button>
                <Button color="danger" onClick={confirmNavigation}>
                    Yes
                </Button>
            </ModalFooter>
        </Modal>
    )
}
export default DialogBox