import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { Search, Filter, Download, Calendar } from 'lucide-react'

interface AttendanceRecord {
  id: string
  studentName: string
  rollNumber: string
  className: string
  date: string
  status: 'present' | 'absent' | 'late'
  timestamp: string
}

const AttendanceRecords: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClass, setSelectedClass] = useState('all')
  const [selectedDate, setSelectedDate] = useState('')

  const records: AttendanceRecord[] = [
    {
      id: '1',
      studentName: 'John Doe',
      rollNumber: 'CS001',
      className: 'CS-101',
      date: '2024-01-15',
      status: 'present',
      timestamp: '09:05 AM'
    },
    {
      id: '2',
      studentName: 'Jane Smith',
      rollNumber: 'CS002',
      className: 'CS-101',
      date: '2024-01-15',
      status: 'late',
      timestamp: '09:15 AM'
    },
    {
      id: '3',
      studentName: 'Mike Johnson',
      rollNumber: 'CS003',
      className: 'MATH-201',
      date: '2024-01-15',
      status: 'absent',
      timestamp: '-'
    },
  ]

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass = selectedClass === 'all' || record.className === selectedClass
    const matchesDate = !selectedDate || record.date === selectedDate
    
    return matchesSearch && matchesClass && matchesDate
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'text-green-600 bg-green-50'
      case 'late': return 'text-yellow-600 bg-yellow-50'
      case 'absent': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Attendance Records</h1>
        <Button className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Records
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={selectedClass}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedClass(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Classes</option>
              <option value="CS-101">CS-101</option>
              <option value="MATH-201">MATH-201</option>
              <option value="PHY-301">PHY-301</option>
            </select>

            <div className="relative">
              <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                type="date"
                value={selectedDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelectedDate(e.target.value)}
                className="pl-10"
              />
            </div>

            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Records Table */}
      <Card>
        <CardHeader>
          <CardTitle>Records ({filteredRecords.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Student</th>
                  <th className="text-left p-3">Roll Number</th>
                  <th className="text-left p-3">Class</th>
                  <th className="text-left p-3">Date</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Time</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{record.studentName}</td>
                    <td className="p-3 text-gray-600">{record.rollNumber}</td>
                    <td className="p-3">{record.className}</td>
                    <td className="p-3">{record.date}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-3 text-gray-600">{record.timestamp}</td>
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

export default AttendanceRecords