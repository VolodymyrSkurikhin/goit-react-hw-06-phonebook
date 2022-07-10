import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from 'Redux/action';
// import PropTypes from 'prop-types';
import s from './ContactForm.module.css';

function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(state => state.contacts.items);
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = e => {
    e.preventDefault();
    contacts.find(cont => cont.name === name)
      ? alert(`${name} is already in contacts`)
      : dispatch(addContact(name, number));
    setName('');
    setNumber('');
  };

  return (
    <div className={s.maincontainer}>
      <form className={s.mainform} onSubmit={handleSubmit}>
        <label htmlFor="inpname" className={s.mainlabel}>
          Name{' '}
        </label>
        <input
          id="inpname"
          className={s.mainInput}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={e => setName(e.currentTarget.value)}
        />
        <label htmlFor="inptel" className={s.mainlabel}>
          Number{' '}
        </label>
        <input
          id="inptel"
          className={s.mainInput}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={e => setNumber(e.currentTarget.value)}
        />
        <button type="submit" className={s.submitBtn}>
          Add contact
        </button>
      </form>
    </div>
  );
}

export default ContactForm;

// ContactForm.propTypes = {
//   onSubmit: PropTypes.func,
// };
