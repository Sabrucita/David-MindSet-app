import ListItem from 'Components/shared/ListItem';
import styles from './list.module.css';
import { formatDate } from 'helpers';

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
                  name: `${element.firstName} ${element.lastName}`,
                  phone: element.phone,
                  email: element.email,
                  country: element.country,
                  province: element.province,
                  city: element.city,
                  address: `${element.address.street} ${element.address.number}`,
                  birthday: formatDate(element.birthday, false),
                  openToWork: element.isOpenToWork ? 'YES' : 'NO'
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
                  birthday: formatDate(element.birthday, false),
                  pictureUrl: element.pictureUrl,
                  openToWork: element.isOpenToWork
                }}
                openModal={openModal}
                missingData={element._id === null || element._id === null}
                remove={true}
                edit={true}
                switchActive={true}
                viewMore={true}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default List;
