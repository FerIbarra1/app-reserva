import axios from "axios";
import { useState } from "react"
import { Link } from "react-router-dom"

export const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const registerUser = async (ev) =>{
        ev.preventDefault();
        try{

            await axios.post('/register', {
                name,
                email,
                password,
            });
            alert('Cuenta Creada Con Exito. Ahora Puedes Iniciar Sesión.')
        } catch (e) {
            alert('Error al Crear la Crear la Cuenta. Intente de Nuevo Mas Tarde')
        }
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Registrar</h1>
                <form className="max-w-md mx-auto" onSubmit={registerUser}>
                    <input type="text" placeholder={'Nombre'} value={name} onChange={ev => setName(ev.target.value)} />
                    <input type="email" placeholder={'Correo Electronico'} value={email} onChange={ev => setEmail(ev.target.value)} />
                    <input type="password" placeholder="Contraseña" value={password} onChange={ev => setPassword(ev.target.value)} />
                    <button className="primary">Registrar</button>
                    <div className="text-center py-2 text-gray-500"
                    >¿Ya eres usuario? <Link className="underline text-primary" to={'/login'}>Iniciar Sesión</Link></div>
                </form>
            </div>
        </div>
    )
}
