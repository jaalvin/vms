import { FiX } from 'react-icons/fi';
import './Modal.css';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="vms-modal-overlay" onClick={onClose}>
            <div className="vms-modal-content" onClick={e => e.stopPropagation()}>
                <div className="vms-modal-header">
                    <h2>{title}</h2>
                    <button className="vms-modal-close" onClick={onClose}>
                        <FiX />
                    </button>
                </div>
                <div className="vms-modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
