import { useState, useEffect } from 'react';
import Input from '../Input';
import styles from './form.module.css';

function Form() {
  const [candidates, setCandidates] = useState([]);
  const [positions, setPositions] = useState([]);
  const [openPositionValue, setOpenPositionValue] = useState();
  const [candidateValue, setCandidateValue] = useState();
  // const [showModal, setShowModal] = useState(false);

  let idPosition = '';
  let idCandidate = '';

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
        //be careful with the .data/ many others resourses give us .candidates or .applications
        setPositions(response.data);
      });
  }, []);

  //GET THE OPENPOSITION SELECTED
  const onChangeOpenPosition = (event) => {
    idPosition = event.target.value.split(' / ', 1);
    idPosition = idPosition[0];
    setOpenPositionValue(idPosition);
  };
  //GET THE CANDIDATE SELECTED
  const onChangeCandidate = (event) => {
    idCandidate = event.target.value.split(' / ', 1);
    idCandidate = idCandidate[0];
    setCandidateValue(idCandidate);
  };

  //CREATE CANDIDATE
  function onSubmit(event) {
    event.preventDefault();
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
        if (response.msg) throw new Error(response.msg);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles.container}>
      <section className={styles.main}>
        {/* <InfoModal
        /> */}
        <h1 id="title">Add application</h1>
        <form id="form" className={styles.formSubscription}>
          <div>
            <div className={styles.containerForm}>
              <ul className={styles.column}>
                <Input
                  htmlFor="openPosition"
                  labelTitle="Open Position"
                  nameSelect="openPosition"
                  idSelect="open-position" //ver si vuela
                  onchangeSelect={onChangeOpenPosition}
                  data={positions}
                  type="position"
                />
                <li id="is-active-entry" className={styles.modalHide}>
                  <label htmlFor="is-active">Active status</label>
                  <input type="checkbox" id="is-active" name="date" />
                </li>
              </ul>
              <ul className={styles.column}>
                <Input
                  htmlFor="candidate"
                  labelTitle="Candidate"
                  nameSelect="candidate"
                  idSelect="candidate" //ver si vuela
                  onchangeSelect={onChangeCandidate}
                  data={candidates}
                  type="candidate"
                />
              </ul>
            </div>
          </div>
          <div className={styles.button}>
            <input id="save-button" type="button" value="SAVE" onClick={onSubmit} />
          </div>
        </form>
      </section>
    </div>
  );
}

export default Form;
