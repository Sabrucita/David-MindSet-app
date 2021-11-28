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
          {props.data.map((element) => {
            return (
              <ItemList
                key={element._id}
                openModal={props.openModal}
                acceptModal={props.acceptModal}
                getIdSelected={props.getIdSelected}
                selectTypeForm={props.selectTypeForm}
                data={element}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default List;
