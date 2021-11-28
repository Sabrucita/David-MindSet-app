import styles from './list.module.css';
// eslint-disable-next-line
function List() {
  return (
    <div className={styles.list}>
      <table>
        <thead>
          <tr>
            <td>firstName</td>
            <td>lastName</td>
            <td>Name</td>
            <td>email</td>
            <td>phone</td>
            <td>Edit</td>
            <td>Delete</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <button className="editButton">Edit</button>
            </td>
            <td>
              <button className="deleteButton">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
