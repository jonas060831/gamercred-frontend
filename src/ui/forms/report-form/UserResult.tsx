import { FC, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"

import { Player } from "./PlayerLookUpForm"

type UserResultProps = {
    playerResult: Player
    handleSearch?: () => void
    recentSteamGames: any[]
    setIsOnReportForm: (isOnReport: boolean) => void
}

import styles from './UserResult.module.css'
import ButtonLink from "../../button-link/ButtonLink"


const UserResult:FC<UserResultProps> = ({recentSteamGames, playerResult, setIsOnReportForm}) => {

    const randomDuration = () => Math.random() * 0.07 + 0.23;
    const controls = useAnimation();
    const getRandomTransformOrigin = () => {
        const value = (16 + 40 * Math.random()) / 100;
        const value2 = (15 + 36 * Math.random()) / 100;
        return {
        originX: value,
        originY: value2
        };
    };


    const variants = {
    start: (i:any) => ({
        rotate: i % 2 === 0 ? [-1, 1.3, 0] : [1, -1.4, 0],
        transition: {
        delay: 1,
        repeat: Infinity,
        duration: randomDuration()
        }
    }),
    reset: {
        rotate: 0
    }
    };

    useEffect(() => {
        controls.start('start')
    })


  const handleStartReport = (event: any) => {
    setIsOnReportForm(true)
  }

  return (
    <div
     style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '1rem',
        backgroundColor: 'black',
        width: '600px',
        padding: '1rem'
     }}
    >

        {/* contains the left and right side uis */}
        <div className={styles.left_and_right_ui}>

            {/* contains useravatar and player name */}
            <div className={styles.header}>

                <div>
                    <img
                    src={playerResult.avatar} alt="avatar image"
                    style={{ marginRight: '0.7rem' }}
                    />
                    <span>{ playerResult.personaname }</span>
                </div>
                
                <div>
                    recent games played: { recentSteamGames.length } <br />
                    

                    {
                        recentSteamGames.length === 0 ? (
                            <></>
                        ) : (
                            <>
                                {
                                    recentSteamGames.map((game:any, index) => (


                                        <div key={index} style={{ display: 'flex' }}>
                                            <img src={`https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`} alt="" style={{ width: '2rem', height: '2rem' }}/>
                                            {game.name} <br />
                                        </div>
                                    ))
                                }
                            </>
                        )
                    }

                </div>

                

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        ...getRandomTransformOrigin(),
                        backgroundColor: '#fa9806',
                        height: '3rem',
                        border:'none',
                        borderRadius: '5px'
                    }}
                    variants={variants}
                    animate={controls}
                    onClick={handleStartReport}
                >
                    <i className="fa-solid fa-user-pen"></i> Report Player
                </motion.button>

            </div>


            {/* information section */}
            <div>
                
                <ButtonLink to="/" title="Steam Link"/>
                
                <br />
                
                <div>
                    Some Chart
                </div>
            </div>

        </div>



        {/* reputation bar */}
        <div>
            <progress value="32" max="100" style={{ width: '100%' }}>32%</progress>
        </div>

    </div>
  )
}

export default UserResult