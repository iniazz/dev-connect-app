import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { User } from '../user';

interface UserDeleteConfirmationProps {
  onDeleteConfirmed: () => void;
  onCancel: () => void;
  user: User | null;
}

function UserDeleteConfirmation({
  onDeleteConfirmed,
  onCancel,
  user,
}: UserDeleteConfirmationProps) {
  const handleConfirmDelete = () => {
    onDeleteConfirmed();
  };

  return (
    <Modal show={true} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body className='modal-body-custom'>
        {user && (
          <p>
            Are you sure you want to delete user <strong>{user.username}</strong>?
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" size='sm' onClick={handleConfirmDelete}>
          Confirm
        </Button>
        <Button variant="secondary" size='sm' onClick={onCancel}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UserDeleteConfirmation;
