import React, { useState } from 'react';
import { Box, TextField, Button, CircularProgress } from '@mui/material';
import FileSelector from './containers/FileSelector'; // Assuming FileSelector is in the same directory
import './style.css'

interface ProductproductData {
  productName: string;
  currentPrice: string;
  previousPrice: string;
  description: string;
  selectedFile: File | null;
}

const ProductForm: React.FC = () => {
	const [productData, setProductData] = useState<ProductproductData>({
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
		selectedFile: '',
	});

	const [loading, setLoading] = useState(false);

	const validateForm = () => {
		let valid = true;
		const newErrors = {
		productName: '',
		currentPrice: '',
		previousPrice: '',
		description: '',
		selectedFile: '',
		};

		if (!productData.productName) {
		newErrors.productName = 'Product Name is required';
		valid = false;
		}
		if (!productData.currentPrice) {
		newErrors.currentPrice = 'Current Price is required';
		valid = false;
		}
		if (!productData.previousPrice) {
		newErrors.previousPrice = 'Previous Price is required';
		valid = false;
		}
		if (!productData.description) {
		newErrors.description = 'Description is required';
		valid = false;
		}
		if (!productData.selectedFile) {
		newErrors.selectedFile = 'File is required';
		valid = false;
		}

		setErrors(newErrors);
		return valid;
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setProductData({
		...productData,
		[name]: value,
		});
	};

	const handleFileChange = (file: File) => {
		setProductData({
		...productData,
		selectedFile: file,
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
		return;
		}

		setLoading(true);

		const formData = new FormData();
		formData.append('productName', productData.productName);
		formData.append('currentPrice', productData.currentPrice);
		formData.append('previousPrice', productData.previousPrice);
		formData.append('description', productData.description);
		if (productData.selectedFile) {
		formData.append('file', productData.selectedFile);
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
		} finally {
		setLoading(false);
		}
	};

	return (
		<div style={{ position: 'relative', height: '100vh' }}>
		{loading && (
			<div style={{
			position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
			}}>
			<CircularProgress />
			</div>
		)}
		<form id='product-form' onSubmit={handleSubmit}>
			<h1 className='text-md font-medium text-center text-slate-500 py-4'>Create Product</h1>
			<Box className='product-form'>
				<Box className="flex flex-row gap-4">
					<TextField
						placeholder='Product Name'
						name='productName'
						label='Product Name'
						type='text'
						fullWidth
						value={productData.productName}
						onChange={handleInputChange}
						error={!!errors.productName}
						helperText={errors.productName}
					/>
					<FileSelector onFileChange={handleFileChange} />
				</Box>
				<Box className="price-inputs">
					<TextField
					placeholder='Current Price'
					name='currentPrice'
					label='Current Price'
					type='number'
					fullWidth
					value={productData.currentPrice}
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
					value={productData.previousPrice}
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
						value={productData.description}
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
		</div>
	);
};

export default ProductForm;
