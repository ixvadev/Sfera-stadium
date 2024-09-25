function Header() {
  return (
    <>
        <div className="w-full bg-[#f1f3f5] h-[80px] flex justify-between">
            <div className="text-[20px] px-[240px] m-[20px]">
                <i className="fa-solid fa-bars-staggered"></i>
            </div>
            <div className="flex text-[20px] py-[20px] px-[20px]">
                <p>Admin</p>
                <i className="fa-solid fa-circle-user px-5 mt-[5px]"></i>
                <div>
                    <i className="fa-solid fa-angle-down"></i>
                </div>
            </div>
        </div>
    </>
  )
}

export default Header