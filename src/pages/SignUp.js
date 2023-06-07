import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";

function SignUp() {
    const {login} = useContext(AuthContext)
    const [emailValue, setEmailValue] = useState('');
    return (
        <>
            <h1>Registreren</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque
                eligendi
                harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur
                deserunt
                doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
            <form>
                <label htmlFor="user-field">Gebruikersnaam</label>
                <input type="text" id="user-field" name="user"/>
                <label htmlFor="email-field">E-mailadres</label>
                <input type="text" id="email-field" name="email"
                       onChange={(e) => setEmailValue(e.target.value)}/>
                <label htmlFor="password-field">Wachtwoord</label>
                <input type="text" id="password-field" name="password"/>
                {/*Hier nog een submit van maken en de juiste onclick als het formulier moet gaan werken*/}
                <button type="button" onClick={() => login(emailValue)}>Registreren</button>
            </form>
            <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
        </>
    );
}

export default SignUp;