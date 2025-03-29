const app = require('./src/app');

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Monolithic server is running on port ${PORT}`);
}); 