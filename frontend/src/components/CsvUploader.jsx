import React, { useState, useRef } from "react";
import "../styles/CsvUploader.css"; // Import the CSS file

const CsvUploader = () => {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null); // Create a reference for the hidden file input

  // Handle file input through both drag-and-drop and normal file input
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
    } else {
      alert("Please upload a valid CSV file");
    }
  };

  // Handle drag events
  const handleDrag = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "dragenter" || event.type === "dragover") {
      setDragActive(true);
    } else if (event.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle drop event
  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);

    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "text/csv") {
      setFile(droppedFile);
    } else {
      alert("Please drop a valid CSV file");
    }
  };

  // Handle area click to trigger file input click
  const handleAreaClick = () => {
    inputRef.current.click(); // Simulate a click on the hidden file input
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (file) {
      // Process the CSV file (send to server or read locally)
      console.log("File submitted:", file);
    } else {
      alert("Please upload a file first.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Hidden file input */}
        <input
          type="file"
          id="csvFile"
          accept=".csv"
          ref={inputRef} // Reference the hidden input
          onChange={handleFileChange}
          style={{ display: "none" }} // Hide the file input
        />

        {/* Drag-and-drop area */}
        <div
          className={`drag-drop-zone ${dragActive ? "active" : ""}`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={handleAreaClick} // Trigger file input click on area click
        >
          {dragActive ? (
            <p>Drop your file here...</p>
          ) : (
            <p>Drag & Drop your CSV file here or click to upload</p>
          )}
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>

      {file && (
        <div className="file-details">
          <h4>Selected file:</h4>
          <p>{file.name}</p>
        </div>
      )}
    </div>
  );
};

export default CsvUploader;
