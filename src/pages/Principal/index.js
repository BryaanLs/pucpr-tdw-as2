import React, { useEffect, useState } from 'react';
import firebase from '../../firebase';
import './index.css';
import Loader from '../../components/Loader';

const Principal = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = firebase.auth().currentUser;
      if (user) {
        const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
        if (userDoc.exists) {
          setUserData(userDoc.data());
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  return (
    <div className="principal-container">
      {loading ? <Loader /> : (
        userData ? (
          <div className="user-info">
            <h1>Bem-vindo, {userData.nome}!</h1>
            <div className="user-details">
              <p><strong>Sobrenome:</strong> {userData.sobrenome}</p>
              <p><strong>Data de Nascimento:</strong> {userData.nascimento}</p>
            </div>
          </div>
        ) : (
          <p className="error-message">Usuário não encontrado!</p>
        )
      )}
    </div>
  );
};

export default Principal;
