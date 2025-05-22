import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css'
import Header from './components/Header';
import Home from './pages/Home';
import Stock from './pages/Stock';
import Manage from './pages/Manage';
import Edit from './pages/Edit';

export default function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/stock' element={<Stock />}/>
          <Route path='/administracion'>
            <Route index element={<Manage />}/>
            <Route path='modificar/:product/:id' element={<Edit />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
    /*próximos:
    <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='*' element={<NotFound />}/>
    */
  )
}
