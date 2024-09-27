import React, { useEffect, useState } from 'react'
import Header from '../../components/header'
import Help from '../../components/help'
import { Link } from 'react-router-dom'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { apiUrl } from '../../helpers/api/url'
import { toast } from 'react-toastify'
import { config } from '../../helpers/api/token'

const NotConfirmed: React.FC = () => {
    interface IsNotconf {
        id: string,
        firstName: string,
        lastName: string,
        phoneNumber: string,
        password: string | null,
        role: string,
        userStatus: string
    }
    function confUser(confuserID: string) {
        console.log(config);

        axios.put(apiUrl + `/api/v1/user/confirmed/master/${confuserID}?USER_STATUS=MASTER_CONFIRMED`, {}, config)
            .then((res: AxiosResponse) => {
                console.log(res);
                toast.success('user sucsess CONFIRMED')
            })
            .catch((err: AxiosError) => {
                console.log(err);
                toast.error(err.message)
            })

    }
    function notConfUser(notConfUserID: string) {
        console.log(notConfUserID);

        axios.put(apiUrl + `/api/v1/user/confirmed/master/${notConfUserID}?USER_STATUS=MASTER_REJECTED`, {}, config)
            .then((res: AxiosResponse) => {
                console.log(res);
                toast.success('user sucsess rejected')
            })
            .catch((err: AxiosError) => {
                console.log(err);
                toast.error(err.message)
            })
    }

    const [notConfiUser, setNotconf] = useState<IsNotconf[] | null>(null)
    useEffect(() => {
        axios.get(apiUrl + "/api/v1/user/not/confirmed/master/list", config)
            .then((res: AxiosResponse) => {
                console.log(res);
                if (res.data.data) {
                    setNotconf(res.data.data.object)
                } else {
                    toast.error(res.data.error.message)
                }
                console.log(res.data.data.object);
            }).catch((err: AxiosError) => {
                console.log(err);
                toast.error(err.message)
            })
    }, [])
    return (
        <div>
            <Link to={"/master/notConfirmed"}>
                <Header />
                <div className='flex'>
                    <Help />
                    <div className='w-[80%]'>
                        <div className='flex px-2 m-4'>
                            <Link className='text-[20px] px-4 hover:bg-[#dcdcdc] rounded-xl' to={"/master"}>Confirmed</Link>
                            <Link className='text-[20px] px-4 hover:bg-[#dcdcdc] rounded-xl' to={"/master/notConfirmed"}>Not Confirmed</Link>
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
                                                <th className="py-2 px-4 border-[1px]  border-black">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {notConfiUser && notConfiUser.length > 0 ? null :
                                                <p className='py-2 px-4 border-black '>not confirmed user emty...</p>
                                            }
                                            {
                                                notConfiUser && notConfiUser.length > 0 && notConfiUser.map((item) => (
                                                    <tr className="">
                                                        <td className="py-2 px-4 border-[1px] border-black">{item.firstName}</td>
                                                        <td className="py-2 px-4 border-[1px] border-black">{item.lastName}</td>
                                                        <td className="py-2 px-4 border-[1px] border-black">{item.phoneNumber}</td>
                                                        <td className="py-2 px-4 border-[1px] border-black">
                                                            <button onClick={() => confUser(item.id)} className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600">Confirm</button>
                                                            <button onClick={() => notConfUser(item.id)} className="bg-red-500 text-white ml-2 px-4 py-1 rounded hover:bg-red-600">Reject</button>
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
            </Link>
        </div>
    )
}

export default NotConfirmed