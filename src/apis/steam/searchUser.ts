const BASE_URL = import.meta.env.VITE_BACKEND_SERVER
export const getUserSteamProfile = async (steamId:any) => {


   try {

       const response = await fetch(`${BASE_URL}/api/steam_user/?steamid=${steamId}`)
      

       if(!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      
       const data = await response.json()
       const { response: player_info } = data

      return { success: true, response: player_info.players[0] }

   } catch (error) {
      console.log(error)
    return { success: false, message: 'error occured during search', error }
   }
}


export const getUserSteamId = async (steamVanityName: any) :Promise<any>=> {
   try {
      const response = await fetch(`${BASE_URL}/api/steam_vanity/?vanityurl=${steamVanityName}`)

      if(!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      
      const data = await response.json()
      const { response: playerInfo } = data

      if(playerInfo.success === 42) return { success: true, response: {} }

      return { success: true, response: playerInfo.steamid}

   } catch (error) {
      console.log(error)
      return { success: false, message: 'error occured during search', error }
   }
}


export const fetchRecentGames = async (playerId: string) => {

   
   try {
      
      const response = await fetch(`${BASE_URL}/game-list/?steamid=${playerId}`)
   
      const data = await response.json()

      return { success: true, data : data.recent_games}

   } catch (error) {
      console.log(error)
   }
}

export const fetchAllGames = async (steamId: string) => {
   
   try {
      const response = await fetch(`${BASE_URL}/complete-game-list/?steamid=${steamId}`)

      const games = await response.json()

      console.log(games)

      return { success: true, games : games.all_games }

   } catch (error) {
      
   }

}