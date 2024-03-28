import React from "react";

const AboutUs = () => {
  // Array containing GitHub profile information
  const githubProfiles = [
    { name: "ChrisCodeTrials", url: "https://github.com/ChrisCodeTrials", image: "https://media.licdn.com/dms/image/D4D03AQES1TETV7ZE0Q/profile-displayphoto-shrink_200_200/0/1681361483399?e=2147483647&v=beta&t=Edl7D8DIehCgeCLudgjVImmxHK_LgBu-Pa35CKolkgM" },
    { name: "Jadeng62", url: "https://github.com/Jadeng62", image: "https://via.placeholder.com/150" },
    { name: "SincereClark", url: "https://github.com/Jadeng62", image: "https://ca.slack-edge.com/TCVA3PF24-U05GZN6FQTC-f2a8a5c63629-512" },
    { name: "TimNatal1887", url: "https://github.com/TimNatal1887", image: "https://via.placeholder.com/150" },
    { name: "EnochTagoe1", url: "https://github.com/EnochTagoe1", image: "https://scontent-lga3-1.xx.fbcdn.net/v/t31.18172-1/15732301_10211937306615180_6098994506237856686_o.jpg?stp=dst-jpg_p480x480&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=SMk7c7nVIGAAX8PFexS&_nc_ht=scontent-lga3-1.xx&oh=00_AfCIcbCCF0ZWKiHpVDbL2ThTBdt-vpE61fVhVTUJi7BQ6Q&oe=662C3CA7" },
  ];

  // Function to handle navigation to a GitHub profile
  const goToGitHub = (profileUrl) => {
    window.open(profileUrl, "_blank");
  };

  return (
    <footer>
      <div><h1>Meet The Team...</h1></div>
      {/* Render cards for each GitHub profile */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {githubProfiles.map((profile, index) => (
          <div key={index} style={{ margin: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", textAlign: "center" }}>
            <img src={profile.image} alt={`${profile.name}'s GitHub Profile`} style={{ width: "150px", height: "150px", borderRadius: "50%", marginBottom: "10px" }} />
            <div>{profile.name}</div>
            {/* Clicking on the card navigates to the GitHub profile */}
            <button onClick={() => goToGitHub(profile.url)}>View Profile</button>
          </div>
        ))}
      </div>
      
    </footer>
  );
};

export default AboutUs;


