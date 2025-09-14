import { useState, useEffect } from 'react';
import useLocalStorage from './useLocalStorage';
import useSweetAlert from './useSweetAlert';

const useSaludoPersonalizado = (onNombreCambia) => {
  const [nombreUsuario, setNombreUsuario] = useLocalStorage('nombreUsuario', '');
  const [haSaludado, setHaSaludado] = useState(false);
  const { showWelcome, showWelcomeSuccess } = useSweetAlert();

  useEffect(() => {
    if (nombreUsuario) {
      setHaSaludado(true);
      onNombreCambia(nombreUsuario);
    } else if (!haSaludado) {
      const preguntarNombre = async () => {
        const nombre = await showWelcome();

        if (nombre) {
          setNombreUsuario(nombre);
          setHaSaludado(true);
          onNombreCambia(nombre);
          await showWelcomeSuccess(nombre);
        }
      };
      preguntarNombre();
    }
  }, [haSaludado, onNombreCambia, nombreUsuario, setNombreUsuario, showWelcome, showWelcomeSuccess]);

  const cambiarNombre = async () => {
    const nuevoNombre = await showWelcome();
    if (nuevoNombre) {
      setNombreUsuario(nuevoNombre);
      onNombreCambia(nuevoNombre);
      await showWelcomeSuccess(nuevoNombre);
    }
  };

  const limpiarNombre = () => {
    setNombreUsuario('');
    setHaSaludado(false);
    onNombreCambia('');
  };

  return {
    nombreUsuario,
    haSaludado,
    cambiarNombre,
    limpiarNombre
  };
};

export default useSaludoPersonalizado;
