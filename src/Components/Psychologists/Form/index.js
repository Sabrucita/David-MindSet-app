import React from 'react';
import styles from './form.module.css';
import { useState, useEffect } from 'react';
import { Modal } from '../Modal';
import Psychologists from '../List';

function PsychologistForm() {
  const [showModal, setShowModal] = useState(false);
  const [lastAction, setLastAction] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const psychologistId = params.get('_id');
    fetch(`${process.env.REACT_APP_API}/psychologists/${psychologistId}`)
      .then((response) => response.json())
      .then((response) => {
        setFirstNameValue(response.firstName);
        setLastNameValue(response.lastName);
        setEmailValue(response.email);
        setPasswordValue(response.password);
        setPictureUrlValue(response.pictureUrl);
        setTurnsValue(response.turns);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [pictureUrlValue, setPictureUrlValue] = useState('');
  const [turnsValue, setTurnsValue] = useState('');

  //MODAL
  const closeModal = () => {
    setShowModal(false);
  };

  let isCreating = false;
  if (!window.location.search) {
    isCreating = true;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (!isCreating) {
      const params = new URLSearchParams(window.location.search);
      const psychologistId = params.get('_id');

      //UPDATE A PSYCHOLOGIST
      fetch(`${process.env.REACT_APP_API}/psychologists/${psychologistId}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: firstNameValue,
          lastName: lastNameValue,
          email: emailValue,
          password: passwordValue,
          pictureUrl: pictureUrlValue,
          turns: turnsValue
        })
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          setLastAction('update');
          setShowModal(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      //ADD A NEW PSYCHOLOGIST
      fetch(`${process.env.REACT_APP_API}/psychologists`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: firstNameValue,
          lastName: lastNameValue,
          email: emailValue,
          password: passwordValue,
          pictureUrl: pictureUrlValue,
          turns: turnsValue
        })
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          setLastAction('create');
          setShowModal(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className={styles.container}>
      <Modal show={showModal} closeModal={closeModal} action={lastAction} />
      <form onSubmit={onSubmit}>
        <h2>Form</h2>
        <label id="firstname">First Name</label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          value={firstNameValue}
          onChange={(e) => {
            setFirstNameValue(e.target.value);
          }}
          required
        />
        <label id="lastname">Last Name</label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          value={lastNameValue}
          onChange={(e) => {
            setLastNameValue(e.target.value);
          }}
          required
        />
        <label id="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          value={emailValue}
          onChange={(e) => {
            setEmailValue(e.target.value);
          }}
          required
        />
        <label id="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={passwordValue}
          onChange={(e) => {
            setPasswordValue(e.target.value);
          }}
          required
        />
        <label id="pictureUrl">Picture URL</label>
        <input
          type="text"
          id="pictureUrl"
          name="pictureUrl"
          value={pictureUrlValue}
          onChange={(e) => {
            setPictureUrlValue(e.target.value);
          }}
          required
        />
        <label id="turns">Turns</label>
        <input
          type="text"
          id="turns"
          name="turns"
          value={turnsValue}
          onChange={(e) => {
            setTurnsValue(e.target.value);
          }}
          required
        />
        <button type="submit">{!isCreating ? 'SAVE CHANGES' : 'CREATE'}</button>
      </form>
    </div>
  );
}

export default PsychologistForm;
