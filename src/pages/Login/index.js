import React, { useState } from 'react';
import firebase from '../../firebase'; // Atualize a importação
import './index.css';
import Loader from '../../components/Loader';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', senha: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await firebase.auth().signInWithEmailAndPassword(formData.email, formData.senha);
      navigate('/principal');
    } catch (error) {
      setError('Usuário não cadastrado');
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {loading ? <Loader /> : (
        <form onSubmit={handleSubmit} className="login-form">
          <input type="email" name="email" placeholder="E-mail" onChange={handleChange} required />
          <input type="password" name="senha" placeholder="Senha" onChange={handleChange} required />
          <button type="submit">Entrar</button>
          {error && <p className="error">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default Login;
