import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css'
import Header from './components/Header';
import Home from './pages/Home';
import Stock from './pages/Stock';

export default function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/stock' element={<Stock />}/>
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
