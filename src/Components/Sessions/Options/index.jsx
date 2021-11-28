import { useState, useEffect } from 'react';
import { capitalize } from '../helpers';
const url = process.env.REACT_APP_API;

function Options({ name, resource, operation }) {
  const [options, setOptions] = useState([]);
  useEffect(() => {
    const getNames = async () => {
      try {
        const res = await fetch(`${url}/${resource}`);
        if (res.status === 200) {
          const data = await res.json();
          let names = [];
          data[resource].forEach((element) => {
            let name = {
              id: element._id,
              name: `${capitalize(element.firstName)} ${capitalize(element.lastName)}`
            };
            names.push(name);
          });
          return setOptions(names);
        }
        throw new Error(`HTTP ${res.status}`);
      } catch (err) {
        console.log(err);
        //displayError(err);
      }
    };
    getNames();
  }, []);

  return (
    <>
      {operation === 'create' ? (
        <option value="" disabled hidden>
          Select a {name}
        </option>
      ) : (
        ''
      )}
      {options.map((option) => {
        return (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        );
      })}
    </>
  );
}
export default Options;
