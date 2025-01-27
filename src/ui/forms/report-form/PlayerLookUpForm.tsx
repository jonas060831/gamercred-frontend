import { ChangeEvent, FC, useEffect, useState } from 'react'
import { getUserSteamId, getUserSteamProfile } from '../../../apis/steam/searchUser'

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
    playerToReport: Player
    handleSearch: (input: any) => any
    vanityOrSteamId : string
    setVanityOrSteamId: (input:any) => any
}

const PlayerLookUpForm:FC<PlayerLookUpFormProps> = ({ playerToReport, handleSearch, vanityOrSteamId, setVanityOrSteamId }) => {

    const [player, setPlayer] = useState<Player | any>(playerToReport)
    
    useEffect(() => {
        console.log(player)
    }, [player])


  return (
    <form onSubmit={(event) => handleSearch(event)}>
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
            Object.keys(player)?.length === 0 ? (
                <></>
            ) : (
                <>
                <h5>result:</h5>
                {  
                player.personaname === '42' ? (
                        
                        <> No Result Found</>
                    ) :
                    ( <UserResult playerResult={player} /> )
                }
                </>
            )
        }
    </div>

    </form>
  )
}

export default PlayerLookUpForm