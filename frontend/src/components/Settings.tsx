import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { Settings as SettingsIcon, Users, Shield, Zap, Download, Upload } from 'lucide-react'

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general')
  const [settings, setSettings] = useState({
    institutionName: 'University of Technology',
    academicYear: '2024-2025',
    timezone: 'UTC+05:30',
    gracePeriod: 15,
    minimumAttendance: 75,
    autoMarkAbsent: true,
    enableLeaderboard: true,
    enableBadges: true,
    enableNotifications: true,
  })

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'attendance', label: 'Attendance Rules', icon: Shield },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'integrations', label: 'Integrations', icon: Zap },
  ]

  const userStats = [
    { role: 'Students', count: 1250, color: 'bg-blue-500' },
    { role: 'Faculty', count: 45, color: 'bg-green-500' },
    { role: 'Admins', count: 5, color: 'bg-purple-500' },
  ]

  const integrations = [
    { name: 'LMS Integration', status: 'connected', description: 'Moodle LMS sync' },
    { name: 'Biometric Devices', status: 'disconnected', description: 'Fingerprint scanners' },
    { name: 'Email Notifications', status: 'connected', description: 'SMTP server' },
    { name: 'SMS Gateway', status: 'disconnected', description: 'Student notifications' },
  ]

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Institution Name</label>
          <Input
            value={settings.institutionName}
            onChange={(e) => handleSettingChange('institutionName', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Academic Year</label>
          <Input
            value={settings.academicYear}
            onChange={(e) => handleSettingChange('academicYear', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Timezone</label>
          <select
            value={settings.timezone}
            onChange={(e) => handleSettingChange('timezone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="UTC+05:30">UTC+05:30 (IST)</option>
            <option value="UTC+00:00">UTC+00:00 (GMT)</option>
            <option value="UTC-05:00">UTC-05:00 (EST)</option>
          </select>
        </div>
      </div>
    </div>
  )

  const renderAttendanceSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Grace Period (minutes)</label>
          <Input
            type="number"
            value={settings.gracePeriod}
            onChange={(e) => handleSettingChange('gracePeriod', parseInt(e.target.value))}
          />
          <p className="text-xs text-gray-500 mt-1">Students can mark attendance within this time</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Minimum Attendance (%)</label>
          <Input
            type="number"
            value={settings.minimumAttendance}
            onChange={(e) => handleSettingChange('minimumAttendance', parseInt(e.target.value))}
          />
          <p className="text-xs text-gray-500 mt-1">Required for course completion</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <div className="font-medium">Auto-mark Absent</div>
            <div className="text-sm text-gray-500">Automatically mark students absent after grace period</div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.autoMarkAbsent}
              onChange={(e) => handleSettingChange('autoMarkAbsent', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <div className="font-medium">Enable Leaderboard</div>
            <div className="text-sm text-gray-500">Show student rankings and competition</div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.enableLeaderboard}
              onChange={(e) => handleSettingChange('enableLeaderboard', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <div className="font-medium">Achievement Badges</div>
            <div className="text-sm text-gray-500">Reward students with badges for milestones</div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.enableBadges}
              onChange={(e) => handleSettingChange('enableBadges', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  )

  const renderUserManagement = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {userStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6 text-center">
              <div className={`w-12 h-12 ${stat.color} rounded-full mx-auto mb-3 flex items-center justify-center`}>
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold">{stat.count}</div>
              <div className="text-sm text-gray-500">{stat.role}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-4">
        <Button className="flex items-center gap-2">
          <Upload className="w-4 h-4" />
          Import Users
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Users
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Configuration
        </Button>
      </div>
    </div>
  )

  const renderIntegrations = () => (
    <div className="space-y-6">
      {integrations.map((integration, index) => (
        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <div className="font-medium">{integration.name}</div>
            <div className="text-sm text-gray-500">{integration.description}</div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              integration.status === 'connected' 
                ? 'text-green-600 bg-green-50' 
                : 'text-red-600 bg-red-50'
            }`}>
              {integration.status === 'connected' ? 'Connected' : 'Disconnected'}
            </span>
            <Button variant="outline" size="sm">
              {integration.status === 'connected' ? 'Configure' : 'Connect'}
            </Button>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">System Settings</h1>
        <Button>Save Changes</Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tabs */}
        <div className="lg:w-64">
          <Card>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-100 transition-colors ${
                        activeTab === tab.id ? 'bg-blue-50 border-r-2 border-blue-500 text-blue-600' : 'text-gray-700'
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {tab.label}
                    </button>
                  )
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <div className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle>
                {tabs.find(tab => tab.id === activeTab)?.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {activeTab === 'general' && renderGeneralSettings()}
              {activeTab === 'attendance' && renderAttendanceSettings()}
              {activeTab === 'users' && renderUserManagement()}
              {activeTab === 'integrations' && renderIntegrations()}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Settings