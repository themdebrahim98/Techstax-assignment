import React, { useState } from "react";
import "./DraggableFileInput.css";

function DraggableFileInput({ onFileChange, selectedFile }) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    onFileChange(file);
    console.log(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    onFileChange(file);
    console.log(file);
  };

  return (
    <div
      className={`file-drop-area ${isDragOver ? "dragover" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <label htmlFor="fileInput" className="file-input-label">
        {selectedFile ? (
          selectedFile.name
        ) : (
          <>
            <span>Drag & Drop or</span>
            <span className="browse-link">Browse</span>
          </>
        )}
      </label>
      <input
        type="file"
        id="fileInput"
        className="file-input"
        accept=".csv"
        onChange={handleFileInputChange}
      />
    </div>
  );
}

export default DraggableFileInput;
