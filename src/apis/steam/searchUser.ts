

const steamApiKey = import.meta.env.VITE_STEAM_API_KEY



export const getUserSteamProfile = async (steamId: any) => {


   try {


       const response = await fetch(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamApiKey}&steamids=${steamId}`)

    

      if(!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      
      const data = await response.json()

      console.log(data)

      return { success: true, data }

   } catch (error) {
    return { success: false, message: 'error occured during search', error }
   }
}




   

    