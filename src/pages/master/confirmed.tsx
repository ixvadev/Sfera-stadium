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
        password: string | null,
        role: string,
        userStatus: string
    }

    const [confUser, setConfUser] = useState<IsConfUser[] | null>(null)
    const [isInfoModalVisible, setIsInfoModalVisible] = useState<boolean>(false)
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false)
    const [currentUser, setCurrentUser] = useState<IsConfUser | null>(null)
    const [userToDelete, setUserToDelete] = useState<string | null>(null)

    useEffect(() => {
        axios.get(apiUrl + "/api/v1/user/masters/list", config)
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

    function isdelete(userID: string) {
        axios.delete(apiUrl + '/api/v1/user/' + userID, config)
        .then((res:AxiosResponse)=> {
            console.log(res);
            toast.success('User deleted successfully');
            setConfUser(prev => prev ? prev.filter(user => user.id !== userID) : null);
        })
        .catch((err: AxiosError)=> {
            console.log(err);
            toast.error('Failed to delete user');
        })
        .finally(() => setIsDeleteModalVisible(false)) 
    }

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
                                            <th className="py-2 px-4 border-[1px]  border-black">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {confUser && confUser.length > 0 ? null :
                                            <p className='py-2 px-4 border-black '>confirmed users empty...</p>
                                        }
                                        {
                                            confUser && confUser.length > 0 && confUser.map((item) => (
                                                <tr key={item.id} className="">
                                                    <td className="py-2 px-4 border-[1px] border-black">{item.firstName}</td>
                                                    <td className="py-2 px-4 border-[1px] border-black">{item.lastName}</td>
                                                    <td className="py-2 px-4 border-[1px] border-black">{item.phoneNumber}</td>
                                                    <td className="py-2 px-4 border-[1px] border-black">
                                                        <button onClick={() => { setCurrentUser(item); setIsInfoModalVisible(true) }} className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600">Info</button>
                                                        <button onClick={() => { setUserToDelete(item.id); setIsDeleteModalVisible(true) }} className="bg-red-500 text-white ml-2 px-4 py-1 rounded hover:bg-red-600">Delete</button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">Previous</button>
                                <span>1/1</span>
                                <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Info Modal */}
            {isInfoModalVisible && currentUser && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">User Info</h2>
                        <p><strong>First Name:</strong> {currentUser.firstName}</p>
                        <p><strong>Last Name:</strong> {currentUser.lastName}</p>
                        <p><strong>Phone Number:</strong> {currentUser.phoneNumber}</p>
                        <p><strong>Role:</strong> {currentUser.role}</p>
                        <p><strong>Status:</strong> {currentUser.userStatus}</p>
                        <div className="mt-4">
                            <button onClick={() => setIsInfoModalVisible(false)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Close</button>
                        </div>
                    </div>
                </div>
            )}

            {isDeleteModalVisible && userToDelete && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Confirm Delete</h2>
                        <p>Are you sure you want to delete this user?</p>
                        <div className="mt-4 flex justify-end">
                            <button onClick={() => setIsDeleteModalVisible(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2">Cancel</button>
                            <button onClick={() => isdelete(userToDelete)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Master
