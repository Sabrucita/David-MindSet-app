import { useState, useEffect } from 'react';
import Input from '../Input';
import Modal from '../Modal';
import styles from './form.module.css';

function Form() {
  let typeForm;
  let idToUpdate;
  if (!window.location.search) {
    typeForm = 'create';
  } else {
    typeForm = 'update';
    idToUpdate = window.location.search.slice(1);
  }

  const [nameValue, setNameValue] = useState();
  const [showModal, setShowModal] = useState(false);
  const [profileCreatedUpdated, setProfileCreatedUpdated] = useState();
  const [profileToUpdate, setProfileToUpdate] = useState();
  const [typeModal, setTypeModal] = useState();
  const [textDescription, seTTextDescription] = useState();

  //GET THE NAME
  const onChangeName = (event) => {
    setNameValue(event.target.value);
  };

  //CREATE PROFILE
  function onSubmitCreate(event) {
    event.preventDefault();
    if (!nameValue) {
      setTypeModal('dataRequired');
      seTTextDescription('Please complete the missing data');
      return openModal();
    }
    let profile = {
      name: nameValue,
      isActive: true
    };
    fetch(`${process.env.REACT_APP_API}/profile-types`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profile)
    })
      .then((response) => response.json())
      .then((response) => {
        setProfileCreatedUpdated(response.data);
        setTypeModal('dataCreate');
        openModal();
        if (response.msg) throw new Error(response.msg);
      })
      .catch((err) => console.log(err));
  }

  //PRELOAD THE APP INFO INTO THE INPUTS
  // GET THE INFO OF THE CHOOSEN PROFILE
  if (typeForm === 'update') {
    useEffect(() => {
      fetch(`${process.env.REACT_APP_API}/profile-types/${idToUpdate}`)
        .then((response) => response.json())
        .then((response) => {
          setProfileToUpdate(response.data);
        })
        .catch((err) => console.log(err));
    }, []);
  }

  //UPDATE PROFILE
  function onSubmitUpdate(event) {
    event.preventDefault();
    if (!nameValue) {
      setTypeModal('dataRequired');
      seTTextDescription('Please complete the missing data');
      return openModal();
    }
    let profile = {
      name: nameValue ? nameValue : profileToUpdate.name,
      isActive: true
    };
    fetch(`${process.env.REACT_APP_API}/profile-types/${idToUpdate}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profile)
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setProfileCreatedUpdated(response.newProfileType);
        setTypeModal('dataUpdate');
        openModal();
        if (response.msg) throw new Error(response.msg);
      })
      .catch((err) => console.log(err));
  }

  //MODAL
  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  return (
    <div className={styles.container}>
      <section className={styles.main}>
        <Modal
          show={showModal}
          closeModal={closeModal}
          content={profileCreatedUpdated}
          type={typeModal}
          textDescription={textDescription}
        />
        {typeForm === 'create' && <h1>Add Profile Type</h1>}
        {typeForm === 'update' && <h1>Update Profile Type</h1>}
        <form className={styles.formSubscription}>
          <div>
            <div className={styles.containerForm}>
              <ul className={styles.column}>
                <Input
                  key="name"
                  htmlFor="name"
                  labelTitle="Name"
                  nameSelect="name"
                  onchangeValue={onChangeName}
                  type="name"
                  typeForm={typeForm}
                  profileToUpdate={profileToUpdate}
                />
              </ul>
            </div>
          </div>
          {typeForm === 'create' && (
            <div className={styles.button}>
              <input type="button" value="SAVE" onClick={onSubmitCreate} />
            </div>
          )}
          {typeForm === 'update' && (
            <div className={styles.button}>
              <input type="button" value="UPDATE" onClick={onSubmitUpdate} />
            </div>
          )}
        </form>
      </section>
    </div>
  );
}

export default Form;
