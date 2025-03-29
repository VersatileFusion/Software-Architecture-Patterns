const axios = require('axios');

const servers = [
  { name: 'Monolithic', port: 3000 },
  { name: 'Microservices', port: 3001 },
  { name: 'Event-Driven', port: 3002 },
  { name: 'Layered', port: 3003 },
  { name: 'Clean', port: 3004 },
  { name: 'Hexagonal', port: 3005 }
];

async function testServer(server) {
  try {
    console.log(`\nTesting ${server.name} Architecture Server...`);
    
    // Test root endpoint
    try {
      const rootResponse = await axios.get(`http://localhost:${server.port}`);
      console.log(`${server.name} Root Response:`, rootResponse.data);
    } catch (error) {
      console.error(`Error accessing root endpoint: ${error.message}`);
      if (error.code === 'ECONNREFUSED') {
        console.error(`Server at port ${server.port} is not running`);
        return;
      }
      throw error;
    }

    // Test user creation
    let userId;
    try {
      const createUserResponse = await axios.post(`http://localhost:${server.port}/api/users`, {
        name: 'Test User',
        email: 'test@example.com'
      });
      console.log(`${server.name} Create User Response:`, createUserResponse.data);
      userId = createUserResponse.data.id;
    } catch (error) {
      console.error(`Error creating user: ${error.message}`);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
      throw error;
    }

    // Test getting user
    try {
      const getUserResponse = await axios.get(`http://localhost:${server.port}/api/users/${userId}`);
      console.log(`${server.name} Get User Response:`, getUserResponse.data);
    } catch (error) {
      console.error(`Error getting user: ${error.message}`);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
      throw error;
    }

    // Test updating user
    try {
      const updateUserResponse = await axios.put(`http://localhost:${server.port}/api/users/${userId}`, {
        name: 'Updated User',
        email: 'updated@example.com'
      });
      console.log(`${server.name} Update User Response:`, updateUserResponse.data);
    } catch (error) {
      console.error(`Error updating user: ${error.message}`);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
      throw error;
    }

    // Test deleting user
    try {
      const deleteUserResponse = await axios.delete(`http://localhost:${server.port}/api/users/${userId}`);
      console.log(`${server.name} Delete User Response:`, deleteUserResponse.data);
    } catch (error) {
      console.error(`Error deleting user: ${error.message}`);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
      throw error;
    }

    console.log(`${server.name} Server Tests Completed Successfully!`);
  } catch (error) {
    console.error(`Error testing ${server.name} Server:`, error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

async function runTests() {
  console.log('Starting Server Tests...\n');
  
  for (const server of servers) {
    await testServer(server);
  }
  
  console.log('\nAll Server Tests Completed!');
}

runTests().catch(error => {
  console.error('Error running tests:', error.message);
  process.exit(1);
}); 