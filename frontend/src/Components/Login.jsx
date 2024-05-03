import { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";

const UserLogin = () => {
    const [ userName, setUserName ] = useState('');
    const [ passWord, setPassWord ] = useState('');
    const [ inlogSuccess, setInlogSuccess ] = useState(false);

    async function loginUser(ev) {
        ev.preventDefault();

         const response = await fetch('http://localhost:8000/login', {
            method: 'POST',
            body: JSON.stringify({ userName, passWord }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });
if(response.status === 200) {
    const { access, refresh } = await response.json();
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);
    alert('Inloggning lyckades!')
        setUserName('')
        setPassWord('')
        setInlogSuccess(true);
} else {
    alert('Inloggning misslyckades')
}
    }

    if (inlogSuccess) {
        return <Navigate to={'/'} />
    }

    return (
        <form onSubmit={loginUser}>
        <h2>Välkommen tillbaka!</h2>
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
        id="loginPassword" 
        value={passWord}
        onChange={ev => setPassWord(ev.target.value)}
        className="form-control"/>
            <label htmlFor="loginPassword">Lösenord</label>
        </div>
        <div className="button-login-container"> 
        <button className="btn w-100 py-2 button-login" type="submit">Logga in</button>
        </div>
        </div>

        

    </form>
    )}

export default UserLogin;