"use client"

// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import {fetchData, deleteResponseData} from "./ResponseUtils"
import "./responses.css"
export default function Page() {
  // const [formData, setFormData] = useState([
  //   {
  //     requestDate: "",
  //     _id: "",
  //     dynamicData: {
  //       email: ""
  //     }
  //   }

  // ]);
  // const searchParams = useSearchParams();
  // const searchFormId = searchParams.get("id");
  // // const pathname = usePathname();

  // useEffect(() => {
  //   async function getFormResponse(){
  //     setFormData(await fetchData(searchFormId));
  //   }
  //   getFormResponse();
  // }, []);

  return (
    <div className="overflow-x-auto  border rounded-md m-7 text-center">
      <div className="flex overflow-hidden">
        <div className="w-1/6 border-r border-gray-300">
          <header className="p-4 border-b border-gray-300 flex justify-between items-center">
            <h1 className="text-sm font-semibold">Chat Web</h1>
            <div className="relative">
              <button id="menuButton" className="focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path d="M2 10a2 2 0 012-2h12a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2z" />
                </svg>
              </button>
            </div>
          </header>
        
          
          <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
            <div className="flex items-center mb-4 cursor-pointer p-2 rounded-md">
              <div className="w-12 h-12 rounded-full mr-3">
              </div>
              <div className="flex-1">
                <h2 className="text-sm font-semibold">Alice</h2>
              </div>
            </div>
            
            <div className="flex items-center mb-4 cursor-pointer  p-2 rounded-md">
              <div className="w-12 h-12  rounded-full mr-3">
              </div>
              <div className="flex-1">
                <h2 className="text-sm font-semibold">Martin</h2>
              </div>
            </div>
            
            <div className="flex items-center mb-4 cursor-pointer  p-2 rounded-md">
              <div className="w-12 h-12  rounded-full mr-3">
              </div>
              <div className="flex-1">
                <h2 className="text-sm font-semibold">Charlie</h2>
              </div>
            </div>
            
            <div className="flex items-center mb-4 cursor-pointer  p-2 rounded-md">
              <div className="w-12 h-12  rounded-full mr-3">
              </div>
              <div className="flex-1">
                <h2 className="text-sm font-semibold">David</h2>
              </div>
            </div>
            
            <div className="flex items-center mb-4 cursor-pointer  p-2 rounded-md">
              <div className="w-12 h-12  rounded-full mr-3">
              </div>
              <div className="flex-1">
                <h2 className="text-sm font-semibold">Ella</h2>
              </div>
            </div>
            
            <div className="flex items-center mb-4 cursor-pointer  p-2 rounded-md">
              <div className="w-12 h-12  rounded-full mr-3">
              </div>
              <div className="flex-1">
                <h2 className="text-sm font-semibold">Fiona</h2>
              </div>
            </div>
            
            <div className="flex items-center mb-4 cursor-pointer  p-2 rounded-md">
              <div className="w-12 h-12  rounded-full mr-3">
              </div>
              <div className="flex-1">
                <h2 className="text-sm font-semibold">George</h2>
              </div>
            </div>
            
            <div className="flex items-center mb-4 cursor-pointer  p-2 rounded-md">
              <div className="w-12 h-12  rounded-full mr-3">
              </div>
              <div className="flex-1">
                <h2 className="text-sm font-semibold">Hannah</h2>
              </div>
            </div>
            
            <div className="flex items-center mb-4 cursor-pointer  p-2 rounded-md">
              <div className="w-12 h-12  rounded-full mr-3">
              </div>
              <div className="flex-1">
                <h2 className="text-sm font-semibold">Ian</h2>
              </div>
            </div>
            
            <div className="flex items-center mb-4 cursor-pointer  p-2 rounded-md">
              <div className="w-12 h-12  rounded-full mr-3">
              </div>
              <div className="flex-1">
                <h2 className="text-sm font-semibold">Jack</h2>
              </div>
            </div>
            
            
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
            <header className="p-4">
                <h1 className="text-2xl font-semibold">Alice</h1>
            </header>
            <div className="h-screen overflow-y-auto p-4">      
               <div className="flex mb-4 cursor-pointer">
                 <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                   <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-8 h-8 rounded-full" />
                 </div>
                 <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                   <p className="text-gray-700">Hey Bob, how's it going?</p>
                 </div>
               </div>
               <div className="flex mb-4 cursor-pointer">
                 <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                   <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-8 h-8 rounded-full" />
                 </div>
                 <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                   <p className="text-gray-700">I'm intrigued! Maybe I'll borrow it from you when you're done?</p>
                 </div>
               </div>
               <div className="flex justify-end mb-4 cursor-pointer">
                 <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                   <p>Of course! I'll drop it off at your place tomorrow.</p>
                 </div>
                 <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                   <img src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="My Avatar" className="w-8 h-8 rounded-full" />
                 </div>
               </div>
               <div className="flex mb-4 cursor-pointer">
                 <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                   <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-8 h-8 rounded-full" />
                 </div>
                 <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                   <p className="text-gray-700">Thanks, you're the best!</p>
                 </div>
               </div>
               <div className="flex mb-4 cursor-pointer">
                 <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                   <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-8 h-8 rounded-full" />
                 </div>
                 <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                   <p className="text-gray-700">I'm intrigued! Maybe I'll borrow it from you when you're done?</p>
                 </div>
               </div>
               <div className="flex justify-end mb-4 cursor-pointer">
                 <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                   <p>Of course! I'll drop it off at your place tomorrow.</p>
                 </div>
                 <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                   <img src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="My Avatar" className="w-8 h-8 rounded-full" />
                 </div>
               </div>
               <div className="flex mb-4 cursor-pointer">
                 <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                   <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-8 h-8 rounded-full" />
                 </div>
                 <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                   <p className="text-gray-700">Thanks, you're the best!</p>
                 </div>
               </div>
               <div className="flex mb-4 cursor-pointer">
                 <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                   <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-8 h-8 rounded-full" />
                 </div>
                 <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                   <p className="text-gray-700">I'm intrigued! Maybe I'll borrow it from you when you're done?</p>
                 </div>
               </div>
               <div className="flex justify-end mb-4 cursor-pointer">
                 <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                   <p>Of course! I'll drop it off at your place tomorrow.</p>
                 </div>
                 <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                   <img src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="My Avatar" className="w-8 h-8 rounded-full" />
                 </div>
               </div>
               <div className="flex mb-4 cursor-pointer">
                 <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                   <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-8 h-8 rounded-full" />
                 </div>
                 <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                   <p className="text-gray-700">Thanks, you're the best!</p>
                 </div>
               </div>
               <div className="flex mb-4 cursor-pointer">
                 <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                   <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-8 h-8 rounded-full" />
                 </div>
                 <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                   <p className="text-gray-700">I'm intrigued! Maybe I'll borrow it from you when you're done?</p>
                 </div>
               </div>
               <div className="flex justify-end mb-4 cursor-pointer">
                 <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                   <p>Of course! I'll drop it off at your place tomorrow.</p>
                 </div>
                 <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                   <img src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="My Avatar" className="w-8 h-8 rounded-full" />
                 </div>
               </div>
               <div className="flex mb-4 cursor-pointer">
                 <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                   <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-8 h-8 rounded-full" />
                 </div>
                 <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                   <p className="text-gray-700">Thanks, you're the best!</p>
                 </div>
               </div>
               <div className="flex mb-4 cursor-pointer">
                 <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                   <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-8 h-8 rounded-full" />
                 </div>
                 <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                   <p className="text-gray-700">I'm intrigued! Maybe I'll borrow it from you when you're done?</p>
                 </div>
               </div>
               <div className="flex justify-end mb-4 cursor-pointer">
                 <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                   <p>Of course! I'll drop it off at your place tomorrow.</p>
                 </div>
                 <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                   <img src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="My Avatar" className="w-8 h-8 rounded-full" />
                 </div>
               </div>
               <div className="flex mb-4 cursor-pointer">
                 <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                   <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-8 h-8 rounded-full" />
                 </div>
                 <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                   <p className="text-gray-700">Thanks, you're the best!</p>
                 </div>
               </div>
               <div className="flex mb-4 cursor-pointer">
                 <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                   <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-8 h-8 rounded-full" />
                 </div>
                 <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                   <p className="text-gray-700">I'm intrigued! Maybe I'll borrow it from you when you're done?</p>
                 </div>
               </div>
               <div className="flex justify-end mb-4 cursor-pointer">
                 <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                   <p>Of course! I'll drop it off at your place tomorrow.</p>
                 </div>
                 <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                   <img src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="My Avatar" className="w-8 h-8 rounded-full" />
                 </div>
               </div>
               <div className="flex mb-4 cursor-pointer">
                 <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                   <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-8 h-8 rounded-full" />
                 </div>
                 <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                   <p className="text-gray-700">Thanks, you're the best!</p>
                 </div>
               </div>
               <div className="flex justify-end mb-4 cursor-pointer">
                 <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                   <p>Anytime! Let me know how you like it. 😊</p>
                 </div>
                 <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                   <img src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="My Avatar" className="w-8 h-8 rounded-full" />
                 </div>
               </div>
               <div className="flex mb-4 cursor-pointer">
                 <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                   <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-8 h-8 rounded-full" />
                 </div>
                 <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                   <p className="text-gray-700">So, pizza next week, right?</p>
                 </div>
               </div>        
               <div className="flex justify-end mb-4 cursor-pointer">
                 <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                   <p>Absolutely! Can't wait for our pizza date. 🍕</p>
                 </div>
                 <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                   <img src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="My Avatar" className="w-8 h-8 rounded-full" />
                 </div>
               </div>
               <div className="flex mb-4 cursor-pointer">
                 <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                   <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-8 h-8 rounded-full" />
                 </div>
                 <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                   <p className="text-gray-700">Hoorayy!!</p>
                 </div>
               </div>
               
            </div>
            <div className="p-4 overflow-hidden absolute bottom-5 w-2/4">
                <div className="flex items-center">
                    <input type="text" placeholder="Type a message..." className="w-full p-2 rounded-md border focus:outline-none" />
                    <button className="btn rounded-md ml-2">Send</button>
                </div>
            </div>
        </div>
    </div>
      {/* <table className="table table-md table-pin-rows table-pin-cols">
        <thead className="border-2">
          <tr>
            <th>Index</th>
            <td>Date</td>
            <td>Email</td>
            <td>More Details</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody className="border-2">
          {formData.map((data, key) => (
            <tr className="border-2" key={data._id}>
              <th>{key+1}</th>
              <td>{data.requestDate}</td>
              <td>
                <span className="badge badge-md badge-warning">
                  {data.dynamicData.email}
                </span>
              </td>
              <td>
                <a
                  className="btn btn-sm"
                  onClick={() =>
                    console.log("The Clicked Number Is " + data._id)
                  }
                >
                  Details
                </a>
              </td>
              <td>
                <div className="dropdown">
                  <div tabIndex={0} role="button" className="btn btn-sm m-1">
                    Action
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box"
                  >
                    <li>
                      <a href={`mailto:`+ data.dynamicData.email}>Reply</a>
                    </li>
                    <li>
                      <button onClick={async () => setFormData(await deleteResponseData(searchFormId, data._id))}>Delete</button>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
}
