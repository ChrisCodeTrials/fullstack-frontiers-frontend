import React from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import "./AboutUs.css";

const AboutUs = () => {
  const githubProfiles = [
    {
      name: "ChrisCodeTrials",
      url: "https://github.com/ChrisCodeTrials",
      image:
        "https://media.licdn.com/dms/image/D4D03AQES1TETV7ZE0Q/profile-displayphoto-shrink_200_200/0/1681361483399?e=2147483647&v=beta&t=Edl7D8DIehCgeCLudgjVImmxHK_LgBu-Pa35CKolkgM",
    },
    {
      name: "Sincere Clarke",
      url: "https://github.com/remyclarke",
      image: "https://ca.slack-edge.com/TCVA3PF24-U05GZN6FQTC-f2a8a5c63629-512",
    },
    {
      name: "Enoch Tagoe",
      url: "https://github.com/EnochTagoe1",
      image:
        "https://scontent-lga3-1.xx.fbcdn.net/v/t31.18172-1/15732301_10211937306615180_6098994506237856686_o.jpg?stp=dst-jpg_p480x480&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=SMk7c7nVIGAAX8PFexS&_nc_ht=scontent-lga3-1.xx&oh=00_AfCIcbCCF0ZWKiHpVDbL2ThTBdt-vpE61fVhVTUJi7BQ6Q&oe=662C3CA7",
    },
    {
      name: "Jadeng62",
      url: "https://github.com/Jadeng62",
      image:
        "https://media.istockphoto.com/id/1288129985/vector/missing-image-of-a-person-placeholder.jpg?s=612x612&w=0&k=20&c=9kE777krx5mrFHsxx02v60ideRWvIgI1RWzR1X4MG2Y=",
    },
    {
      name: "TimNatal1887",
      url: "https://github.com/TimNatal1887",
      image:
        "https://media.istockphoto.com/id/1288129985/vector/missing-image-of-a-person-placeholder.jpg?s=612x612&w=0&k=20&c=9kE777krx5mrFHsxx02v60ideRWvIgI1RWzR1X4MG2Y=",
    },
  ];

  return (
    <Container className="my-5">
      <div className="text-center mb-5 team-header">
        <h1>Meet The Team</h1>
        <p>Our dedicated team behind the scenes</p>
      </div>
      <Row className="g-4" xs={1} sm={2} md={3} lg={5}>
        {githubProfiles.map((profile, index) => (
          <Col key={index}>
            <Card className="h-100 text-center p-4">
              <Card.Img
                variant="top"
                src={profile.image}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "50%",
                  aspectRatio: "1/1",
                  objectFit: "cover",
                }}
              />
              <Card.Body>
                <Card.Title>{profile.name}</Card.Title>
                <Button
                  variant="primary"
                  onClick={() => window.open(profile.url, "_blank")}
                >
                  View Profile
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AboutUs;
