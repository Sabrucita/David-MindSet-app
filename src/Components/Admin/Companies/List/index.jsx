import styles from './list.module.css';
import ListItem from 'Components/shared/ListItem';

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
          <p className={styles.loading}>There are no companies</p>
        ) : (
          <tbody>
            {data.map((element) => {
              return (
                <ListItem
                  key={element._id}
                  id={element._id}
                  dataTable={{
                    name: element.name,
                    address: element.address,
                    city: element.city,
                    phone: element.phone,
                    email: element.email
                  }}
                  dataElement={{
                    id: element._id,
                    name: element.name,
                    address: element.address,
                    city: element.city,
                    province: element.province,
                    country: element.country,
                    phone: element.phone,
                    email: element.email,
                    zipCode: element.zipCode,
                    pictureUrl: element.pictureUrl,
                    contactFullName: element.contactFullName,
                    contactPhone: element.contactPhone
                  }}
                  openModal={openModal}
                  missingData={element._id === null || element._id === null}
                  remove={true}
                  edit={true}
                  switchActive={false}
                  viewMore={true}
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
