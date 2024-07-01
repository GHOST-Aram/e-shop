import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import FileSelector from '../components/FileSelector'; 

interface ProductFormState {
  productName: string;
  currentPrice: string;
  previousPrice: string;
  description: string;
  selectedFile: File | null;
}

const ProductForm: React.FC = () => {
  const [formState, setFormState] = useState<ProductFormState>({
    productName: '',
    currentPrice: '',
    previousPrice: '',
    description: '',
    selectedFile: null,
  });

  const [errors, setErrors] = useState({
    productName: '',
    currentPrice: '',
    previousPrice: '',
    description: '',
    selectedFile: ''
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      productName: '',
      currentPrice: '',
      previousPrice: '',
      description: '',
      selectedFile: ''
    };

    if (!formState.productName) {
      newErrors.productName = 'Product Name is required';
      valid = false;
    }
    if (!formState.currentPrice) {
      newErrors.currentPrice = 'Current Price is required';
      valid = false;
    }
    if (!formState.previousPrice) {
      newErrors.previousPrice = 'Previous Price is required';
      valid = false;
    }
    if (!formState.description) {
      newErrors.description = 'Description is required';
      valid = false;
    }
    if (!formState.selectedFile) {
      newErrors.selectedFile = 'File is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFileChange = (file: File) => {
    setFormState({
      ...formState,
      selectedFile: file,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append('productName', formState.productName);
    formData.append('currentPrice', formState.currentPrice);
    formData.append('previousPrice', formState.previousPrice);
    formData.append('description', formState.description);
    if (formState.selectedFile) {
        formData.append('file', formState.selectedFile);
    }

    try {
        const response = await fetch('http://localhost:3000/products', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok, status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Success:', result);
        // Handle success (e.g., display a success message, reset form, etc.)
    } catch (error) {
        console.error('Error:', error);
        // Handle error (e.g., display an error message)
    }
  };

  return (
    <form id='product-form' onSubmit={handleSubmit}>
      <h1 className='form-title'>Create Product</h1>
      <Box className='product-form'>
        <TextField
          placeholder='Product Name'
          name='productName'
          label='Product Name'
          type='text'
          fullWidth
          value={formState.productName}
          onChange={handleInputChange}
          error={!!errors.productName}
          helperText={errors.productName}
        />
        <FileSelector onFileChange={handleFileChange} />
        <Box className="price-inputs">
          <TextField
            placeholder='Current Price'
            name='currentPrice'
            label='Current Price'
            type='number'
            fullWidth
            value={formState.currentPrice}
            onChange={handleInputChange}
            error={!!errors.currentPrice}
            helperText={errors.currentPrice}
          />
          <TextField
            placeholder='Previous Price'
            name='previousPrice'
            label='Previous Price'
            type='number'
            fullWidth
            value={formState.previousPrice}
            onChange={handleInputChange}
            error={!!errors.previousPrice}
            helperText={errors.previousPrice}
          />
        </Box>
        <TextField
          placeholder='Product Description'
          name='description'
          multiline
          fullWidth
          value={formState.description}
          label={'Product Description'}
          onChange={handleInputChange}
          error={!!errors.description}
          helperText={errors.description}
        />
        <Button variant='contained' color='primary' fullWidth size='large' type='submit'>
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default ProductForm;
