import TableRow from '../TableRow';
import styles from './list.module.css';

const List = () => (
  <div className={styles.list}>
    <h3>Candidates</h3>
    <table>
      <thead>
        <tr>
          <th>firstName</th>
          <th>lastName</th>
          <th>email</th>
          <th>password</th>
          <th>phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <TableRow />
      </tbody>
    </table>
  </div>
);

export default List;
