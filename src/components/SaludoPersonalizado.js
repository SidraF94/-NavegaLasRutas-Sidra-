import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const SaludoPersonalizado = ({ cuandoElNombreCambia }) => {
  //nombreUsuario no se usa en este componente, se usa en el componente padre App.js
  const [nombreUsuario, setNombreUsuario] = useState("");
  //haSaludado es un booleano que se usa para evitar que se muestre el SweetAlert si ya se ha saludado
  const [haSaludado, setHaSaludado] = useState(false);

  //useEffect se utiliza despues de renderiizar el componente. 
  useEffect(() => {
    // Verificar si ya hay un nombre guardado en localStorage
    const nombreGuardado = localStorage.getItem('nombreUsuario');
    
    if (nombreGuardado) {
      // Si hay un nombre guardado, usarlo directamente
      setNombreUsuario(nombreGuardado);
      setHaSaludado(true);
      cuandoElNombreCambia(nombreGuardado);
    } else if (!haSaludado) {
      // Solo mostrar el SweetAlert si no se ha saludado antes y no hay nombre guardado
      const preguntarNombre = async () => {
        const { value: nombre } = await Swal.fire({
          title: "Bienvenido a TiendaEmoji! 🛍️",
          text: "Cómo te llamas?",
          input: "text",
          inputPlaceholder: "Tu nombre aquí...",
          inputValidator: (valor) => {
            if (!valor) {
              return "Necesitamos tu nombre para darte la bienvenida!";
            }
          },
          confirmButtonText: "Entrar",
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
          
          // Guardar el nombre en localStorage
          localStorage.setItem('nombreUsuario', nombre);
          
          // Notificar al componente padre sobre el cambio de nombre
          cuandoElNombreCambia(nombre);
          
          // Mostrar mensaje de bienvenida
          Swal.fire({
            title: `Hola ${nombre}! 👋`,
            text: "Bienvenido a la mejor tienda de emojis!",
            icon: "success",
            confirmButtonText: "Empezar a comprar!",
            confirmButtonColor: "#f59a16",
            background: "linear-gradient(45deg, #a8a4e6, #b8a9c9)",
            color: "white"
          });
        }
      };

      preguntarNombre();
    }
  }, [haSaludado, cuandoElNombreCambia]);

  return null; // Este componente no renderiza nada visualmente
};

export default SaludoPersonalizado; 