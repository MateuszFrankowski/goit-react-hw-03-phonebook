import PropTypes from 'prop-types';
import css from './PhoneBookForm.module.css';
import React, { PureComponent } from 'react';
import { nanoid } from 'nanoid';

export class ContactForm extends PureComponent {
  state = { name: '', number: '' };
  nameInputId = nanoid();
  telInputId = nanoid();

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState(() => ({ [name]: value }));
  };
  handleSubmit = evt => {
    const phonebookID = nanoid();
    evt.preventDefault();
    this.props.onSubmit(phonebookID, this.state.name, this.state.number);
  };
  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit} className={css.form} style={{}}>
          <label htmlFor={this.nameInputId}>Name</label>
          <input
            id={this.nameInputId}
            onChange={this.handleChange}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <label htmlFor={this.telInputId}>Number</label>
          <input
            id={this.telInputId}
            onChange={this.handleChange}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />

          <button type="submit">Add contact</button>
        </form>
      </>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
