const options = {
  origin: [
    'http://localhost:3001',
    // 'https://instagram-killer.nomoredomains.monster',
    // 'http://instagram-killer.nomoredomains.monster',
    'https://artemiikokodeev.github.io',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
};

module.exports = options;
