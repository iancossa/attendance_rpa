import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { Trophy, Medal, Award, Crown, Search, Filter } from 'lucide-react'

interface Student {
  id: string
  name: string
  rollNumber: string
  className: string
  attendancePercentage: number
  streak: number
  badges: string[]
  points: number
  rank: number
}

interface Badge {
  name: string
  icon: string
  description: string
  progress?: number
}

const Leaderboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClass, setSelectedClass] = useState('all')
  const [selectedPeriod, setSelectedPeriod] = useState('month')

  const students: Student[] = [
    {
      id: '1',
      name: 'Alice Johnson',
      rollNumber: 'CS001',
      className: 'CS-101',
      attendancePercentage: 98.5,
      streak: 45,
      badges: ['Perfect Month', 'Early Bird', 'Consistency King'],
      points: 2450,
      rank: 1
    },
    {
      id: '2',
      name: 'Bob Smith',
      rollNumber: 'CS002',
      className: 'CS-101',
      attendancePercentage: 96.2,
      streak: 32,
      badges: ['Perfect Month', 'Team Player'],
      points: 2180,
      rank: 2
    },
    {
      id: '3',
      name: 'Carol Davis',
      rollNumber: 'MATH001',
      className: 'MATH-201',
      attendancePercentage: 94.8,
      streak: 28,
      badges: ['Early Bird', 'Consistency King'],
      points: 2050,
      rank: 3
    },
    {
      id: '4',
      name: 'David Wilson',
      rollNumber: 'PHY001',
      className: 'PHY-301',
      attendancePercentage: 93.1,
      streak: 22,
      badges: ['Team Player'],
      points: 1890,
      rank: 4
    },
  ]

  const badges: Badge[] = [
    { name: 'Perfect Month', icon: '🏆', description: '100% attendance for a month' },
    { name: 'Early Bird', icon: '🌅', description: 'Always arrives early' },
    { name: 'Consistency King', icon: '👑', description: '30+ day streak' },
    { name: 'Team Player', icon: '🤝', description: 'Helps classmates' },
    { name: 'Punctuality Pro', icon: '⏰', description: 'Never late', progress: 75 },
    { name: 'Attendance Ace', icon: '🎯', description: '95%+ attendance', progress: 60 },
  ]

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass = selectedClass === 'all' || student.className === selectedClass
    return matchesSearch && matchesClass
  })

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-500" />
      case 2: return <Medal className="w-6 h-6 text-gray-400" />
      case 3: return <Award className="w-6 h-6 text-amber-600" />
      default: return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold">{rank}</span>
    }
  }

  const topThree = filteredStudents.slice(0, 3)
  const others = filteredStudents.slice(3)

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Leaderboard</h1>
        <div className="flex gap-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="semester">This Semester</option>
          </select>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{students.length}</div>
            <div className="text-sm text-gray-500">Total Participants</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Crown className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{topThree[0]?.name.split(' ')[0]}</div>
            <div className="text-sm text-gray-500">Top Performer</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold">95.2%</div>
            <div className="text-sm text-gray-500">Average Attendance</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold">32</div>
            <div className="text-sm text-gray-500">Avg. Streak Days</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
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

            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Podium */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Top Performers</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Podium Display */}
              <div className="flex justify-center items-end space-x-4 mb-8">
                {topThree.map((student, index) => (
                  <div key={student.id} className={`text-center ${index === 0 ? 'order-2' : index === 1 ? 'order-1' : 'order-3'}`}>
                    <div className={`bg-gradient-to-t ${
                      index === 0 ? 'from-yellow-400 to-yellow-300 h-24' :
                      index === 1 ? 'from-gray-400 to-gray-300 h-20' :
                      'from-amber-600 to-amber-500 h-16'
                    } w-20 rounded-t-lg flex items-end justify-center pb-2`}>
                      <span className="text-white font-bold text-lg">{index + 1}</span>
                    </div>
                    <div className="mt-2">
                      <div className="font-medium text-sm">{student.name.split(' ')[0]}</div>
                      <div className="text-xs text-gray-500">{student.attendancePercentage}%</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Full Leaderboard */}
              <div className="space-y-3">
                {filteredStudents.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8 h-8">
                        {getRankIcon(student.rank)}
                      </div>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.rollNumber} • {student.className}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{student.attendancePercentage}%</div>
                      <div className="text-sm text-gray-500">{student.streak} day streak</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Badges */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Achievement Badges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {badges.map((badge, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <div className="text-2xl">{badge.icon}</div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{badge.name}</div>
                      <div className="text-xs text-gray-500">{badge.description}</div>
                      {badge.progress && (
                        <div className="mt-1">
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div
                              className="bg-blue-600 h-1.5 rounded-full"
                              style={{ width: `${badge.progress}%` }}
                            />
                          </div>
                          <div className="text-xs text-gray-500 mt-1">{badge.progress}%</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard