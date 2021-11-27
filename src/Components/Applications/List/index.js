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
              // eslint-disable-next-line react/jsx-key
              <ItemList
                id={app._id}
                name={`${app.idCandidate.firstName} ${app.idCandidate.lastName}`}
                position={app.idOpenPosition.jobDescription}
                status={app.isActive}
                openModal={props.openModal}
                acceptModal={props.acceptModal}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default List;
