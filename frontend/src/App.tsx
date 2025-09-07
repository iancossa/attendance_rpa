import React, { useState } from 'react'
import { useAuthStore } from './store/authStore'
import Login from './components/Login'
import Layout from './components/Layout'
import Dashboard from './components/Dashboard'
import AttendanceRecords from './components/AttendanceRecords'
import ClassManagement from './components/ClassManagement'
import Reports from './components/Reports'
import Leaderboard from './components/Leaderboard'
import Settings from './components/Settings'

function App() {
  const { isAuthenticated } = useAuthStore()
  const [currentPage, setCurrentPage] = useState('dashboard')

  if (!isAuthenticated) {
    return <Login />
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'attendance':
        return <AttendanceRecords />
      case 'classes':
        return <ClassManagement />
      case 'reports':
        return <Reports />
      case 'leaderboard':
        return <Leaderboard />
      case 'settings':
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  return (
    <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </Layout>
  )
}

export default App