import PropTypes from 'prop-types';
import css from './ContactsList.module.css';

export const ContactsList = ({ data, onRemove }) => {
  const peopleData =
    data.filter.length > 0
      ? data.contacts.filter(contact =>
          contact.name.toLowerCase().includes(data.filter.toLowerCase())
        )
      : data.contacts;

  return (
    <ul className={css['contacts-list']}>
      {peopleData.map(contact => (
        <li key={contact.id} className={css.item}>
          <p className={css.name}>{contact.name}</p>
          <p className={css.number}>{contact.number}</p>
          <button className={css.button} id={contact.name} onClick={onRemove}>
            delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactsList.propTypes = { onRemove: PropTypes.func, data: PropTypes.object };
