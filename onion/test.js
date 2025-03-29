const axios = require('axios');

const API_URL = 'http://localhost:3003/api';

async function testOnionArchitecture() {
    console.log('Testing Onion Architecture Implementation...\n');

    try {
        // Test 1: Create a new user
        console.log('Test 1: Creating a new user...');
        const createResponse = await axios.post(`${API_URL}/users`, {
            name: 'John Doe',
            email: 'john@example.com'
        });
        console.log('✓ User created successfully:', createResponse.data);
        const userId = createResponse.data.id;

        // Test 2: Get the created user
        console.log('\nTest 2: Getting the created user...');
        const getUserResponse = await axios.get(`${API_URL}/users/${userId}`);
        console.log('✓ User retrieved successfully:', getUserResponse.data);

        // Test 3: Get all users
        console.log('\nTest 3: Getting all users...');
        const getAllResponse = await axios.get(`${API_URL}/users`);
        console.log('✓ All users retrieved successfully:', getAllResponse.data);

        // Test 4: Update the user
        console.log('\nTest 4: Updating the user...');
        const updateResponse = await axios.put(`${API_URL}/users/${userId}`, {
            name: 'John Updated',
            email: 'john.updated@example.com'
        });
        console.log('✓ User updated successfully:', updateResponse.data);

        // Test 5: Delete the user
        console.log('\nTest 5: Deleting the user...');
        await axios.delete(`${API_URL}/users/${userId}`);
        console.log('✓ User deleted successfully');

        // Test 6: Verify user is deleted
        console.log('\nTest 6: Verifying user deletion...');
        try {
            await axios.get(`${API_URL}/users/${userId}`);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log('✓ User deletion verified (404 Not Found)');
            } else {
                throw error;
            }
        }

        console.log('\nAll tests completed successfully! 🎉');
    } catch (error) {
        console.error('\n❌ Test failed:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
        }
    }
}

// Run the tests
testOnionArchitecture(); 