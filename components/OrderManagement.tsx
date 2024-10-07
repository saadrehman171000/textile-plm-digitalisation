'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Order = {
  id: number
  customerName: string
  productName: string
  quantity: number
  status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled'
  total: number
  company: string
}


type Company = {
  id: number
  name: string
}

export function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([
    { id: 1, customerName: 'John Doe', productName: 'Cotton T-Shirt', quantity: 100, status: 'Pending', total: 1999.99, company: 'ABC Corp' },
    { id: 2, customerName: 'Jane Smith', productName: 'Denim Jeans', quantity: 50, status: 'In Progress', total: 2499.50, company: 'XYZ Ltd' },
    { id: 3, customerName: 'Bob Johnson', productName: 'Silk Scarf', quantity: 200, status: 'Completed', total: 3999.00, company: '123 Industries' },
  ])
  const [newOrder, setNewOrder] = useState<Omit<Order, 'id' | 'total'>>({ customerName: '', productName: '', quantity: 0, status: 'Pending', company: '' })
  const [editingOrder, setEditingOrder] = useState<Order | null>(null)
  const [companies, setCompanies] = useState<Company[]>([
    { id: 1, name: 'ABC Corp' },
    { id: 2, name: 'XYZ Ltd' },
    { id: 3, name: '123 Industries' },
  ])
  const [newCompany, setNewCompany] = useState('')
  const [isAddingNewCompany, setIsAddingNewCompany] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState<string>('All')
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(orders)

  useEffect(() => {
    if (selectedCompany === 'All') {
      setFilteredOrders(orders)
    } else {
      setFilteredOrders(orders.filter(order => order.company === selectedCompany))
    }
  }, [selectedCompany, orders])

  const handleCreateOrder = () => {
    const order: Order = {
      ...newOrder,
      id: orders.length + 1,
      total: Math.random() * 1000 // This should be calculated based on actual product prices
    }
    setOrders([...orders, order])
    setNewOrder({ customerName: '', productName: '', quantity: 0, status: 'Pending', company: '' })
  }

  const handleUpdateOrder = () => {
    if (editingOrder) {
      setOrders(orders.map(order => order.id === editingOrder.id ? editingOrder : order))
      setEditingOrder(null)
    }
  }

  const handleDeleteOrder = (id: number) => {
    setOrders(orders.filter(order => order.id !== id))
  }

  const handleAddCompany = () => {
    if (newCompany && !companies.some(company => company.name.toLowerCase() === newCompany.toLowerCase())) {
      const newCompanyObj = { id: companies.length + 1, name: newCompany };
      setCompanies(prevCompanies => [...prevCompanies, newCompanyObj]);
  
      // Safeguard against null values for editingOrder or newOrder
      if (editingOrder) {
        setEditingOrder(prev => prev ? { ...prev, company: newCompanyObj.name } : prev);
      } else {
        setNewOrder(prev => prev ? { ...prev, company: newCompanyObj.name } : prev);
      }
  
      setNewCompany('');
      setIsAddingNewCompany(false);
    }
  };
  

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'Pending':
        return <Badge variant="secondary">{status}</Badge>
      case 'In Progress':
        return <Badge variant="default">{status}</Badge>
      case 'Completed':
        return <Badge variant="outline">{status}</Badge>
      case 'Cancelled':
        return <Badge variant="destructive">{status}</Badge>
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Orders</h2>
        <div className="flex items-center space-x-2">
          <Select value={selectedCompany} onValueChange={setSelectedCompany}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by company" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Companies</SelectItem>
              {companies.map((company) => (
                <SelectItem key={company.id} value={company.name}>
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Create New Order</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Order</DialogTitle>
                <DialogDescription>Enter the details for the new order.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="customerName" className="text-right">Customer Name</Label>
                  <Input
                    id="customerName"
                    value={newOrder.customerName}
                    onChange={(e) => setNewOrder({ ...newOrder, customerName: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="productName" className="text-right">Product Name</Label>
                  <Input
                    id="productName"
                    value={newOrder.productName}
                    onChange={(e) => setNewOrder({ ...newOrder, productName: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="quantity" className="text-right">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={newOrder.quantity}
                    onChange={(e) => setNewOrder({ ...newOrder, quantity: parseInt(e.target.value) })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="company" className="text-right">Company</Label>
                  <div className="col-span-3 flex gap-2">
                    {isAddingNewCompany ? (
                      <>
                        <Input
                          value={newCompany}
                          onChange={(e) => setNewCompany(e.target.value)}
                          placeholder="Enter new company name"
                          className="flex-grow"
                        />
                        <Button onClick={handleAddCompany} type="button">Add</Button>
                        <Button onClick={() => setIsAddingNewCompany(false)} type="button" variant="outline">Cancel</Button>
                      </>
                    ) : (
                      <>
                        <Select
                          value={newOrder.company}
                          onValueChange={(value) => setNewOrder({ ...newOrder, company: value })}
                        >
                          <SelectTrigger className="flex-grow">
                            <SelectValue placeholder="Select a company" />
                          </SelectTrigger>
                          <SelectContent>
                            {companies.map((company) => (
                              <SelectItem key={company.id} value={company.name}>
                                {company.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button onClick={() => setIsAddingNewCompany(true)} type="button">New Company</Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreateOrder}>Create Order</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Order ID</TableHead>
              <TableHead>Customer Name</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Company</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.productName}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell>{order.company}</TableCell>
                <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="mr-2" onClick={() => setEditingOrder(order)}>
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Order</DialogTitle>
                        <DialogDescription>Update the details for this order.</DialogDescription>
                      </DialogHeader>
                      {editingOrder && (
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-customerName" className="text-right">Customer Name</Label>
                            <Input
                              id="edit-customerName"
                              value={editingOrder.customerName}
                              onChange={(e) => setEditingOrder({ ...editingOrder, customerName: e.target.value })}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-productName" className="text-right">Product Name</Label>
                            <Input
                              id="edit-productName"
                              value={editingOrder.productName}
                              onChange={(e) => setEditingOrder({ ...editingOrder, productName: e.target.value })}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-quantity" className="text-right">Quantity</Label>
                            <Input
                              id="edit-quantity"
                              type="number"
                              value={editingOrder.quantity}
                              onChange={(e) => setEditingOrder({ ...editingOrder, quantity: parseInt(e.target.value) })}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-status" className="text-right">Status</Label>
                            <Select
                              value={editingOrder.status}
                              onValueChange={(value: Order['status']) => setEditingOrder({ ...editingOrder, status: value })}
                            >
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Pending">Pending</SelectItem>
                                <SelectItem value="In Progress">In Progress</SelectItem>
                                <SelectItem value="Completed">Completed</SelectItem>
                                <SelectItem value="Cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-company" className="text-right">Company</Label>
                            <div className="col-span-3 flex gap-2">
                              {isAddingNewCompany ? (
                                <>
                                  <Input
                                    value={newCompany}
                                    onChange={(e) => setNewCompany(e.target.value)}
                                    placeholder="Enter new company name"
                                    className="flex-grow"
                                  />
                                  <Button onClick={handleAddCompany} type="button">Add</Button>
                                  <Button onClick={() => setIsAddingNewCompany(false)} type="button" variant="outline">Cancel</Button>
                                </>
                              ) : (
                                <>
                                  <Select
                                    value={editingOrder.company}
                                    onValueChange={(value) => setEditingOrder({ ...editingOrder, company: value })}
                                  >
                                    <SelectTrigger className="flex-grow">
                                      <SelectValue placeholder="Select a company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {companies.map((company) => (
                                        <SelectItem key={company.id} value={company.name}>
                                          {company.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <Button onClick={() => setIsAddingNewCompany(true)} type="button">New Company</Button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                      <DialogFooter>
                        <Button onClick={handleUpdateOrder}>Update Order</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteOrder(order.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
