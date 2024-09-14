import { useState } from "react"
import { useNavigate } from "react-router-dom"


const Login = () =>{
    const navigate = useNavigate() 
    
    let [user,setUser] = useState('')
    let [password,setPassword] = useState('')
    let [mostrar,setMostrar] = useState(false)

    let mostrarContraseña = () =>{
        setMostrar(!mostrar)
    }
    

    let IniciarSesion = (user,password) =>{

        if (user == 'admin' && password == 'admin1234'){
            alert('inicio sesion')
            navigate('/formulario')
            
        }
        else {
            alert('usuario o contraseña incorrectos')
        }   


    }


    return (
        <div>
            <h1>Login</h1>
            <form>
                <label htmlFor="user" >Usuario</label> 
                <input id="user" placeholder="Ingrese su usuario" value={user} onChange={(e)=>setUser(e.target.value)} name="user" />
                <div>
                    <label htmlFor="pass">Contraseña</label>
                    <input id="pass" placeholder="ingrese su contraseña" value={password} type={mostrar ? 'text':'password'} onChange={(e)=>setPassword(e.target.value)} />
                    <button type="button" onClick={()=>mostrarContraseña()}> mostrar </button>
                </div>
                <button type="button" onClick={()=>IniciarSesion(user,password)}>Iniciar Sesion</button>
            </form>
        </div>
    )
}

export default Login
