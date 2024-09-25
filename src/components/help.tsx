function Help() {
  return (
    <>
        <div className="w-[20%] bg-red-500 h-screen">
            <div className="text-2xl py-[20px] hover:bg-orange-50">
                <i className="fa-solid fa-terminal px-4 "></i>
                <a href="">Dashboart</a>
            </div>

            <div className="text-2xl py-[20px] hover:bg-orange-50">
                <i className="fa-solid fa-user-tie px-5"></i>
                <a href="">Masters</a>
            </div>

            <div className="text-2xl py-[20px] hover:bg-orange-50" >
                <i className="fa-solid fa-user-group px-4"></i>
                <a href="">Clients</a>
            </div>
        </div>
    </>
  )
}

export default Help