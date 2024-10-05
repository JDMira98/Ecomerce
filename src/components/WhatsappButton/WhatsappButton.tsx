import React from "react";
import "../../css/Whatsappbutton.css"; // Archivo CSS para estilizar el botón

const WhatsAppButton = () => {
  const phoneNumber = "+573196439570"; // Número de teléfono con el código de país
  const message = "¡Hola! Estoy interesado en sus productos."; // Mensaje predeterminado

  const openWhatsApp = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <button className="whatsapp-button" onClick={openWhatsApp}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
        className="whatsapp-icon"
      />
    </button>
  );
};

export default WhatsAppButton;
