import { useState, useEffect } from 'react';
import { capitalize } from '../../helpers';
const url = process.env.REACT_APP_API;

function Options({ name, resource, update }) {
  const [options, setOptions] = useState([]);
  useEffect(() => {
    const getNames = async () => {
      try {
        const res = await fetch(`${url}/${resource}`);
        if (res.status === 200) {
          const data = await res.json();
          let names = [];
          if (resource === 'open-positions') {
            data.forEach((element) => {
              const elementJob = {
                id: element._id,
                name: `${capitalize(element.jobDescription)}`
              };
              names.push(elementJob);
            });
          } else {
            data.forEach((element) => {
              const elementName = element.fullName
                ? element.name
                : `${element.firstName} ${element.lastName}`;
              const name = {
                id: element._id,
                name: `${capitalize(elementName)}`
              };
              names.push(name);
            });
          }
          return setOptions(names);
        }
        throw new Error(`HTTP ${res.status}`);
      } catch (err) {
        console.log(err);
      }
    };
    getNames();
  }, []);
  return (
    <>
      {!update ? (
        <option value="" disabled hidden>
          Select a {name}
        </option>
      ) : (
        <option value="" disabled hidden></option>
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
