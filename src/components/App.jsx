import React, { Component } from 'react';
import { ContactForm } from './Form/PhoneBookForm';
import { ContactsList } from './Contacts/ContactList';
import { Filter } from './Filter/Filter';
// const checkStorage = () => {
//   const list = window.localStorage.getItem('phonebook-list'); // 1
//   console.log(list);
//   if (!list) return [];

//   try {
//     return JSON.parse(list);
//   } catch (e) {
//     console.error(e);
//   }
// };
// const initialState = !!checkStorage() ? checkStorage() : [];
export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  handleChange = evt => {
    const { value, name } = evt.target;

    if (name === 'filter') {
      this.setState({ filter: value });
    }
  };
  handleContact = (id, contactName, number) => {
    if (this.state.contacts.find(element => element.name === contactName)) {
      return alert(contactName + ' is already in contacts');
    }
    this.setState({
      contacts: [
        ...this.state.contacts,
        { id: id, name: contactName, number: number },
      ],
    });
  };
  handleRemoveData = evt => {
    let array = [...this.state.contacts];
    console.log('array,', array);
    const nameToRemove = evt.target.id;

    const removeContact = name => {
      const index = array.findIndex(function (contact) {
        return contact.name === name;
      });
      if (index > -1) {
        array.splice(index, 1);
        this.setState({ contacts: array });
      }
    };
    removeContact(nameToRemove);
  };

  componentDidMount() {
    console.log('ej');
    const list = window.localStorage.getItem('phonebook-list'); // 1
    if (!list) return;

    try {
      this.setState({
        contacts: JSON.parse(list),
      });
    } catch (e) {
      console.error(e);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      const phonebookListStringified = JSON.stringify(this.state.contacts);
      window.localStorage.setItem('phonebook-list', phonebookListStringified);
    }
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.handleContact} />
        {this.state.contacts.length > 0 && (
          <div>
            <h2>Contacts</h2>
            <Filter onChange={this.handleChange} />
            <ContactsList data={this.state} onRemove={this.handleRemoveData} />
          </div>
        )}
      </div>
    );
  }
}
