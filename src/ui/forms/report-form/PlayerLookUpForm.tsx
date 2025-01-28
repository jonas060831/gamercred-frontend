import {FC } from 'react'

export type Player = {
    realname?: string
    profileurl?: string
    avatar?: string
    personaname?: string
    steamid?: string
    

}
import UserResult from './UserResult'
import TextInputWithSearch from '../../inputs/TextInputWithSearchProps'

type PlayerLookUpFormProps = {
    playerToReport: any
    handleSearch: (input: any) => any
    vanityOrSteamId : string
    setVanityOrSteamId: (input:any) => any
    recentSteamGames: any[]
    setIsOnReportForm: (isOnReport: boolean) => void
    reports: any
}

const PlayerLookUpForm:FC<PlayerLookUpFormProps> = ({ recentSteamGames, playerToReport, handleSearch, vanityOrSteamId, setVanityOrSteamId, setIsOnReportForm, reports }) => {


    
    const handleSubmit = async (event:any) => {

        event.preventDefault()
        handleSearch(event)
    }

  return (
    <form name='playerlookup' onSubmit={handleSubmit} style={{ width: '600px' }}>


        <TextInputWithSearch
         value={vanityOrSteamId}
         onChange={e => setVanityOrSteamId(e.target.value)}
         placeholder='Enter vanity name or steam id'
        />
        
        <div style={{ height: '10vh' }}>
            {
                Object.keys(playerToReport)?.length === 0 ? (
                    <></>
                ) : (
                    <>
                    
                    {  
                    playerToReport.personaname === '42' ? (
                            
                            <> No Result Found</>
                        ) :
                        ( <UserResult 
                            playerResult={playerToReport}
                            recentSteamGames={recentSteamGames}
                            setIsOnReportForm={setIsOnReportForm}
                            reports={reports}
                            /> )
                    }
                    </>
                )
            }
        </div>

    </form>
  )
}

export default PlayerLookUpForm