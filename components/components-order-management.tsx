'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

type Order = {
  id: number
  customerName: string
  productName: string
  quantity: number
  status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled'
  total: number
}

export function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([
    { id: 1, customerName: 'John Doe', productName: 'Cotton T-Shirt', quantity: 100, status: 'Pending', total: 1999.99 },
    { id: 2, customerName: 'Jane Smith', productName: 'Denim Jeans', quantity: 50, status: 'In Progress', total: 2499.50 },
    { id: 3, customerName: 'Bob Johnson', productName: 'Silk Scarf', quantity: 200, status: 'Completed', total: 3999.00 },
  ])
  const [newOrder, setNewOrder] = useState<Omit<Order, 'id' | 'total'>>({ customerName: '', productName: '', quantity: 0, status: 'Pending' })
  const [editingOrder, setEditingOrder] = useState<Order | null>(null)

  const handleCreateOrder = () => {
    const order: Order = {
      ...newOrder,
      id: orders.length + 1,
      total: Math.random() * 1000 // This should be calculated based on actual product prices
    }
    setOrders([...orders, order])
    setNewOrder({ customerName: '', productName: '', quantity: 0, status: 'Pending' })
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

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'Pending':
        return <Badge variant="secondary">{status}</Badge>;
      case 'In Progress':
        return <Badge variant="default">{status}</Badge>; // Changed "primary" to "default"
      case 'Completed':
        return <Badge variant="outline">{status}</Badge>; // Changed "success" to "outline"
      case 'Cancelled':
        return <Badge variant="destructive">{status}</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>; // Fallback in case status is undefined
    }
  };
  

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Orders</h2>
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
            </div>
            <DialogFooter>
              <Button onClick={handleCreateOrder}>Create Order</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.productName}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
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