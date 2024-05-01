import { useState } from 'react';

const RegisterUser = () => {
    const [ userName, setUserName ] = useState('');
    const [ passWord, setPassWord ] = useState('');

    async function registerUser(ev) {
        ev.preventDefault();

         const response = await fetch('http://localhost:8000/register', {
            method: 'POST',
            body: JSON.stringify({ userName, passWord }),
            headers: { 'Content-Type': 'application/json' },
        });
if(response.status === 201) {
    alert('Registration Successfull')
        setUserName('')
        setPassWord('')
} else {
    alert('Registration Failed')
}
    }

    return (
        <form onSubmit={registerUser}>
        <h2>Skapa ett konto här!</h2>
        <div className="login-div"> 
        <div className="form-floating">
            <input 
            type="text"
            id="userName" 
            value={userName}
            onChange={ev => setUserName(ev.target.value)}
            className="form-control"/>
            <label htmlFor="userName">Användarnamn</label>
        </div>

        <div className="form-floating">
        <input 
        type="password" 
        id="passWord" 
        value={passWord}
        onChange={ev => setPassWord(ev.target.value)}
        className="form-control"/>
            <label htmlFor="passWord">Lösenord</label>
        </div>
        <div className="button-login-container"> 
        <button 
        class="btn w-100 py-2 button-login" 
        type="submit">
            Registrera</button>
        </div>
        </div>

        

    </form>
    )}

export default RegisterUser;