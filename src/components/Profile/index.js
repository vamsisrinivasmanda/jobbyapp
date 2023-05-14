import './index.css'

const Profile = props => {
  const {profileDetails} = props
  return (
    <div className="profile-container">
      <img
        src={profileDetails.profileImagaUrl}
        className="profile-picture"
        alt={profileDetails.name}
      />
      <h1 className="profile-heading">{profileDetails.name}</h1>
      <p className="profile-desc">{profileDetails.shortBio}</p>
    </div>
  )
}

export default Profile
