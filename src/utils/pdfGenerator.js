import jsPDF from 'jspdf';

export const generarComprobantePDF = (compraData) => {
  const { id, items, total, fecha } = compraData;
  
  const doc = new jsPDF();
  
  const primaryColor = '#2c3e50';
  const secondaryColor = '#3498db';
  const textColor = '#2c3e50';
  const lightGray = '#f8f9fa';
  
  doc.setFontSize(20);
  doc.setTextColor(primaryColor);
  doc.setFont(undefined, 'bold');
  doc.text('Comprobante de Compra', 20, 20);
  
  doc.setDrawColor(secondaryColor);
  doc.setLineWidth(0.5);
  doc.line(20, 25, 190, 25);
  
  doc.setFontSize(12);
  doc.setTextColor(textColor);
  doc.text(`Número de Compra: ${id}`, 20, 35);
  doc.text(`Fecha: ${fecha.toLocaleDateString('es-AR')}`, 20, 43);
  doc.text(`Hora: ${fecha.toLocaleTimeString('es-AR', { hour12: false })}`, 20, 51);
  
  let yPosition = 70;
  
  doc.setFillColor(lightGray);
  doc.rect(20, yPosition - 5, 170, 10, 'F');
  
  doc.setFontSize(10);
  doc.setTextColor(primaryColor);
  doc.setFont(undefined, 'bold');
  doc.text('Producto', 25, yPosition);
  doc.text('Cantidad', 120, yPosition);
  doc.text('Precio Unit.', 140, yPosition);
  doc.text('Subtotal', 160, yPosition);
  
  doc.setDrawColor(primaryColor);
  doc.line(20, yPosition + 2, 190, yPosition + 2);
  
  yPosition += 10;
  
  doc.setFont(undefined, 'normal');
  doc.setTextColor(textColor);
  
  items.forEach((item, index) => {
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 30;
    }
    
    const nombre = item.titulo.length > 25 ? item.titulo.substring(0, 25) + '...' : item.titulo;
    doc.text(nombre, 25, yPosition);
    
    doc.text(item.cantidad.toString(), 120, yPosition);
    
    doc.text(`$${item.precio.toLocaleString('es-AR')}`, 140, yPosition);
    
    const subtotal = item.precio * item.cantidad;
    doc.text(`$${subtotal.toLocaleString('es-AR')}`, 160, yPosition);
    
    yPosition += 8;
  });
  
  doc.setDrawColor(secondaryColor);
  doc.line(20, yPosition + 5, 190, yPosition + 5);
  
  yPosition += 15;
  doc.setFontSize(14);
  doc.setTextColor(primaryColor);
  doc.setFont(undefined, 'bold');
  doc.text(`TOTAL: $${total.toLocaleString('es-AR')}`, 20, yPosition);
  
  yPosition += 15;
  doc.setFontSize(12);
  doc.setTextColor(secondaryColor);
  doc.setFont(undefined, 'bold');
  doc.text('¡Gracias por tu compra!', 20, yPosition);
  
  const fileName = `comprobante-${id}.pdf`;
  doc.save(fileName);
  
  return fileName;
};