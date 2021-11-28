import styles from './list.module.css';
import ItemList from '../ItemList';

function List(props) {
  return (
    <div className={styles.list}>
      <table>
        <thead>
          <tr>
            {props.header.map((element) => {
              // eslint-disable-next-line react/jsx-key
              return <th>{element}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {props.data.map((app) => {
            return (
              <ItemList
                key={app._id}
                name={`${app.idCandidate.firstName} ${app.idCandidate.lastName}`}
                position={app.idOpenPosition.jobDescription}
                status={app.isActive}
                openModal={props.openModal}
                acceptModal={props.acceptModal}
                getIdSelected={props.getIdSelected}
                selectTypeForm={props.selectTypeForm}
                dataApp={app}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default List;
