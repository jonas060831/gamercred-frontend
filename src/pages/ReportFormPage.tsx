import ReportForm from "../ui/forms/report-form/ReportForm"
import MastHead from "../ui/masthead/MastHead"

const ReportFormPage = () => {
  return (
    <div className="page_container">
        
        <MastHead header="Report Player" description="">
          <ReportForm />
        </MastHead>

        

    </div>
  )
}

export default ReportFormPage