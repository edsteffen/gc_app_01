import React from 'react';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';
import edgeImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Login(){
    return (
        <div className="login-container"> 
            <section className="form">
                <img src={logoImg} alt="Logo" />
                <form>
                    <h1>Faça seu Login</h1>
                    <input placeholder="Seu usuário" />
                    <input type="password" placeholder="Senha" />
                    <button className="button" type="submit">Entrar</button>

                    <a href="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho login
                    </a>
                </form>
            </section>

            <img src={edgeImg} alt="Edge" />
        </div>

    )
}