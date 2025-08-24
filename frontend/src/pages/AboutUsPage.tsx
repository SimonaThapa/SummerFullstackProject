import React from "react";
import "./AboutUsPage.css";

// Import local team images
import jane from "../assets/team/jane.png";
import john from "../assets/team/john.png";
import emily from "../assets/team/emily.png";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  { name: "Jane Doe", role: "CEO", image: jane },
  { name: "John Smith", role: "CTO", image: john },
  { name: "Emily Johnson", role: "Head of Marketing", image: emily },
];

const AboutUsPage: React.FC = () => {
  return (
    <div className="about-us-container">
      <h1>About Us</h1>
      <p>
        Welcome to Our Company! We are dedicated to providing the best solutions
        for our customers. Our mission is to deliver high-quality products and
        exceptional service.
      </p>

      <h2>Our Team</h2>
      <div className="team-grid">
        {teamMembers.map((member) => (
          <div className="team-member" key={member.name}>
            <img src={member.image} alt={member.name} />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </div>
        ))}
      </div>

      <h2>Our Values</h2>
      <p>
        We value integrity, innovation, and customer satisfaction above all. Our
        goal is to create solutions that truly make a difference.
      </p>

      <h2>Contact Us</h2>
      <p>Email: contact@ourcompany.com</p>
      <p>Phone: +1 (555) 123-4567</p>
      <p>Address: 123 Main Street, City, Country</p>
    </div>
  );
};

export default AboutUsPage;
