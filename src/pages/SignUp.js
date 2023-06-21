import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
// import {AuthContext} from "../context/AuthContext";
import { useForm } from 'react-hook-form';
import axios from "axios";
import {AuthContext} from "../context/AuthContext";


function SignUp() {
    const {login} = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const navigate = useNavigate();
    const controller = new AbortController();

    const { register, handleSubmit } = useForm();

    useEffect(() => {

        return function cleanup() {
            controller.abort();
        }
    }, []);

    async function handleFormSubmit(data){
        try {
            const response = await axios.post("http://localhost:3000/register", {
                    email: data.email,
                password: data.password,
                username: data.username
            }, {
                signal: controller.signal,
            });

            login(response.data.accessToken);
        } catch (e) {
            console.error("Registratie mislukt", e);
        }
    }

    return (
        <>
            <h1>Registreren</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque
                eligendi
                harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur
                deserunt
                doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <label htmlFor="user-field">Gebruikersnaam</label>
                <input type="text" id="user-field" {...register("username")}/>
                <label htmlFor="email-field">E-mailadres</label>
                <input type="text" id="email-field" {...register("email")}/>
                <label htmlFor="password-field">Wachtwoord</label>
                <input type="text" id="password-field" {...register("password")}/>
                <button type="submit">Registreren</button>
            </form>
            <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
        </>
    );
}

export default SignUp;