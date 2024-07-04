import React, { useRef, ChangeEvent } from 'react';
import { Button } from '@mui/material';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';

interface FileSelectorProps {
  onFileChange: (file: File) => void;
}

const FileSelector: React.FC<FileSelectorProps> = ({ onFileChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileChange(file);
    }
  };

	return (
		<div>
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
			sx={{
				bgcolor: '#f97316',
				color: '#e2e8f0',
				'&:hover':{
					bgcolor: '#c2410c',  
					color: '#94a3b8', 
				}
			}}
		>
			<ImageOutlinedIcon />
		</Button>
		</div>
	);
};

export default FileSelector;
