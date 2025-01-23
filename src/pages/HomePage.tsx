import MastHead from "../ui/masthead/MastHead"

const HomePage = () => {
  return (
    <>
        
    <MastHead
     header="Respect Levels You Up"
     description="Our mission is to make gaming a safe and enjoyable experience for all. We've developed a unique platform that combines user-driven reporting, accountability tracking, and positive reinforcement mechanisms. By involving the community in moderation and offering educational resources, we're not just fighting toxicity – we're fostering a culture of mutual respect among gamers."
    >
        <div style={{ display: 'flex', gap: '1rem' }}>
            <button>Login</button>
            <button>Sign Up</button>
        </div>
    </MastHead>

    </>
  )
}

export default HomePage