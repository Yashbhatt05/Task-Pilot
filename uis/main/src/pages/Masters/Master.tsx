"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Bell, Eye, Paperclip, Pencil, Plus, Trash } from 'lucide-react';
import PaginationFooter from '@/components/ui/pagefooter';
import Modal from '@/components/ui/modal';
import ComboBox from '@/components/ui/combobox';
import { Label } from '@/components/ui/label';

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
    setTaskList(prev => [...prev, formData]);
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

  return (
    <section className="h-full w-full">
      <div className=" h-full w-full bg-[#efeaf4] p-4 flex flex-col">
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
            <ComboBox label="User" placeholder="Select a user" value={formData.user} onChange={(val) => handleChange('user', val)} apiUrl="https://jsonplaceholder.typicode.com/users" labelKey="name" valueKey="id" />
            <ComboBox label="Assignee" placeholder="Select an assignee" value={formData.assignee} onChange={(val) => handleChange('assignee', val)} apiUrl="https://jsonplaceholder.typicode.com/users" labelKey="name" valueKey="id" />
            <div>
              <label className="text-sm text-gray-600">Title</label>
              <Input type="text" placeholder="Enter task title" value={formData.title} onChange={(e) => handleChange('title', e.target.value)} />
            </div>
            <ComboBox label="Frequency" placeholder="Select frequency" value={formData.frequency} onChange={(val) => handleChange('frequency', val)} apiUrl="https://jsonplaceholder.typicode.com/users" labelKey="name" valueKey="id" />
            <div>
              <label className="text-sm text-gray-600">Required by</label>
              <Input type="number" placeholder="Enter days" value={formData.requiredBy} onChange={(e) => handleChange('requiredBy', Number(e.target.value))} />
            </div>
            <div>
              <label className="text-sm text-gray-600">Start on</label>
              <Input type="number" placeholder="Enter days" value={formData.startOn} onChange={(e) => handleChange('startOn', Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label>Action Start</Label>
              <div className="flex gap-4 mt-1">
                <label><input type="radio" checked={formData.actionStart} onChange={() => handleChange('actionStart', true)} /> Before</label>
                <label><input type="radio" checked={!formData.actionStart} onChange={() => handleChange('actionStart', false)} /> After</label>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Auto Expiry</Label>
              <div className="flex gap-4 mt-1">
                <label><input type="radio" checked={formData.autoExpiry} onChange={() => handleChange('autoExpiry', true)} /> Yes</label>
                <label><input type="radio" checked={!formData.autoExpiry} onChange={() => handleChange('autoExpiry', false)} /> No</label>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Auto Creation</Label>
              <div className="flex gap-4 mt-1">
                <label><input type="radio" checked={formData.autoCreation} onChange={() => handleChange('autoCreation', true)} /> Yes</label>
                <label><input type="radio" checked={!formData.autoCreation} onChange={() => handleChange('autoCreation', false)} /> No</label>
              </div>
            </div>
            <ComboBox label="Created On" placeholder="Select creation date" value={formData.createdOn} onChange={(val) => handleChange('createdOn', val)} options={createdOnOptions} labelKey="name" valueKey="id" />
            <ComboBox label="Expired On" placeholder="Select expiry date" value={formData.expiredOn} onChange={(val) => handleChange('expiredOn', val)} options={expiredOnOptions} labelKey="name" valueKey="id" />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea rows={3} value={formData.description} onChange={(e) => handleChange('description', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
          </div>

          <button onClick={handleClick} className="flex w-full justify-between items-center px-4 py-2 bg-[#F4EEFF] rounded">
            Other details
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 15 15"><path fill="#728392" d="M7.5 12L0 4h15z" /></svg>
          </button>

          {show && (
            <div className="border rounded-b-md p-6 bg-white space-y-6 shadow-md">
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="reference">Reference</Label>
                  <Input id="reference" placeholder="Enter reference" value={formData.reference} onChange={(e) => handleChange('reference', e.target.value)} />
                </div>
                <ComboBox label="Status" placeholder="Select status" value={formData.status} onChange={(val) => handleChange('status', val)} apiUrl="/api/status" labelKey="name" valueKey="id" />
                <ComboBox label="Priority" placeholder="Select priority" value={formData.priority} onChange={(val) => handleChange('priority', val)} apiUrl="/api/priority" labelKey="level" valueKey="id" />
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <Label>Checker Required</Label>
                  <div className="flex gap-4">
                    <label><input type="radio" checked={formData.checkerRequired} onChange={() => handleChange('checkerRequired', true)} /> Yes</label>
                    <label><input type="radio" checked={!formData.checkerRequired} onChange={() => handleChange('checkerRequired', false)} /> No</label>
                  </div>
                </div>
                <ComboBox label="Checker" placeholder="Select checker" value={formData.checker} onChange={(val) => handleChange('checker', val)} apiUrl="/api/checkers" labelKey="name" valueKey="id" />
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-4 mt-8">
            <button onClick={() => setIsOpen(false)} className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50">Cancel</button>
            <button onClick={handleSubmit} className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">Add</button>
          </div>
        </Modal>

        {/* Task List Section */}
        <Card className="bg-white flex flex-col flex-grow rounded-xl shadow-md">
          <CardContent className="p-4 flex flex-col flex-grow">
            <div className="flex justify-between mb-4">
              <div className='flex flex-row items-center space-x-2'>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 48 48"><path fill="none" stroke="#728392" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m5 10l3 3l6-6M5 24l3 3l6-6M5 38l3 3l6-6m7-11h22M21 38h22M21 10h22"/></svg>
              <h2 className="text-lg font-semibold text-[#4A4D51]">Lists</h2>
              </div>
              <Button onClick={() => setIsOpen(true)} className="bg-[#f5f3f9] text-black border hover:bg-[#e6e1ed]">+ Add Task</Button>
            </div>
            <div className="flex-grow overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#f4efff] text-gray-600 text-sm font-medium">
                    <TableHead className="px-4 py-2">Action</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Required by <span className="text-xs">(Days)</span></TableHead>
                    <TableHead>Start on <span className="text-xs">(Days)</span></TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Auto Expiry</TableHead>
                    <TableHead>Auto Creation</TableHead>
                    <TableHead>Created On</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {taskList.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={10} className="text-center text-gray-400 py-8">No Data found</TableCell>
                    </TableRow>
                  ) : (
                    taskList.map((task, index) => (
                      <TableRow key={index} className="text-sm">
                        <TableCell className="flex items-center space-x-2 px-4 py-2">
                          <button title="View"><Eye className="w-4 h-4 text-gray-600 hover:text-purple-600" /></button>
                          <button title="Edit"><Pencil className="w-4 h-4 text-gray-600 hover:text-purple-600" /></button>
                          <button title="Delete"><Trash className="w-4 h-4 text-red-500 hover:text-red-700" /></button>
                        </TableCell>
                        <TableCell>{task.title}</TableCell>
                        <TableCell>{task.assignee}</TableCell>
                        <TableCell>{task.frequency}</TableCell>
                        <TableCell>{task.requiredBy}</TableCell>
                        <TableCell>{task.startOn}</TableCell>
                        <TableCell>{task.project || 'Accounts'}</TableCell>
                        <TableCell><span className={`px-2 py-1 rounded-md text-xs font-semibold ${task.autoExpiry ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{task.autoExpiry ? 'Yes' : 'No'}</span></TableCell>
                        <TableCell><span className={`px-2 py-1 rounded-md text-xs font-semibold ${task.autoCreation ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{task.autoCreation ? 'Yes' : 'No'}</span></TableCell>
                        <TableCell>{task.createdOn || 'On Expiry'}</TableCell>
                      </TableRow>
                    ))
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
