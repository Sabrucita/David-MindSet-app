import styles from './list.module.css';
import ItemList from '../ItemList';

function List(props) {
  console.log(props.data);
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
            console.log(app.isActive);
            return (
              // eslint-disable-next-line react/jsx-key
              <ItemList
                id={app._id}
                name="nombre candidato"
                position="position"
                status={app.isActive}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default List;

// {applications.map((application) => {
//   return <div key={application._id}>{application._id}</div>;
// })}
// <ItemList id={app._id} name={app.firstName} />;
