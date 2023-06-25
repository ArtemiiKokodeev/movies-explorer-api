const options = {
  origin: [
    'http://localhost:3001',
    'https://cinemaworld.nomoredomains.rocks',
    'http://cinemaworld.nomoredomains.rocks',
    'https://artemiikokodeev.github.io',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
};

module.exports = options;
