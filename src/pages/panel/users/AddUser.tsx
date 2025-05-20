import { Link } from 'react-router-dom'

function AddUser() {
  return (
        <div>
              <Link to="/panel/users/add" className="inline-block">
                <button className="flex items-center gap-2 bg-[#0d56a3] text-white px-3 py-2 rounded-[5px] mt-2.5 cursor-pointer">
                  <i
                    className="fa-solid fa-user-plus"
                    title="ثبت کاربر جدید"
                  ></i>
                  کاربر جدید
                </button>
              </Link>
            </div>
  )
}

export default AddUser
