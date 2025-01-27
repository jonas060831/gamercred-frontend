import { FC, useEffect } from 'react'


type ReportProps = {
    report: any
}

const ReportCard:FC<ReportProps> = ({ report }) => {

  useEffect(() => {
    console.log('coming from Reportcard', report)
  })
  return (
    <div style={{ margin: '2rem 0rem', backgroundColor: 'black', border: '2px solid green', padding: '1rem', borderRadius: '5px' }}>
        
        <div>
            avatar of the user that made the report, game icon, game title,
            images array or video
            reports from other players
            
        </div>

        <div>
            incident text if any
        </div>
        <button>Edit</button>
    </div>
  )
}

export default ReportCard