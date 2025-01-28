import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { fetchReports, updateReport } from "../services/reportServices"
import ReportForm from "../ui/forms/report-form/ReportForm"

import styles from '../ui/forms/report-form/ReportForm.module.css'
import MastHead from "../ui/masthead/MastHead"
import { player_experiences, player_experiences2 } from "../datas/player_experiences"

const EditReportPage = () => {
  
  const [report, setReport] = useState<any>({})
  const [formData, setFormData] = useState<any>({})
  const location:any = useLocation()

  useEffect(() => {

    getReport()

    
    
  }, [])

  const getReport = async () => {
    const report_id = location.pathname.split('/')[2]

    try {
        const response  = await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/reports/incident/${report_id}`)

        const fetchedReport = await response.json()

        // console.log(fetchedReport)
        setReport(fetchedReport)
        setFormData(fetchedReport)
    } catch (error) {
        console.log(error)
    }


  }

  
  
  const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()


    console.log(formData)
        try {
            const updatedReport = await updateReport(formData)


            console.log(updatedReport)
            if(updatedReport.success) {
                setFormData(updatedReport.data)
            }

        } catch (error) {
            console.log(error)
        }
   }

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
        currentFormData[name] = false

        setFormData(currentFormData)
    }
  }

  if(Object.keys(report).length === 0) {
    return (
        <div className="page_container">
            No Reports yet
        </div>
    )
  }

  return (
    <div>
        <br/><br /><br />
        

        <MastHead header="Report To Edit" description="">
            <form className={styles.report_form} onSubmit={handleSubmit}>

            {/* <div>
                <img src={playerToReport.avatarfull} alt='player_to_report_img' style={{ width: '3rem', borderRadius: '100vw' }}/>
                <br />
                <span style={{ color: 'red' }}>{playerToReport.personaname}</span>
            </div> */}

            <div style={{ width: '100%'}}>

                <h6>Game Player is being reported on</h6>
                {/* <select
                className={styles.select_reported_game}
                name="game_id"
                id="game_id"
                required
                onChange={handleChange}
                >
                    <option value="Select" disabled>Select</option>
                    {matchedGames.map((game: any) => (
                        <option key={game.appid} value={game.appid} defaultValue={matchedGames[0].appid}>
                            {game.name}
                        </option>
                    ))}

                </select> */}

                <div style={{ display: 'flex',  justifyContent: 'flex-start', padding: '2rem', gap: '6rem' }}>

                    {/* first section */}
                    <div>
                        {
                            player_experiences.map(( (experience, index) => (
                                <div key={index}>
                                    <input
                                    type="checkbox"
                                    name={experience.value}
                                    id={experience.value}
                                    defaultChecked={report[experience.value]}
                                    onChange={handleSelectChange}
                                    />
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
                                    <input
                                    type="checkbox"
                                    name={experience.value}
                                    id={experience.value}
                                    defaultChecked={report[experience.value]}
                                    onChange={handleSelectChange}
                                    />
                                    <label htmlFor={experience.value}>{experience.text}</label>
                                </div >
                            ) ))
                        }
                    </div>
                </div>


                <input type="file" name="image_or_video" id="" />

                <br /><br />

                <label htmlFor="feedback_of_reporter">Feedback of Player</label><br />
                <textarea name="body_text" id="feedback_of_reporter" onChange={handleChange}>
                    {report.body_text}
                </textarea>
                </div>

                <input type="submit" />


                {/* loggedin user: <br />{ JSON.stringify(userGames) } <br /><br />
                player to report <br />{ JSON.stringify(playerGames) } */}

            </form>
        </MastHead>
        
        
    </div>

  )
}

export default EditReportPage