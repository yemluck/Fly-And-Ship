import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <center>
      <div style={{maxWidth: 800}}>
        <h3> About Fly&Ship</h3>
        <p>Frequent flyers are aware of the rising cost of tickets. One factor that influences 
          the price of tickets especially on international flights is the non-optional price of
           luggage factored into the ticket prices:
        </p>
        <p>
          People who ship internationally have been plagued with high cost of shipping and lack 
          of security of products shipped. Courier services either charge high insurance to 
          guarantee safe delivery of products or make customers liable for lost packages:
        </p>
        <p>
          Fly&Ship Web App provides a solution to both problems described above. Frequent flyers 
          could subsidize their cost of tickets by getting paid to transport packages at subsidized 
          rates for international shippers. International shippers get the benefit of paying a fair 
          prize and getting a guarantee of having their packages delivered promptly.
        </p>
      </div>
      </center>
    </div>
  );
}

export default AboutPage;
