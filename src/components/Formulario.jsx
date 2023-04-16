import React, { useState } from 'react';
import Error from './Error';

const Fomrulario = ({ setbusqueda }) => {

    const [termino, settermino] = useState('');
    const [error, seterror] = useState(false);

    const buscar_img = e => {
        e.preventDefault();

        // Validar
        if (termino.trim() === '') {
            seterror(true);
            return;
        }
        seterror(false);

        // Enviar el termino de busqueda hacia el componente principal
        setbusqueda(termino);
    };
    return (
        <form
            onSubmit={buscar_img}
        >
            <div className="row">
                <div className="form-grOup col-md-8">
                    <input
                        type="text"
                        className='form-control form-control-lg'
                        placeholder='Busca una Imagen. Ejemplo: futbol o cafe'
                        onChange={e => settermino(e.target.value)}
                    />
                </div>
                <div className="form-group col-md-4">
                    <input
                        type="submit"
                        className='btn btn-danger btn-block'
                        value='Buscar'
                    />
                </div>
            </div>
            {error ? <Error mensaje='Agregue un Termino de Busqueda' /> : null}
        </form>
    );
};

export default Fomrulario;