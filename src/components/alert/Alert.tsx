import React from "react";
import "../../css/alert.css"; // Aquí puedes definir tus estilos personalizados

interface AlertProps {
  message: string;
  type: "success" | "error" | "warning";
}

const Alert: React.FC<AlertProps> = ({ message, type }) => {
  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "bg-success"; // Verde
      case "error":
        return "bg-danger"; // Rojo
      case "warning":
        return "bg-warning"; // Amarillo
      default:
        return "";
    }
  };

  return (
    <div className={`alert-container ${getBackgroundColor()}`}>
      <div className="alert-content text-white p-3 rounded shadow-sm">
        <strong>{type.charAt(0).toUpperCase() + type.slice(1)}: </strong>
        {message}
      </div>
    </div>
  );
};

export default Alert;
