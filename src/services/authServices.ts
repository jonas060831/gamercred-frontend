const BASE_URL: any = import.meta.env.VITE_BACKEND_SERVER

export const loginUser = async (formData: Record<any, string>) => {

    try {
        const res = await fetch(`${BASE_URL}/auth/login/`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'X-CSRFToken': '',
            },
            
            body: JSON.stringify(formData),
        })

        if(!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        const data = await res.json()

        return { success: true, data }

    } catch (error) {
        return { success: false, message: 'An error occured during login', error }
    }
}


export const registerUser = async (formData: Record<any, string>) :Promise<any> => {
    try {
        
        const response = await fetch(`${BASE_URL}/auth/register/`, { 
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            
            body: JSON.stringify(formData)
        })

        const data = await response.json()

        if(!response.ok) {
            console.log('Error Creating Account')
        }

        console.log(data)

        return { success: true, message: 'Hello World' }
    } catch (error) {
        console.log(error)
    }
}