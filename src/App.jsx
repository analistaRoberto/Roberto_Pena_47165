import { BrowserRouter, Route, Routes} from 'react-router-dom';
import NavBar from './components/navegation/NavBar';
import ItemListContainer from './components/card/ItemListContainer';
import ItemDetailContainer from './components/itemDetaild/ItemDetailContainer';
import ParcheseDetail from './components/pages/ParcheseDetail';
import CheckoutForm from './components/pages/CheckoutForm';
import Contact from './components/pages/Contact';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<ItemListContainer />} />
        <Route path='/item/:id' element={<ItemDetailContainer />} />
        <Route path='/category/:category' element={<ItemListContainer />} />
        <Route path='/parchese-detail' element={<ParcheseDetail />} />
        <Route path='/buy' element={<CheckoutForm />}/>
        <Route path='/contact' element={<Contact/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;