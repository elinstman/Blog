const UserLogin = () => {

    return (
        <form>
        <h2>Välkommen tillbaka!</h2>
        <div className="login-div"> 
        <div className="form-floating">
            <input 
            type="text" 
            id="userName" 
            className="form-control"/>
            <label htmlFor="userName">Användarnamn</label>
        </div>

        <div className="form-floating">
        <input 
        type="password" 
        id="loginPassword" 
        className="form-control"/>
            <label htmlFor="loginPassword">Lösenord</label>
        </div>
        <div className="button-login-container"> 
        <button class="btn w-100 py-2 button-login" type="submit">Logga in</button>
        </div>
        </div>

        

    </form>
    )}

export default UserLogin;