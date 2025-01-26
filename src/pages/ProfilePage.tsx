import { div } from "framer-motion/client"
import { useEffect, useState } from "react"


const ProfilePage = () => {

  const [user, setUser] = useState<any>({})


  useEffect(() => {

    const user:any = localStorage.getItem('user')

    const jsonUser = JSON.parse(user)
    console.log(JSON.parse(user))

    setUser(jsonUser)
  }, [])


  if(Object.keys.length === 0) {
    return (
      <div>No User Yet</div>
    )
  }

  return (
    <div className="page_container" style={{ padding: '10rem'}}>
      

      <h1>Logged In User</h1>

      User Id: {user.id} <br />

      User Name: {user.first_name}

      <br />
      Link 3rd Party: <br />
      <img
        src="/link_steam_button.png"
        alt="link button"
        onClick={() => window.location.href = `${import.meta.env.VITE_BACKEND_SERVER}/link-steam/?user_id=${user.id}`}
      />

    </div>
  )
}

export default ProfilePage