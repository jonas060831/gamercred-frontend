
import { useEffect, useState } from "react"


const ProfilePage = () => {

  const [user, setUser] = useState<any>({})


  useEffect(() => {

    const user:any = localStorage.getItem('user')

    const jsonUser = JSON.parse(user)

    setUser(jsonUser)

    console.log(jsonUser)
  }, [])


  if(user === null) {
    return (
      <div  > No User Yet</div>
    )
  }

  return (
    <div className="page_container" style={{ padding: '10rem'}}>
      

      <h1>Logged In User</h1>

      User Id: {user?.id} <br />

      User Name: {user.account?.first_name} {user.account?.last_name}
      <br /><br />
      {
        user?.steam_id !== null ? (
          <>
            <i className="fa-solid fa-check" style={{ color: 'green' }}></i> Steam Account Linked
            <br />
            Steam Id: {user.steam_id}
          </>
        ) : (
          <>
            Link 3rd Party: <br />
            <img
              src="/link_steam_button.png"
              alt="link button"
              onClick={() => window.location.href = `${import.meta.env.VITE_BACKEND_SERVER}/link-steam/?user_id=${user.id}`}
            />
          
          </>
        )
      }

      

    </div>
  )
}

export default ProfilePage