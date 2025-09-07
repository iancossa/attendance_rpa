import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Download, Filter, Calendar, TrendingUp, AlertTriangle } from 'lucide-react'

interface Report {
  id: string
  name: string
  type: 'weekly' | 'monthly' | 'semester'
  class: string
  generatedDate: string
  status: 'generated' | 'processing' | 'failed'
}

const Reports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week')
  const [selectedClass, setSelectedClass] = useState('all')

  const reports: Report[] = [
    {
      id: '1',
      name: 'Weekly Attendance Report',
      type: 'weekly',
      class: 'CS-101',
      generatedDate: '2024-01-15',
      status: 'generated'
    },
    {
      id: '2',
      name: 'Monthly Performance Report',
      type: 'monthly',
      class: 'MATH-201',
      generatedDate: '2024-01-14',
      status: 'processing'
    },
    {
      id: '3',
      name: 'Semester Summary',
      type: 'semester',
      class: 'All Classes',
      generatedDate: '2024-01-13',
      status: 'generated'
    },
  ]

  const attendanceData = [
    { name: 'Mon', attendance: 95 },
    { name: 'Tue', attendance: 92 },
    { name: 'Wed', attendance: 88 },
    { name: 'Thu', attendance: 94 },
    { name: 'Fri', attendance: 91 },
  ]

  const classPerformance = [
    { class: 'CS-101', attendance: 94.5, students: 30 },
    { class: 'MATH-201', attendance: 89.2, students: 28 },
    { class: 'PHY-301', attendance: 91.8, students: 25 },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'generated': return 'text-green-600 bg-green-50'
      case 'processing': return 'text-yellow-600 bg-yellow-50'
      case 'failed': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Reports & Analytics</h1>
        <Button className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Generate Report
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">92.4%</div>
                <div className="text-sm text-gray-500">Overall Attendance</div>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">CS-101</div>
                <div className="text-sm text-gray-500">Best Performing</div>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-gray-500">At-Risk Students</div>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">15</div>
                <div className="text-sm text-gray-500">Reports Generated</div>
              </div>
              <Download className="w-8 h-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Analytics Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="semester">This Semester</option>
            </select>
            
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Classes</option>
              <option value="CS-101">CS-101</option>
              <option value="MATH-201">MATH-201</option>
              <option value="PHY-301">PHY-301</option>
            </select>

            <Input type="date" />
            
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Apply Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Attendance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="attendance" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Class Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {classPerformance.map((cls, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{cls.class}</div>
                    <div className="text-sm text-gray-500">{cls.students} students</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">{cls.attendance}%</div>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${cls.attendance}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>Generated Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Report Name</th>
                  <th className="text-left p-3">Type</th>
                  <th className="text-left p-3">Class</th>
                  <th className="text-left p-3">Generated</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{report.name}</td>
                    <td className="p-3 capitalize">{report.type}</td>
                    <td className="p-3">{report.class}</td>
                    <td className="p-3">{report.generatedDate}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                        {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">View</Button>
                        <Button variant="ghost" size="sm">Download</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Reports