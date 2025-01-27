import { useState } from "react"
// import ReportForm from "../ui/forms/report-form/ReportForm"
import MastHead from "../ui/masthead/MastHead"
import PlayerLookUpForm from "../ui/forms/report-form/PlayerLookUpForm"
import { fetchRecentGames, getUserSteamId, getUserSteamProfile } from "../apis/steam/searchUser"
import { div } from "framer-motion/m"
import ReportForm from "../ui/forms/report-form/ReportForm"

const ReportFormPage = () => {

  const [playerToReport, setplayerToReport] = useState({})
  const [isOnReportForm, setIsOnReportForm] = useState<boolean>(false)
  const [recentSteamGames, setRecentSteamGames] = useState([])
  const [vanityOrSteamId, setVanityOrSteamId] = useState<any>('')


  //this will get trigger once search button is clicked
  const handleSearch = async (event: any) :Promise<void> => {
    event.stopPropagation()
    
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

                    const recentgames:any = await fetchRecentGames(playerSteamId!)
                     
                     
                    //forks to handle user not having any game and user having games
                    if(!recentgames.data) console.log('No games yet')
                 
                    else {
                     //definetly have games
                     console.log(recentgames.data)

                     setRecentSteamGames(recentgames.data)
                 
                    }

                    //player found successfully
                    setplayerToReport(playerInfo)
                    console.log(playerInfo);
                    


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

                const recentgames:any = await fetchRecentGames(vanityOrSteamId)
                     
                     
                //forks to handle user not having any game and user having games
                if(!recentgames.data) console.log('No games yet')
             
                else {
                 //definetly have games
                 console.log(recentgames.data)
                 setRecentSteamGames(recentgames.data)
             
                }

                setplayerToReport(playerInfo)

            } catch (error) {
                console.log(error)
                console.log('no result found')
            }
        }
    }
  }


  
  if(isOnReportForm) {
    return (
     <MastHead header="Report Player" description="" height="auto">
        <ReportForm
         playerToReport={playerToReport}
        />
     </MastHead>
    )
  }

  return (
    <div className="page_container">
        
        <MastHead header="Player Lookup" description="" height="auto">
            <PlayerLookUpForm
             playerToReport={playerToReport}
             handleSearch={handleSearch}
             vanityOrSteamId={vanityOrSteamId}
             setVanityOrSteamId={setVanityOrSteamId}
             recentSteamGames={recentSteamGames}
             setIsOnReportForm={setIsOnReportForm}
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