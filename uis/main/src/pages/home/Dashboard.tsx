import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
);
const DashboardPage: React.FC = () => {
  const kpis = [
    {
      title: "Total Orders",
      value: 1542,
    },
    {
      title: "Products in Stock",
      value: 7800,
    },
    {
      title: "On-Time Delivery %",
      value: "92%",
    },
    {
      title: "Delayed Shipments",
      value: 34,
    },
  ];
  const orderStatusData = {
    labels: ["Delivered", "In Transit", "Pending"],
    datasets: [
      {
        label: "Order Status",
        data: [850, 300, 392],
        backgroundColor: ["#22c55e", "#3b82f6", "#facc15"],
      },
    ],
  };
  const supplierPerformanceData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Supplier Performance %",
        data: [88, 91, 94, 89, 92],
        fill: false,
        borderColor: "#6366f1",
        backgroundColor: "#6366f1",
        tension: 0.3,
      },
    ],
  };
  const orders = [
    {
      id: 1001,
      date: "2024-03-01",
      status: "Delivered",
      total: "$1200",
    },
    {
      id: 1002,
      date: "2024-03-05",
      status: "In Transit",
      total: "$750",
    },
    {
      id: 1003,
      date: "2024-03-10",
      status: "Pending",
      total: "$980",
    },
    {
      id: 1004,
      date: "2024-03-12",
      status: "Delivered",
      total: "$1120",
    },
    {
      id: 1005,
      date: "2024-03-15",
      status: "In Transit",
      total: "$1350",
    },
  ];
  return (
    <div className="p-6 space-y-6 w-full h-full">
      <h1 className="text-2xl font-bold">Supply Chain Management</h1>

      {}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.title} className="rounded-2xl shadow-sm">
            <CardContent className="p-4">
              <CardTitle className="text-sm text-muted-foreground">
                {kpi.title}
              </CardTitle>
              <div className="text-xl font-semibold text-foreground mt-2">
                {kpi.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <CardTitle className="text-lg font-medium text-muted-foreground mb-4">
              Order Status Distribution
            </CardTitle>
            <div className="h-64">
              <Pie data={orderStatusData} />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <CardTitle className="text-lg font-medium text-muted-foreground mb-4">
              Supplier Performance Over Time
            </CardTitle>
            <div className="h-64">
              <Line data={supplierPerformanceData} />
            </div>
          </CardContent>
        </Card>
      </div>

      {}
      <Card className="rounded-2xl">
        <CardContent className="p-4">
          <CardTitle className="mb-4 text-lg font-medium text-muted-foreground">
            Recent Orders
          </CardTitle>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase border-b">
                <tr>
                  <th scope="col" className="px-4 py-2">
                    Order ID
                  </th>
                  <th scope="col" className="px-4 py-2">
                    Date
                  </th>
                  <th scope="col" className="px-4 py-2">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-2">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="px-4 py-2">#{order.id}</td>
                    <td className="px-4 py-2">{order.date}</td>
                    <td className="px-4 py-2">{order.status}</td>
                    <td className="px-4 py-2">{order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default DashboardPage;
