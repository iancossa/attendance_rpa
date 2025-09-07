import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import { Button } from './ui/Button'
import { Users, UserCheck, UserX, AlertTriangle, QrCode } from 'lucide-react'
import TakeAttendanceModal from './TakeAttendanceModal'

interface DashboardStats {
  totalStudents: number
  presentToday: number
  absentToday: number
  attendancePercentage: number
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 150,
    presentToday: 142,
    absentToday: 8,
    attendancePercentage: 94.7
  })
  const [showAttendanceModal, setShowAttendanceModal] = useState(false)

  const weeklyData = [
    { day: 'Mon', percentage: 95 },
    { day: 'Tue', percentage: 92 },
    { day: 'Wed', percentage: 88 },
    { day: 'Thu', percentage: 94 },
    { day: 'Fri', percentage: 91 },
  ]

  const recentActivity = [
    { class: 'CS-101', time: '09:00 AM', present: 28, total: 30 },
    { class: 'MATH-201', time: '10:30 AM', present: 25, total: 28 },
    { class: 'PHY-301', time: '02:00 PM', present: 22, total: 25 },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <Button onClick={() => setShowAttendanceModal(true)} className="flex items-center gap-2">
          <QrCode className="w-4 h-4" />
          Take Attendance
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">Enrolled this semester</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present Today</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.presentToday}</div>
            <p className="text-xs text-muted-foreground">+2% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absent Today</CardTitle>
            <UserX className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.absentToday}</div>
            <p className="text-xs text-muted-foreground">-1 from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance %</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.attendancePercentage}%</div>
            <p className="text-xs text-muted-foreground">This week average</p>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Attendance Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyData.map((day) => (
              <div key={day.day} className="flex items-center space-x-4">
                <div className="w-12 text-sm font-medium">{day.day}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${day.percentage}%` }}
                  />
                </div>
                <div className="w-12 text-sm text-right">{day.percentage}%</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">{activity.class}</div>
                  <div className="text-sm text-gray-500">{activity.time}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{activity.present}/{activity.total}</div>
                  <div className="text-sm text-gray-500">
                    {Math.round((activity.present / activity.total) * 100)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <TakeAttendanceModal 
        isOpen={showAttendanceModal} 
        onClose={() => setShowAttendanceModal(false)} 
      />
    </div>
  )
}

export default Dashboard