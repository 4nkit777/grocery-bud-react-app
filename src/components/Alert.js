import React, { useEffect } from 'react';

const Alert = ({ type, msg, removeAlert, list }) => {
    // eslint-disable-next-line
    useEffect(() => {
        const timeout = setTimeout(() => {
            removeAlert();
        }, 3000);
        return () => clearTimeout(timeout);
    }, [removeAlert, list]);
    return (
        <div>
            <p className={`btn-${type}`}>{msg}</p>
        </div>
    );
}

export default Alert;