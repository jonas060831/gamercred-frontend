import { ChangeEvent, FC, useEffect, useState } from 'react'
import styles from './ReportForm.module.css'
import { fetchAllGames, fetchRecentGames } from '../../../apis/steam/searchUser'
import { test_games } from '../../../datas/testgames'
import { player_experiences, player_experiences2 } from '../../../datas/player_experiences'
import { createReport } from '../../../services/reportServices'

type ReportFormProps = {
    playerToReport: any
    setIsOnReportForm: (isOnReportForm: boolean) => void
}

const ReportForm:FC<ReportFormProps> = ({ playerToReport, setIsOnReportForm }) => {

  const [userGames, setUserGames] = useState<any>([])
  const [authUser, setAuthUser] = useState<any>({})
  const [playerGames, setPlayerGames] = useState<any>([])
  const [matchedGames, setMatchedGames] = useState<any>([])
  const [formData, setFormData] = useState<any> ({
    game_id : null
  })
  //get the games the loggedInUser is Playing vs playerToReport
  useEffect(() => {
    
    const fetchGames = async () => await Promise.all([fetchLoggedInUserGames(), fetchPlayerToReportGames()])

    fetchGames()

    fetchAuthUser()

  }, [])

  
  const handleChange = (event  :ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) :void => setFormData({...formData, [event.target.name] : event.target.value})


  const handleSelectChange = (event :ChangeEvent<HTMLInputElement>) => {
 
    const name = event.target.name

    if(event.target.value === 'on') {
        
        setFormData({...formData, [name] : true })
    }
    
    if(formData[name] === true) {

        //https://stackoverflow.com/questions/3455405/how-do-i-remove-a-key-from-a-javascript-object

        let currentFormData = formData

        //console.log(currentFormData)
        delete currentFormData[name]

        setFormData(currentFormData)
    }
  }

  const handleGameNameChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
  
    // Correctly find the selected game using ===
    const gameSelected = matchedGames.find((game: any) => game.appid === parseInt(value, 10)); //parseInt(value, 10) 10 is the hexadecimal base 10 to parse
  
    if (gameSelected) {
      setFormData({ ...formData, [name]: value, game_name: gameSelected.name });
    }
  }

  //  due to Steam user account settings we may not be able to see all games owned a steam account so we should filter if the user and steam account have any share recently played games, to validate if a user can make a report

  const fetchLoggedInUserGames = async () => {
        
        const allUsersGames:any = await fetchAllGames(authUser.id)
        // console.log(allUsersGames);
        
              
        if(import.meta.env.VITE_NODE_ENV === 'development' && allUsersGames.games === undefined) {
            setUserGames(test_games)
        }else {
            setUserGames(allUsersGames.data)
        }

    }

  const fetchPlayerToReportGames = async() => {
    const player: any = playerToReport.steamid
    // console.log(player);
    
    const allGames: any = await fetchRecentGames(player)
    // console.log(allGames);
    // console.log('player to report all games',allGames.data)
    setPlayerGames(allGames.data)
    // console.log(playerGames);
  }

  const fetchAuthUser = () => {
    const user:any = localStorage.getItem('user')
    const parsedUser:any = JSON.parse(user)
    setAuthUser(parsedUser)
  }

  useEffect(()=> {
    // console.log('user games', userGames);
    // console.log('player games:', playerGames);
    // console.log(playerToReport)

    // if (userGames.length > 0 && playerGames.length > 0){
    //     const matched = userGames.filter((userGame: any) =>  playerGames.some((playerGame: any) => userGame.appid === playerGame.appid));

    //     setMatchedGames(matched)

    //     //default it to first array result
    //     if(matched.length > 0) {

    //         const updatedValue = {...formData, report_owner : authUser.id, game_id : `${matched[0].appid}`, player_reported: playerToReport.steamid, game_name: `${matched[0].name}` }
    //         setFormData(updatedValue)

    //     }
    // }
    
    // defensive check for the array
    if (Array.isArray(userGames) && Array.isArray(playerGames) && userGames.length > 0 && playerGames.length > 0) {
      const matched = userGames.filter((userGame: any) =>
        playerGames.some((playerGame: any) => userGame.appid === playerGame.appid)
      );
  
      setMatchedGames(matched);
  
      if (matched.length > 0) {
        const updatedValue = {
          ...formData,
          report_owner: authUser.id,
          game_id: `${matched[0].appid}`,
          player_reported: playerToReport.steamid,
          game_name: `${matched[0].name}`,
        };
        setFormData(updatedValue);
      }
    }

  }, [userGames, playerGames])

  const handleSubmit = async(event: any) => {
    event.preventDefault()

    // console.log(formData)
    await createReport(formData)
    setIsOnReportForm(false)
    //console.log(response)

  }



  return (
    <>
    <form className={styles.report_form} onSubmit={handleSubmit}>

    <input type="hidden" name="report_owner"/>

    <div>
        <img src={playerToReport.avatarfull} alt='player_to_report_img' style={{ width: '3rem', borderRadius: '100vw' }}/>
        <br />
        <span style={{ color: 'red' }}>{playerToReport.personaname}</span>
    </div>
    
    <div style={{ width: '100%'}}>

        <h6>Game Player is being reported on</h6>

            <select
            className={styles.select_reported_game}
            name="game_id"
            id="game_id"
            required
            onChange={(e: any) => {
                handleChange(e); // Update the formData for game_id
                handleGameNameChange(e); // Update the formData for game_name
            }}
            defaultValue={matchedGames[0]?.appid || ''}
            >
            {matchedGames.map((game: any) => (
                <option key={game.appid} value={game.appid}>
                {game.name}
                </option>
            ))}
            </select>

        <div style={{ display: 'flex',  justifyContent: 'flex-start', padding: '2rem', gap: '6rem' }}>

            {/* first section */}
            <div>
                {
                    player_experiences.map(( (experience, index) => (
                        <div key={index}>
                            <input type="checkbox" name={experience.value} id={experience.value} onChange={handleSelectChange}/>
                            <label htmlFor={experience.value}>{experience.text}</label>
                        </div >
                    ) ))
                }
            </div>
            
            {/* second section */}
            <div>
                {
                    player_experiences2.map(( (experience, index) => (
                        <div key={index}>
                            <input type="checkbox" name={experience.value} id={experience.value} onChange={handleSelectChange}/>
                            <label htmlFor={experience.value}>{experience.text}</label>
                        </div >
                    ) ))
                }
            </div>
        </div>


        <input type="file" name="image_or_video" id="" />

        <br /><br />

        <label htmlFor="feedback_of_reporter">Feedback of Player</label><br />
        <textarea name="body_text" id="feedback_of_reporter" onChange={handleChange} required></textarea>
    </div>

        <input type="submit" />


        {/* loggedin user: <br />{ JSON.stringify(userGames) } <br /><br />
        player to report <br />{ JSON.stringify(playerGames) } */}

    </form>
    
    </>
    
  )
}

export default ReportForm