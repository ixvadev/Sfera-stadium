import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useRef, useState } from "react";
import { apiUrl } from "../../helpers/api/url";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login: React.FC = () => {
  const isRole = useNavigate();
  const userName = useRef<HTMLInputElement>(null);
  const parol = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState<boolean>(false); // Loading state

  interface User {
    phone: string;
    password: string;
  }

  function getLogin(): void {
    let user: User = {
      phone: userName.current?.value || "",
      password: parol.current?.value || "",
    };

    if (userName.current?.value && parol.current?.value) {
      setLoading(true); // Loaderni ishga tushiramiz
      axios
        .post(apiUrl + "/api/v1/auth/login", user)
        .then((res: AxiosResponse) => {
          if (res.data.data) {
            if (res.data.data.role === "ROLE_SUPER_ADMIN") {
              isRole("/admin");
            } else if (res.data.data.role === "ROLE_MASTER") {
              isRole("/master");
            }
            localStorage.setItem("token", res.data.data.token);
          } else {
            toast.error(res.data.error.message);
          }
        })
        .catch((err: AxiosError) => {
          toast.error(err.message);
        })
        .finally(() => {
          setLoading(false); // Loaderni to'xtatamiz
        });
    } else {
      toast.warning("joylarni tuldiring");
    }
  }

  return (
    <div>
      <div
        id="authentication-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="flex mx-auto bg-[#f1f3f5]  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative p-4 bg-[#ffffff] rounded-lg shadow">
            <div className="items-center justify-between px-4 pt-[20px] rounded-t dark:border-gray-600">
              <h3 className="text-xl font-bold text-gray-900">Sign in</h3>
              <p className="text-sm font-medium py-2 text-gray-900">
                Login to website if you can because we don't have a login flow
                yet
              </p>
            </div>

            <div className="p-4 -md:p-5 pb-[20px]">
              <div>
                <label className="block mb-2 text-sm font-bold text-gray-900">
                  Username
                </label>
                <input
                  ref={userName}
                  type="email"
                  name="email"
                  id="email"
                  className=" bg-[#f1f3f5] border border-gray-300 text-gray-900 text-sm font-bold rounded-lg focus:ring-black-500 focus:border-black-500 block w-full p-2.5 dark:bg-[f1f3f5] dark:border-gray-500 dark:placeholder-gray-900 dark:text-[#000000]"
                  placeholder="Username"
                  required
                />
              </div>
              <div>
                <label className="mt-5 block mb-2 text-sm font-bold text-gray-900">
                  Password
                </label>
                <input
                  ref={parol}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-[#f1f3f5] border border-gray-300 text-gray-900 text-sm font-bold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[f1f3f5] dark:border-gray-500 dark:placeholder-gray-900 dark:text-[#000000]"
                  required
                />
              </div>
              <div className="flex justify-between"></div>

              <button
                onClick={getLogin}
                type="submit"
                className="mt-5 w-full flex justify-center items-center text-white bg-[#000000] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-[#444545]"
                disabled={loading} // Loading davomida tugmani disable qilamiz
              >
                {loading ? (
                  <div className="loader mr-2"></div> // Loader tugmaning o'rtasida matndan oldin ko'rinadi
                ) : null}
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
