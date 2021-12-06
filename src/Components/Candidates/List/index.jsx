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
        {data.length === 0 ? (
          <p className={styles.loading}>There are no applications</p>
        ) : (
          <tbody>
            {data.map((element) => {
              return (
                <ListItem
                  key={element._id}
                  id={element._id}
                  dataTable={{
                    firstname: element.firstName,
                    lastname: element.lastName,
                    phone: element.phoneNumber,
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
                    phone: element.phoneNumber,
                    email: element.email,
                    country: element.country,
                    province: element.province,
                    city: element.city,
                    postalCode: element.postalCode,
                    address: `${element.address.street} ${element.address.number}`,
                    birthday: element.birthday
                  }}
                  openModal={openModal}
                  resource="candidates"
                />
              );
            })}
          </tbody>
        )}
      </table>
    </div>
  );
}

export default List;
