import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';


function App() {

  //State de la app
  const [busqueda, setbusqueda] = useState('');
  const [imagenes, setimagenes] = useState([]);
  const [pagActual, setpagActual] = useState(1);
  const [pagTotoal, setpagTotoal] = useState(1);

  useEffect(() => {
    const consultarAPI = async () => {
      if (busqueda === '') return;

      const img_pag = 30;
      const key = '35455874-9ca3d2333c8a7ea5d04abcc61';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${img_pag}&page=${pagActual}`;

      const respuesta = await fetch(url);
      const imagenes = await respuesta.json();
      setimagenes(imagenes.hits);

      // Guardar el total de paginas para el paginador
      setpagTotoal(Math.ceil(imagenes.totalHits / img_pag));

      // Mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth' });
    };

    consultarAPI();
  }, [busqueda, pagActual]);

  const pagAnterior = () => {
    const nuevaPagActual = pagActual - 1;

    if (nuevaPagActual === 0) return;

    setpagActual(nuevaPagActual);
  };

  const pagSiguiente = () => {
    const nuevaPagActual = pagActual + 1;

    if (nuevaPagActual > pagTotoal) return;

    setpagActual(nuevaPagActual);
  };


  return (
    <div className='container'>
      <div className='jumbotron'>
        <p className='lead text-center'>Buscador de Imagenes</p>
        < Formulario
          setbusqueda={setbusqueda}
        />
      </div>

      <div className='row justify-content-center'>
        <ListadoImagenes
          imagenes={imagenes}
        />

        {(pagActual === 1) ? null :
          <button
            type='button'
            className='bbtn btn-info mr-1'
            onClick={pagAnterior}
          > &laquo; Anterior </button>
        }

        {(pagActual === pagTotoal) ? null :
          <button
            type='button'
            className='bbtn btn-info mr-1'
            onClick={pagSiguiente}
          >Siguiente &raquo;</button>
        }
      </div>
    </div>
  );
}

export default App;
