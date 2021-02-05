import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'
import { useConversations } from '../contexts/ConversationsProvider' 


export default function NewConversationModal({ closeModal }) {
    const [selectedContactIds, setSelectedContactIds] = useState([])
    const { contacts } = useContacts()
    const { createConversations } = useConversations()

    function handleSubmit(e) {
        e.preventDefault()
        createConversations(selectedContactIds)
        closeModal()
    }
    function handleCheckboxChange(contactId){
        setSelectedContactIds(prevSelectedContactIds => {
            if (prevSelectedContactIds.includes(contactId)){
                return prevSelectedContactIds.filter(prevIds => {
                    return contactId !== prevIds
                })
            }else {
                return [...prevSelectedContactIds, contactId]
            }
        })
    }
    
    return (
        <>
        <Modal.Header closeButton>Create Coversations</Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                {contacts.map(contact => (
                    <Form.Group controlId={contact.id} key={contact.id}>
                        <Form.Check
                         type="checkbox"
                         label={contact.name}
                         value={selectedContactIds.includes(contact.id)}
                         onChange={() => handleCheckboxChange(contact.id)}
                        />    
                    </Form.Group>
                ))}
                <Button type="submit">Create</Button>
            </Form>
        </Modal.Body>
        </>
    );
}