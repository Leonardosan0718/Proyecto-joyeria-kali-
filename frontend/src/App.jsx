import { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

function App() {
  const [productos, setProductos] = useState([]) 
  const [filtrados, setFiltrados] = useState([]) 
  const [estiloSeleccionado, setEstiloSeleccionado] = useState('Todos')
  
  
  const [sessionId] = useState(() => 'SES-' + Math.random().toString(36).substr(2, 9).toUpperCase());
  
  const [carrito, setCarrito] = useState([])
  const [carritoAbierto, setCarritoAbierto] = useState(false)

  const imagenesFijas = {
    anillo: "https://images.unsplash.com/photo-1605100804763-247f67b3f41e?auto=format&fit=crop&w=800&q=80",
    collar: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
    brazalete: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80",
    pendientes: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
    reloj: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
    default: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80" 
  };

  const obtenerImagenJoya = (joya) => {
    const nombre = joya.nombre?.toLowerCase() || "";
    if (nombre.includes('aura') || nombre.includes('anillo')) return imagenesFijas.anillo;
    if (nombre.includes('collar')) return imagenesFijas.collar;
    if (nombre.includes('brazalete') || nombre.includes('pulsera')) return imagenesFijas.brazalete;
    if (nombre.includes('pendiente') || nombre.includes('arete')) return imagenesFijas.pendientes;
    if (nombre.includes('reloj')) return imagenesFijas.reloj;
    return imagenesFijas.default;
  };

  const formatearPrecio = (valor) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(valor);
  };


  const agregarAlCarrito = (joya) => {
    setCarrito([...carrito, joya]);
    setCarritoAbierto(true); 
    axios.post('http://127.0.0.1:8000/logs', {
      sesion_id: sessionId,
      estilo: joya.estilo,
      accion: `Agregó al carrito: ${joya.nombre}`
    }).catch(err => console.error(err));
  };

  const eliminarDelCarrito = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(index, 1);
    setCarrito(nuevoCarrito);
  };

const finalizarCompra = () => {
    if (carrito.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Tu bolsa está vacía',
        text: 'Explora nuestro catálogo y agrega una joya antes de continuar.',
        confirmButtonColor: '#8d6e63',
        background: '#fdfcfb',
        color: '#3e2723'
      });
      return;
    }

    Swal.fire({
      icon: 'success',
      title: '¡Pedido recibido!',
      text: 'Gracias por elegir Joyería Kaligrafi. Tus piezas están siendo procesadas.',
      confirmButtonColor: '#3e2723',
      background: '#fdfcfb',
      color: '#3e2723',
      iconColor: '#8d6e63'
    }).then(() => {
      setCarrito([]); 
      setCarritoAbierto(false); 
    });
  };

  const totalCarrito = carrito.reduce((sum, item) => sum + item.precio, 0);

 
  const aplicarFiltro = (estilo) => {
    setEstiloSeleccionado(estilo);
    setFiltrados(estilo === 'Todos' ? productos : productos.filter(p => p.estilo === estilo));

    axios.post('http://127.0.0.1:8000/logs', {
      sesion_id: sessionId,
      estilo: estilo,
      accion: estilo === 'Todos' ? 'Limpió filtros / Reinició búsqueda' : `Aplicó filtro: ${estilo}`
    }).catch(err => console.error(err));
  };

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/productos')
      .then(res => { 
        setProductos(res.data); 
        setFiltrados(res.data); 
        
        
        axios.post('http://127.0.0.1:8000/logs', {
          sesion_id: sessionId,
          estilo: 'Todos',
          accion: 'Inició sesión / Cargó catálogo'
        }).catch(err => console.error("Error al registrar inicio", err));
      })
      .catch(err => console.error(err))
  }, [sessionId])

  return (
    <div style={{ width: '100vw', minHeight: '100vh', backgroundColor: '#fdfcfb', fontFamily: "'Playfair Display', serif", display: 'flex', flexDirection: 'column', position: 'relative', overflowX: 'hidden' }}>
      
      {carritoAbierto && (
        <div 
          onClick={() => setCarritoAbierto(false)}
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 90, cursor: 'pointer'
          }}
        />
      )}

      <div style={{
        position: 'fixed', top: 0, right: carritoAbierto ? 0 : '-450px', width: '400px', height: '100vh', maxWidth: '100vw',
        backgroundColor: '#fff', boxShadow: '-10px 0 30px rgba(0,0,0,0.1)', zIndex: 100,
        transition: 'right 0.4s cubic-bezier(0.4, 0, 0.2, 1)', padding: '40px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2 style={{ margin: 0, color: '#3e2723' }}>Mi Bolsa</h2>
          <button onClick={() => setCarritoAbierto(false)} style={{ border: 'none', background: 'none', fontSize: '1.8rem', cursor: 'pointer', color: '#8d6e63' }}>✕</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '10px' }}>
          {carrito.length === 0 ? (
            <p style={{ color: '#a1887f', textAlign: 'center', marginTop: '50px' }}>Tu bolsa está vacía.</p>
          ) : carrito.map((item, index) => (
            <div key={index} style={{ display: 'flex', gap: '15px', marginBottom: '20px', alignItems: 'center', borderBottom: '1px solid #f9f9f9', paddingBottom: '15px' }}>
              <img src={obtenerImagenJoya(item)} style={{ width: '70px', height: '70px', borderRadius: '10px', objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#3e2723' }}>{item.nombre}</div>
                <div style={{ color: '#8d6e63' }}>{formatearPrecio(item.precio)}</div>
              </div>
              <button onClick={() => eliminarDelCarrito(index)} style={{ border: 'none', color: '#e57373', cursor: 'pointer', background: 'none', fontSize: '0.8rem' }}>Quitar</button>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '2px solid #f5f5f5', paddingTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '25px', color: '#3e2723' }}>
            <span>Total:</span>
            <span>{formatearPrecio(totalCarrito)}</span>
          </div>
          <button 
            onClick={finalizarCompra}
            style={{ width: '100%', padding: '18px', background: '#3e2723', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}
          >
            Finalizar Compra
          </button>
        </div>
      </div>

      <nav style={{ padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', position: 'sticky', top: 0, zIndex: 80, flexWrap: 'wrap', gap: '15px' }}>
        <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#3e2723', letterSpacing: '2px' }}>KALIGRAFI</div>
        <div 
          onClick={() => setCarritoAbierto(true)}
          style={{ cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center', background: '#fdfcfb', padding: '10px 20px', borderRadius: '30px', border: '1px solid #eee' }}
        >
          <span style={{ fontSize: '1.2rem' }}>🛒</span>
          <span style={{ marginLeft: '10px', fontWeight: 'bold', color: '#3e2723' }}>Bolsa</span>
          <span style={{ marginLeft: '8px', background: '#8d6e63', color: '#fff', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>
            {carrito.length}
          </span>
        </div>
      </nav>

      <main style={{ padding: '60px 20px', flex: 1 }}>
        <header style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#3e2723', margin: 0, fontWeight: '400' }}>Catálogo Exclusivo</h1>
          <div style={{ width: '60px', height: '3px', background: '#8d6e63', margin: '20px auto' }}></div>
        </header>

        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '70px', flexWrap: 'wrap' }}>
          {['Todos', 'Minimalista', 'Vintage', 'Bohemio'].map(estilo => (
            <button key={estilo} onClick={() => aplicarFiltro(estilo)}
              style={{ padding: '12px 35px', cursor: 'pointer', border: '1px solid #8d6e63', borderRadius: '30px', backgroundColor: estiloSeleccionado === estilo ? '#8d6e63' : '#fff', color: estiloSeleccionado === estilo ? '#fff' : '#8d6e63', fontWeight: '600', transition: '0.3s' }}> 
              {estilo} 
            </button>
          ))}
        </div>

        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '50px', maxWidth: '1400px', margin: '0 auto' }}>
          {filtrados.map(joya => (
            <div key={joya.id} style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '24px', boxShadow: '0 15px 45px rgba(0,0,0,0.04)', transition: '0.3s' }}>
              <div style={{ width: '100%', height: '350px', borderRadius: '18px', overflow: 'hidden', marginBottom: '25px' }}>
                <img src={obtenerImagenJoya(joya)} alt={joya.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <span style={{ color: '#a1887f', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>{joya.estilo}</span>
              <h2 style={{ color: '#3e2723', margin: '10px 0', fontSize: '1.9rem' }}>{joya.nombre}</h2>
              <p style={{ color: '#757575', fontSize: '1rem', lineHeight: '1.6' }}>{joya.material} — {joya.descripcion}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px', flexWrap: 'wrap', gap: '10px' }}>
                <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3e2723' }}>{formatearPrecio(joya.precio)}</span>
                <button 
                  onClick={() => agregarAlCarrito(joya)}
                  style={{ padding: '14px 28px', background: '#3e2723', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s', flex: '1 1 auto' }}
                >
                  Agregar a bolsa
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer style={{ backgroundColor: '#3e2723', color: '#fdfcfb', padding: '80px 40px 30px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '50px', maxWidth: '1200px', margin: '0 auto' }}>
          <div><h3 style={{ fontSize: '2rem', marginBottom: '20px' }}>Kaligrafi</h3><p style={{ opacity: 0.7 }}>Piezas con alma diseñadas para perdurar. La excelencia de la joyería en un solo lugar.</p></div>
          <div><h4 style={{ textTransform: 'uppercase', marginBottom: '20px' }}>Atención</h4><p style={{ opacity: 0.7 }}>FAQ | Envíos | Cuidado de Joyas</p></div>
          <div><h4 style={{ textTransform: 'uppercase', marginBottom: '20px' }}>Tesis</h4><p style={{ opacity: 0.7 }}>Proyecto de Ingeniería de Software © 2026</p></div>
        </div>
      </footer>
    </div>
  )
}

export default App