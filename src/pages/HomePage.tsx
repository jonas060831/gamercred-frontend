import ButtonLink from "../ui/button-link/ButtonLink"
import MastHead from "../ui/masthead/MastHead"

const HomePage = () => {
  return (
    <div className="page_container">
        
    <MastHead
     header="Respect Levels You Up"
     description="Our mission is to make gaming a safe and enjoyable experience for all. We've developed a unique platform that combines user-driven reporting, accountability tracking, and positive reinforcement mechanisms. By involving the community in moderation and offering educational resources, we're not just fighting toxicity – we're fostering a culture of mutual respect among gamers."
     height="90vh"
    >
        <div style={{ display: 'flex', gap: '0.8rem' }}>
            <ButtonLink
             title="Log In"
             to="/login"
            />
            
            <ButtonLink
             title="Sign Up"
             to="/register"
             type="outline"
            />
        </div>
    </MastHead>

    </div>
  )
}

export default HomePage