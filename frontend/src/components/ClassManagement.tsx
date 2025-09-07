import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { Plus, Search, Edit, Trash2, Users, Upload, Download } from 'lucide-react'

interface Class {
  id: string
  name: string
  code: string
  faculty: string
  students: number
  maxStudents: number
  schedule: string
  room: string
}

const ClassManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)

  const classes: Class[] = [
    {
      id: '1',
      name: 'Computer Science Fundamentals',
      code: 'CS-101',
      faculty: 'Dr. Smith',
      students: 28,
      maxStudents: 30,
      schedule: 'Mon, Wed, Fri 9:00 AM',
      room: 'Room 101'
    },
    {
      id: '2',
      name: 'Advanced Mathematics',
      code: 'MATH-201',
      faculty: 'Prof. Johnson',
      students: 25,
      maxStudents: 28,
      schedule: 'Tue, Thu 10:30 AM',
      room: 'Room 205'
    },
    {
      id: '3',
      name: 'Physics Laboratory',
      code: 'PHY-301',
      faculty: 'Dr. Brown',
      students: 22,
      maxStudents: 25,
      schedule: 'Wed 2:00 PM',
      room: 'Lab 301'
    },
  ]

  const filteredClasses = classes.filter(cls =>
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.faculty.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalClasses = classes.length
  const totalStudents = classes.reduce((sum, cls) => sum + cls.students, 0)
  const totalFaculty = new Set(classes.map(cls => cls.faculty)).size

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Class Management</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Import Students
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Data
          </Button>
          <Button onClick={() => setShowAddModal(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Class
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{totalClasses}</div>
            <div className="text-sm text-gray-500">Total Classes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{totalStudents}</div>
            <div className="text-sm text-gray-500">Total Students</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{totalFaculty}</div>
            <div className="text-sm text-gray-500">Faculty Members</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">3</div>
            <div className="text-sm text-gray-500">Active Sessions</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search classes, faculty, or codes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Classes Table */}
      <Card>
        <CardHeader>
          <CardTitle>Classes ({filteredClasses.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Class</th>
                  <th className="text-left p-3">Faculty</th>
                  <th className="text-left p-3">Enrollment</th>
                  <th className="text-left p-3">Schedule</th>
                  <th className="text-left p-3">Room</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClasses.map((cls) => (
                  <tr key={cls.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div>
                        <div className="font-medium">{cls.name}</div>
                        <div className="text-sm text-gray-500">{cls.code}</div>
                      </div>
                    </td>
                    <td className="p-3">{cls.faculty}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span>{cls.students}/{cls.maxStudents}</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(cls.students / cls.maxStudents) * 100}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-sm">{cls.schedule}</td>
                    <td className="p-3">{cls.room}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Users className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
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

export default ClassManagement