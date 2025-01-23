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