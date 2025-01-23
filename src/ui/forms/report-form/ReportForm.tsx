import { useState } from "react"
import { getUserSteamProfile } from "../../../apis/steam/searchUser"


type Player = {
    realname?: string
    profileurl?: string
    avatar?: string
}

const ReportForm = () => {
 
  const [steamId, setSteamId] = useState<string>('')
  const [player, setPlayer] = useState<Player>({})

  const handleSearch = async (event: any) :Promise<void> => {
    event.preventDefault()

    try {
        const response = await getUserSteamProfile(steamId)
        
        const { success, response: playerInfo  } = response

        if (!success) {
            alert('Error Fetching Player Info')
        }

        setPlayer(playerInfo)

    } catch (error) {
        console.log(error)
    }
  }

  return (
    <>
    <form onSubmit={handleSearch}>

    Enter Steam Id:
    <input
    type="text"
    value={steamId}
    onChange={e => setSteamId(e.target.value)}
    />

    <input type="submit" value="Search" />
    </form>

    <img src={player.avatar} alt=""/>
    {
        player.realname
    }
    </>
    
  )
}

export default ReportForm