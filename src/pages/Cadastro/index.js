import React, { useState } from 'react';
import firebase from '../../firebase';
import './index.css';
import Loader from '../../components/Loader';

const Cadastro = () => {
    const [formData, setFormData] = useState({
        email: '',
        senha: '',
        nome: '',
        sobrenome: '',
        nascimento: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: '', type: '' });

        try {
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(formData.email, formData.senha);
            const user = userCredential.user;
            console.log("UID do usuário:", user.uid);
            console.log("Dados a serem salvos no Firestore:", {
                uid: user.uid,
                nome: formData.nome,
                sobrenome: formData.sobrenome,
                nascimento: formData.nascimento,
                email: formData.email
            });

            await firebase.firestore().collection('users').doc(user.uid).set({
                uid: user.uid,
                nome: formData.nome,
                sobrenome: formData.sobrenome,
                nascimento: formData.nascimento,
                email: formData.email
            });

            setMessage({ text: 'Cadastro realizado com sucesso!', type: 'success' });
        } catch (error) {
            console.error("Erro ao cadastrar", error);
            if (error.code === 'auth/email-already-in-use') {
                setMessage({ text: 'Este e-mail já está em uso. Tente outro.', type: 'error' });
            } else {
                setMessage({ text: 'Erro ao criar usuário. Tente novamente.', type: 'error' });
                console.error(error);
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className='cadastro-container'><Loader /></div>;

    return (
        <div className="cadastro-container">
            <form onSubmit={handleSubmit} className="cadastro-form">
                {message.text && (
                    <p className={`message ${message.type}`}>{message.text}</p> // Classe dinâmica
                )}
                <input type="email" name="email" placeholder="E-mail" onChange={handleChange} required />
                <input type="password" name="senha" placeholder="Senha" onChange={handleChange} required />
                <input type="text" name="nome" placeholder="Nome" onChange={handleChange} required />
                <input type="text" name="sobrenome" placeholder="Sobrenome" onChange={handleChange} required />
                <input type="date" name="nascimento" onChange={handleChange} required />
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
};

export default Cadastro;
