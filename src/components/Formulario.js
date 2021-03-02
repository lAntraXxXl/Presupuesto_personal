import React,{useState} from 'react';
import PropTypes from 'prop-types';
import Error from './Error';
import shortid from 'shortid';

const Formulario = ({guardarGasto,guardarCreargasto}) => {

    const [Nombre, guardarNombre] = useState('');

    const [ cantidad, guardarCantidad] =useState(0);

    const [error, guardarError] = useState(false);

    const agregarGasto = e => {
        e.preventDefault();

        if(cantidad < 1 || isNaN(cantidad) || Nombre.trim() === ''){
            guardarError(true);
            return
        }

        guardarError(false);

        const gasto = {
            Nombre,
            cantidad,
            id:shortid.generate()
        }

        guardarGasto(gasto);
        guardarCreargasto(true);

        //resetear formulario
        guardarNombre('');
        guardarCantidad(0);
    }
    return (  
        <form onSubmit={agregarGasto}>
            <h2>Agregar tus gastos aqui</h2>
            {
                error 
                ? <Error mensaje="Ambos campos son obligatorios o Presupuesto incorrecto" /> 
                : null
            }
            <div className="campo">
                <label>Nombre Gasto</label>
                <input
                    type="text"
                    className="u-full-width"
                    placeholder="Ej. Transporte"
                    value={Nombre}
                    onChange={e => guardarNombre(e.target.value)}
                />
            </div>
            <div className="campo">
                <label>Cantidad Gasto</label>
                <input
                    type="number"
                    className="u-full-width"
                    placeholder="Ej. 300"
                    value={cantidad}
                    onChange={e => guardarCantidad(parseInt(e.target.value,10))}
                />
            </div>

            <input
                type="submit"
                className="button-primary u-full-width"
                value="Agregar gasto"
            />

        </form>
    );
}
 
Formulario.propTypes={
    guardarGasto: PropTypes.func.isRequired,
    guardarCreargasto: PropTypes.func.isRequired
}


export default Formulario;