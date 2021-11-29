import React from 'react';
import styles from './form.module.css';
import { useState, useEffect } from 'react';

export const CompaniesForm = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const adminId = params.get('_id');
    fetch(`${process.env.REACT_APP_API}/admins/${adminId}`)
      .then((response) => response.json())
      .then((response) => {
        setFirstNameValue(response.firstName);
        setLastNameValue(response.lastName);
        setEmailValue(response.email);
        setPasswordValue(response.password);
        setIsActiveValue(response.isActive);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [isActiveValue, setIsActiveValue] = useState(false);

  let isCreating = false;
  if (!window.location.search) {
    isCreating = true;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (!isCreating) {
      const params = new URLSearchParams(window.location.search);
      const adminId = params.get('_id');

      //FUNCTION FOR UPDATING A COMPANY
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
          window.location.href = '/admins';
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      //FUNCTION FOR CREATING A COMPANY
      fetch(`${process.env.REACT_APP_API}/admins`, {
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
          isActive: isActiveValue
        })
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          window.location.href = '/admins';
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className={styles.container}>
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
        />
        <button type="submit">{!isCreating ? 'SAVE CHANGES' : 'CREATE'}</button>
      </form>
    </div>
  );
};
