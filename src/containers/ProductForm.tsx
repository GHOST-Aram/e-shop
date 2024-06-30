import { TextField, Box, Button } from '@mui/material'
import FileSelector from '../components/FileSelector'


const ProductForm = () => {
    return (
        <form id='product-form'>
            <h1 className='form-title'>Create Product</h1>
            <Box className='product-form'>
                <TextField 
                    placeholder='Product Name' 
                    name='productName' 
                    label='Product Name'
                    type='text' 
                    fullWidth
                    value={''}
                />
                {/* <input type="file" 
                    name="productImage" 
                    id="product-image" 
                    className='product-image'
                /> */}
                <FileSelector />
                <Box className="price-inputs">
                    <TextField 
                        placeholder='Current Price' 
                        name='currentPrice' 
                        label='Current Price'
                        type='number' 
                        fullWidth
                        value={''}
                    />
                    <TextField 
                        placeholder='Previous Price' 
                        name='previousPrice' 
                        label='Previous Price'
                        type='number' 
                        fullWidth
                        value={''}
                    />
                </Box>
                <TextField 
                    placeholder='Product Description'
                    name='description'
                    multiline
                    fullWidth
                    value={''}
                    label={'Product Description'}
                />
                <Button variant='contained' color='primary' fullWidth size='large' >Submit</Button>
            </Box>
        </form>
    )
}

export default ProductForm