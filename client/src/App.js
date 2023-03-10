import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './Components/Nav';
import Home from './Components/Home';

import { Contact } from './Components/Contact';
// import Registration from './Components/Registration';
// import ErrorPage from "./Components/ErrorPage";
// import ChangePassword from "./Components/ChangePassword";
import './App.css';
import  SignIn  from './Components/SingIn';
import { About } from './Components/About';
import { AdminPage } from './Components/AdminPage';
import { Product } from './Components/Product';
import 'bootstrap/dist/css/bootstrap.css';
import { UpdateProduct } from './Components/UpdateProduct';
import { AddToCart } from './Components/AddToCart';
import UserSignIn from './Components/UserSignin';
import UserRegistration from './Components/UserRegistration';
import { Profile } from './Components/Profile';
import { Test } from './Components/test';
function App() {
  return (
    <div>
      <BrowserRouter>

<Nav />
<Routes>

  <Route path="/" element={ <Home /> }></Route>

  <Route path="/about" element={ <About /> }></Route>

  <Route path="/contact" element={ <Contact /> }></Route>

  <Route path="/userregistration" element={ <UserRegistration /> }></Route>
  <Route path="/usersignin" element={ <UserSignIn /> }></Route>
  <Route path="/profile" element={ <Profile /> }></Route>
  <Route path="/test" element={ <Test /> }></Route>

  <Route path="/signin" element={ <SignIn /> }></Route>
  <Route path="/adminpage" element={ <AdminPage /> }></Route>
  <Route path="/product" element={ <Product /> }></Route>
  <Route path="/updateproduct" element={ <UpdateProduct /> }></Route>
  <Route path="/cart" element={ <AddToCart /> }></Route>

  {/* <Route path="/register" element={ <Registration /> }></Route> */}

  {/* <Route path="/changepassword" element={ <ChangePassword /> }></Route> */}

  {/* <Route path="*" element={ <ErrorPage /> }></Route> */}

</Routes>

</BrowserRouter>
    </div>
  );
}

export default App;
