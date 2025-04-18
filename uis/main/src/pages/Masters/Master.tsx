"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Bell, Eye, Pencil, Trash, AlertTriangle, Circle, CheckCircle } from 'lucide-react';
import PaginationFooter from '@/components/ui/pagefooter';
import Modal from '@/components/ui/modal';
import ComboBox from '@/components/ui/combobox';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

// Priority options with value, label, color, and icon
const priorityOptions = [
  { id: 'high', name: 'High', color: 'bg-red-100 text-red-700', icon: AlertTriangle },
  { id: 'medium', name: 'Medium', color: 'bg-yellow-100 text-yellow-700', icon: Circle },
  { id: 'low', name: 'Low', color: 'bg-green-100 text-green-700', icon: CheckCircle },
];

// Status options with value, label, color, and icon
const statusOptions = [
  { id: 'open', name: 'Open', color: 'bg-blue-100 text-blue-700', icon: Circle },
  { id: 'in_progress', name: 'In Progress', color: 'bg-yellow-100 text-yellow-700', icon: AlertTriangle },
  { id: 'completed', name: 'Completed', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  { id: 'closed', name: 'Closed', color: 'bg-gray-100 text-gray-700', icon: CheckCircle },
];

const createdOnOptions = [
  { id: 'today', name: 'Today' },
  { id: 'yesterday', name: 'Yesterday' },
  { id: 'last_week', name: 'Last Week' },
];

const expiredOnOptions = [
  { id: 'tomorrow', name: 'Tomorrow' },
  { id: 'next_week', name: 'Next Week' },
  { id: 'next_month', name: 'Next Month' },
];

export default function Master() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);

  const [formData, setFormData] = useState({
    user: '',
    assignee: '',
    title: '',
    frequency: '',
    requiredBy: 0,
    startOn: 0,
    actionStart: true,
    autoExpiry: false,
    autoCreation: false,
    createdOn: '',
    expiredOn: '',
    description: '',
    reference: '',
    status: '',
    priority: '',
    checkerRequired: true,
    checker: '',
  });

  const [taskList, setTaskList] = useState<any[]>([]);

  const totalRecords = taskList.length;
  const totalPages = Math.ceil(totalRecords / perPage);

  const handleChange = (field: string, value: string | number | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleClick = () => setShow(!show);

  const handleSubmit = () => {
    setTaskList((prev) => [...prev, formData]);
    setIsOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      user: '',
      assignee: '',
      title: '',
      frequency: '',
      requiredBy: 0,
      startOn: 0,
      actionStart: true,
      autoExpiry: false,
      autoCreation: false,
      createdOn: '',
      expiredOn: '',
      description: '',
      reference: '',
      status: '',
      priority: '',
      checkerRequired: true,
      checker: '',
    });
    setShow(false);
  };

  // Helper to get priority option by ID
  const getPriorityOption = (id: string) => {
    return priorityOptions.find((option) => option.id === id) || null;
  };

  // Helper to get status option by ID
  const getStatusOption = (id: string) => {
    return statusOptions.find((option) => option.id === id) || null;
  };

  return (
    <section className="h-full w-full">
      <div className="h-full w-full bg-[#efeaf4] p-4 flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Tasks</h2>
          <div className="flex gap-3 items-center">
            <Bell className="w-6 h-6 text-[#8466D8]" />
            <div className="rounded-full border-[#8466D8] border-2 object-cover overflow-hidden h-[50px] w-[50px]">
              <img src="https://i.ibb.co/WrcZ2RX/image-17.png" alt="" />
            </div>
          </div>
        </div>

        {/* Modal Form */}
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Seshaasai Task">
          <div className="py-4 grid grid-cols-3 gap-12">
            <ComboBox
              label="User"
              placeholder="Select a user"
              value={formData.user}
              onChange={(val) => handleChange('user', val)}
              apiUrl="https://jsonplaceholder.typicode.com/users"
              labelKey="name"
              valueKey="id"
            />
            <ComboBox
              label="Assignee"
              placeholder="Select an assignee"
              value={formData.assignee}
              onChange={(val) => handleChange('assignee', val)}
              apiUrl="https://jsonplaceholder.typicode.com/users"
              labelKey="name"
              valueKey="id"
            />
            <div>
              <label className="text-sm text-gray-600">Title</label>
              <Input
                type="text"
                placeholder="Enter task title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
              />
            </div>
            <ComboBox
              label="Frequency"
              placeholder="Select frequency"
              value={formData.frequency}
              onChange={(val) => handleChange('frequency', val)}
              apiUrl="https://jsonplaceholder.typicode.com/users"
              labelKey="name"
              valueKey="id"
            />
            <div>
              <label className="text-sm text-gray-600">Required by</label>
              <Input
                type="number"
                placeholder="Enter days"
                value={formData.requiredBy}
                onChange={(e) => handleChange('requiredBy', Number(e.target.value))}
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Start on</label>
              <Input
                type="number"
                placeholder="Enter days"
                value={formData.startOn}
                onChange={(e) => handleChange('startOn', Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label>Action Start</Label>
              <div className="flex gap-4 mt-1">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={formData.actionStart}
                    onCheckedChange={(checked) => handleChange('actionStart', checked)}
                  />
                  <label>Before</label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={!formData.actionStart}
                    onCheckedChange={(checked) => handleChange('actionStart', !checked)}
                  />
                  <label>After</label>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Auto Expiry</Label>
              <div className="flex gap-4 mt-1">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={formData.autoExpiry}
                    onCheckedChange={(checked) => handleChange('autoExpiry', checked)}
                  />
                  <label>Yes</label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={!formData.autoExpiry}
                    onCheckedChange={(checked) => handleChange('autoExpiry', !checked)}
                  />
                  <label>No</label>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Auto Creation</Label>
              <div className="flex gap-4 mt-1">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={formData.autoCreation}
                    onCheckedChange={(checked) => handleChange('autoCreation', checked)}
                  />
                  <label>Yes</label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={!formData.autoCreation}
                    onCheckedChange={(checked) => handleChange('autoCreation', !checked)}
                  />
                  <label>No</label>
                </div>
              </div>
            </div>
            <ComboBox
              label="Created On"
              placeholder="Select creation date"
              value={formData.createdOn}
              onChange={(val) => handleChange('createdOn', val)}
              options={createdOnOptions}
              labelKey="name"
              valueKey="id"
            />
            <ComboBox
              label="Expired On"
              placeholder="Select expiry date"
              value={formData.expiredOn}
              onChange={(val) => handleChange('expiredOn', val)}
              options={expiredOnOptions}
              labelKey="name"
              valueKey="id"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <button
            onClick={handleClick}
            className="flex w-full justify-between items-center px-4 py-2 bg-[#F4EEFF] rounded cursor-pointer"
          >
            Other details
            <div className={`${!show ? "rotate-270" : "rotate-0"}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 15 15"
              >
                <path fill="#728392" d="M7.5 12L0 4h15z" />
              </svg>
            </div>
          </button>

          {show && (
            <div className="border rounded-b-md p-6 bg-white space-y-6 shadow-md">
              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="reference">Reference</Label>
                  <Input
                    className="py-[18px]"
                    id="reference"
                    placeholder="Enter reference"
                    value={formData.reference}
                    onChange={(e) => handleChange('reference', e.target.value)}
                  />
                </div>
                <div className="space-y-3">
                  <Label>Status</Label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleChange('status', e.target.value)}
                    className="w-full px-3 py-[5px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="">Select status</option>
                    {statusOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-3">
                  <Label>Priority</Label>
                  <select
                    value={formData.priority}
                    onChange={(e) => handleChange('priority', e.target.value)}
                    className="w-full px-3 py-[5px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
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
              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-3">
                  <Label>Checker Required</Label>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={formData.checkerRequired}
                        onCheckedChange={(checked) => handleChange('checkerRequired', checked)}
                      />
                      <label>Yes</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={!formData.checkerRequired}
                        onCheckedChange={(checked) => handleChange('checkerRequired', !checked)}
                      />
                      <label>No</label>
                    </div>
                  </div>
                </div>
                <ComboBox
                  label="Checker"
                  placeholder="Select checker"
                  value={formData.checker}
                  onChange={(val) => handleChange('checker', val)}
                  apiUrl="/api/checkers"
                  labelKey="name"
                  valueKey="id"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-4 mt-8">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Add
            </button>
          </div>
        </Modal>

        {/* Task List Section */}
        <Card className="bg-white flex flex-col flex-grow rounded-xl shadow-md">
          <CardContent className="p-4 flex flex-col flex-grow">
            <div className="flex justify-between mb-4">
              <div className="flex flex-row items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
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
                <h2 className="text-lg font-semibold text-[#4A4D51]">Lists</h2>
              </div>
              <Button
                onClick={() => setIsOpen(true)}
                className="bg-[#f5f3f9] text-black border hover:bg-[#e6e1ed]"
              >
                + Add Task
              </Button>
            </div>
            <div className="flex-grow overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#f4efff] text-gray-600 text-sm font-medium">
                    <TableHead className="px-4 py-2">Action</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>
                      Required by <span className="text-xs">(Days)</span>
                    </TableHead>
                    <TableHead>
                      Start on <span className="text-xs">(Days)</span>
                    </TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Auto Expiry</TableHead>
                    <TableHead>Auto Creation</TableHead>
                    <TableHead>Created On</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {taskList.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={12} className="text-center text-gray-400 py-8">
                        No Data found
                      </TableCell>
                    </TableRow>
                  ) : (
                    taskList.map((task, index) => {
                      const priorityOption = getPriorityOption(task.priority);
                      const statusOption = getStatusOption(task.status);
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
                          <TableCell>{task.title}</TableCell>
                          <TableCell>{task.assignee}</TableCell>
                          <TableCell>{task.frequency}</TableCell>
                          <TableCell>{task.requiredBy}</TableCell>
                          <TableCell>{task.startOn}</TableCell>
                          <TableCell>{task.project || 'Accounts'}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-md text-xs font-semibold ${
                                task.autoExpiry ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {task.autoExpiry ? 'Yes' : 'No'}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-md text-xs font-semibold ${
                                task.autoCreation ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {task.autoCreation ? 'Yes' : 'No'}
                            </span>
                          </TableCell>
                          <TableCell>{task.createdOn || 'On Expiry'}</TableCell>
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
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination at Bottom */}
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
      </div>
    </section>
  );
}