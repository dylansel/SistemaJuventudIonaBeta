import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

interface DialogBoxProps {
    showDialog: boolean
    cancelNavigation: any
    confirmNavigation: any
    title: string,
    text: string
}

const DialogBox: React.FC<DialogBoxProps> = ({
    showDialog,
    cancelNavigation,
    confirmNavigation,
    title,
    text
}) => {
    return (
        <Modal isOpen={showDialog}>
            <ModalHeader>
                {title}
            </ModalHeader>
            <ModalBody>
                <p>{text}</p>
            </ModalBody>
            <ModalFooter>
                <Button onClick={cancelNavigation}>
                    No
                </Button>
                <Button color="danger" onClick={confirmNavigation}>
                    Sí
                </Button>
            </ModalFooter>
        </Modal>
    )
}
export default DialogBox