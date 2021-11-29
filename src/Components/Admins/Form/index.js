import React from 'react';
import styles from './form.module.css';
import { useState } from 'react';

export const AdminsForm = () => {
  const [firstNameValue, setfirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [isActiveValue, setIsActiveValue] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams(window.location.search);
    const adminId = params.get('_id');

    fetch(`${process.env.REACT_APP_API}/admins/${adminId}`, {
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
        isActive: isActiveValue
      })
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <h2>Form</h2>
        <label id="first-name">First Name</label>
        <input
          type="text"
          id="first-name"
          name="first-name"
          value={firstNameValue}
          onChange={(e) => {
            setfirstNameValue(e.target.value);
          }}
          className={styles.input}
          required
        />
        <label id="last-name">Last Name</label>
        <input
          type="text"
          id="last-name"
          name="last-name"
          value={lastNameValue}
          onChange={(e) => {
            setLastNameValue(e.target.value);
          }}
          className={styles.input}
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
          className={styles.input}
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
          className={styles.input}
          required
        />
        <label id="isActive">Is Active</label>
        <input
          type="checkbox"
          id="isActive"
          name="isActive"
          value={isActiveValue}
          checked={isActiveValue}
          onChange={(e) => {
            setIsActiveValue(e.currentTarget.checked);
          }}
          className={styles.input}
        />
        <button
          type="submit"
          onClick={() => {
            window.location.href = '/admins';
          }}
        >
          SAVE CHANGES
        </button>
      </form>
    </div>
  );
};