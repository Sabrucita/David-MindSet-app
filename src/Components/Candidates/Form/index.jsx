// eslint-disable-next-line
import React from 'react';
import { useState, useEffect } from 'react';
import styles from './form.module.css';
import { Modal } from '../Modal';

function CandidatesForm() {
  const [showModal, setShowModal] = useState(false);
  const [lastAction, setLastAction] = useState('');
  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [cityValue, setCityValue] = useState('');
  const [provinceValue, setProvinceValue] = useState('');
  const [countryValue, setCountryValue] = useState('');
  const [postalCodeValue, setPostalCodeValue] = useState('');
  const [birthdayValue, setBirthdayValue] = useState('');
  const [hobbiesValue, setHobbiesValue] = useState('');
  const [mainSkillsValue, setMainSkillsValue] = useState('');
  const [profileTypesValue, setProfileTypesValue] = useState('');
  const [isOpenToWorkValue, setIsOpenToWorkValue] = useState('');
  const [isActiveValue, setIsActiveValue] = useState('');
  const [educationValue, setEducationValue] = useState('');
  const [experiencesValue, setExperiencesValue] = useState('');
  const [coursesValue, setCoursesValue] = useState('');
  const [candidateAddressValue, setCandidateAddressValue] = useState('');
  const [candidateAddressNumberValue, setCandidateAddressNumberValue] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const candidateId = params.get('_id');
    fetch(`${process.env.REACT_APP_API}/candidates/${candidateId}`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setFirstNameValue(response.data.firstName);
        setLastNameValue(response.data.lastName);
        setEmailValue(response.data.email);
        setPasswordValue(response.data.password);
        setPhoneValue(response.data.phone);
        setCityValue(response.data.city);
        setProvinceValue(response.data.province);
        setCountryValue(response.data.country);
        setPostalCodeValue(response.data.postalCode);
        setBirthdayValue(response.data.birthday);
        setHobbiesValue(response.data.hobbies);
        setMainSkillsValue(response.data.mainSkills);
        setProfileTypesValue(response.data.profileTypes);
        setIsOpenToWorkValue(response.data.isOpenToWork);
        setIsActiveValue(response.data.isActive);
        setEducationValue(response.data.education);
        setExperiencesValue(response.data.experiences);
        setCoursesValue(response.data.courses);
        setCandidateAddressValue(response.data.address.street);
        setCandidateAddressNumberValue(response.data.address.number);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  let create = false;
  if (!window.location.search) {
    create = true;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (!create) {
      const params = new URLSearchParams(window.location.search);
      const candidateId = params.get('_id');

      //function for UPDATE a Candidate
      fetch(`${process.env.REACT_APP_API}/candidates/${candidateId}`, {
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
          phone: parseInt(phoneValue, 10),
          city: cityValue,
          province: provinceValue,
          country: countryValue,
          postalCode: postalCodeValue,
          birthday: birthdayValue,
          address: { street: candidateAddressValue, number: candidateAddressNumberValue }
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
      //function for CREATE a Candidate
      fetch(`${process.env.REACT_APP_API}/candidates`, {
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
          phone: parseInt(phoneValue, 10),
          city: cityValue,
          province: provinceValue,
          country: countryValue,
          postalCode: postalCodeValue,
          birthday: birthdayValue,
          address: { street: candidateAddressValue, number: candidateAddressNumberValue }
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
    <div>
      <Modal show={showModal} closeModal={closeModal} action={lastAction} />
      <button
        type="button"
        onClick={() => {
          window.location.href = `/candidates`;
        }}
      >
        Back
      </button>
      <form className={styles.container} onSubmit={onSubmit}>
        <h2>Form</h2>
        <label id="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          onChange={(e) => {
            setFirstNameValue(e.target.value);
          }}
          value={firstNameValue}
          minLength="2"
          maxLength="10"
          required
        />
        <label id="lastName">lastName</label>
        <input
          type="text"
          name="lastName"
          id="LastName"
          onChange={(e) => {
            setLastNameValue(e.target.value);
          }}
          value={lastNameValue}
          minLength="2"
          maxLength="10"
          required
        />
        <label id="email">email</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={(e) => {
            setEmailValue(e.target.value);
          }}
          value={emailValue}
          required
        />
        <label id="password">password</label>
        <input
          type="text"
          name="password"
          id="password"
          onChange={(e) => {
            setPasswordValue(e.target.value);
          }}
          value={passwordValue}
          minLength="5"
          maxLength="10"
          required
        />
        <label id="phone">phone</label>
        <input
          type="text"
          name="phone"
          id="phone"
          onChange={(e) => {
            setPhoneValue(e.target.value);
          }}
          value={phoneValue}
        />
        <label id="city">city</label>
        <input
          type="text"
          name="city"
          id="city"
          onChange={(e) => {
            setCityValue(e.target.value);
          }}
          value={cityValue}
          required
          minLength="3"
          maxLength="15"
        />
        <label id="province">province</label>
        <input
          type="text"
          name="province"
          id="province"
          onChange={(e) => {
            setProvinceValue(e.target.value);
          }}
          value={provinceValue}
          required
          minLength="3"
          maxLength="15"
        />
        <label id="country">country</label>
        <input
          type="text"
          name="country"
          id="country"
          onChange={(e) => {
            setCountryValue(e.target.value);
          }}
          value={countryValue}
        />
        <label id="postalCode">postalCode</label>
        <input
          type="text"
          name="postalCode"
          id="postalCode"
          onChange={(e) => {
            setPostalCodeValue(e.target.value);
          }}
          value={postalCodeValue}
          minLength="1"
          maxLength="4"
        />
        <label id="birthday">birthday</label>
        <input
          type="date"
          name="birthday"
          id="birthday"
          onChange={(e) => {
            setBirthdayValue(e.target.value);
          }}
          value={birthdayValue}
        />
        <label id="address">address Street</label>
        <input
          type="text"
          name="address"
          id="address"
          onChange={(e) => {
            setCandidateAddressValue(e.target.value);
          }}
          value={candidateAddressValue}
          minLength="1"
          maxLength="10"
          required
        />
        <label id="addressStreet">address Number</label>
        <input
          type="text"
          name="addressStreet"
          id="addressStreet"
          onChange={(e) => {
            setCandidateAddressNumberValue(e.target.value);
          }}
          value={candidateAddressNumberValue}
          minLength="1"
          maxLength="10"
          required
        />
        <label id="hobbies">hobbies</label>
        <input
          type="text"
          name="hobbies"
          id="hobbies"
          onChange={(e) => {
            setHobbiesValue(e.target.value);
          }}
          value={hobbiesValue}
        />
        <label id="mainSkills">mainSkills</label>
        <input
          type="text"
          name="mainSkills"
          id="mainSkills"
          onChange={(e) => {
            setMainSkillsValue(e.target.value);
          }}
          value={mainSkillsValue}
        />
        <label id="profileTypes">profileTypes</label>
        <input
          type="text"
          name="profileTypes"
          id="profileTypes"
          onChange={(e) => {
            setProfileTypesValue(e.target.value);
          }}
          value={profileTypesValue}
        />
        <label id="isOpenToWork">isOpenToWork</label>
        <input
          type="checkbox"
          name="isOpenToWork"
          id="isOpenToWork"
          checked={isOpenToWorkValue}
          onChange={(e) => {
            setIsOpenToWorkValue(e.currentTarget.checked);
          }}
          value={isOpenToWorkValue}
        />
        <label id="isActive">isActive</label>
        <input
          type="checkbox"
          name="isActive"
          id="isActive"
          checked={isActiveValue}
          onChange={(e) => {
            setIsActiveValue(e.currentTarget.checked);
          }}
          value={isActiveValue}
        />
        <label id="education">education</label>
        <input
          type="text"
          name="education"
          id="education"
          onChange={(e) => {
            setEducationValue(e.target.value);
          }}
          value={educationValue}
        />
        <label id="experiences">experiences</label>
        <input
          type="text"
          name="experiences"
          id="experiences"
          onChange={(e) => {
            setExperiencesValue(e.target.value);
          }}
          value={experiencesValue}
        />
        <label id="courses">courses</label>
        <input
          type="text"
          name="courses"
          id="courses"
          onChange={(e) => {
            setCoursesValue(e.target.value);
          }}
          value={coursesValue}
        />
        <button type="submit">{!create ? 'SAVE CHANGES' : 'CREATE'}</button>
      </form>
    </div>
  );
}

export default CandidatesForm;
