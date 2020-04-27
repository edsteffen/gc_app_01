import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';
import edgeImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Login(){
    const [login, setLogin] = useState('');
    const [psw, setPwd] = useState('');

    async function handleLogin(e){
        e.preventDefault();
        try {
            const resp = await api.post('login', { login, psw });
            alert('('+resp.status + ') -> Login Autorizado');
            console.log(resp.headers.Authorization);
            console.log(resp);
        } catch (err) {
            let tmp = String(err);
            if (tmp.indexOf('Network')>0){
                alert('Erro: Requisição não autorizada!');
            } else {
                const erro = err.response;
                if (!!erro.status) {
                    alert('Erro: "'+erro.status+'". '+erro.data.error);
                }
            }
        }
    }
    return (
        <div className="login-container"> 
            <section className="form">
                <img src={logoImg} alt="Logo" />
                <form onSubmit={handleLogin}>
                    <h1>Faça seu Login</h1>
                    <input placeholder="Seu usuário" value={login} onChange={e=>setLogin(e.target.value)} />
                    <input 
                        type="password" 
                        placeholder="Senha" 
                        value={psw}
                        onChange={e=>setPwd(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho login
                    </Link>
                </form>
            </section>

            <img src={edgeImg} alt="Edge" />
        </div>

    )
}