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

  const [candidates, setCandidates] = useState([]);
  const [positions, setPositions] = useState([]);
  const [openPositionValue, setOpenPositionValue] = useState();
  const [candidateValue, setCandidateValue] = useState();
  const [statusValue, setStatusValue] = useState();
  const [showModal, setShowModal] = useState(false);
  const [applicationCreatedUpdated, setApplicationCreatedUpdated] = useState();
  const [applicationToUpdate, setApplicationToUpdate] = useState();
  const [typeModal, setTypeModal] = useState();
  const [textDescription, seTTextDescription] = useState();

  //GET ALL EXISTING POSITIONS AND CANDIDATES IN ORDER TO INCLUDES ON THE SELECT OPTIONS
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/candidates`)
      .then((response) => response.json())
      .then((response) => {
        setCandidates(response.candidates);
      });
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/open-positions`)
      .then((response) => response.json())
      .then((response) => {
        setPositions(response.data);
      });
  }, []);

  //GET THE OPENPOSITION ID SELECTED
  let idPosition;
  const onChangeOpenPosition = (event) => {
    idPosition = event.target.value.split(' / ', 1);
    idPosition = idPosition[0];
    setOpenPositionValue(idPosition);
  };

  //GET THE CANDIDATE ID SELECTED
  let idCandidate;
  const onChangeCandidate = (event) => {
    idCandidate = event.target.value.split(' / ', 1);
    idCandidate = idCandidate[0];
    setCandidateValue(idCandidate);
  };

  //GET THE STATUS SELECTED
  let statusSelected;
  const onChangeStatus = (event) => {
    if (event.target.value === 'True') statusSelected = true;
    else statusSelected = false;
    setStatusValue(statusSelected);
  };

  //CREATE CANDIDATE
  function onSubmitCreate(event) {
    event.preventDefault();
    if (!candidateValue || !openPositionValue) {
      setTypeModal('dataRequired');
      seTTextDescription('Please complete the missing data');
      return openModal();
    }
    let application = {
      idCandidate: candidateValue,
      idOpenPosition: openPositionValue,
      isActive: true
    };
    fetch(`${process.env.REACT_APP_API}/applications`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(application)
    })
      .then((response) => response.json())
      .then((response) => {
        setApplicationCreatedUpdated(response.application);
        setTypeModal('dataCreate');
        openModal();
        if (response.msg) throw new Error(response.msg);
      })
      .catch((err) => console.log(err));
  }

  //PRELOAD THE APP INFO INTO THE INPUTS
  // GET THE INFO OF THE CHOOSEN APP
  if (typeForm === 'update') {
    useEffect(() => {
      fetch(`${process.env.REACT_APP_API}/applications/${idToUpdate}`)
        .then((response) => response.json())
        .then((response) => {
          setApplicationToUpdate(response.application);
        })
        .catch((err) => console.log(err));
    }, []);
  }

  //UPDATE CANDIDATE
  function onSubmitUpdate(event) {
    event.preventDefault();
    let application = {
      idCandidate: candidateValue ? candidateValue : applicationToUpdate.idCandidate._id,
      idOpenPosition: openPositionValue
        ? openPositionValue
        : applicationToUpdate.idOpenPosition._id,
      isActive: statusValue !== null ? statusValue : applicationToUpdate.isActive
    };
    fetch(`${process.env.REACT_APP_API}/applications/${idToUpdate}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(application)
    })
      .then((response) => response.json())
      .then((response) => {
        setApplicationCreatedUpdated(response.application);
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
          content={applicationCreatedUpdated}
          type={typeModal}
          textDescription={textDescription}
        />
        {typeForm === 'create' && <h1>Add application</h1>}
        {typeForm === 'update' && <h1>Update application</h1>}
        <form className={styles.formSubscription}>
          <div>
            <div className={styles.containerForm}>
              <ul className={styles.column}>
                <Input
                  key="openPosition"
                  htmlFor="openPosition"
                  labelTitle="Open Position"
                  nameSelect="openPosition"
                  onchangeSelect={onChangeOpenPosition}
                  data={positions}
                  type="position"
                  typeForm={typeForm}
                  applicationToUpdate={applicationToUpdate}
                />
                {typeForm === 'update' && (
                  <Input
                    key="status"
                    htmlFor="status"
                    labelTitle="Status"
                    nameSelect="status"
                    onchangeSelect={onChangeStatus}
                    type="status"
                    typeForm={typeForm}
                    applicationToUpdate={applicationToUpdate}
                  />
                )}
              </ul>
              <ul className={styles.column}>
                <Input
                  key="candidate"
                  htmlFor="candidate"
                  labelTitle="Candidate"
                  nameSelect="candidate"
                  onchangeSelect={onChangeCandidate}
                  data={candidates}
                  type="candidate"
                  typeForm={typeForm}
                  applicationToUpdate={applicationToUpdate}
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
