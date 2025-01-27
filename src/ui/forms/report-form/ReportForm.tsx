
import { FC, useEffect, useState } from 'react'
import styles from './ReportForm.module.css'
import { fetchAllGames } from '../../../apis/steam/searchUser'
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

    fetchLoggedInUserGames()
    fetchPlayerToReportGames()

  }, [])

  const fetchLoggedInUserGames = async() => {
    
    const user:any = localStorage.getItem('user')
    const parsedUser:any = JSON.parse(user)
    
    const userSteamId = parsedUser.steam_id


    const allUserGames = await fetchAllGames(userSteamId)
    
    //development env so we can have a matching data to fiona
    if(import.meta.env.VITE_NODE_ENV == 'development' && allUserGames?.games === undefined) {
        console.log(123)
        setUserGames(test_games)
    } else {
        
        setUserGames(allUserGames?.games)
    }

  }

  const fetchPlayerToReportGames = async() => {

    const response = await fetchAllGames(playerToReport.steamid)
    console.log(playerToReport.steamid)
    console.log(response)

  }

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

    </form>
    
    </>
    
  )
}

export default ReportForm