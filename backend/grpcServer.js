const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const Tournament = require('./models/Tournament');

const PROTO_PATH = path.join(__dirname, 'protos', 'tournament.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const tournamentProto = grpc.loadPackageDefinition(packageDefinition).tournament;

const server = new grpc.Server();

server.addService(tournamentProto.TournamentService.service, {
  GetTournaments: async (call, callback) => {
    try {
      const tournaments = await Tournament.findAll();
      callback(null, { tournaments });
    } catch (error) {
      callback(error);
    }
  },
  GetTournament: async (call, callback) => {
    try {
      const tournament = await Tournament.findByPk(call.request.id);
      if (tournament) {
        callback(null, tournament);
      } else {
        callback({
          code: grpc.status.NOT_FOUND,
          details: 'Tournament not found',
        });
      }
    } catch (error) {
      callback(error);
    }
  },
  CreateTournament: async (call, callback) => {
    try {
      const tournament = await Tournament.create(call.request);
      callback(null, tournament);
    } catch (error) {
      callback({
        code: grpc.status.INVALID_ARGUMENT,
        details: 'Invalid tournament data',
      });
    }
  },
  UpdateTournament: async (call, callback) => {
    try {
      const tournament = await Tournament.findByPk(call.request.id);
      if (tournament) {
        await tournament.update(call.request);
        callback(null, tournament);
      } else {
        callback({
          code: grpc.status.NOT_FOUND,
          details: 'Tournament not found',
        });
      }
    } catch (error) {
      callback({
        code: grpc.status.INVALID_ARGUMENT,
        details: 'Invalid tournament data',
      });
    }
  },
  DeleteTournament: async (call, callback) => {
    try {
      const tournament = await Tournament.findByPk(call.request.id);
      if (tournament) {
        await tournament.destroy();
        callback(null, {});
      } else {
        callback({
          code: grpc.status.NOT_FOUND,
          details: 'Tournament not found',
        });
      }
    } catch (error) {
      callback(error);
    }
  },
});

const PORT = process.env.GRPC_PORT || 50051;
server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), () => {
  console.log(`gRPC server running on port ${PORT}`);
  server.start();
  
});

module.exports = server;