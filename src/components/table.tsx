import React from 'react'

const Table: React.FC = () => {
    return (
        <div>
            <table className="w-full shadow-md rounded-lg text-center">
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
    )
}

export default Table