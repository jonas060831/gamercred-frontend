import {FC } from 'react'

export type Player = {
    realname?: string
    profileurl?: string
    avatar?: string
    personaname?: string
    steamid?: string

}

import styles from './PlayerLookUpForm.module.css'
import UserResult from './UserResult'

type PlayerLookUpFormProps = {
    playerToReport: any
    handleSearch: (input: any) => any
    vanityOrSteamId : string
    setVanityOrSteamId: (input:any) => any
    recentSteamGames: any[]
}

const PlayerLookUpForm:FC<PlayerLookUpFormProps> = ({ recentSteamGames, playerToReport, handleSearch, vanityOrSteamId, setVanityOrSteamId }) => {


    
    // const handleSubmit = async (event:any) => {

    //     event.preventDefault()
        
    //     handleSearch(event)

    // }

  return (
    <form onSubmit={handleSearch}>
        <input
            type="text"
            name=""
            value={vanityOrSteamId}
            className={styles.report_form_input_text}
            onChange={e => setVanityOrSteamId(e.target.value)}
        />
        
        <input
            type="submit"
            value="Search"
            className={styles.report_form_input_submit}
        />

        <div style={{ height: '10vh' }}>
            {
                Object.keys(playerToReport)?.length === 0 ? (
                    <></>
                ) : (
                    <>
                    <h5>result:</h5>
                    {  
                    playerToReport.personaname === '42' ? (
                            
                            <> No Result Found</>
                        ) :
                        ( <UserResult 
                            playerResult={playerToReport}
                            recentSteamGames={recentSteamGames}
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