import ListItem from '../../shared/ListItem';
import styles from './list.module.css';

function List({ header, data, openModal }) {
  return (
    <div className={styles.list}>
      <table>
        <thead>
          <tr>
            {header.map((element) => {
              return <th key={element}>{element}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((element) => {
            return (
              <ListItem
                key={element._id}
                id={element._id}
                dataTable={{
                  firstName: element.firstName,
                  lastName: element.lastName,
                  phone: element.phone,
                  email: element.email,
                  country: element.country,
                  province: element.province,
                  city: element.city,
                  postalCode: element.postalCode,
                  address: `${element.address.street} ${element.address.number}`,
                  birthday: element.birthday
                }}
                dataElement={{
                  id: element._id,
                  firstname: element.firstName,
                  lastname: element.lastName,
                  phone: element.phone,
                  email: element.email,
                  country: element.country,
                  province: element.province,
                  city: element.city,
                  postalCode: element.postalCode,
                  address: `${element.address.street} ${element.address.number}`,
                  birthday: element.birthday
                }}
                openModal={openModal}
                missingData={element._id === null || element._id === null}
                resource="candidates"
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default List;
