import React, { useState, useEffect } from 'react';
import grpcClient from './grpcClient';

const TournamentList = () => {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    grpcClient.GetTournaments({}, (error, response) => {
      if (!error) {
        setTournaments(response.tournaments);
      } else {
        console.error('Error fetching tournaments:', error);
      }
    });
  }, []);

  return (
    <div>
      <h1>Tournaments</h1>
      <ul>
        {tournaments.map((tournament) => (
          <li key={tournament.id}>{tournament.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TournamentList;