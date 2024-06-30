import React, { useRef, ChangeEvent } from 'react';
import { Button } from '@mui/material';

const FileUpload: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Selected file:', file);
    }
  };

  return (
    <div style={{}}>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleButtonClick} 
        size='large' 
    >
        Add Product Image
      </Button>
    </div>
  );
};

export default FileUpload;
