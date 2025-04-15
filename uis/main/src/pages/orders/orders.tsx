import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState([
    { id: 1001, date: "2024-03-01", status: "Delivered", total: "$1200" },
    { id: 1002, date: "2024-03-05", status: "In Transit", total: "$750" },
    { id: 1003, date: "2024-03-10", status: "Pending", total: "$980" },
    { id: 1004, date: "2024-03-12", status: "Delivered", total: "$1120" },
    { id: 1005, date: "2024-03-15", status: "In Transit", total: "$1350" },
    { id: 1006, date: "2024-03-18", status: "Delivered", total: "$640" },
    { id: 1007, date: "2024-03-20", status: "Pending", total: "$890" },
    { id: 1008, date: "2024-03-22", status: "Delivered", total: "$1020" },
    { id: 1009, date: "2024-03-25", status: "In Transit", total: "$560" },
    { id: 1010, date: "2024-03-28", status: "Pending", total: "$430" },
  ]);

  const [formData, setFormData] = useState({
    date: "",
    status: "",
    total: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const newOrder = {
      id: orders.length + 1001,
      date: formData.date,
      status: formData.status,
      total: `$${formData.total}`,
    };
    setOrders([newOrder, ...orders]);
    setFormData({ date: "", status: "", total: "" });
  };

  const renderTable = (filteredStatus?: string) => {
    const filteredOrders = filteredStatus
      ? orders.filter((order) => order.status.toLowerCase() === filteredStatus)
      : orders;

    return (
      <Card className="rounded-2xl">
        <CardContent className="p-4">
          <CardTitle className="mb-4 text-lg font-medium text-muted-foreground">
            Order List
          </CardTitle>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase border-b">
                <tr>
                  <th className="px-4 py-2">Order ID</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Total</th>
                  <th className="px-4 py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="px-4 py-2">#{order.id}</td>
                    <td className="px-4 py-2">{order.date}</td>
                    <td className="px-4 py-2">
                      <Badge variant="outline">{order.status}</Badge>
                    </td>
                    <td className="px-4 py-2">{order.total}</td>
                    <td className="px-4 py-2 text-right">
                      <Button variant="link" size="sm">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Orders</h1>

      {/* Create Order Form */}
      <Card className="rounded-2xl">
        <CardContent className="p-4 space-y-4">
          <CardTitle className="text-lg font-medium text-muted-foreground mb-2">
            Create New Order
          </CardTitle>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                type="date"
                id="date"
                value={formData.date}
                onChange={(e) => handleChange("date", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="In Transit">In Transit</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="total">Total Amount ($)</Label>
              <Input
                type="number"
                id="total"
                value={formData.total}
                onChange={(e) => handleChange("total", e.target.value)}
              />
            </div>
          </div>
          <Button className="mt-2" onClick={handleSubmit}>
            Create Order
          </Button>
        </CardContent>
      </Card>

      {/* Status Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
          <TabsTrigger value="in transit">In Transit</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>

        <TabsContent value="all">{renderTable()}</TabsContent>
        <TabsContent value="delivered">{renderTable("delivered")}</TabsContent>
        <TabsContent value="in transit">{renderTable("in transit")}</TabsContent>
        <TabsContent value="pending">{renderTable("pending")}</TabsContent>
      </Tabs>
    </div>
  );
};

export default OrdersPage;
