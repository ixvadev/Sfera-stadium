import React, { useEffect, useState } from 'react'
import Header from '../../components/header'
import Help from '../../components/help'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { apiUrl } from '../../helpers/api/url'
import { config } from '../../helpers/api/token'
import { toast } from 'react-toastify'

const Client: React.FC = () => {
  interface IsUser {
    id: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    orderCount: number
  }

  function delUser(userID: string): void {
    axios.delete(apiUrl + `/api/v1/user/${userID}`, config)
      .then((res: AxiosResponse) => {
        console.log(res);
      })
      .catch((err: AxiosError) => {
        console.log(err);
        toast.error(err.message)
      })
  }

  const [clients, setclients] = useState<IsUser[] | null>(null)

  useEffect(() => {
    axios.get(apiUrl + "/api/v1/user/clients/for-admin/list?page=0&size=10", config)
      .then((res: AxiosResponse) => {
        console.log(res);
        if (res.data.data) {
          setclients(res.data.data.object)
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
    <>
      <Header />
      <div className='flex'>
        <Help />
        <div className='w-[80%]'>
          <div className="bg-[#f1f3f5] m-[40px]">
            <div className="p-[60px]">
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
                    {clients && clients.length > 0 ? null :
                      <p className="py-2 px-4 border-black">users is emty</p>
                    }
                    {clients && clients.length && clients.map(item => (
                      <tr className="">
                        <td className="py-2 px-4 border-[1px] border-black">{item.firstName}</td>
                        <td className="py-2 px-4 border-[1px] border-black">{item.lastName}</td>
                        <td className="py-2 px-4 border-[1px] border-black">{item.orderCount}</td>
                        <td className="py-2 px-4 border-[1px] border-black">{item.phoneNumber}</td>
                        <td className="py-2 px-4 border-[1px] border-black">
                          <button onClick={() => delUser(item.id)} className="bg-red-500 text-white ml-2 px-4 py-1 rounded hover:bg-red-600">Delet</button>
                        </td>
                      </tr>
                    ))}
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