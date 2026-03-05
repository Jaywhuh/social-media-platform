import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <div className="layout">
      <header className="layout-header">
        <h1>Social Media Platform</h1>
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