import './App.css';
import Nav from './components/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/login';
import AddProduct from './components/AddProduct';
import Products from './components/Products';
import Update from './components/Update';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav />
      <Routes>

        <Route element={<PrivateComponent />}>
        <Route path='/' element={<Products />} />
        <Route path='/add' element={ <AddProduct /> } />
        <Route path='/update/:id' element={<Update />} />
        <Route path='/logout' element={<h1>Log Out Component</h1>} />
        <Route path='/profile' element={<h1>Profile Component</h1>} />
        </Route>

        <Route path='/signup' element={ <SignUp /> } />
        <Route path='/login' element={ <Login /> } />

      </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
