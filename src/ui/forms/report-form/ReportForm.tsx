import { useState } from "react"
import { getUserSteamId, getUserSteamProfile } from "../../../apis/steam/searchUser"


type Player = {
    realname?: string
    profileurl?: string
    avatar?: string
    personaname?: string

}

const ReportForm = () => {
 
  const [player, setPlayer] = useState<Player>({})
  const [vanityOrSteamId, setVanityOrSteamId] = useState<any>('')

  const handleSearch = async (event: any) :Promise<void> => {
    event.preventDefault()

    if(vanityOrSteamId === '') {
        alert('input cannot be empty')
    } else {
        //if the input is string
        if(isNaN(vanityOrSteamId)) {
            try {
                const response = await getUserSteamId(vanityOrSteamId)
        
                const { success: successOnVanity, response: playerSteamId  } = response
        
                
                if(!successOnVanity) {
                    console.log('no matching result found')
                    setPlayer({})
                    
                }
        
                const player = await getUserSteamProfile(playerSteamId)
        
                const { success, response: playerInfo  } = player
        
                if(!success) {
                    alert('No Details found')
                    throw new Error("No Details Found")
                    
                }
        
                setPlayer(playerInfo)
                
                if(playerInfo === undefined) {
                    setPlayer({})
                    console.log('no player found')
                }
        
            } catch (error) {
                console.log(error)
            }
            

        } else { //this will true if you provided the steam id granted it is all numbers

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
                console.log('no result found')
            }
        }
    }
  }

  return (
    <>
    <form onSubmit={handleSearch}>

    Enter Player Vanity Name or Steam Id: <br />
    <input
     type="text"
     name=""
     value={vanityOrSteamId}
     onChange={e => setVanityOrSteamId(e.target.value)}
    />

    <input type="submit" value="Search" />
    </form>
     
    <h5>result:</h5>
    {   
        Object.keys(player).length !== 0 ? (
            <>
            <img src={player?.avatar} alt=""/>
            {
                player?.personaname
            }
            </>
        ) : (
            <>No Result Found</>
        )
    }
    </>
    
  )
}

export default ReportForm