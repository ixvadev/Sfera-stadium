import React, { useEffect, useState } from 'react'
import Header from '../../components/header'
import Help from '../../components/help'
import { Link } from 'react-router-dom'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { apiUrl } from '../../helpers/api/url'
import { config } from '../../helpers/api/token'
import { toast } from 'react-toastify'

const Master: React.FC = () => {
    interface IsConfUser {
        id: string,
        firstName: string,
        lastName: string,
        phoneNumber: string,
        orderCount: number
    }
    const [confUser, setConfUser] = useState<IsConfUser[] | null>(null)

    useEffect(() => {
        axios.get(apiUrl + "/api/v1/user/rejected/list", config)
            .then((res: AxiosResponse) => {
                console.log(res);
                if (res.data.data) {
                    setConfUser(res.data.data.object)
                } else {
                    toast.error(res.data.error.message)
                }
            }).catch((err: AxiosError) => {
                console.log(err);
                toast.error(err.message)
            })
    }, [])
    return (
        <div>
            <Header />
            <div className='flex'>
                <Help />
                <div className='w-[80%]'>
                    <div className='flex px-2 m-4'>
                        <Link className='text-[20px] px-4 hover:bg-[#dcdcdc] rounded-xl' to={"/master/confirmed"}>Confirmed</Link>
                        <Link className='text-[20px] px-4 hover:bg-[#dcdcdc]  rounded-[5px]' to={"/master/notConfirmed"}>Not Confirmed</Link>
                    </div>
                    <div className="bg-[#f1f3f5] m-[30px]">
                        <div className="p-[60px]">
                            <div>
                                <table className="w-full shadow-md rounded-lg text-center">
                                    <thead>
                                        <tr className=''>
                                            <th className="py-2 px-4 border-[1px] border-black">First Name</th>
                                            <th className="py-2 px-4 border-[1px] border-black">Last Name</th>
                                            <th className="py-2 px-4 border-[1px] border-black">Phone Number</th>
                                            <th className="py-2 px-4 border-[1px] border-black">Order Cound</th>
                                            <th className="py-2 px-4 border-[1px]  border-black">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {confUser && confUser.length > 0 ? null :
                                            <p className='py-2 px-4 border-black '>confirmed users emty...</p>
                                        }
                                        {
                                            confUser && confUser.length > 0 && confUser.map((item) => (
                                                <tr className="">
                                                    <td className="py-2 px-4 border-[1px] border-black">{item.firstName}</td>
                                                    <td className="py-2 px-4 border-[1px] border-black">{item.lastName}</td>
                                                    <td className="py-2 px-4 border-[1px] border-black">{item.phoneNumber}</td>
                                                    <td className="py-2 px-4 border-[1px] border-black">{item.orderCount}</td>
                                                    <td className="py-2 px-4 border-[1px] border-black">
                                                        <button className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600">Info</button>
                                                        <button className="bg-red-500 text-white ml-2 px-4 py-1 rounded hover:bg-red-600">Delet</button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
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
        </div>
    )
}

export default Master