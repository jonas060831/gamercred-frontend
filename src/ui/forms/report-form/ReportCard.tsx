import { FC, useEffect, useState } from 'react'
import ButtonLink from '../../button-link/ButtonLink'
import { deleteReport } from '../../../services/reportServices'


type ReportProps = {
    report: any
}

const ReportCard:FC<ReportProps> = ({ report }) => {
  
  const [user, setUser] = useState<any>({})

  useEffect(() => {
    // console.log('coming from Reportcard', report)

    // console.log('report owner', report.report_owner_id)

    getAuthUser()
  }, [])

  const getAuthUser = () => {
    
    try {
        const user:any = localStorage.getItem('user')
        const parsedUser = JSON.parse(user)


        console.log(parsedUser)
        if(!parsedUser) new Error('no user found')

        console.log(parsedUser.id)

        setUser(parsedUser)
    } catch (error) {
        console.log(error)
    }
  }

  const handleDelete = async (reportId: number) => {
    const res = await deleteReport(reportId)

    if (res.success){
        alert(res.message)
    }
        else {
    console.log(res.error);
    alert(res.message)
    }
  }

  //avatar of the user

  return (
    <div style={{ margin: '2rem 0rem', backgroundColor: 'black', border: '2px solid green', padding: '1rem', borderRadius: '5px' }}>
        
        <div>
            <span style={{ color: 'red' }}>{ report.game_name }</span>
            <br />
            body text {report.body_text} <br />
            Reported on <span>{new Date(report.timestamp).toISOString().slice(0,10)}</span>
            {/* of the user that made the report, game icon, game title,
            images array or video
            reports from other players */}

        </div>

        <div>
            incident text if any
        </div>
       

        {
            user.id  ===  parseInt(report.report_owner_id) ? (
                <>
                    <ButtonLink to={`/report-form/${report.id}`} title='Edit'/>
                    <button onClick={() => handleDelete(report.id)}>Delete</button>
                </>
            ) : (
                <></>
            )
        }

    </div>
  )
}

export default ReportCard