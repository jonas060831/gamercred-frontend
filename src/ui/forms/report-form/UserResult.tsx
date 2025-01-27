import { FC } from "react"

import { Player } from "./PlayerLookUpForm"

type UserResultProps = {
    playerResult: Player
    handleSearch?: () => void
    recentSteamGames: any[]
    setIsOnReportForm: (isOnReport: boolean) => void
    reports: any
}

import styles from './UserResult.module.css'
import ButtonLink from "../../button-link/ButtonLink"
import ReportCard from "./ReportCard"


const UserResult:FC<UserResultProps> = ({recentSteamGames, playerResult, setIsOnReportForm, reports}) => {
  

  const handleStartReport = (_: any) => {

    const user:any = localStorage.getItem('user')

    const parsedUser = JSON.parse(user)

    if(!parsedUser) alert('you must login to continue')
    
    else {
        setIsOnReportForm(true)
    }
  }

  return (
    <>
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
                    recent games played: { recentSteamGames.length } <br />
                    

                    {
                        recentSteamGames.length === 0 ? (
                            <></>
                        ) : (
                            <>
                                {
                                    recentSteamGames.map((game:any, index) => (


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

                {/* if no recent played games within 2 weeks then this user cannot be reported */}
                {
                    recentSteamGames.length === 0 ? (
                        <></>
                    ) : (
                        <button onClick={handleStartReport}>
                          <i className="fa-solid fa-user-pen"></i> Report Player    
                        </button>
                    )
                }
                

            </div>


            {/* information section */}
            <div>
                
                <ButtonLink to="/" title="Steam Link"/>
                
                <br />
                
                <div>
                    
                    {
                        reports.length === 0? (
                            <>No reports yet!</>
                        ) : (
                            <> 
                                <br /><br />
                                Reports : {reports.length}
                            </>
                        )
                    }

                </div>
            </div>

        </div>

        {/* reputation bar */}
        <div>
            <progress value="32" max="100" style={{ width: '100%' }}>32%</progress>
        </div>
    </div>
    
    <br /><br />
    
    {
        reports.length === 0  ? (
            <>No reports yet!</>
        ) : (
            <>
                {reports.map((report: any, index: number) => (
                        <ReportCard key={index} report={report}/>
                ))}
            </>
        )
    }
    </>
  )
}

export default UserResult