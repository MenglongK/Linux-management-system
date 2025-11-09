
export default function Home() {
  return (
    <>
        {/* <div className="ml-64">
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
                        <p className="text-gray-600 text-sm mt-1">Welcome back, here's what's happening today</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                            <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cordes-accent focus:border-transparent outline-none">
                        </div>
                        <div className="relative">
                            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                                <i className="fas fa-bell text-xl"></i>
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <main className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">$48,291</p>
                            <div className="flex items-center mt-2">
                                <span className="text-green-600 text-sm font-medium flex items-center">
                                    <i className="fas fa-arrow-up mr-1"></i>
                                    12%
                                </span>
                                <span className="text-gray-500 text-sm ml-2">vs last month</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 bg-cordes-blue bg-opacity-10 rounded-lg flex items-center justify-center">
                            <i className="fas fa-dollar-sign text-cordes-blue text-xl"></i>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Users</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">15,847</p>
                            <div className="flex items-center mt-2">
                                <span className="text-green-600 text-sm font-medium flex items-center">
                                    <i className="fas fa-arrow-up mr-1"></i>
                                    8%
                                </span>
                                <span className="text-gray-500 text-sm ml-2">vs last month</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <i className="fas fa-users text-green-600 text-xl"></i>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Orders</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">2,847</p>
                            <div className="flex items-center mt-2">
                                <span className="text-green-600 text-sm font-medium flex items-center">
                                    <i className="fas fa-arrow-up mr-1"></i>
                                    15%
                                </span>
                                <span className="text-gray-500 text-sm ml-2">vs last month</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                            <i className="fas fa-shopping-cart text-orange-600 text-xl"></i>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Products</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">1,247</p>
                            <div className="flex items-center mt-2">
                                <span className="text-green-600 text-sm font-medium flex items-center">
                                    <i className="fas fa-arrow-up mr-1"></i>
                                    5%
                                </span>
                                <span className="text-gray-500 text-sm ml-2">vs last month</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <i className="fas fa-box text-purple-600 text-xl"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Revenue Analytics</h3>
                            <p className="text-gray-600 text-sm">Monthly revenue overview</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="px-3 py-1 text-sm bg-cordes-blue text-white rounded-md">6M</button>
                            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">1Y</button>
                        </div>
                    </div>
                    <div className="h-80">
                        <canvas id="revenueChart"></canvas>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
                        <button className="text-cordes-blue hover:text-cordes-dark text-sm font-medium">View All</button>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <img src="https://i.ytimg.com/vi/08JoSCHV9VY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAC7M1K4hMJbmFQQFppnSNzsZAcRA" alt="Product" className="w-12 h-12 rounded-lg">
                            <div className="flex-1">
                                <p className="font-medium text-gray-900">iPhone 15 Pro</p>
                                <p className="text-sm text-gray-600">Electronics</p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-gray-900">$1,299</p>
                                <p className="text-sm text-green-600">+12%</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <img src="https://i.ytimg.com/vi/08JoSCHV9VY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAC7M1K4hMJbmFQQFppnSNzsZAcRA" alt="Product" className="w-12 h-12 rounded-lg">
                            <div className="flex-1">
                                <p className="font-medium text-gray-900">MacBook Pro</p>
                                <p className="text-sm text-gray-600">Computers</p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-gray-900">$2,499</p>
                                <p className="text-sm text-green-600">+8%</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <img src="https://i.ytimg.com/vi/08JoSCHV9VY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAC7M1K4hMJbmFQQFppnSNzsZAcRA" alt="Product" className="w-12 h-12 rounded-lg">
                            <div className="flex-1">
                                <p className="font-medium text-gray-900">AirPods Pro</p>
                                <p className="text-sm text-gray-600">Audio</p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-gray-900">$249</p>
                                <p className="text-sm text-green-600">+15%</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <img src="https://i.ytimg.com/vi/08JoSCHV9VY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAC7M1K4hMJbmFQQFppnSNzsZAcRA" alt="Product" className="w-12 h-12 rounded-lg">
                            <div className="flex-1">
                                <p className="font-medium text-gray-900">Apple Watch</p>
                                <p className="text-sm text-gray-600">Wearables</p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-gray-900">$399</p>
                                <p className="text-sm text-green-600">+6%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
                <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                            <p className="text-gray-600 text-sm">Latest customer orders and transactions</p>
                        </div>
                        <div className="flex space-x-3">
                            <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                <i className="fas fa-download mr-2"></i>Export
                            </button>
                            <button className="px-4 py-2 bg-cordes-blue text-white rounded-lg hover:bg-cordes-dark transition-colors">
                                <i className="fas fa-plus mr-2"></i>Add Order
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm font-medium text-gray-900">#15847</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <img src="https://www.investopedia.com/thmb/NSwuyMYGVWCHVIi1AEoaPkdmMD0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Brand-loyalty_final-8ad57b86183e42348e18bc306c87778e.png" alt="Customer" className="w-8 h-8 rounded-full mr-3">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">John Doe</div>
                                            <div className="text-sm text-gray-500">john@example.com</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">iPhone 15 Pro</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">$1,299.00</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                        Completed
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">May 22, 2025</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex space-x-2">
                                        <button className="text-cordes-blue hover:text-cordes-dark">
                                            <i className="fas fa-eye"></i>
                                        </button>
                                        <button className="text-gray-600 hover:text-gray-900">
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button className="text-red-600 hover:text-red-900">
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm font-medium text-gray-900">#15846</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <img src="https://www.investopedia.com/thmb/NSwuyMYGVWCHVIi1AEoaPkdmMD0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Brand-loyalty_final-8ad57b86183e42348e18bc306c87778e.png" alt="Customer" className="w-8 h-8 rounded-full mr-3">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">Sarah Wilson</div>
                                            <div className="text-sm text-gray-500">sarah@example.com</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">MacBook Pro</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">$2,499.00</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                        Pending
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">May 21, 2025</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex space-x-2">
                                        <button className="text-cordes-blue hover:text-cordes-dark">
                                            <i className="fas fa-eye"></i>
                                        </button>
                                        <button className="text-gray-600 hover:text-gray-900">
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button className="text-red-600 hover:text-red-900">
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm font-medium text-gray-900">#15845</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <img src="https://www.investopedia.com/thmb/NSwuyMYGVWCHVIi1AEoaPkdmMD0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Brand-loyalty_final-8ad57b86183e42348e18bc306c87778e.png" alt="Customer" className="w-8 h-8 rounded-full mr-3">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">Mike Johnson</div>
                                            <div className="text-sm text-gray-500">mike@example.com</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">AirPods Pro</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">$249.00</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                                        Cancelled
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">May 20, 2025</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex space-x-2">
                                        <button className="text-cordes-blue hover:text-cordes-dark">
                                            <i className="fas fa-eye"></i>
                                        </button>
                                        <button className="text-gray-600 hover:text-gray-900">
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button className="text-red-600 hover:text-red-900">
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                            <div className="flex-1">
                                <p className="text-sm text-gray-900">New user registered</p>
                                <p className="text-xs text-gray-500">sarah.johnson@email.com • 2 minutes ago</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            <div className="flex-1">
                                <p className="text-sm text-gray-900">Order completed</p>
                                <p className="text-xs text-gray-500">Order #15847 - $299.99 • 5 minutes ago</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                            <div className="flex-1">
                                <p className="text-sm text-gray-900">Product updated</p>
                                <p className="text-xs text-gray-500">iPhone 15 Pro - Stock: 25 • 8 minutes ago</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                            <div className="flex-1">
                                <p className="text-sm text-gray-900">Payment received</p>
                                <p className="text-xs text-gray-500">$1,245.00 from client • 12 minutes ago</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="text-sm text-gray-900">Server Status</span>
                            </div>
                            <span className="text-sm text-green-600 font-medium">Online</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="text-sm text-gray-900">Database</span>
                            </div>
                            <span className="text-sm text-green-600 font-medium">Active</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <span className="text-sm text-gray-900">API Status</span>
                            </div>
                            <span className="text-sm text-yellow-600 font-medium">Warning</span>
                        </div>
                        <div className="mt-6">
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                                <span>Server Load</span>
                                <span>68%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-cordes-blue h-2 rounded-full" style="width: 68%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div> */}
    </>
  )}