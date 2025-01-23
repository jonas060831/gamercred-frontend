const BASE_URL = import.meta.env.VITE_BACKEND_SERVER
export const getUserSteamProfile = async (steamId:any) => {


   try {

       const response = await fetch(`${BASE_URL}/api/steam_user/?steamid=${steamId}`)


       if(!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      
       const data = await response.json()
       const { response: player_info } = data
       console.log(data)

      return { success: true, response: player_info }

   } catch (error) {
      console.log(error)
    return { success: false, message: 'error occured during search', error }
   }
}




   

    