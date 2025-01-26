import { FC } from "react"
import { Player } from "./ReportForm"

type UserResultProps = {
    playerResult: Player
}

const UserResult:FC<UserResultProps> = ({playerResult}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}>

        <img src={playerResult?.avatar} alt="" style={{ width: '5rem', borderRadius: '100vh', border: '2px solid gray', objectFit: 'cover' }}/>
        {
            playerResult?.personaname
        }

    </div>
  )
}

export default UserResult