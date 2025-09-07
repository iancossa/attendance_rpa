import React from 'react'
import { useAuthStore } from '../store/authStore'
import { Button } from './ui/Button'
import { 
  LayoutDashboard, 
  Users, 
  ClipboardList, 
  BarChart3, 
  Trophy, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'

interface LayoutProps {
  children: React.ReactNode
  currentPage: string
  onPageChange: (page: string) => void
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onPageChange }) => {
  const { user, logout } = useAuthStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'attendance', label: 'Attendance', icon: ClipboardList },
    { id: 'classes', label: 'Classes', icon: Users },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-16'
      } md:w-64`}>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h1 className={`font-bold text-xl ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
              Attendance
            </h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden"
            >
              {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        <nav className="mt-8">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-100 transition-colors ${
                  currentPage === item.id ? 'bg-blue-50 border-r-2 border-blue-500 text-blue-600' : 'text-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className={`ml-3 ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
                  {item.label}
                </span>
              </button>
            )
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className={`mb-4 ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
            <div className="text-sm text-gray-600">Signed in as</div>
            <div className="font-medium">{user?.name}</div>
            <div className="text-xs text-gray-500">{user?.role}</div>
          </div>
          <Button
            variant="ghost"
            onClick={logout}
            className="w-full justify-start"
          >
            <LogOut className="w-4 h-4" />
            <span className={`ml-2 ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
              Logout
            </span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}

export default Layout