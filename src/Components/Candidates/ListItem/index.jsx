import { useState } from 'react';
import React from 'react';
import styles from './list.module.css';
import { Modal } from '../Modal';

function ListItem(props) {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section className={styles.container}>
      <Modal show={showModal} closeModal={closeModal} />
      <h2>{props.itemListInfo.name} INFO</h2>
      <div>
        <table className={styles.list}>
          <tr key={props.itemListInfo._id}>
            <td>Name: {props.itemListInfo.firstName}</td>
            <tr>
              <td>Surname: {props.itemListInfo.lastName}</td>
            </tr>
            <tr>
              <td>E-Mail: {props.itemListInfo.email}</td>
            </tr>
            <tr>
              <td>PassWord: {props.itemListInfo.password}</td>
            </tr>
            <tr>
              <td>Phone Number: {props.itemListInfo.phone}</td>
            </tr>
            <tr>
              <td>City: {props.itemListInfo.city}</td>
            </tr>
            <tr>
              <td>Province: {props.itemListInfo.province}</td>
            </tr>
            <tr>
              <td>Country: {props.itemListInfo.country}</td>
            </tr>
            <tr>
              <td>Zip Code: {props.itemListInfo.postalCode}</td>
            </tr>
            <tr>
              <td>Birthday: {props.itemListInfo.birthday}</td>
            </tr>
            <tr>
              <td>Hobbies: {props.itemListInfo.hobbies}</td>
            </tr>
            <tr>
              <td>Main Skills: {props.itemListInfo.mainSkills}</td>
            </tr>
            <tr>
              <td>Profile Types: {props.itemListInfo.profileTypes}</td>
            </tr>
            <tr>
              <td>Is Open To Work: {props.itemListInfo.isOpenToWork}</td>
            </tr>
            <tr>
              <td>Is Active: {props.itemListInfo.isActive}</td>
            </tr>
            <tr>
              <td>Education: {props.itemListInfo.education}</td>
            </tr>
            <tr>
              <td>Experiences: {props.itemListInfo.experiences}</td>
            </tr>
            <td>Courses: {props.itemListInfo.courses}</td>
          </tr>
          <tr>
            <td>Address Street: {props.itemListInfo.street}</td>
          </tr>
          <tr>
            <td>Address Number: {props.itemListInfo.number}</td>
          </tr>
        </table>
      </div>
    </section>
  );
}

export default ListItem;
