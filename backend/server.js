const express = require('express');
const app = express();
const tournamentRoutes = require('./controllers/tournamentController');
const playerRoutes = require('./controllers/playerController');
const matchRoutes = require('./controllers/matchController');
const resultRoutes = require('./controllers/resultController');
const grpcServer = require('./grpcServer');
const grpc = require('@grpc/grpc-js');

app.get('/api', (req, res) => {
  res.send('Hello from the back-end!');
});

app.use(express.json());

app.use('/api/tournaments', tournamentRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/results', resultRoutes);

const PORT = process.env.PORT || 3001;
const GRPC_PORT = process.env.GRPC_PORT || 50051;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Express server is running on port ${PORT}`);
});

grpcServer.bindAsync(`0.0.0.0:${GRPC_PORT}`, grpc.ServerCredentials.createInsecure(), (error, port) => {
  if (error) {
    console.error('Failed to bind gRPC server:', error);
    return;
  }
  console.log(`gRPC server is bound on port ${port}`);
  
});