import { useState } from 'react';
import axios from 'axios';

const Formulario = () => {
  const [formData, setFormData] = useState({
    fecha: '',
    hora: '',
    correo: '',
    nombre: '',
    autorizacion: '',
    radicado: '',
    tipoServicio: '',
    identificador: '',
    estado: '',
    proveedor: '',
    causalesDevolucion: '',
    opcionesDerivadas: ''
    
  }
);

const openDataInNewWindow = (data) => {
  const newWindow = window.open('', '_blank');
  newWindow.document.write('<html><head><title>Datos del Formulario</title>');
  newWindow.document.write('<style>');
  newWindow.document.write('table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 18px; }');
  newWindow.document.write('table th, table td { border: 1px solid #ddd; padding: 12px; text-align: left; }');
  newWindow.document.write('table th { background-color: #f4f4f4; font-weight: bold; }');
  newWindow.document.write('table td { background-color: #fafafa; }');
  newWindow.document.write('</style>');
  newWindow.document.write('</head><body>');
  newWindow.document.write('<h1>Datos del Formulario</h1>');
  newWindow.document.write('<table>');
  newWindow.document.write('<thead><tr><th>Campo</th><th>Valor</th></tr></thead>');
  newWindow.document.write('<tbody>');
  for (const [key, value] of Object.entries(data)) {
    newWindow.document.write(`<tr><td>${key}</td><td>${value}</td></tr>`);
  }
  newWindow.document.write('</tbody>');
  newWindow.document.write('</table>');
  newWindow.document.write('</body></html>');
  newWindow.document.close();
};

const [selectedOption, setSelectedOption] = useState('');
const [options, setOptions] = useState([]);
  
  
 
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'estado') {
      setSelectedOption(value);
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
        causalesdedevolucion: ''
      }));
      switch(value) {
        case 'gestionado':
          setOptions(['Opción 1', 'Opción 2', 'Opción 3']);
          break;
        case 'devuelto':
          setOptions(['No ha sido posible contactar al usuario', 'No acepta coordinacion de servicio', 'No acepta coordinacion de servicio - Requiere correccion',
                       'Usuario Hospotalizado', 'Reprogramacion de citas', 'Toma servicios sus propios medios', 'No requiere servicios', 'Cups autorizado errado',
                       'Cantidades erradas', 'Fechas erradas', 'Autorizacion Anulada', 'Informacion de acompañante no corresponde', 'Sin disponibilidad Aerea', 'Servicio duplicado con otra autorizacion',
                       'Ya tiene abierto, se requiere penalidad', 'No existe un tiquete en abierto, por lo que se requiere un nuevo tiquete', 'Sin proveedor en desstino' 
           ]);
          break;
        default:
          setOptions([]);
      }
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
    try {
      const response = await axios.post('http://localhost:5000/api/submit-form', formData);
        

      console.log('Respuesta del servidor:', response.data);
      alert('Datos guardados correctamente');
      openDataInNewWindow(formData);
      window.location.reload();
    } catch (error) {
      console.error('Error al enviar datos:', error);
      alert('Error al guardar los datos');
      if (error.response) {
        console.error('Datos de respuesta del servidor:', error.response.data);
        console.error('Estado de respuesta del servidor:', error.response.status);
        console.error('Cabeceras de respuesta del servidor:', error.response.headers);
        alert(`Error del servidor: ${error.response.status} - ${error.response.data.error || 'Error desconocido'}`);
      } else if (error.request) {
        
        console.error('No se recibió respuesta del servidor');
        alert('No se pudo contactar con el servidor. Verifica tu conexión a internet.');
      } else {
        console.error('Error al configurar la solicitud:', error.message);
        alert(`Error al enviar la solicitud: ${error.message}`);
    }
  }
  };

  const styles = {
    formulario: {
      fontFamily: 'Arial, sans-serif',
    },
    navbar: {
      backgroundColor: '#2c3e50',
      color: 'white',
      padding: '10px 20px',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    navbarTitle: {
      margin: 0,
      fontSize: '24px',
    },
    navMenu: {
      display: 'flex',
      listStyle: 'none',
      margin: 0,
      padding: 0,
    },
    navMenuItem: {
      margin: '0 10px',
    },
    navLink: {
      color: 'white',
      textDecoration: 'none',
      padding: '5px 10px',
      borderRadius: '4px',
      transition: 'background-color 0.3s',
    },
    main: {
      paddingTop: '450px',
      height: '100vh', // Asegura que el contenedor principal ocupe toda la pantalla
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
    },
    form: {
      width: '100%',  // Hace que el formulario ocupe todo el ancho
      maxWidth: '1200px',  // Limita el ancho máximo en pantallas grandes
      margin: '20px',
      padding: '40px',  // Mayor padding para más espacio interno
      boxShadow: '0 0 15px rgba(0,0,0,0.1)',  // Más sombra para mejor visibilidad
      borderRadius: '8px',
      backgroundColor: 'white',
    },
    formGroup: {
      marginBottom: '20px',  // Mayor separación entre los campos
    },
    label: {
      display: 'block',
      marginBottom: '10px',  // Más espacio entre la etiqueta y el campo
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      padding: '10px',  // Padding más grande para mejor usabilidad
      borderRadius: '4px',
      border: '1px solid #ddd',
      boxSizing: 'border-box',
    },
    textarea: {
      width: '100%',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ddd',
      boxSizing: 'border-box',
      minHeight: '120px',  // Aumenta la altura del textarea
    },
    button: {
      backgroundColor: '#3498db',
      color: 'white',
      padding: '12px 20px',  // Botón más grande
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '18px',  // Texto más grande en el botón
    },
  };

  return (
    <div style={styles.formulario}>
      <nav style={styles.navbar}>
        <h1 style={styles.navbarTitle}>EXPRESO VIAJES Y TURISMO</h1>
        <ul style={styles.navMenu}>
          <li style={styles.navMenuItem}>
            <a href="#" style={styles.navLink}>TRX - NEPS</a>
          </li>
          <li style={styles.navMenuItem}>
            <a href="#" style={styles.navLink}>TRX - BTC</a>
          </li>
          <li style={styles.navMenuItem}>
            <a href="#" style={styles.navLink}>Pagos</a>
          </li>
          <li style={styles.navMenuItem}>
            <a href="#" style={styles.navLink}>Reportes</a>
          </li>
          <li style={styles.navMenuItem}>
            <a href="#" style={styles.navLink}>Configuración</a>
          </li>
        </ul>
      </nav>
      <main style={styles.main}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h1>TRX - NEPS </h1>
          <div style={styles.formGroup}>
            <label htmlFor="fecha" style={styles.label}>Fecha:</label>
            <input type="date" id="fecha" name="fecha" value={formData.fecha} onChange={handleChange} required style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="hora" style={styles.label}>Hora:</label>
            <input type="time" id="hora" name="hora" value={formData.hora} onChange={handleChange} required style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="correo" style={styles.label}>Correo:</label>
            <input type="email" id="correo" name="correo" value={formData.correo} onChange={handleChange} required style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="nombre" style={styles.label}>Nombre:</label>
            <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="autorizacion" style={styles.label}>Autorización:</label>
            <input type="text" id="autorizacion" name="autorizacion" value={formData.autorizacion} onChange={handleChange} required style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="radicado" style={styles.label}>Radicado:</label>
            <input type="text" id="radicado" name="radicado" value={formData.radicado} onChange={handleChange} required style={styles.input} />
          </div>
          <div style={styles.formGroup}>
                <label htmlFor="tipoServicio" style={styles.label}>Tipo de Servicio:</label>
                <select 
                  id="tipoServicio" 
                  name="tipoServicio" 
                  value={formData.tipoServicio} 
                  onChange={handleChange} 
                  required 
                  style={styles.input}
                >
                  <option value="">Selecciona un servicio</option>
                  <option value="hotel">Hotel</option>
                  <option value="aereo">Aéreo</option>
                </select>
              </div>
          <div style={styles.formGroup}>
            <label htmlFor="identificador" style={styles.label}>Identificador:</label>
            <input type="text" id="identificador" name="identificador" value={formData.identificador} onChange={handleChange} required style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="estado" style={styles.label}>ESTADO:</label>
            <select
              id="estado"
              name="estado"
              value={selectedOption} 
              onChange={handleChange}
              required
              style={styles.input}
            >
              <option value="">Seleccione un servicio</option>
              <option value="gestionado">Gestionado</option>
              <option value="devuelto">Devuelto</option>
            </select>

            {options.length > 0 && (
              <select
                id="causalesdedevolucion"
                name="causalesdedevolucion"
                value={formData.causalesdedevolucion || ''}
                onChange={handleChange}
                required
                style={styles.input}
              >
                <option value="">Seleccione una opción</option>
                {options.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            )}
          </div>
          
          
          
          <button type="submit" style={styles.button}>Enviar</button>
        </form>
      </main>
    </div>
  );
};

export default Formulario;