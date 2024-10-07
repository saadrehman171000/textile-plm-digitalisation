'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Order = {
  id: number
  productName: string
  quantity: number
  status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled'
}



export function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([
    { id: 1, productName: 'Cotton T-Shirt', quantity: 100, status: 'Pending' },
    { id: 2, productName: 'Denim Jeans', quantity: 50, status: 'In Progress' },
    { id: 3, productName: 'Silk Scarf', quantity: 200, status: 'Completed' },
  ])
  const [newOrder, setNewOrder] = useState<Omit<Order, 'id'>>({ productName: '', quantity: 0, status: 'Pending' })
  const [editingOrder, setEditingOrder] = useState<Order | null>(null)

  const handleCreateOrder = () => {
    setOrders([...orders, { ...newOrder, id: orders.length + 1 }])
    setNewOrder({ productName: '', quantity: 0, status: 'Pending' })
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

  const handleCompleteOrder = (id: number) => {
    setOrders(orders.map(order => order.id === id ? { ...order, status: 'Completed' } : order))
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">Create New Order</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Order</DialogTitle>
            <DialogDescription>Enter the details for the new order.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
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

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.productName}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="mr-2" onClick={() => setEditingOrder(order)}>Edit</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Order</DialogTitle>
                      <DialogDescription>Update the details for this order.</DialogDescription>
                    </DialogHeader>
                    {editingOrder && (
                      <div className="grid gap-4 py-4">
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
                <Button variant="destructive" className="mr-2" onClick={() => handleDeleteOrder(order.id)}>Delete</Button>
                {order.status !== 'Completed' && (
                  <Button variant="secondary" onClick={() => handleCompleteOrder(order.id)}>Complete</Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
