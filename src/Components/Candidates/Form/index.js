// eslint-disable-next-line
import React, { useState, useEffect } from 'react';

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  phone: '',
  city: '',
  province: '',
  country: '',
  postalCode: '',
  birthday: '',
  hobbies: '',
  mainSkills: '',
  profileTypes: '',
  isOpenToWork: '',
  isActive: '',
  education: '',
  experiences: '',
  courses: ''
};

const Form = () => {
  // eslint-disable-next-line
  const [form, setForm] = useState(initialForm);
  const handlerChange = () => {};

  const handlerSubmit = () => {};

  const handlerReset = () => {};

  return (
    <div>
      <h3>Add</h3>
      <form onSubmit={handlerSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="FirstName"
          onChange={handlerChange}
          value={form.firstName}
        />
        <input
          type="text"
          name="lastName"
          placeholder="LastName"
          onChange={handlerChange}
          value={form.lastName}
        />
        <input
          type="text"
          name="email"
          placeholder="email"
          onChange={handlerChange}
          value={form.email}
        />
        <input
          type="text"
          name="password"
          placeholder="password"
          onChange={handlerChange}
          value={form.password}
        />
        <input
          type="number"
          name="phone"
          placeholder="phone"
          onChange={handlerChange}
          value={form.phone}
        />
        <input
          type="text"
          name="city"
          placeholder="city"
          onChange={handlerChange}
          value={form.city}
        />
        <input
          type="text"
          name="province"
          placeholder="province"
          onChange={handlerChange}
          value={form.province}
        />
        <input
          type="text"
          name="country"
          placeholder="country"
          onChange={handlerChange}
          value={form.country}
        />
        <input
          type="number"
          name="postalCode"
          placeholder="postalCode"
          onChange={handlerChange}
          value={form.postalCode}
        />
        <input
          type="text"
          name="birthday"
          placeholder="birthday"
          onChange={handlerChange}
          value={form.birthday}
        />
        <input
          type="text"
          name="hobbies"
          placeholder="hobbies"
          onChange={handlerChange}
          value={form.hobbies}
        />
        <input
          type="text"
          name="mainSkills"
          placeholder="mainSkills"
          onChange={handlerChange}
          value={form.mainSkills}
        />
        <input
          type="text"
          name="profileTypes"
          placeholder="profileTypes"
          onChange={handlerChange}
          value={form.profileTypes}
        />
        <input
          type="boolean"
          name="isOpenToWork"
          placeholder="true or false"
          onChange={handlerChange}
          value={form.isOpenToWork}
        />
        <input
          type="boolean"
          name="isActive"
          placeholder="true or false"
          onChange={handlerChange}
          value={form.isActive}
        />
        <input
          type="text"
          name="education"
          placeholder="education"
          onChange={handlerChange}
          value={form.education}
        />
        <input
          type="text"
          name="experiences"
          placeholder="experiences"
          onChange={handlerChange}
          value={form.experiences}
        />
        <input
          type="text"
          name="courses"
          placeholder="courses"
          onChange={handlerChange}
          value={form.courses}
        />
        <input type="submit" value="ADD" />
        <input type="reset" value="CLEAR" onClick={handlerReset} />
      </form>
    </div>
  );
};

export default Form;
