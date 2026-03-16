import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

function MainLayout() {
  return (
    <div className="layout">
      <header className="layout-header">
        <Navbar />
      </header>

      <main className="layout-main">
        <Outlet />
      </main>

      <footer className="layout-footer">
        <p>© 2026</p>
      </footer>
    </div>
  )
}

export default MainLayout