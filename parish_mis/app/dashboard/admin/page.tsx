"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [users, setUsers] = useState([])
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role: "parishioner" })

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    } else if (session?.user.role !== "admin") {
      router.push("/dashboard")
    } else {
      fetchUsers()
    }
  }, [session, status, router])

  const fetchUsers = async () => {
    const res = await fetch("/api/users")
    const data = await res.json()
    if (res.ok) {
      setUsers(data)
    } else {
      toast({ title: "Error", description: "Failed to fetch users", variant: "destructive" })
    }
  }

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
    const data = await res.json()
    if (res.ok) {
      toast({ title: "Success", description: "User created successfully" })
      setNewUser({ name: "", email: "", password: "", role: "parishioner" })
      fetchUsers()
    } else {
      toast({ title: "Error", description: data.error || "Failed to create user", variant: "destructive" })
    }
  }

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSidebar userType="admin" />
      <div className="flex-1 overflow-auto p-8">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Create New User</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="parishioner">Parishioner</SelectItem>
                    <SelectItem value="priest">Priest</SelectItem>
                    <SelectItem value="catechist">Catechist</SelectItem>
                    <SelectItem value="leadership">Leadership</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit">Create User</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Created At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

