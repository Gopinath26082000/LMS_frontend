import React, { useEffect, useState } from 'react';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles
import './OurClients.css'; // Add a new external CSS file

function OurClients() {
  const [hoveredClient, setHoveredClient] = useState(null);

  // Initialize AOS on component mount
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      easing: 'ease-in-out', // Easing function
      once: true, // Trigger animation only once
    });
  }, []);

  const clients = [
    {
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/2560px-Tata_Consultancy_Services_Logo.svg.png',
      name: 'Tata Consultancy Services',
      description: 'A global leader in technology solutions and consulting.',
      link: 'https://www.tcs.com',
    },
    {
      logo: 'https://www.designrush.com/uploads/users/customer-12/image_1532370530_PUupRl8PHyZvMCs2KRMuskJdYeyqW3IeacT72WYE.png',
      name: 'DesignRush',
      description: 'A platform that helps businesses find the best professional services for their projects.',
      link: 'https://www.designrush.com',
    },
    {
      logo: 'https://www.logodesign.net/images/tutorials/famous-logos-fun-facts/logos-54.png',
      name: 'Coca-Cola',
      description: 'A renowned leader in the global beverage industry.',
      link: 'https://www.coca-cola.com',
    },
    {
      logo: 'https://inkbotdesign.com/wp-content/uploads/2023/08/adobe-logo-design-1024x640.webp',
      name: 'Adobe',
      description: 'Pioneers in creative software and digital marketing solutions.',
      link: 'https://www.adobe.com',
    },
    {
      logo: 'https://cdn.mos.cms.futurecdn.net/YrDjFjGgm35X5PLMEXtR4i-320-80.jpg',
      name: 'Amazon',
      description: 'A global e-commerce and cloud computing giant.',
      link: 'https://www.amazon.com',
    },
    {
      logo: 'https://res.cloudinary.com/vistaprint/images/c_scale,w_448,h_448,dpr_2/f_auto,q_auto/v1705580338/ideas-and-advice-prod/en-us/coca-cola/coca-cola.png?_i=AA',
      name: 'Vistaprint',
      description: 'A leading provider of online printing and design services.',
      link: 'https://www.vistaprint.com',
    },
    {
      logo: 'https://www.zarla.com/images/mcdonalds-logo-2400x2400-20220513-2.png?crop=1:1,smart&width=150&dpr=2',
      name: 'McDonald\'s',
      description: 'A multinational fast-food chain known for its golden arches.',
      link: 'https://www.mcdonalds.com',
    },
    {
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJE6wJ5TvXvIxkb8qt5HIm8VTHr1G56WObzQ&s',
      name: 'Domino\'s Pizza',
      description: 'A leading pizza delivery and carryout chain.',
      link: 'https://www.dominos.com',
    },
    {
      logo: 'https://images.squarespace-cdn.com/content/v1/5ede2122e582b96630a4a73e/1609375769634-EG1WOTIN7Y4MB01N8AV1/Domino%E2%80%99s-logo-2021.jpg',
      name: 'Domino\'s',
      description: 'A global leader in pizza and food delivery services.',
      link: 'https://www.dominos.com',
    },
  ];
  
  return (
    <div className="clients-container" id="clients">
      <h1 className="clients-heading" data-aos="fade-up">Our Clients</h1>
      <p className="clients-subheading" data-aos="fade-up" data-aos-delay="200">
        We are proud to partner with some of the most iconic companies in the world, whose trust in our expertise
        drives us to deliver excellence.
      </p>

      <div className="clients-grid">
        {clients.map((client, index) => (
          <a
            href={client.link}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            className={`client-card ${hoveredClient === client.name ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredClient(client.name)}
            onMouseLeave={() => setHoveredClient(null)}
            data-aos="fade-up"
            data-aos-delay={`${300 + index * 100}`}
          >
            <img src={client.logo} alt={client.name} className="client-logo" />
            <h3 className="client-title">{client.name}</h3>
            <p className="client-description">{client.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

export default OurClients;
