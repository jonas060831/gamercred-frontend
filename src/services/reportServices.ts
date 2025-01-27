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
        
        console.log(data)

        
        return { success: true, data }

    } catch (error) {
        return { success: false, message: 'An error occured during login', error }
    }

}