import { useEffect, useState } from "react"
// import ReportForm from "../ui/forms/report-form/ReportForm"
import MastHead from "../ui/masthead/MastHead"
import PlayerLookUpForm from "../ui/forms/report-form/PlayerLookUpForm"
import { getUserSteamId, getUserSteamProfile } from "../apis/steam/searchUser"

const ReportFormPage = () => {

  const [playerToReport, setplayerToReport] = useState({})
  const [vanityOrSteamId, setVanityOrSteamId] = useState<any>('')


  //this will get trigger once search button is clicked
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
                    setplayerToReport({ personaname: '42' })
                    
                }
                
                if(Object.keys(playerSteamId).length !== 0) {
                    const player = await getUserSteamProfile(playerSteamId)
        
                    const { success, response: playerInfo  } = player
            
                    if(!success) {
                        alert('No Details found')
                        throw new Error("No Details Found")
                        
                    }

                    if(playerInfo === undefined) {
                        
                        console.log('no player found')
                        setplayerToReport({ personaname: '42' })
                    }
                    //account created successfully
                    setplayerToReport(playerInfo)
                } else {
                    setplayerToReport({personaname: '42'})
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

                setplayerToReport(playerInfo)

            } catch (error) {
                console.log(error)
                console.log('no result found')
            }
        }
    }
  }


  
  return (
    <div className="page_container">
        
        <MastHead header="Player Lookup" description="" height="auto">
            <PlayerLookUpForm
             playerToReport={playerToReport}
             handleSearch={handleSearch}
             vanityOrSteamId={vanityOrSteamId}
             setVanityOrSteamId={setVanityOrSteamId}
            />
        </MastHead>
    </div>
  )

  // if(Object.keys(playerToReport).length === 0) return (
    
  //   <div className="page_container">
        
  //       <MastHead header="Player Lookup" description="" height="auto">
  //           <PlayerLookUpForm
  //            playerToReport={playerToReport}
  //            handleSearch={handleSearch}
  //            vanityOrSteamId={vanityOrSteamId}
  //            setVanityOrSteamId={setVanityOrSteamId}
  //           />
  //       </MastHead>
  //   </div>
  // )

  // return (
  //   <div className="page_container">
        
  //       <MastHead header="Report Player" description="" height="auto">
  //         <ReportForm />
  //       </MastHead>
  //   </div>
  // )
}

export default ReportFormPage