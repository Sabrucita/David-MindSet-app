import { useEffect, useState } from 'react';
import styles from './candidates.module.css';
import { Modal } from './Modal';

//FUNCTION TO LIST ALL CANDIDATES
function Candid() {
  const [showModal, setShowModal] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [lastIdClicked, setLastIdClicked] = useState('');
  const [lastAction, setLastAction] = useState('');
  const [itemListInfo, setItemListInfo] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/candidates`)
      .then((response) => response.json())
      .then((response) => {
        setCandidates(response.candidates);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //modal
  const closeModal = () => {
    setShowModal(false);
  };

  //FUNCTION TO DELETE A CANDIDATE BY ID
  const deleteClick = (id) => {
    fetch(`${process.env.REACT_APP_API}/candidates/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then((response) => {
        if (response.status === 200) {
          setCandidates(candidates.filter((deleteCandidate) => deleteCandidate._id !== id));
        }
      })
      .catch((error) => console.log(error));
  };
  const onConfirmDeleteModal = () => {
    deleteClick(lastIdClicked);
  };

  return (
    <section className={styles.container}>
      <Modal
        show={showModal}
        closeModal={closeModal}
        onCloseModal={onConfirmDeleteModal}
        itemListInfo={itemListInfo}
        action={lastAction}
      />
      <h2>Candidates</h2>
      <div>
        <table className={styles.list}>
          <thead>
            <tr>
              <th>first name</th>
              <th>last name</th>
              <th>phone</th>
              <th>email</th>
              <th>country</th>
              <th>province</th>
              <th>city</th>
              <th>postal code</th>
              <th>address</th>
              <th>birthday</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => {
              return (
                <tr
                  onDoubleClick={() => {
                    window.location.href = `/candidates/list?_id=${candidate._id}`;
                  }}
                  key={candidate._id}
                >
                  <td>{candidate.firstName}</td>
                  <td>{candidate.lastName}</td>
                  <td>{candidate.phone}</td>
                  <td>{candidate.email}</td>
                  <td>{candidate.country}</td>
                  <td>{candidate.province}</td>
                  <td>{candidate.city}</td>
                  <td>{candidate.postalCode}</td>
                  <td>{`${candidate.address.street} ${candidate.address.number}`}</td>
                  <td>{candidate.birthday}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        window.location.href = `/candidates/form?_id=${candidate._id}`;
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setLastIdClicked(candidate._id);
                        setLastAction('delete');
                      }}
                      type="button"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        setLastIdClicked(candidate._id);
                        setLastAction('view');
                        setItemListInfo(candidate);
                        setShowModal(true);
                      }}
                      type="button"
                    >
                      View More
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button
          className={styles.button}
          type="button"
          onClick={() => {
            window.location.href = `/candidates/form`;
          }}
        >
          Add
        </button>
      </div>
    </section>
  );
}
export default Candid;
