
import styles from './AboutUsPage.module.css'



const AboutUsPage = () => {

    const points : any = [
        {
            header : 'Mission',
            content: "Our mission is to make gaming a safe and enjoyable experience for all. We've developed a unique platform that combines user-driven reporting, accountability tracking, and positive reinforcement mechanisms. By involving the community in moderation and offering educational resources, we're not just fighting toxicity – we're fostering a culture of mutual respect among gamers."
        },
        {
            header : 'What is Gamer Cred?',
            content: "Imagine a gaming world where toxicity is actively discouraged by the players themselves. Our platform empowers gamers to report harmful behavior, track accountability, and foster a positive environment. With community-driven moderation and educational resources, we're creating a safe space for everyone to enjoy their favorite games without fear of harassment or abuse. \n\n We're revolutionizing online gaming by putting the power to combat toxicity in the hands of players. Our platform features an easy-to-use reporting system, reputation scores, and community moderation. By rewarding positive behavior and providing transparency in how reports are handled, we're building a gaming community where respect and fair play are the norm, not the exception \n\n We're tackling the pervasive issue of toxicity in gaming head-on. Our platform integrates seamlessly with popular games, allowing players to report harmful behavior, track reputations, and participate in community moderation. With features like anonymous reporting and educational content, we're creating a gaming ecosystem where positivity thrives and toxicity has no place to hide. \n\n Join us in transforming the gaming landscape. Our platform empowers players to take an active role in combating toxicity through a robust reporting system, community moderation, and accountability tracking. By rewarding positive behavior and providing resources for conflict resolution, we're building a gaming community where everyone can feel safe, respected, and truly enjoy the games they love."
        },
        {
            header : 'How it Started',
            content: 'In early 2024, Founders Cora and Jennifer were discussing how toxic certain games seem to be more than others, especially being trans and a cis woman. Soon after that discussion, Cora had the idea for a platform that put accountability back into the hands of the gaming community. Jennifer was so excited about the mission and idea that she had 10 pages of notes brainstorming ideas. \n\n Demographic Insights \n\n • Women in Gaming: A 2023 study by Reach3 Insights and Lenovo found that 61% of female gamers hide their gender while playing online to avoid harassment. \n • LGBTQ+ Gamers: According to a 2022 study by the ADL, 38% of LGBTQ+ gamers reported severe harassment while gaming.'
        },
        {
            header : 'Become a Collaborator',
            content: 'We are looking to partner with other companies who are aligned with our mission around mental health, marketing, etc.'
        },
    ]

  return (
    <div className={styles.aboutus_page_container}>
        
        <div className={styles.header}>
            <h1>About Us</h1>
        </div>
        <div className={styles.content}>
            {
                points.map((point: any, index: number) => (
                    <div key={index}>
                        <h3>{point.header}</h3>

                        <p style={{ whiteSpace: 'pre-line' }}>
                            {point.content}
                        </p>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default AboutUsPage