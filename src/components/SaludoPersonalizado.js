import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const SaludoPersonalizado = ({ onNombreCambio }) => {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [haSaludado, setHaSaludado] = useState(false);

  useEffect(() => {
    // Solo mostrar el SweetAlert si no se ha saludado antes
    if (!haSaludado) {
      const preguntarNombre = async () => {
        const { value: nombre } = await Swal.fire({
          title: "¡Bienvenido a TiendaEmoji! 🛍️",
          text: "¿Cómo te llamas?",
          input: "text",
          inputPlaceholder: "Tu nombre aquí...",
          inputValidator: (valor) => {
            if (!valor) {
              return "¡Necesitamos tu nombre para darte la bienvenida!";
            }
          },
          confirmButtonText: "¡Entrar!",
          confirmButtonColor: "#f59a16",
          showCancelButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
          background: "linear-gradient(45deg, #a8a4e6, #b8a9c9)",
          color: "white",
          customClass: {
            popup: "swal-custom-popup",
            title: "swal-custom-title",
            input: "swal-custom-input"
          }
        });

        if (nombre) {
          setNombreUsuario(nombre);
          setHaSaludado(true);
          
          // Notificar al componente padre sobre el cambio de nombre
          onNombreCambio(nombre);
          
          // Mostrar mensaje de bienvenida
          Swal.fire({
            title: `¡Hola ${nombre}! 👋`,
            text: "¡Bienvenido a la mejor tienda de emojis del mundo!",
            icon: "success",
            confirmButtonText: "¡Empezar a comprar!",
            confirmButtonColor: "#f59a16",
            background: "linear-gradient(45deg, #a8a4e6, #b8a9c9)",
            color: "white"
          });
        }
      };

      preguntarNombre();
    }
  }, [haSaludado, onNombreCambio]);

  return null; // Este componente no renderiza nada visualmente
};

export default SaludoPersonalizado; 