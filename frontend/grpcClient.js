const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, '..', 'backend', 'protos', 'tournament.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const tournamentProto = grpc.loadPackageDefinition(packageDefinition).tournament;

const client = new tournamentProto.TournamentService('localhost:50051', grpc.credentials.createInsecure());

module.exports = client;