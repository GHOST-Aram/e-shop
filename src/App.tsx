import ProductForm from "./products/ProductForm"
import Navbar from "./Navbar"

function App() {

  return (
    <>
		<header>
			<Navbar />
		</header>
		<main>
		<ProductForm />
		</main>
		<footer className="font-light text-sm py-4 text-center">
			Copyright &copy;{ new Date().getFullYear()}
		</footer>
    </>
  )
}

export default App
