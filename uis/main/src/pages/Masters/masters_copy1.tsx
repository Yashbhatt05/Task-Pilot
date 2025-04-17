import React , {useState} from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Bell } from 'lucide-react';
import { Plus } from "lucide-react";
import PaginationFooter from '@/components/ui/pagefooter';
import Modal from '@/components/ui/modal';
import UniversalDropdown from '@/components/ui/dropdown';

export default function Master() {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(20);
    const [isOpen,setIsOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<string | number>("");
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const totalRecords = 8;
    const totalPages = Math.ceil(totalRecords / perPage);
  return (
    <section className='h-full w-full '>
        <div className=" h-full w-full bg-[#efeaf4] p-4  ">
        <div className="flex justify-between items-center mb-8 ">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <div className="flex gap-3 items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#8466D8" d="M10 21h4c0 1.1-.9 2-2 2s-2-.9-2-2m11-2v1H3v-1l2-2v-6c0-3.1 2-5.8 5-6.7V4c0-1.1.9-2 2-2s2 .9 2 2v.3c3 .9 5 3.6 5 6.7v6zm-4-8c0-2.8-2.2-5-5-5s-5 2.2-5 5v7h10z"/></svg>
          <div className='rounded-full border-[#8466D8] border-2  object-cover overflow-hidden h-50px w-50px ' ><img src="https://i.ibb.co/WrcZ2RX/image-17.png" alt="" /></div>
        
        </div>
      </div>

      {/* Modal */}
      <Modal

        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Seshaasai Task"
      >
        <div className="p-4 grid grid-cols-3 gap-6">
      <div>
        <UniversalDropdown label="Project" placeholder="Select"  apiUrl="https://jsonplaceholder.typicode.com/users" value="selected" onChange={() => {}} />
      </div>
      
      <div>
        <UniversalDropdown label="Assigne" placeholder="Select"  apiUrl="https://jsonplaceholder.typicode.com/users" value="selected" onChange={() => {}} />
      </div>
      
      <div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Title</label>
          <input
            type="text"
            placeholder="Write task title here"
            className="border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </div>

      <div>
        <UniversalDropdown label="Frequency" placeholder="Select"  apiUrl="https://jsonplaceholder.typicode.com/users" value="selected" onChange={() => {}} />
      </div>
      <div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">
            Required by <span className="text-xs text-gray-400">(dependent on frequency)</span>
          </label>
          <input
            type="number"
            value={0}
            className="border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">
            Start on <span className="text-xs text-gray-400">(Provide in Days)</span>
          </label>
          <input
            type="number"
            value={0}
            className="border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label className="text-sm text-gray-600">Action Start</label>
        <div className="flex gap-4 mt-1">
          <label className="flex items-center gap-1">
            <input type="checkbox" className="accent-black" /> Before
          </label>
          <label className="flex items-center gap-1">
            <input type="checkbox" className="accent-black" /> After
          </label>
        </div>
      </div>

      <div>
        <label className="text-sm text-gray-600">Auto Expiry</label>
        <div className="flex gap-4 mt-1">
          <label className="flex items-center gap-1">
            <input type="checkbox" className="accent-black" /> Yes
          </label>
          <label className="flex items-center gap-1">
            <input type="checkbox" defaultChecked className="accent-purple-600" /> No
          </label>
        </div>
      </div>

      <div>
        <label className="text-sm text-gray-600">Auto Creation</label>
        <div className="flex gap-4 mt-1">
          <label className="flex items-center gap-1">
            <input type="checkbox" className="accent-black" /> Yes
          </label>
          <label className="flex items-center gap-1">
            <input type="checkbox" defaultChecked className="accent-purple-600" /> No
          </label>
        </div>
      </div>

      <div>
        <label className="text-sm text-gray-600">Created On</label>
        <input
          type="date"
          disabled
          className="border border-gray-300 rounded px-3 py-2 bg-gray-100 text-gray-500"
        />
      </div>

      <div className="col-span-2">
        <label className="text-sm text-gray-600">Expired On</label>
        <input
          type="date"
          disabled
          className="border border-gray-300 rounded px-3 py-2 bg-gray-100 text-gray-500"
        />
      </div>

      <div className="col-span-3">
        <label className="text-sm text-gray-600">Description</label>
        <textarea
          placeholder="What is this task about ?"
          className="border border-gray-300 rounded px-3 py-2 w-full"
        ></textarea>
      </div>

      <div className="col-span-3 mt-4">
        <button className="w-full text-left text-sm text-black font-medium bg-[#F4EEFF] px-4 py-2 rounded">
          Other details
        </button>
      </div>
    </div>
      </Modal>

      <Card className=" bg-white h-[85%] rounded-xl shadow-md">
        <CardContent className="p-4 h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Lists</h3>
            <Button onClick={()=>setIsOpen(true)}  className="bg-[#f5f3f9] text-black border border-gray-300 hover:bg-[#e6e1ed]">+ Add Task</Button>
            
          </div>
          
          <Table>
            <TableHeader>
              <TableRow className="bg-[#efeaf4] text-sm text-gray-700">
                <TableHead>Action</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Required by (Days)</TableHead>
                <TableHead>Start On (Days)</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Auto Expiry</TableHead>
                <TableHead>Auto Creation</TableHead>
                <TableHead>Created On</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={10} className="text-center justify-center  text-gray-400  py-8">
                  No Data found
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <PaginationFooter
          
            page={page}
            totalPages={totalPages}
            perPage={perPage}
            totalRecords={totalRecords}
            onPageChange={(p) => setPage(p)}
            onPerPageChange={(pp) => setPerPage(pp)}
          />
        </CardContent>
      </Card>
    </div>
    </section>
  )
}
