# 🛍️ TiendaEmoji - Landing Page React

Una landing page moderna y interactiva para una tienda virtual de emojis, construida con React y características avanzadas de desarrollo web.

## 🚀 Características Técnicas

### **Arquitectura de Componentes**
- **Arquitectura modular** con componentes reutilizables
- **Props drilling** para comunicación entre componentes
- **Estado centralizado** en App.js con useState
- **Componentes funcionales** con hooks de React

### **Componentes Principales**

| Componente | Función | Props |
|------------|---------|-------|
| `App.js` | Estado global y routing | - |
| `NavBar` | Navegación y widgets | `modoNocturno`, `cambiarModoNocturno` |
| `ItemListContainer` | Catálogo de productos | `greeting`, `modoNocturno` |
| `SobreNosotros` | Sección informativa | `modoNocturno` |
| `Contacto` | Formulario de contacto | `modoNocturno` |
| `SaludoPersonalizado` | SweetAlert interactivo | `onNombreCambio` |
| `BotonModoNocturno` | Toggle dark mode | `modoNocturno`, `cambiarModo` |
| `CartWidget` | Widget del carrito | - |
| `TarjetaHistoria` | Tarjetas informativas | `titulo`, `texto`, `modoNocturno` |

### **Sistema de Temas (Dark Mode)**
```javascript
// Estado global en App.js
const [modoNocturno, setModoNocturno] = useState(false);

// Propagación de props
<Componente modoNocturno={modoNocturno} />
```

**Características:**
- ✅ **Estado centralizado** en App.js
- ✅ **Props drilling** a todos los componentes
- ✅ **CSS condicional** con clases dinámicas
- ✅ **Transiciones suaves** con CSS transitions
- ✅ **22+ elementos** modificados simultáneamente

### **Navegación SPA (Single Page Application)**
```javascript
// Smooth scrolling nativo
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
```

**Tecnologías:**
- **DOM API nativo** para scroll suave
- **IDs únicos** para cada sección
- **Event handlers** en elementos de navegación

### **Integración SweetAlert2**
```javascript
// Popup interactivo con validación
const { value: nombre } = await Swal.fire({
  title: '¡Bienvenido a TiendaEmoji! 🛍️',
  input: 'text',
  inputValidator: (valor) => {
    if (!valor) return '¡Necesitamos tu nombre!';
  },
  confirmButtonColor: '#f59a16'
});
```

**Características:**
- ✅ **Async/await** para manejo asíncrono
- ✅ **Validación de entrada** personalizada
- ✅ **Estilos personalizados** con CSS modules
- ✅ **Comunicación con componente padre** via props

## 🛠️ Stack Tecnológico

### **Frontend**
- **React 18** - Biblioteca de UI
- **JSX** - Sintaxis para componentes
- **CSS3** - Estilos y animaciones
- **SweetAlert2** - Popups interactivos

### **Herramientas de Desarrollo**
- **Create React App** - Boilerplate
- **Git** - Control de versiones
- **GitHub** - Repositorio remoto

### **Características CSS**
- **Flexbox** y **Grid** para layouts
- **CSS Transitions** para animaciones
- **Media Queries** para responsive design
- **CSS Variables** para temas
- **Backdrop-filter** para efectos glassmorphism

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── NavBar.js/css          # Navegación principal
│   ├── CartWidget.js/css      # Widget del carrito
│   ├── ItemListContainer.js/css # Catálogo de productos
│   ├── SobreNosotros.js/css   # Sección "Sobre Nosotros"
│   ├── Contacto.js/css        # Formulario de contacto
│   ├── SaludoPersonalizado.js # SweetAlert interactivo
│   ├── BotonModoNocturno.js/css # Toggle dark mode
│   └── TarjetaHistoria.js/css # Componente reutilizable
├── App.js                     # Componente principal
├── App.css                    # Estilos globales
└── index.js                   # Punto de entrada
```

## 🎨 Diseño y UX

### **Responsive Design**
- **Mobile-first** approach
- **Breakpoints**: 768px, 1024px
- **Flexible layouts** con CSS Grid y Flexbox

### **Accesibilidad**
- **Alt text** en imágenes
- **Semantic HTML** con elementos apropiados
- **Keyboard navigation** support
- **ARIA labels** en elementos interactivos

### **Performance**
- **Componentes optimizados** con React.memo (preparado)
- **CSS eficiente** con selectores específicos
- **Lazy loading** ready para futuras implementaciones

## 🚀 Instalación y Uso

### **Prerrequisitos**
```bash
Node.js >= 14.0.0
npm >= 6.0.0
```

### **Instalación**
```bash
# Clonar repositorio
git clone https://github.com/SidraF94/-CreaTuLanding-Sidra-.git

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm start

# Construir para producción
npm run build
```

### **Scripts Disponibles**
```bash
npm start          # Servidor de desarrollo (puerto 3000)
npm run build      # Build de producción
npm test           # Ejecutar tests
npm run eject      # Eject de CRA (irreversible)
```

## 🔧 Configuración

### **Variables de Entorno**
```bash
# .env (opcional)
REACT_APP_API_URL=https://api.ejemplo.com
REACT_APP_TITLE=TiendaEmoji
```

### **Personalización**
- **Colores**: Modificar variables CSS en `App.css`
- **Temas**: Ajustar clases `.modo-nocturno` en cada componente
- **Contenido**: Editar textos en los componentes JSX

## 📊 Métricas del Proyecto

- **35 archivos** en el repositorio
- **18,961 líneas** de código
- **8 componentes** principales
- **22+ elementos** con dark mode
- **100% responsive** design
- **0 dependencias** externas (excepto SweetAlert2)

## 🎯 Funcionalidades Implementadas

### **✅ Completadas**
- [x] Landing page completa
- [x] Sistema de navegación SPA
- [x] Dark mode toggle
- [x] SweetAlert interactivo
- [x] Formulario de contacto
- [x] Diseño responsive
- [x] Componentes modulares
- [x] Props drilling
- [x] Estado centralizado
- [x] CSS condicional

### **🚀 Futuras Mejoras**
- [ ] Implementar React Router
- [ ] Agregar animaciones con Framer Motion
- [ ] Integrar backend con API
- [ ] Implementar carrito de compras funcional
- [ ] Agregar tests con Jest
- [ ] Optimizar con React.memo
- [ ] Implementar lazy loading

## 👨‍💻 Autor

**Matias** - Desarrollador React

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

**¡Gracias por revisar TiendaEmoji! 🎉**
