import Swal from 'sweetalert2';

const useSweetAlert = () => {
  const showWelcome = async () => {
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

    return nombre;
  };

  const showWelcomeSuccess = (nombre) => {
    return Swal.fire({
      title: `Hola ${nombre}! 👋`,
      text: "Bienvenido a la mejor tienda de emojis!",
      icon: "success",
      confirmButtonText: "Empezar a comprar!",
      confirmButtonColor: "#f59a16",
      background: "linear-gradient(45deg, #a8a4e6, #b8a9c9)",
      color: "white"
    });
  };

  const showAddToCart = (titulo, cantidad = 1) => {
    return Swal.fire({
      title: '¡Agregado al carrito!',
      text: `Se agregó ${cantidad} unidad${cantidad > 1 ? 'es' : ''} de ${titulo}`,
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
      toast: true,
      position: 'top-end'
    });
  };

  const showRemoveFromCart = (titulo) => {
    return Swal.fire({
      title: '¡Item removido!',
      text: `${titulo} ha sido removido del carrito`,
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
      toast: true,
      position: 'top-end'
    });
  };

  const showClearCart = () => {
    return Swal.fire(
      '¡Carrito limpiado!',
      'El carrito ha sido vaciado y el stock restaurado.',
      'success'
    );
  };

  const showClearCartConfirm = () => {
    return Swal.fire({
      title: '¿Limpiar carrito?',
      text: '¿Estás seguro de que quieres vaciar todo el carrito?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, limpiar',
      cancelButtonText: 'Cancelar'
    });
  };

  const showEmptyCart = () => {
    return Swal.fire(
      'Carrito vacío',
      'Agrega productos al carrito antes de pagar.',
      'info'
    );
  };

  const showPaymentConfirm = (total, carrito) => {
    return Swal.fire({
      title: '¿Confirmar compra?',
      html: `
        <div style="text-align: left;">
          <p><strong>Total a pagar:</strong> ${total.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</p>
          <p><strong>Productos:</strong> ${carrito.length}</p>
          <p><strong>Unidades totales:</strong> ${carrito.reduce((sum, item) => sum + item.cantidad, 0)}</p>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#6c757d',
      confirmButtonText: '¡Pagar!',
      cancelButtonText: 'Cancelar'
    });
  };

  const showPaymentProcessing = () => {
    return Swal.fire({
      title: 'Procesando pago...',
      text: 'Por favor espera...',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
      timer: 2000,
      timerProgressBar: true
    });
  };

  const showPaymentSuccess = (total, compraId, compraData) => {
    return Swal.fire({
      title: '¡Pago exitoso!',
      html: `
        <div style="text-align: left;">
          <p><strong>Total pagado:</strong> ${total.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</p>
          <p><strong>Número de compra:</strong> <code style="background: #f0f0f0; padding: 2px 6px; border-radius: 4px;">${compraId}</code></p>
          <p style="margin-top: 15px; font-size: 14px; color: #666;">Guarda este número para futuras consultas</p>
        </div>
      `,
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: '📄 Descargar PDF',
      cancelButtonText: '¡Genial!',
      allowOutsideClick: false,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#6c757d'
    }).then((result) => {
      if (result.isConfirmed && compraData) {
        const { generarComprobantePDF } = require('../utils/pdfGenerator');
        generarComprobantePDF(compraData);
      }
    });
  };

  const showSuccess = (title, text) => {
    return Swal.fire({
      title: title || '¡Éxito!',
      text: text || 'Operación completada',
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
      toast: true,
      position: 'top-end'
    });
  };

  const showError = (title, text) => {
    return Swal.fire({
      title: title || '¡Ups! Algo salió mal',
      text: text || 'Ha ocurrido un error inesperado',
      icon: 'error',
      confirmButtonText: 'Entendido'
    });
  };

  return {
    showWelcome,
    showWelcomeSuccess,
    showAddToCart,
    showRemoveFromCart,
    showClearCart,
    showClearCartConfirm,
    showEmptyCart,
    showPaymentConfirm,
    showPaymentProcessing,
    showPaymentSuccess,
    showSuccess,
    showError
  };
};

export default useSweetAlert;
