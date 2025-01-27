import { FC, useEffect, useState } from "react"


import { Player } from "./PlayerLookUpForm"

type UserResultProps = {
    playerResult: Player
    handleSearch?: () => void
}

import styles from './UserResult.module.css'
import ButtonLink from "../../button-link/ButtonLink"
import { fetchRecentGames } from "../../../apis/steam/searchUser"

const UserResult:FC<UserResultProps> = ({playerResult , handleSearch}) => {

  const [gamesOwned, setGamesOwned] = useState([])
  const [recentlyPlayed, setRecentlyPlayed] = useState([])
  
  useEffect(() => {

    fetchRecentlyPlayedGames(playerResult.steamid)

  },[])


  const fetchRecentlyPlayedGames = async(playerId?: string) => {

   const response:any = await fetchRecentGames(playerId!)


   //forks to handle user not having any game and user having games
   if(!response.data) console.log('No games yet')

   else {
    //definetly have games
    console.log(response.data.response.games)
    setRecentlyPlayed(response.data.response.games)

   }

  }

  return (
    <div
     style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '1rem',
        backgroundColor: 'black',
        width: '600px',
        padding: '1rem'
     }}
    >

        {/* contains the left and right side uis */}
        <div className={styles.left_and_right_ui}>

            {/* contains useravatar and player name */}
            <div className={styles.header}>

                <div>
                    <img
                    src={playerResult.avatar} alt="avatar image"
                    style={{ marginRight: '0.7rem' }}
                    />
                    <span>{ playerResult.personaname }</span>
                </div>
                
                <div>
                    recent games played: { recentlyPlayed.length } <br />
                    

                    {
                        recentlyPlayed.length === 0 ? (
                            <></>
                        ) : (
                            <>
                                {
                                    recentlyPlayed.map((game:any, index) => (


                                        <div key={index} style={{ display: 'flex' }}>
                                            <img src={`https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`} alt="" style={{ width: '2rem', height: '2rem' }}/>
                                            {game.name} <br />
                                        </div>
                                    ))
                                }
                            </>
                        )
                    }

                </div>

                <button >Report Player</button>
            </div>


            {/* information section */}
            <div>
                
                <ButtonLink to="/" title="Steam Link"/>
                
                <br />
                
                <div>
                    Some Chart
                </div>
            </div>

        </div>



        {/* reputation bar */}
        <div>
            <progress value="32" max="100" style={{ width: '100%' }}>32%</progress>
        </div>

    </div>
  )
}

export default UserResult