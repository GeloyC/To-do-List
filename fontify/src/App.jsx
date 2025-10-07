import './App.css'
import { BrowserRouter, createBrowserRouter, Routes, Route, Link, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Navigation from './components/Navigation';
import RootLayout from './layout/RootLayout';
import Home from './pages/Home';
import Task from './pages/Task';
import { StrictMode } from 'react';

function App() {
  
    const router = createBrowserRouter (
      createRoutesFromElements (
        <Route path='/' element={<RootLayout />} >
          <Route index element={<Home />} />
          <Route path='home' element={<Home />}/>
          <Route path='task' element={<Task />}/>
        </Route>
      )
    )

  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  )
}

export default App
