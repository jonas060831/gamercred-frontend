import { useState } from "react"
import { getUserSteamId, getUserSteamProfile } from "../../../apis/steam/searchUser"


type Player = {
    realname?: string
    profileurl?: string
    avatar?: string
    personaname?: string

}

const ReportForm = () => {
 
  const [steamId, setSteamId] = useState<string>('')
  const [vanityName, setVanityName] = useState<string>('')
  const [player, setPlayer] = useState<Player>({})
  const [vanityOrSteamId, setVanityOrSteamId] = useState<string>('')

  const handleSearch = async (event: any) :Promise<void> => {
    event.preventDefault()

    if(parseInt(vanityOrSteamId)) {//this will true if you provided the steam id granted it is all numbers
        
        try {
            const player = await getUserSteamProfile(vanityOrSteamId)

            const { success, response: playerInfo  } = player

            if(!success) {
                alert('No Details found')
                throw new Error("No Details Found")
            }

            setPlayer(playerInfo)

        } catch (error) {
            console.log(error)
        }

    } else {
        try {
            const response = await getUserSteamId(vanityOrSteamId)
    
            const { success: successOnVanity, response: playerSteamId  } = response
    
    
            if(!successOnVanity) {
                alert('cannot find player')
                throw new Error('Cannot Find Player')
    
            }
    
            const player = await getUserSteamProfile(playerSteamId)
    
            const { success, response: playerInfo  } = player
    
            if(!success) {
                alert('No Details found')
                throw new Error("No Details Found")
                
            }
    
            setPlayer(playerInfo)
    
        } catch (error) {
            console.log(error)
        }
    }

  }

  return (
    <>
    <form onSubmit={handleSearch}>

    {/* Enter Steam Id:
    <input
    type="text"
    value={steamId}
    onChange={e => setSteamId(e.target.value)}
    /> */}

    Enter Player Vanity Name or Steam Id: <br />
    <input
     type="text"
     name=""
     value={vanityOrSteamId}
     onChange={e => setVanityOrSteamId(e.target.value)}
    />

    <input type="submit" value="Search" />
    </form>

    <img src={player.avatar} alt=""/>
    {
        player.personaname
    }
    </>
    
  )
}

export default ReportForm