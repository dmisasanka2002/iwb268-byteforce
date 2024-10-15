import React from "react";
import "../styles/ConfirmationModal.css"; // Create and import a CSS file for styling

/**
 * A modal that prompts the user to confirm an action.
 *
 * @param {string} message The message to display in the modal.
 * @param {function} onConfirm The function to call when the user confirms.
 * @param {function} onCancel The function to call when the user cancels.
 *
 * @returns {React.Component} The rendered modal component.
 */
const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Confirm Your Action</h2>
        <p className="modal-message">{message}</p>
        <div className="modal-buttons">
          <button className="modal-button confirm" onClick={onConfirm}>
            OK
          </button>
          <button className="modal-button cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
