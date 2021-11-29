import { useState, useEffect } from 'react';
import Input from '../Input';
import InputDate from '../InputDate';
import Modal from '../Modal';
import styles from './form.module.css';

function Form() {
  let typeForm = localStorage.getItem('typeForm');
  let idToUpdate = localStorage.getItem('idToUpdate');

  const [candidates, setCandidates] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [companyValue, setCompanyValue] = useState();
  const [candidateValue, setCandidateValue] = useState();
  const [statusValue, setStatusValue] = useState();
  const [dateValue, setDateValue] = useState();
  const [showModal, setShowModal] = useState(false);
  const [interviewCreatedUpdated, setInterviewCreatedUpdated] = useState();
  const [interviewToUpdate, setInterviewToUpdate] = useState();
  const [typeModal, setTypeModal] = useState();

  //GET ALL EXISTING COMPANIES AND CANDIDATES IN ORDER TO INCLUDES ON THE SELECT OPTIONS
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/candidates`)
      .then((response) => response.json())
      .then((response) => {
        setCandidates(response.candidates);
      });
  }, []);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/companies`)
      .then((response) => response.json())
      .then((response) => {
        setCompanies(response.data);
      });
  }, []);

  //GET THE COMPANY ID SELECTED
  let idCompany;
  const onChangeCompany = (event) => {
    idCompany = event.target.value.split(' / ', 1);
    idCompany = idCompany[0];
    setCompanyValue(idCompany);
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
  //GET THE DATE ID SELECTED
  const onChangeDate = (event) => {
    setDateValue(event.target.value);
  };

  //CREATE CANDIDATE
  function onSubmitCreate(event) {
    event.preventDefault();
    let interview = {
      idCandidate: candidateValue,
      idCompany: companyValue,
      date: dateValue,
      status: statusValue,
      isActive: true
    };
    fetch(`${process.env.REACT_APP_API}/interviews`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(interview)
    })
      .then((response) => response.json())
      .then((response) => {
        setInterviewCreatedUpdated(response.data);
        setTypeModal('dataCreate');
        openModal();
        if (response.msg) throw new Error(response.msg);
      })
      .catch((err) => console.log(err));
  }

  //PRELOAD THE APP INFO INTO THE INPUTS
  // GET THE INFO OF THE CHOOSEN APP
  //REPLACE WHEN WE USE PROPS!!!!!!!!!!!
  if (typeForm === 'update') {
    useEffect(() => {
      //REPLACE WHEN WE USE PROPS!!!!!!!!!!!
      fetch(`${process.env.REACT_APP_API}/interviews/${idToUpdate}`)
        .then((response) => response.json())
        .then((response) => {
          setInterviewToUpdate(response.data);
        })
        .catch((err) => console.log(err));
    }, []);
  }

  //UPDATE CANDIDATE
  function onSubmitUpdate(event) {
    event.preventDefault();
    let interview = {
      idCandidate: candidateValue ? candidateValue : interviewToUpdate.idCandidate._id,
      idCompany: companyValue ? companyValue : interviewToUpdate.idCompany._id,
      status: statusValue !== null ? statusValue : interviewToUpdate.status,
      date: dateValue ? dateValue : interviewToUpdate.date,
      isActive: true
    };
    //REPLACE WHEN WE USE PROPS!!!!!!!!!!!
    fetch(`${process.env.REACT_APP_API}/interviews/${idToUpdate}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(interview)
    })
      .then((response) => response.json())
      .then((response) => {
        setInterviewCreatedUpdated(response.data);
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
          content={interviewCreatedUpdated}
          type={typeModal}
        />
        {/* //REPLACE WHEN WE USE PROPS!!!!!!!!!!! */}
        {typeForm === 'create' && <h1>Add Interview</h1>}
        {typeForm === 'update' && <h1>Update Interview</h1>}
        <form className={styles.formSubscription}>
          <div>
            <div className={styles.containerForm}>
              <ul className={styles.column}>
                <Input
                  key="company"
                  htmlFor="company"
                  labelTitle="Company"
                  nameSelect="Company"
                  onchangeSelect={onChangeCompany}
                  data={companies}
                  type="company"
                  typeForm={typeForm}
                  interviewToUpdate={interviewToUpdate}
                />
                {/* //REPLACE WHEN WE USE PROPS!!!!!!!!!!! */}
                <Input
                  key="status"
                  htmlFor="status"
                  labelTitle="Status"
                  nameSelect="status"
                  onchangeSelect={onChangeStatus}
                  type="status"
                  typeForm={typeForm}
                  interviewToUpdate={interviewToUpdate}
                />
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
                  interviewToUpdate={interviewToUpdate}
                />
                <InputDate
                  key="date"
                  htmlFor="date"
                  type="date"
                  name="date"
                  interviewToUpdate={interviewToUpdate}
                  onChange={onChangeDate}
                />
              </ul>
            </div>
          </div>
          {/* //REPLACE WHEN WE USE PROPS!!!!!!!!!!! */}
          {typeForm === 'create' && (
            <div className={styles.button}>
              <input type="button" value="SAVE" onClick={onSubmitCreate} />
            </div>
          )}
          {/* //REPLACE WHEN WE USE PROPS!!!!!!!!!!! */}
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
