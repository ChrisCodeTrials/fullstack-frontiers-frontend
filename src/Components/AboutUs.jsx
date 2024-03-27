import React from "react";

const AboutUs = () => {
  // Function to handle navigation to a GitHub profile
  const goToGitHub = (profileUrl) => {
    window.open(profileUrl, "_blank");
  };

  return (
    <footer>
      <div>About Us</div>
      {/* Buttons for each GitHub profile */}
      <button onClick={() => goToGitHub("https://github.com/EnochTagoe1")}>View EnochTagoe1's GitHub Profile</button>
      <button onClick={() => goToGitHub("https://github.com/ChrisCodeTrials")}>View ChrisCodeTrials's GitHub Profile</button>
      <button onClick={() => goToGitHub("https://github.com/Jadeng62")}>View Jadeng62's GitHub Profile</button>
      <button onClick={() => goToGitHub("https://github.com/TimNatal1887")}>View TimNatal1887's GitHub Profile</button>
      {/* You can add more profiles here if needed */}
    </footer>
  );
};

export default AboutUs;
