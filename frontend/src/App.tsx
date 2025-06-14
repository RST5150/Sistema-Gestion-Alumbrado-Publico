import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css'
import Header from './components/Header';
import Home from './pages/Home';
import Stock from './pages/Stock';
import Manage from './pages/Manage';
import Edit from './pages/Edit';
import Delete from './pages/Delete';
import Create from './pages/Create';
import AuthProvider from './providers/AuthProvider';
import LogIn from './pages/LogIn';
import PrivateRoutes from './components/PrivateRoutes';
import SignUp from './pages/SignUp';

export default function App() {

  return (
    <>
	<AuthProvider>
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path='/' element={<Home />}/>
				<Route path='/iniciar-sesion' element={<LogIn />}/>
				<Route path='/activar-cuenta' element={<SignUp />}/>
				<Route element={<PrivateRoutes />}>
					<Route path='/stock' element={<Stock />}/>
					<Route path='/administracion'>
						<Route index element={<Manage />}/>
						<Route path='modificar/:product/:id' element={<Edit />}/>
						<Route path='eliminar/:product/:id' element={<Delete />}/>
						<Route path='crear/:product' element={<Create />}/>
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	</AuthProvider>
    </>
    /*próximos:
          <Route path='*' element={<NotFound />}/>
    */
  )
}
