import React from 'react';
import styles from './form.module.css';
import { useState, useEffect } from 'react';
import { Modal } from '../Modal';

export const CompaniesForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [lastAction, setLastAction] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const clientId = params.get('_id');
    fetch(`${process.env.REACT_APP_API}/companies/${clientId}`)
      .then((response) => response.json())
      .then((response) => {
        setFullNameValue(response.name);
        setAddressValue(response.address);
        setCityValue(response.city);
        setProvinceValue(response.province);
        setCountryValue(response.country);
        setzipCodeValue(response.zipCode);
        setPhoneValue(response.phone);
        setEmailValue(response.email);
        setPictureUrlValue(response.pictureUrl);
        setContactFullNameValue(response.contactFullName);
        setContactPhoneValue(response.contactPhone);
        setIsActiveValue(response.isActive);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [fullNameValue, setFullNameValue] = useState('');
  const [addressValue, setAddressValue] = useState('');
  const [cityValue, setCityValue] = useState('');
  const [provinceValue, setProvinceValue] = useState('');
  const [countryValue, setCountryValue] = useState('');
  const [zipCodeValue, setzipCodeValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [pictureUrlValue, setPictureUrlValue] = useState('');
  const [contactFullNameValue, setContactFullNameValue] = useState('');
  const [contactPhoneValue, setContactPhoneValue] = useState('');
  const [isActiveValue, setIsActiveValue] = useState(false);

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
      const clientId = params.get('_id');

      //FUNCTION FOR UPDATING A COMPANY
      fetch(`${process.env.REACT_APP_API}/companies/${clientId}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: fullNameValue,
          address: addressValue,
          city: cityValue,
          province: provinceValue,
          country: countryValue,
          zipCode: parseInt(zipCodeValue),
          phone: parseInt(phoneValue),
          email: emailValue,
          pictureUrl: pictureUrlValue,
          contactFullName: contactFullNameValue,
          contactPhone: parseInt(contactPhoneValue),
          isActive: isActiveValue
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
      //FUNCTION FOR CREATING A COMPANY
      fetch(`${process.env.REACT_APP_API}/companies`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: fullNameValue,
          address: addressValue,
          city: cityValue,
          province: provinceValue,
          country: countryValue,
          zipCode: parseInt(zipCodeValue),
          phone: parseInt(phoneValue),
          email: emailValue,
          pictureUrl: pictureUrlValue,
          contactFullName: contactFullNameValue,
          contactPhone: parseInt(contactPhoneValue),
          isActive: isActiveValue
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
        <label id="fullname">Full Name</label>
        <input
          type="text"
          id="fullname"
          name="fullname"
          value={fullNameValue}
          onChange={(e) => {
            setFullNameValue(e.target.value);
          }}
          required
        />
        <label id="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={addressValue}
          onChange={(e) => {
            setAddressValue(e.target.value);
          }}
          required
        />
        <label id="city">City</label>
        <input
          type="text"
          id="city"
          name="city"
          value={cityValue}
          onChange={(e) => {
            setCityValue(e.target.value);
          }}
          required
        />
        <label id="province">Province</label>
        <input
          type="text"
          id="province"
          name="province"
          value={provinceValue}
          onChange={(e) => {
            setProvinceValue(e.target.value);
          }}
          required
        />
        <label id="country">Country</label>
        <input
          type="text"
          id="country"
          name="country"
          value={countryValue}
          onChange={(e) => {
            setCountryValue(e.target.value);
          }}
          required
        />
        <label id="zipCode">Zip Code</label>
        <input
          type="number"
          id="zipCode"
          name="zipCode"
          value={zipCodeValue}
          onChange={(e) => {
            setzipCodeValue(e.target.value);
          }}
          required
        />
        <label id="phone">Phone</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={phoneValue}
          onChange={(e) => {
            setPhoneValue(e.target.value);
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
        <label id="contactFullName">Contact Full Name</label>
        <input
          type="text"
          id="contactFullName"
          name="contactFullName"
          value={contactFullNameValue}
          onChange={(e) => {
            setContactFullNameValue(e.target.value);
          }}
          required
        />
        <label id="contactPhone">Contact Phone</label>
        <input
          type="text"
          id="contactPhone"
          name="contactPhone"
          value={contactPhoneValue}
          onChange={(e) => {
            setContactPhoneValue(e.target.value);
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
