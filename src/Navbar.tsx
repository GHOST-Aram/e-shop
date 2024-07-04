import { NavLink } from "react-router-dom"
import { IconButton } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';



const Navbar = () => {

    return (
        <header>
        <nav className="flex flex-row gap-4 px-16 justify-center 
            p-4 lg:justify-end items-center border-b border-2"
        >
            <NavLink to={'/'} className={'text-orange-500 font-bold p-2 rounded-md'}>
                HOME
            </NavLink>
            <NavLink to={'/shop'} className={'text-orange-500 font-bold p-2 rounded-md'}>
                SHOP
            </NavLink>
            <NavLink to={'/account'} className={'text-orange-500 font-bold p-2 rounded-md'}>
                ACCOUNT
            </NavLink>
            <NavLink to={'/shopping-cat'} className={'rounded-full'}>
            <IconButton
                sx={{
                        color: '#f97316', // Default color
                        '&:hover': {
                            color: '#c2410c', // Hover color
                        },
                    }}
                >
                    <ShoppingCartOutlinedIcon />
            </IconButton>
            </NavLink>
        </nav>
        </header>
    )
}

export default Navbar