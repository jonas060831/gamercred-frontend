import { useState } from "react"
// import ReportForm from "../ui/forms/report-form/ReportForm"
import MastHead from "../ui/masthead/MastHead"
import PlayerLookUpForm from "../ui/forms/report-form/PlayerLookUpForm"
import { fetchRecentGames, getUserSteamId, getUserSteamProfile } from "../apis/steam/searchUser"
import ReportForm from "../ui/forms/report-form/ReportForm"
import { fetchReports } from "../services/reportServices"

const ReportFormPage = () => {

  const [playerToReport, setplayerToReport] = useState({})
  const [isOnReportForm, setIsOnReportForm] = useState<boolean>(false)
  const [recentSteamGames, setRecentSteamGames] = useState([])
  const [vanityOrSteamId, setVanityOrSteamId] = useState<any>('')
  const [reports, setReport] = useState([])


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

                    //player found successfully
                    setplayerToReport(playerInfo)

                    const recentgames:any = await fetchRecentGames(playerSteamId)
                    //forks to handle user not having any game and user having games
                    if(!recentgames.data) console.log('No games yet')
                    else setRecentSteamGames(recentgames.data)
                    
                    //getting the reports for this player
                    const recentReports: any = await fetchReports(playerSteamId)

                    console.log(recentReports)


                    if(recentReports.success) setReport(recentReports.data.reports)
                    else setReport([])


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

                const recentgames:any = await fetchRecentGames(vanityOrSteamId)     
                //forks to handle user not having any game and user having games
                if(!recentgames.data) console.log('No games yet')
                else setRecentSteamGames(recentgames.data)

                //getting the reports for this player
                const recentReports: any = await fetchReports(vanityOrSteamId)
                
                if(recentReports.success) setReport(recentReports.data.reports)
                else setReport([])

                console.log(recentReports)

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
         setIsOnReportForm={setIsOnReportForm}
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
             reports={reports}
            />
        </MastHead>
    </div>
  )
}

export default ReportFormPage