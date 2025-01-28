const BASE_URL: any = import.meta.env.VITE_BACKEND_SERVER

export const createReport = async (formData: any) => {

    try {
        const res = await fetch(`${BASE_URL}/reports/incident/`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            
            body: JSON.stringify(formData),
        })

        if(!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        const data = await res.json()
                
        return { success: true, data }

    } catch (error) {
        return { success: false, message: 'cannot create report', error }
    }

}

export const fetchReports = async (steamId: any) => {
    
    try {
        const response = await fetch(`${BASE_URL}/reports/results/?player_reported=${steamId}`)

        const reports = await response.json()

        if(reports.nessage === 'No Reports found for the specifed player') return { success: false, data : [] }


        return { success: true, data : reports }
    } catch (error) {
        return { success: false, message: 'Cannot retrieve reports', error }
    }
  }


  export const deleteReport = async(formId: any) => {

    try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/reports/incident/${formId}/`, { // django requires the trailing slash after the form index
            method: 'DELETE',
            headers: {
                 'Content-Type' : 'application/json'
            }
        })
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        
        return { success: true, message: "Report deleted successfully" };
        
    } catch (error: any) {
        return {success: false, message: "cannot delete report", error}
    }
}

  export const updateReport = async (report:any) => {

    try {
        
        const response = await fetch(`${BASE_URL}/reports/incident/${report.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(report)
        })

        const updatedReport = await response.json()

        return { success: true, data: updatedReport }

    } catch (error) {
        console.log(error)
        return { success: false, message: 'cannot update report', error }
    }

  }

