import { useState } from "react"
import { getUserSteamProfile } from "../../../apis/steam/searchUser"


const ReportForm = () => {
 
  const [steamId, setSteamId] = useState<string>('')

  const handleSearch = async (event: any) :Promise<void> => {
    event.preventDefault()

    try {
        const response = await getUserSteamProfile(steamId)
        
        console.log(response)
    } catch (error) {
        console.log(error)
    }

  }

  return (
    <form onSubmit={handleSearch}>

        Enter Steam Id:
        <input
         type="text" value={steamId}
         onChange={e => setSteamId(e.target.value)}
        />

        <input type="submit" value="Search" />
    </form>
  )
}

export default ReportForm