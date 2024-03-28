import React from "react";

const AboutUs = () => {
  // Array containing GitHub profile information
  const githubProfiles = [
    { name: "ChrisCodeTrials", url: "https://github.com/ChrisCodeTrials", image: "https://media.licdn.com/dms/image/D4D03AQES1TETV7ZE0Q/profile-displayphoto-shrink_200_200/0/1681361483399?e=2147483647&v=beta&t=Edl7D8DIehCgeCLudgjVImmxHK_LgBu-Pa35CKolkgM" },
    { name: "Jadeng62", url: "https://github.com/Jadeng62", image: "data:image/jpeg;base64,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" },
    { name: "SincereClark", url: "https://github.com/Jadeng62", image: "https://ca.slack-edge.com/TCVA3PF24-U05GZN6FQTC-f2a8a5c63629-512" },
    { name: "TimNatal1887", url: "https://github.com/TimNatal1887", image: "data:image/jpeg;base64,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" },
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


