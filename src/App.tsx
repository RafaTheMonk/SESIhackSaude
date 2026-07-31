import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Trabalhador from './pages/Trabalhador'
import Empresa from './pages/Empresa'
import Precificacao from './pages/Precificacao'
import Hardware from './pages/Hardware'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="trabalhador" element={<Trabalhador />} />
        <Route path="empresa" element={<Empresa />} />
        <Route path="precificacao" element={<Precificacao />} />
        <Route path="hardware" element={<Hardware />} />
      </Route>
    </Routes>
  )
}
