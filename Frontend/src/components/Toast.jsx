import React, { useEffect } from 'react';
import './Toast.css';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [onClose, duration]);

    const getIcon = () => {
        switch (type) {
            case 'success': return <i className="fas fa-check-circle"></i>;
            case 'error': return <i className="fas fa-exclamation-circle"></i>;
            case 'info': return <i className="fas fa-info-circle"></i>;
            default: return null;
        }
    };

    return (
        <div className={`toast-notification ${type}`}>
            <div className="toast-content">
                <span className="toast-icon">{getIcon()}</span>
                <span className="toast-message">{message}</span>
            </div>
            <button className="toast-close" onClick={onClose}>
                <i className="fas fa-times"></i>
            </button>
            <div className="toast-progress" style={{ animationDuration: `${duration}ms` }}></div>
        </div>
    );
};

export default Toast;
