import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";

function SignIn() {
    const {login} = useContext(AuthContext)

    const [emailValue, setEmailValue] = useState('');

    // function handleClick() {
    //     const emailField =
    // }

    return (
        <>
            <h1>Inloggen</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id
                molestias qui quo unde?</p>

            <form>
                <label htmlFor="email-field">E-mailadres</label>
                <input type="text" id="email-field" name="email"
                       onChange={(e) => setEmailValue(e.target.value)}
                />
                <label htmlFor="password-field">Wachtwoord</label>
                <input type="text" id="password-field" name="password"/>
                {/*Hier nog een submit van maken als het formulier moet gaan werken*/}
                <button type="button" onClick={() => login(emailValue)}>Inloggen</button>
            </form>

            <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
        </>
    );
}

export default SignIn;