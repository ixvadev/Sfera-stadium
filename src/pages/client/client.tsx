import React from 'react'
import Header from '../../components/header'
import Help from '../../components/help'

const Client: React.FC = () => {
  return (
    <>
      <Header/>
      <div className='flex'>
        <Help/> 
        <div className='w-[80%]'>
            <div className="bg-[#f1f3f5] m-[40px]">
                <div className="p-[60px]">
                    <div>
                        <table className="w-full shadow-md rounded-lg">
                            <thead>
                                <tr className=''>
                                    <th className="py-2 px-4 border-[1px] border-black">First Name</th>
                                    <th className="py-2 px-4 border-[1px] border-black">Last Name</th>
                                    <th className="py-2 px-4 border-[1px] border-black">Order Cound</th>
                                    <th className="py-2 px-4 border-[1px] border-black">Phone Number</th>
                                    <th className="py-2 px-4 border-[1px]  border-black">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="">
                                    <td className="py-2 px-4 border-[1px] border-black">Maste268</td>
                                    <td className="py-2 px-4 border-[1px] border-black">mister268</td>
                                    <td className="py-2 px-4 border-[1px] border-black">5</td>
                                    <td className="py-2 px-4 border-[1px] border-black">+998908904815</td>
                                    <td className="py-2 px-4 border-[1px] border-black">
                                        <button className="bg-red-500 text-white ml-2 px-4 py-1 rounded hover:bg-red-600">Delet</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">Previous</button>
                        <span>1/19</span>
                        <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">Next</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Client