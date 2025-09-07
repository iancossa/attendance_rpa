import React from 'react'
import { useAuthStore } from '../store/authStore'
import { useThemeStore } from '../store/themeStore'
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
  X,
  Moon,
  Sun
} from 'lucide-react'
import { useState } from 'react'

interface LayoutProps {
  children: React.ReactNode
  currentPage: string
  onPageChange: (page: string) => void
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onPageChange }) => {
  const { user, logout } = useAuthStore()
  const { isDark, toggleTheme } = useThemeStore()
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
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className={`bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-16'
      } md:w-64`}>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h1 className={`font-bold text-xl dark:text-white ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
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
                className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  currentPage === item.id ? 'bg-blue-50 dark:bg-blue-900 border-r-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
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
            <div className="text-sm text-gray-600 dark:text-gray-400">Signed in as</div>
            <div className="font-medium dark:text-white">{user?.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{user?.role}</div>
          </div>
          <div className="space-y-2">
            <Button
              variant="ghost"
              onClick={toggleTheme}
              className="flex items-center justify-start px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span className={`ml-2 ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </span>
            </Button>
            <Button
              variant="ghost"
              onClick={logout}
              className="flex items-center justify-start px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className={`ml-2 ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
                Logout
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900">
        {children}
      </div>
    </div>
  )
}

export default Layout