import React, { useState, useEffect } from 'react';
import shortid from 'shortid';
import { ContactForm } from 'components/index';
import { Filter } from 'components/index';
import { ContactList } from 'components/index';
import { setToLocaleStorage, getFromLocaleStorage } from 'components/index';

const KEY_FOR_CONTACTS = 'CONTACTS_KEY';

export function Phonebook() {
    const [contacts, setContacts] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const dataFromLocaleStorage = getFromLocaleStorage(KEY_FOR_CONTACTS);
        if (!dataFromLocaleStorage) {
            return;
        }
        return setContacts(dataFromLocaleStorage);
    }, []);

    useEffect(() => {
        if (contacts.length === 0) {
            localStorage.removeItem(KEY_FOR_CONTACTS);
            return;
        }
        return setToLocaleStorage(KEY_FOR_CONTACTS, contacts);
    }, [contacts]);

    const handleSubmit = data => {
        const isInContacts = contacts.some(
            ({ name }) => name.toLowerCase() === data.name.toLowerCase()
        );

        if (isInContacts) {
            alert(`${data.name} is already in contacts`);
            return;
        }

        const newContact = {
            id: shortid.generate(),
            name: data.name,
            number: data.number,
        };

        setContacts(prevContacts => {
            return [newContact, ...prevContacts];
        });
    };

    const handleFilterChange = event => {
        setFilter(event.currentTarget.value);
    };

    const getFilteredContacts = () => {
        const normalizeFilter = filter.toLowerCase().trim();
        return contacts.filter(({ name }) =>
            name.toLocaleLowerCase().includes(normalizeFilter)
        );
    };
    const fiteredContacts = getFilteredContacts();

    const handleDeleteClick = id => {
        setContacts(prevContacts => {
            return prevContacts.filter(contact => contact.id !== id);
        });
    };

    return (
        <div>
            <h1>Phonebook</h1>

            <ContactForm onSubmit={handleSubmit} />

            <h2>Contacts</h2>

            <Filter value={filter} handleFilterChange={handleFilterChange} />

            <ContactList
                fiteredContacts={fiteredContacts}
                handleDeleteClick={handleDeleteClick}
            />
        </div>
    );
}