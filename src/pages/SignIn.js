import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import { useForm } from 'react-hook-form';
import axios from "axios";

function SignIn() {
    const {login} = useContext(AuthContext);
    const { register, handleSubmit } = useForm();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleFormSubmit = async (data) => {
        try {
            const response = await axios.post( 'http://localhost:3000/login', data);
            console.log(response);
            login(response.data.accessToken);
        } catch(e) {
            console.error("verkeerde gegevens ingevoerd. " + e);
            //maak hier nog UI om de gebruiker te laten zien wat er fout gaat
        }
    }
    return (
        <>
            <h1>Inloggen</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id
                molestias qui quo unde?</p>

            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <label htmlFor="email-field">E-mailadres</label>
                <input type="text" id="email-field" {...register("email")}/>
                <label htmlFor="password-field">Wachtwoord</label>
                <input type="text" id="password-field" {...register("password")}/>
                <button type="submit">Inloggen</button>
            </form>

            <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
        </>
    );
}

export default SignIn;