
import { FC, useEffect, useState } from 'react'
import styles from './ReportForm.module.css'
import { fetchAllGames, fetchRecentGames } from '../../../apis/steam/searchUser'
import { test_games } from '../../../datas/testgames'

type ReportFormProps = {
    playerToReport: any
}

const ReportForm:FC<ReportFormProps> = ({ playerToReport }) => {

  const [userGames, setUserGames] = useState<any>([])
  const [playerGames, setPlayerGames] = useState<any>([])
  const [matchedGames, setMatchedGames] = useState<any>([])
 
  //get the games the loggedInUser is Playing vs playerToReport
  useEffect(() => {
    const fetchGamelist = async () => {
        fetchLoggedInUserGames()
        fetchPlayerToReportGames()
    } 
    fetchGamelist()

  }, [])

//  due to Steam user account settings we may not be able to see all games owned a steam account so we should filter if the user and steam account have any share recently played games, to validate if a user can make a report

  const fetchLoggedInUserGames = async() => {

        const user:any = localStorage.getItem('user')
        const parsedUser:any = JSON.parse(user)
        const userId = parsedUser.steam_id
        // console.log(userId);
        
        const allGames: any = await fetchRecentGames(userId)
        // console.log(allGames);
        
        setUserGames(allGames.data)
        // console.log(userGames);
              

        // if(import.meta.env.VITE_NODE_ENV === 'development') {
        //     setUserGames(test_games)   
        // }
 }

  const fetchPlayerToReportGames = async() => {
    const player: any = playerToReport.steamid
    // console.log(player);
    
    const allGames: any = await fetchRecentGames(player)
    // console.log(allGames);
    
    setPlayerGames(allGames.data)
    // console.log(playerGames);
    

  }

  useEffect(()=> {
    console.log('user games', userGames);
    console.log('player games:', playerGames);
    
    
    if (userGames.length > 0 && playerGames.length > 0){
        const matched: any = userGames.filter((userGame: any) => 
            playerGames.some((playerGame: any) => userGame.appid === playerGame.appid));
        setMatchedGames(matched)
    }
  }, [userGames, playerGames])

  console.log(matchedGames);
  

  return (
    <>
    <form className={styles.report_form} onSubmit={() => {}}>

    <div>
        <img src={playerToReport.avatarfull} alt='player_to_report_img' style={{ width: '3rem', borderRadius: '100vw' }}/>
        &nbsp;<span>{playerToReport.personaname}</span>
    </div>
    
    <div style={{ width: '100%'}}>

        <h6>Game Player is being reported on</h6>


        <select
         className={styles.select_reported_game}
         name="game_logged_in_user_have"
         id="game_logged_in_user_have"
         defaultValue="Select"
        >
            <option value="Select" >Select</option>
            {matchedGames.map((game: any) => (
                <option key={game.appid} value={game.appid}>
                    {game.name}
                    </option>
            ))}

        </select>

        <div style={{ display: 'flex',  justifyContent: 'space-between', padding: '2rem' }}>

            <div>
                <div>
                    <input type="checkbox" name="Harrassment" id="harrassment" />
                    <label htmlFor="harrasment">Harrassment</label>
                </div>
                <div>
                    <input type="checkbox" name="Bullying" id="bullying" />
                    <label htmlFor="bullying">Bullying</label>
                </div>
                <div>
                    <input type="checkbox" name="Racism" id="racism" />
                    <label htmlFor="racism">Racism</label>
                </div>

                <div>
                    <input type="checkbox" name="sexual_harrassment" id="sexual_harrassment" />
                    <label htmlFor="sexual_harrassment">Sexual harrassment</label>
                </div>

                <div>
                    <input type="checkbox" name="homo_transphobia" id="homo_transphobia" />
                    <label htmlFor="homo_transphobia">Homophobia / Transphobia</label>
                </div>

                <div>
                    <input type="checkbox" name="griefing" id="griefing" />
                    <label htmlFor="griefing">Griefing</label>
                </div>

                <div>
                    <input type="checkbox" name="cheating" id="cheating" />
                    <label htmlFor="cheating">Cheating</label>
                </div>

            </div>
            
            <div>


                <div>
                    <input type="checkbox" name="teamwork" id="teamwork" />
                    <label htmlFor="teamwork">Teamwork</label>
                </div>

                <div>
                    <input type="checkbox" name="friendly_helpful" id="friendly_helpful" />
                    <label htmlFor="friendly_helpful">Friendly / Helpful</label>
                </div>

                <div>
                    <input type="checkbox" name="encouraging_play" id="encouraging_play" />
                    <label htmlFor="encouraging_play">Encouraing Play</label>
                </div>

                <div>
                    <input type="checkbox" name="mentorship" id="mentorship" />
                    <label htmlFor="mentorship">Mentorship</label>
                </div>
                <div>
                    <input type="checkbox" name="Sportsmanship" id="sportsmanship" />
                    <label htmlFor="sportsmanship">Sportsmanship</label>
                </div>
                <div>
                    <input type="checkbox" name="communication" id="communication" />
                    <label htmlFor="communication">Communication</label>
                </div>

                <div>
                    <input type="checkbox" name="inclusive" id="inclusive" />
                    <label htmlFor="inclusive">Inclusive</label>
                </div>
            </div>
        </div>


        <input type="file" name="image_or_video" id="" />

        <br /><br />

        <label htmlFor="feedback_of_reporter">Feedback of Player</label><br />
        <textarea name="" id=""></textarea>
    </div>

        <input type="submit" />


        { JSON.stringify(matchedGames) }
        {/* { JSON.stringify(playerGames) } */}

    </form>
    
    </>
    
  )
}

export default ReportForm