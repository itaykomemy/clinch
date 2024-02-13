import './modal.css';

const Modal = ({ open, close, children }) => {
    if (open) {
        return (
            <div className="modal">
                <div className="modal-x-container"><button onClick={(e) => close()}>X</button></div>
                <div className="modal-content">{children}</div>
            </div>
        );
    }

    return null;
}


export default Modal;