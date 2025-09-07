import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { X, QrCode, Users, Clock, Search } from 'lucide-react'
import QRCode from 'react-qr-code'
import { qrAPI } from '../services/api'

interface Student {
  id: string
  name: string
  rollNumber: string
  status: 'present' | 'absent' | 'late'
}

interface TakeAttendanceModalProps {
  isOpen: boolean
  onClose: () => void
}

const TakeAttendanceModal: React.FC<TakeAttendanceModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<'qr' | 'manual'>('qr')
  const [qrCode, setQrCode] = useState('')
  const [sessionId, setSessionId] = useState('')
  const [timeLeft, setTimeLeft] = useState(60) // 1 minute
  const [isGenerating, setIsGenerating] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [students, setStudents] = useState<Student[]>([
    { id: '1', name: 'John Doe', rollNumber: 'CS001', status: 'absent' },
    { id: '2', name: 'Jane Smith', rollNumber: 'CS002', status: 'absent' },
    { id: '3', name: 'Mike Johnson', rollNumber: 'CS003', status: 'absent' },
  ])

  const generateQRSession = async () => {
    setIsGenerating(true)
    try {
      const response = await qrAPI.generateSession('CS101', 'CS-101')
      const { sessionId: newSessionId, qrData, expiresIn } = response.data
      setSessionId(newSessionId)
      setQrCode(qrData)
      setTimeLeft(expiresIn)
      
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            setQrCode('')
            setSessionId('')
            return 0
          }
          return prev - 1
        })
      }, 1000)
      
      return () => clearInterval(timer)
    } catch (error) {
      console.error('Failed to generate QR session:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  useEffect(() => {
    if (isOpen && mode === 'qr' && !qrCode) {
      generateQRSession()
    }
  }, [isOpen, mode])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const toggleStudentStatus = (studentId: string) => {
    setStudents(prev => prev.map(student => 
      student.id === studentId 
        ? { ...student, status: student.status === 'present' ? 'absent' : 'present' }
        : student
    ))
  }

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const presentCount = students.filter(s => s.status === 'present').length
  const absentCount = students.filter(s => s.status === 'absent').length

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-600">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Take Attendance - CS 101</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-6">
          {/* Mode Selection */}
          <div className="flex gap-4 mb-6">
            <Button
              variant={mode === 'qr' ? 'default' : 'outline'}
              onClick={() => setMode('qr')}
              className="flex items-center gap-2"
            >
              <QrCode className="w-4 h-4" />
              QR Scanner Mode
            </Button>
            <Button
              variant={mode === 'manual' ? 'default' : 'outline'}
              onClick={() => setMode('manual')}
              className="flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Manual Mode
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{presentCount}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Present</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">{absentCount}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Absent</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{students.length}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Total</div>
              </CardContent>
            </Card>
          </div>

          {mode === 'qr' ? (
            <div className="text-center space-y-4">
              {qrCode ? (
                <>
                  <div className="bg-white p-4 rounded-lg inline-block border">
                    <QRCode value={qrCode} size={200} />
                  </div>
                  <div className="flex items-center justify-center gap-2 text-lg">
                    <Clock className={`w-5 h-5 ${timeLeft <= 10 ? 'text-red-500' : 'text-blue-500'}`} />
                    <span className={timeLeft <= 10 ? 'text-red-500 font-bold' : ''}>
                      Time remaining: {formatTime(timeLeft)}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">Students can scan this QR code to mark attendance</p>
                  {timeLeft === 0 && (
                    <Button onClick={generateQRSession} disabled={isGenerating} className="mt-4">
                      {isGenerating ? 'Generating...' : 'Generate New QR'}
                    </Button>
                  )}
                </>
              ) : (
                <div className="py-8">
                  <Button onClick={generateQRSession} disabled={isGenerating}>
                    {isGenerating ? 'Generating QR...' : 'Generate QR Code'}
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
              </div>
              
              <div className="max-h-96 overflow-y-auto space-y-2">
                {filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <div>
                      <div className="font-medium">{student.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{student.rollNumber}</div>
                    </div>
                    <Button
                      variant={student.status === 'present' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => toggleStudentStatus(student.id)}
                    >
                      {student.status === 'present' ? 'Present' : 'Mark Present'}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button>
              Save Attendance
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TakeAttendanceModal