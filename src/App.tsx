import ProductForm from "./products/ProductForm"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { Routes, Route } from "react-router-dom"

function App() {

	return (
		<>
			<Navbar />
			<main>
				<Routes>
					<Route path="/products/create" element={<ProductForm />}/>
				</Routes>
			</main>
			<Footer />
		</>
	)
}

export default App
