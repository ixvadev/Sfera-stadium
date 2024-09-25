import { Link } from 'react-router-dom';
function Help() {
  return (
    <>
        <div className="w-[20%] bg-[#f1f3f5] h-screen">
            <Link to={"/admin"}>
                <div className="text-[20px] py-[15px] hover:bg-[#dcdcdc]">
                    <i className="fa-solid fa-terminal px-4 "></i>
                    <a href="">Dashboart</a>
                </div>
            </Link>

            <Link to={"/master"}>
                <div className="text-[20px] py-[15px] hover:bg-[#dcdcdc]">
                    <i className="fa-solid fa-user-tie px-5"></i>
                    <a href="">Masters</a>
                </div>
            </Link>
            
            <Link to={"/client"}>
                <div className="text-[20px] py-[15px] hover:bg-[#dcdcdc]" >
                    <i className="fa-solid fa-user-group px-4"></i>
                    <a href="">Clients</a>
                </div>
            </Link>
        </div>
    </>
  )
}

export default Help