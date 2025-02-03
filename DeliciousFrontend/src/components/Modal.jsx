import React, { useEffect, useState } from 'react';

export default function Modal({
    title,
    description,
    OnModalClose,
    timeoutDuration = 3000,
    position = 'middle' // Default to middle 
}) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => prev + 100 / (timeoutDuration / 100));
        }, 100);

        const timeout = setTimeout(() => {
            OnModalClose();
        }, timeoutDuration);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [OnModalClose, timeoutDuration]);

    // Conditional styles based on the position prop
    const modalStyle = position === 'bottom-right'
        ? {
            position: 'fixed',
            bottom: window.innerWidth >= 768 ? '0.6%' : '1px',
            right: '21px',
            maxWidth: '500px',
            zIndex: 1050
        }
        : {
            position: 'fixed',
            bottom: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1050
        };

    return (
        <div className="modal show modal-overlay" style={{ pointerEvents: 'none' }}>
            <div className="modal-dialog" style={modalStyle}>
                <div className="modal-content text-black" style={{ pointerEvents: 'auto' }}>
                    <div className="progress-line" style={{ width: `${progress}%`, height: '4px', backgroundColor: '#28a745' }}></div>

                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button
                            type="button"
                            className="btn-close text-black"
                            data-bs-dismiss="modal"
                            onClick={OnModalClose}
                            aria-label="Close"
                        ></button>
                    </div>
                    {description && (
                        <div className="modal-body text-success">
                            <p>{description}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
