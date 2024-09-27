import React, { useEffect, useState } from 'react';
import Header from '../../components/header';
import Help from '../../components/help';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { apiUrl } from '../../helpers/api/url';
import { config } from '../../helpers/api/token';
import { toast } from 'react-toastify';

interface DD{ isOpen: boolean, onClose: () => void, onConfirm: () => void }

const DeleteModal: React.FC<DD> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      <div className="bg-white rounded-lg shadow-lg p-6 z-10">
        <p className="text-lg mb-4">Are you sure you want to delete this item?</p>
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="bg-green-500 text-white px-4 py-2 rounded">
            No
          </button>
          <button onClick={onConfirm} className="bg-red-500 text-white px-4 py-2 rounded">
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const Client: React.FC = () => {
  interface IsUser {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    orderCount: number;
  }

  const [clients, setClients] = useState<IsUser[] | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function delUser(userID: string): void {
    axios.delete(apiUrl + `/api/v1/user/${userID}`, config)
      .then((res: AxiosResponse) => {
        console.log(res);
        setClients(clients?.filter(client => client.id !== userID) || null);
        toast.success("User deleted successfully");
      })
      .catch((err: AxiosError) => {
        console.log(err);
        toast.error(err.message);
      });
  }

  useEffect(() => {
    axios.get(apiUrl + "/api/v1/user/clients/for-admin/list?page=0&size=10", config)
      .then((res: AxiosResponse) => {
        console.log(res);
        if (res.data.data) {
          setClients(res.data.data.object);
        } else {
          toast.error(res.data.error.message);
        }
      }).catch((err: AxiosError) => {
        console.log(err);
        toast.error(err.message);
      });
  }, []);

  const handleDeleteClick = (userId: string) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedUserId) {
      delUser(selectedUserId);
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <Header />
      <div className="flex">
        <Help />
        <div className="w-[80%]">
          <div className="bg-[#f1f3f5] m-[40px]">
            <div className="p-[60px]">
              <div>
                <table className="w-full shadow-md rounded-lg text-center">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-[1px] border-black">First Name</th>
                      <th className="py-2 px-4 border-[1px] border-black">Last Name</th>
                      <th className="py-2 px-4 border-[1px] border-black">Order Count</th>
                      <th className="py-2 px-4 border-[1px] border-black">Phone Number</th>
                      <th className="py-2 px-4 border-[1px] border-black">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients && clients.length > 0 ? clients.map(item => (
                      <tr key={item.id}>
                        <td className="py-2 px-4 border-[1px] border-black">{item.firstName}</td>
                        <td className="py-2 px-4 border-[1px] border-black">{item.lastName}</td>
                        <td className="py-2 px-4 border-[1px] border-black">{item.orderCount}</td>
                        <td className="py-2 px-4 border-[1px] border-black">{item.phoneNumber}</td>
                        <td className="py-2 px-4 border-[1px] border-black">
                          <button onClick={() => handleDeleteClick(item.id)} className="bg-red-500 text-white ml-2 px-4 py-1 rounded hover:bg-red-600">
                            Delete
                          </button>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={5} className="py-2 px-4 border-black">No users found</td>
                      </tr>
                    )}
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

      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default Client;
