// UserDeleteConfirmation.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface UserDeleteConfirmationProps {
  onDeleteConfirmed: () => void;
  onCancel: () => void;
}

function UserDeleteConfirmation({ onDeleteConfirmed, onCancel }: UserDeleteConfirmationProps) {
  const navigate = useNavigate();

  const handleConfirmDelete = () => {
    // Send a DELETE request to your API to delete the user
    // Example: axios.delete(`/api/users/${userId}`).then(() => onDeleteConfirmed());
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete this user?</p>
        <div className="modal-actions">
          <button onClick={handleConfirmDelete} className="btn btn-danger">
            Confirm
          </button>
          <button onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserDeleteConfirmation;
