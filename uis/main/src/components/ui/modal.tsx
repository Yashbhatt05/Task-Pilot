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
    <div className="fixed inset-0 flex items-center bg-[#00000066] justify-center z-50  " >
      <div className="bg-white rounded-lg  px-10 h-[90%] overflow-auto w-[75%] shadow-lg relative">
         {/* Header */}
      <div className= "  w-full  flex justify-center items-center p-4 bg-white z-100 sticky top-0 ">
        <h2 className="w-[80%] bg-purple-100 text-gray-700 font-medium text-lg  text-center rounded-full p-2">{title}</h2>
        <button onClick={onClose} className= "absolute right-[-3%] top-2 text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
        <div className="mb-4 px-4">{children}</div>
         
      </div>
    </div>
  );
};
