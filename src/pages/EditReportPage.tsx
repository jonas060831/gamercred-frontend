import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { fetchReports } from "../services/reportServices"
import ReportForm from "../ui/forms/report-form/ReportForm"

import styles from '../ui/forms/report-form/ReportForm.module.css'
import MastHead from "../ui/masthead/MastHead"
import { player_experiences, player_experiences2 } from "../datas/player_experiences"

const EditReportPage = () => {
  
  const [report, setReport] = useState<any>({})
  const [formData, setFormData] = useState({

  })
  const location:any = useLocation()


  useEffect(() => {

    getReport()
    
  }, [])

  const getReport = async () => {
    const report_id = location.pathname.split('/')[2]

    try {
        const response  = await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/reports/incident/${report_id}`)

        const fetchedReport = await response.json()

        console.log(fetchedReport)
        setReport(fetchedReport)
    } catch (error) {
        console.log(error)
    }


  }
  
  const handleSubmit = async() => {

    console.log(formData)
  }

  const handleChange = () => {

  }

  const handleSelectChange = () => {

  }

  if(Object.keys(report).length === 0) {
    return (
        <div className="page_container">
            No Reports yet
        </div>
    )
  }

  return (
    <></>
  )
}

export default EditReportPage