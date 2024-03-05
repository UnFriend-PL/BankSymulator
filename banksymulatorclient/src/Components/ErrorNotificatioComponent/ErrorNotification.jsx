import React, { useState, useEffect } from 'react';
import './ErrorNotification.scss';

function ErrorNotification({ errors }) {
  const [visibleErrors, setVisibleErrors] = useState([]);

  useEffect(() => {
    if (errors.length > 0) {
      setVisibleErrors((prevErrors) => [...prevErrors, ...errors]);
    }
  }, [errors]);

  useEffect(() => {
    if (visibleErrors.length > 0) {
      const timer = setTimeout(() => {
        setVisibleErrors((prevErrors) => prevErrors.slice(1));
      }, 5000); // błędy znikają po 5 sekundach

      return () => clearTimeout(timer); // czyszczenie timera przy odmontowaniu komponentu
    }
  }, [visibleErrors]);

  const handleClose = (index) => {
    setVisibleErrors((prevErrors) => prevErrors.filter((_, i) => i !== index));
  };

  return (
    <div className='error-notification'>
      {visibleErrors.map((error, index) => (
        <div key={index} className='error-notification__message'>
          {error}
          <div onClick={() => handleClose(index)} className='error-notification__close'>x</div>
        </div>
      ))}
    </div>
  );
}

export default ErrorNotification;