import styles from './list.module.css';
import ItemList from '../ItemList';

function List(props) {
  return (
    <div className={styles.list}>
      <table>
        <thead>
          <tr>
            {props.header.map((element) => {
              return <th key={element}>{element}</th>;
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
