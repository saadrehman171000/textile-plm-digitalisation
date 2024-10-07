'use client'

import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Search, Menu, User, ChevronDown, Sun, Moon, BarChart2, Users, ShoppingBag } from 'lucide-react'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger, 
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [searchQuery, setSearchQuery] = useState("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Searching for:", searchQuery)
  }

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      <Toaster position="top-right" />
      <div className="flex-grow bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-md">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                    <SheetDescription>
                      Navigate through different sections of the admin dashboard.
                    </SheetDescription>
                  </SheetHeader>
                  <nav className="flex flex-col space-y-4 mt-4">
                    <Button variant="ghost" className="justify-start" onClick={() => { setActiveTab("dashboard"); setIsSidebarOpen(false); }}>
                      <BarChart2 className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>
                    <Button variant="ghost" className="justify-start" onClick={() => { setActiveTab("orders"); setIsSidebarOpen(false); }}>
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Orders
                    </Button>
                    <Button variant="ghost" className="justify-start" onClick={() => { setActiveTab("users"); setIsSidebarOpen(false); }}>
                      <Users className="mr-2 h-4 w-4" />
                      Users
                    </Button>
                    <Button variant="ghost" className="justify-start" onClick={() => { setActiveTab("products"); setIsSidebarOpen(false); }}>
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Products
                    </Button>
                  </nav>
                </SheetContent>
              </Sheet>
              <div className="flex items-center space-x-2">
                <svg className="h-8 w-8 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-2xl font-bold">FiberFlow</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <form onSubmit={handleSearch} className="relative hidden md:block">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-8 pr-4 py-2 w-[300px] rounded-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-6 w-6" />
                    <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[300px]">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>New order received</DropdownMenuItem>
                  <DropdownMenuItem>Product stock low</DropdownMenuItem>
                  <DropdownMenuItem>New user registered</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Admin User</p>
                      <p className="text-xs leading-none text-muted-foreground">admin@example.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ChevronDown className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Switch
                checked={isDarkMode}
                onCheckedChange={toggleDarkMode}
                className="bg-gray-200 dark:bg-gray-700"
              />
              {isDarkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 flex-grow">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid grid-cols-4 gap-4 bg-transparent">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-white data-[state=active]:shadow-md dark:data-[state=active]:bg-gray-800">
                <BarChart2 className="mr-2 h-4 w-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="orders" className="data-[state=active]:bg-white data-[state=active]:shadow-md dark:data-[state=active]:bg-gray-800">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Orders
              </TabsTrigger>
              <TabsTrigger value="users" className="data-[state=active]:bg-white data-[state=active]:shadow-md dark:data-[state=active]:bg-gray-800">
                <Users className="mr-2 h-4 w-4" />
                Users
              </TabsTrigger>
              <TabsTrigger value="products" className="data-[state=active]:bg-white data-[state=active]:shadow-md dark:data-[state=active]:bg-gray-800">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Products
              </TabsTrigger>
            </TabsList>
            <TabsContent value="dashboard" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$45,231.89</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-500">↑</span> 20.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">New Orders</CardTitle>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+2,350</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-500">↑</span> 180.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+573</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-500">↑</span> 201 since last hour
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+573</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-500">↑</span> 201 since last hour
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <div className="h-[200px] bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
                      Chart Placeholder
                    </div>
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                    <CardDescription>You made 265 sales this month.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={`/placeholder.svg?height=36&width=36&text=U${i}`} alt={`User ${i}`} />
                            <AvatarFallback>U{i}</AvatarFallback>
                          </Avatar>
                          <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">User {i}</p>
                            <p className="text-sm text-muted-foreground">user{i}@example.com</p>
                          </div>
                          <div className="ml-auto font-medium">+${(Math.random() * 100).toFixed(2)}</div>
                        </div>
                      ))} 
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="orders" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Order Management</CardTitle>
                  <CardDescription>Manage and track orders</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Order Management Content */}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="users" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Add, view, and delete users</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* User Management Content */}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="products" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Product Management</CardTitle>
                  <CardDescription>Add, view, and manage products</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Product Management Content */}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
