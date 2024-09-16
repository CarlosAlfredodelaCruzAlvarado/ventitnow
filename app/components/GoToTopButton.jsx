import React, { useState, useEffect } from 'react';

const GoToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  // Escuchar los eventos de scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Función para ir al inicio
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Desplazamiento suave
    });
  };

  return (
    <>
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-700 transition"
        >
          ↑ Go to Top
        </button>
      )}
    </>
  );
};

export default GoToTopButton;
