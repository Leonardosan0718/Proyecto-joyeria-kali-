import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [productos, setProductos] = useState([]) // Todos los productos
  const [filtrados, setFiltrados] = useState([]) // Los que se muestran
  const [estiloSeleccionado, setEstiloSeleccionado] = useState('Todos')

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/productos')
      .then(res => {
        setProductos(res.data)
        setFiltrados(res.data)
      })
      .catch(err => console.error("Error:", err))
  }, [])

  
  const filtrarPorEstilo = (estilo) => {
    setEstiloSeleccionado(estilo)
    if (estilo === 'Todos') {
      setFiltrados(productos)
    } else {
      const resultado = productos.filter(p => p.estilo === estilo)
      setFiltrados(resultado)
    }
    
    
    console.log(`El usuario está interesado en el estilo: ${estilo}`)
  }

  return (
    <div style={{ padding: '40px', fontFamily: 'serif', maxWidth: '1000px', margin: 'auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', color: '#5d4037' }}>Joyería Kaligrafi</h1>
        <p style={{ fontStyle: 'italic', color: '#8d6e63' }}>Descubre tu estilo único</p>
      </header>

      {/* Sección de Filtros */}
      <div style={{ marginBottom: '30px', textAlign: 'center' }}>
        <span style={{ marginRight: '15px', fontWeight: 'bold' }}>Filtrar por estilo:</span>
        {['Todos', 'Minimalista', 'Vintage', 'Bohemio'].map(estilo => (
          <button 
            key={estilo}
            onClick={() => filtrarPorEstilo(estilo)}
            style={{
              padding: '8px 16px',
              margin: '0 5px',
              cursor: 'pointer',
              backgroundColor: estiloSeleccionado === estilo ? '#5d4037' : '#fff',
              color: estiloSeleccionado === estilo ? '#fff' : '#5d4037',
              border: '1px solid #5d4037',
              borderRadius: '20px',
              transition: '0.3s'
            }}
          >
            {estilo}
          </button>
        ))}
      </div>

      {/* Cuadrícula de Productos */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '25px' }}>
        {filtrados.map(joya => (
          <div key={joya.id} style={{ border: '1px solid #e0e0e0', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <div style={{ height: '150px', background: '#f5f5f5', borderRadius: '8px', marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
              [Imagen de {joya.nombre}]
            </div>
            <span style={{ fontSize: '0.75rem', color: '#a1887f', fontWeight: 'bold', textTransform: 'uppercase' }}>{joya.estilo}</span>
            <h2 style={{ margin: '10px 0', fontSize: '1.4rem' }}>{joya.nombre}</h2>
            <p style={{ color: '#666', fontSize: '0.9rem', height: '40px' }}>{joya.material}</p>
            <p style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#333' }}>${joya.precio}</p>
            <button style={{ width: '100%', padding: '10px', marginTop: '10px', background: '#5d4037', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Me interesa
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App