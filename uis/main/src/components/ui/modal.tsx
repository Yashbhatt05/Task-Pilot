import React from 'react'
interface ModalProps{
    isOpen: boolean;
    onClose : () => void ;
    title :string ; 
    children : React.ReactNode;
}
export default function Modal ({isOpen,onClose,title,children}){
if(!isOpen) return null ;
return  (
    <div className="fixed inset-0 flex items-center bg-[#00000066] justify-center z-50 ">
      <div className="bg-white rounded-lg p-4 px-20 w-[75%]   shadow-lg relative">
         {/* Header */}
      <div className= "  px-6 rounded-t-lg flex justify-center items-center ">
        <h2 className="w-[80%] bg-purple-100 text-gray-700 font-medium text-lg  text-center rounded-full p-2">{title}</h2>
        <button onClick={onClose} className= "absolute right-1 top-1 text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
        <div className="mb-4">{children}</div>
         {/* Action Buttons */}
         <div className="flex justify-end space-x-4 mb-6">
          <button onClick={onClose} className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Cancel
          </button>
          <button className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
