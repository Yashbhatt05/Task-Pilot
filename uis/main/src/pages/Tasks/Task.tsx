"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Plus, Eye, Pencil, Trash, AlertTriangle, Circle, CheckCircle } from "lucide-react";
import Modal from "@/components/ui/modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UniversalDropdown from "@/components/ui/dropdown";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PaginationFooter from "@/components/ui/pagefooter";

const columns = [
  { title: "To Do", color: "bg-[#E7DEFA]", count: 0 },
  { title: "On Track", color: "bg-[#E6F4F3]", count: 0 },
  { title: "Off Track", color: "bg-[#FCECEC]", count: 0 },
  { title: "At Risk", color: "bg-[#FAF4D3]", count: 0 },
];

// Static status options
const statusOptions = [
  { id: 'open', name: 'Open', color: 'bg-blue-100 text-blue-700', icon: Circle },
  { id: 'in_progress', name: 'In Progress', color: 'bg-yellow-100 text-yellow-700', icon: AlertTriangle },
  { id: 'completed', name: 'Completed', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  { id: 'closed', name: 'Closed', color: 'bg-gray-100 text-gray-700', icon: CheckCircle },
];

// Static priority options
const priorityOptions = [
  { id: 'high', name: 'High', color: 'bg-red-100 text-red-700', icon: AlertTriangle },
  { id: 'medium', name: 'Medium', color: 'bg-yellow-100 text-yellow-700', icon: Circle },
  { id: 'low', name: 'Low', color: 'bg-green-100 text-green-700', icon: CheckCircle },
];

// Date filter options
const dateFilterOptions = [
  { id: 'all', name: 'All' },
  { id: 'today', name: 'Today' },
  { id: 'this_week', name: 'This Week' },
  { id: 'this_month', name: 'This Month' },
];

export default function Task() {
  const [board, setBoard] = useState("1");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedUser, setSelectedUser] = useState<string | number>("");
  const [selectedProject, setSelectedProject] = useState<string | number>("");
  const [taskList, setTaskList] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [showOtherDetails, setShowOtherDetails] = useState(false);
  const [userMap, setUserMap] = useState<Record<string | number, string>>({});
  const [statusFilter, setStatusFilter] = useState<string>("all"); // State for status filter
  const [dateFilter, setDateFilter] = useState<string>("all"); // State for date filter

  const [formData, setFormData] = useState({
    title: '',
    assignee: '',
    project: '',
    requiredBy: null as Date | null,
    description: '',
    status: '',
    priority: '',
  });

  // Fetch user data for name mapping
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await response.json();
        const map: Record<string | number, string> = {};
        users.forEach((user: { id: number; name: string }) => {
          map[user.id] = user.name;
        });
        setUserMap(map);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Filter tasks based on status and date
  const filteredTasks = taskList.filter((task) => {
    // Status filter
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;

    // Date filter
    let matchesDate = true;
    if (task.requiredBy && dateFilter !== "all") {
      const taskDate = new Date(task.requiredBy);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (dateFilter === "today") {
        matchesDate = taskDate.toDateString() === today.toDateString();
      } else if (dateFilter === "this_week") {
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        matchesDate = taskDate >= startOfWeek && taskDate <= endOfWeek;
      } else if (dateFilter === "this_month") {
        matchesDate =
          taskDate.getMonth() === today.getMonth() &&
          taskDate.getFullYear() === today.getFullYear();
      }
    }

    return matchesStatus && matchesDate;
  });

  const totalRecords = filteredTasks.length;
  const totalPages = Math.ceil(totalRecords / perPage);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    setTaskList((prev) => [...prev, formData]);
    setIsOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      assignee: '',
      project: '',
      requiredBy: null,
      description: '',
      status: '',
      priority: '',
    });
    setSelectedUser('');
    setSelectedProject('');
    setSelectedDate(null);
    setShowOtherDetails(false);
  };

  // Helper to get status option by ID
  const getStatusOption = (id: string) => {
    return statusOptions.find((option) => option.id === id) || null;
  };

  // Helper to get priority option by ID
  const getPriorityOption = (id: string) => {
    return priorityOptions.find((option) => option.id === id) || null;
  };

  // Helper to get user/project name by ID
  const getNameById = (id: string | number) => {
    return userMap[id] || id || '-';
  };

  // Helper to truncate text to a specified length
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <div className="p-4 bg-[#F4F1F8] h-full">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <div className="flex gap-3 items-center">
          <Button
            onClick={() => setIsOpen(true)}
            variant="outline"
            className="flex items-center gap-2 bg-white text-[#8466D8] border border-[#8466D8]"
          >
            <Plus className="w-4 h-4 font-bold" /> Add Task
          </Button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
          >
            <path
              fill="#8466D8"
              d="M10 21h4c0 1.1-.9 2-2 2s-2-.9-2-2m11-2v1H3v-1l2-2v-6c0-3.1 2-5.8 5-6.7V4c0-1.1.9-2 2-2s2 .9 2 2v.3c3 .9 5 3.6 5 6.7v6zm-4-8c0-2.8-2.2-5-5-5s-5 2.2-5 5v7h10z"
            />
          </svg>
          <div className="rounded-full border-[#8466D8] border-2 object-cover overflow-hidden h-[50px] w-[50px]">
            <img src="https://i.ibb.co/WrcZ2RX/image-17.png" alt="" />
          </div>
        </div>
      </div>

      {/* Modal Form */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Seshaasai Task"
      >
        <section>
          <div className="relative">
            {/* Form Content */}
            <div className="p-6">
              {/* Title */}
              <div className="mb-6">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="Write task title here"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Three Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Assignee */}
                <div>
                  <label
                    htmlFor="assignee"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Assignee
                  </label>
                  <UniversalDropdown
                    apiUrl="https://jsonplaceholder.typicode.com/users"
                    value={selectedUser}
                    onChange={(val) => {
                      setSelectedUser(val);
                      handleChange('assignee', val);
                    }}
                  />
                </div>

                {/* Project */}
                <div>
                  <label
                    htmlFor="project"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Project
                  </label>
                  <UniversalDropdown
                    apiUrl="https://jsonplaceholder.typicode.com/users"
                    value={selectedProject}
                    onChange={(val) => {
                      setSelectedProject(val);
                      handleChange('project', val);
                    }}
                  />
                </div>

                {/* Required by */}
                <div>
                  <label
                    htmlFor="required-by"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Required by
                  </label>
                  <div className="relative">
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date: Date | null) => {
                        setSelectedDate(date);
                        handleChange('requiredBy', date);
                      }}
                      placeholderText="dd-MMM-YYYY"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      id="required-by"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  placeholder="What is this task about?"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                ></textarea>
              </div>

              {/* Other details */}
              <div className="bg-purple-50 p-3 rounded-md mb-8">
                <button
                  onClick={() => setShowOtherDetails(!showOtherDetails)}
                  className="w-full flex justify-between items-center text-gray-700 font-medium"
                >
                  <span>Other details</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 transform ${showOtherDetails ? 'rotate-90' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              {showOtherDetails && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Status */}
                  <div>
                    <label
                      htmlFor="status"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Status
                    </label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => handleChange('status', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Select status</option>
                      {statusOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Priority */}
                  <div>
                    <label
                      htmlFor="priority"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Priority
                    </label>
                    <select
                      id="priority"
                      value={formData.priority}
                      onChange={(e) => handleChange('priority', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Select priority</option>
                      {priorityOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-8">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add
            </button>
          </div>
        </section>
      </Modal>

      {/* Task Management */}
      <div className="bg-white rounded-xl shadow mt-10 p-4 h-[85%]">
        <div className="flex flex-row justify-between">
          <Tabs defaultValue="kanban">
            <TabsList className="flex space-x-4">
              <TabsTrigger
                onClick={() => setBoard("2")}
                value="lists"
                className="flex flex-row justify-center items-center text-[#6B6F80]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="none"
                    stroke="#728392"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="4"
                    d="m5 10l3 3l6-6M5 24l3 3l6-6M5 38l3 3l6-6m7-11h22M21 38h22M21 10h22"
                  />
                </svg>
                <span className="text-center text-sm mb-[5%]">Lists</span>
              </TabsTrigger>
              <TabsTrigger
                onClick={() => setBoard("3")}
                value="Cards"
                className="flex flex-row justify-center items-center text-[#6B6F80]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#728392"
                    d="M10.308 11.116H7.577q-.343 0-.575-.233t-.233-.575V7.577q0-.343.232-.575t.576-.233h2.73q.344 0 .576.233t.232.575v2.73q0 .344-.232.576t-.575.233m0 6.115H7.577q-.343 0-.575-.233t-.233-.575v-2.73q0-.344.232-.576t.576-.232h2.73q.344 0 .576.232t.232.575v2.731q0 .343-.232.576t-.575.232m6.115-6.115h-2.73q-.344 0-.576-.233t-.232-.575V7.577q0-.343.232-.575t.575-.233h2.731q.343 0 .576.233t.232.575v2.73q0 .344-.232.576t-.576.233m0 6.115h-2.73q-.344 0-.576-.233t-.232-.575v-2.73q0-.344.232-.576t.575-.232h2.731q.343 0 .576.232t.232.575v2.731q0 .343-.232.576t-.576.232M5.616 20q-.691 0-1.153-.462T4 18.384V5.616q0-.691.463-1.153T5.616 4h12.769q.69 0 1.153.463T20 5.616v12.769q0 .69-.462 1.153T18.384 20zm0-1h12.769q.23 0 .423-.192t.192-.424V5.616q0-.231-.192-.424T18.384 5H5.616q-.231 0-.424.192T5 5.616v12.769q0 .23.192.423t.423.192"
                    strokeWidth="0.5"
                    stroke="#728392"
                  />
                </svg>
                <span className="text-center text-sm mb-[5%]">Cards</span>
              </TabsTrigger>
              <TabsTrigger
                onClick={() => setBoard("1")}
                value="Kanban"
                className="flex flex-row justify-center items-center text-[#6B6F80]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 15 15"
                >
                  <path
                    fill="#728392"
                    d="M0 1h7V0H0zm8 0h7V0H8zM.5 3a.5.5 0 0 0-.5.5v11a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5v-11a.5.5 0 0 0-.5-.5zm8 0a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5v-6a.5.5 0 0 0-.5-.5z"
                    strokeWidth="0.5"
                    stroke="#728392"
                  />
                </svg>
                <span className="text-center text-sm mb-[5%]">Kanban</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value)}>
              <SelectTrigger className="w-24 h-8 border-gray-300">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {statusOptions.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={(value) => setDateFilter(value)}>
              <SelectTrigger className="w-24 h-8 border-gray-300">
                <SelectValue placeholder="Date" />
              </SelectTrigger>
              <SelectContent>
                {dateFilterOptions.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {board === "1" ? (
          <div className="grid grid-cols-4 gap-4 mt-4 h-[90%]">
            {columns.map((col) => (
              <div key={col.title} className="p-3 rounded-xl">
                <div
                  className={`${col.color} p-3 rounded-xl flex justify-between items-center mb-2`}
                >
                  <h3>{col.title}</h3>
                  <span className="text-xs bg-white rounded-full px-2 py-0.5 text-gray-700">
                    {col.count}
                  </span>
                </div>
                <div className="flex h-[90%] justify-center items-center bg-[#FFD6D633]">
                  <p className="text-sm text-gray-400 text-center">No Data found</p>
                </div>
              </div>
            ))}
          </div>
        ) : board === "2" ? (
          <Card className="bg-white flex flex-col flex-grow rounded-xl shadow-md mt-4">
            <CardContent className="p-4 flex flex-col flex-grow">
              <div className="flex-grow overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#f4efff] text-gray-600 text-sm font-medium">
                      <TableHead className="px-4 py-2">Action</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Assignee</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Required by</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTasks.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center text-gray-400 py-8">
                          No Data found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredTasks.map((task, index) => {
                        const statusOption = getStatusOption(task.status);
                        const priorityOption = getPriorityOption(task.priority);
                        return (
                          <TableRow key={index} className="text-sm">
                            <TableCell className="flex items-center space-x-2 px-4 py-2">
                              <button title="View">
                                <Eye className="w-4 h-4 text-gray-600 hover:text-purple-600" />
                              </button>
                              <button title="Edit">
                                <Pencil className="w-4 h-4 text-gray-600 hover:text-purple-600" />
                              </button>
                              <button title="Delete">
                                <Trash className="w-4 h-4 text-red-500 hover:text-red-700" />
                              </button>
                            </TableCell>
                            <TableCell className="w-[25%] truncate" title={task.title}>
                              {truncateText(task.title, 25)}
                            </TableCell>
                            <TableCell>{getNameById(task.assignee)}</TableCell>
                            <TableCell>{getNameById(task.project)}</TableCell>
                            <TableCell>
                              {task.requiredBy
                                ? new Date(task.requiredBy).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                  })
                                : '-'}
                            </TableCell>
                            <TableCell>
                              {statusOption ? (
                                <span
                                  className={`px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1 ${
                                    statusOption.color
                                  }`}
                                >
                                  <statusOption.icon className="w-4 h-4" />
                                  {statusOption.name}
                                </span>
                              ) : (
                                '-'
                              )}
                            </TableCell>
                            <TableCell>
                              {priorityOption ? (
                                <span
                                  className={`px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1 ${
                                    priorityOption.color
                                  }`}
                                >
                                  <priorityOption.icon className="w-4 h-4" />
                                  {priorityOption.name}
                                </span>
                              ) : (
                                '-'
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4">
                <PaginationFooter
                  page={page}
                  totalPages={totalPages}
                  perPage={perPage}
                  totalRecords={totalRecords}
                  onPageChange={(p) => setPage(p)}
                  onPerPageChange={(pp) => setPerPage(pp)}
                />
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="mt-4">Cards</div>
        )}
      </div>
    </div>
  );
}