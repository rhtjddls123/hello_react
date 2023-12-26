// src/App.tsx
import './App.css';
import { Nav } from './Nav.tsx';
import { NotFound } from './NotFound.tsx';
import { MemoHello } from './components/Hello.tsx';
import { Home } from './components/Home.tsx';
import { My } from './components/My.tsx';
import { SessionContextProvider } from './hooks/session-context.tsx';
import { Routes, Route } from 'react-router-dom';
import { useCallback } from 'react';
// import { Items } from './components/Items.tsx';
import { Item } from './components/Item.tsx';
import { Login } from './components/Login.tsx';
import { ItemLayout } from './components/ItemLayout.tsx';

function App() {
  const fn = useCallback(() => 'useCallback', []);
  return (
    <SessionContextProvider>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ttt' element={<h1>TTTxxx</h1>}></Route>
        <Route path='/my' element={<My />} />
        <Route path='/login' element={<Login />} />
        <Route path='/items' element={<ItemLayout />}>
          <Route index element={<Item />} />
          {/* <Route path=':id' element={<Item />} /> */}
        </Route>
        {/* <Route path='/items' element={<Items />} />
        <Route path='/items/:id' element={<Item />} /> */}
        <Route
          path='/hello'
          element={<MemoHello name='홍길동' age={32} fn={fn} />}
        />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </SessionContextProvider>
  );
}

export default App;
