const axios = require('axios');

const ARCHITECTURES = {
    MONOLITHIC: {
        name: 'Monolithic Architecture',
        baseUrl: 'http://localhost:3000',
        description: 'Traditional monolithic application with all components in one codebase'
    },
    MICROSERVICES: {
        name: 'Microservices Architecture',
        baseUrl: 'http://localhost:3001',
        description: 'Distributed system with separate services communicating via API Gateway'
    },
    LAYERED: {
        name: 'Layered Architecture',
        baseUrl: 'http://localhost:3002',
        description: 'Application with clear separation of presentation, business, and data layers'
    },
    ONION: {
        name: 'Onion Architecture',
        baseUrl: 'http://localhost:3003',
        description: 'Application with domain-centric design and dependency inversion'
    },
    CLEAN: {
        name: 'Clean Architecture',
        baseUrl: 'http://localhost:3004',
        description: 'Application with clear boundaries and dependency rule'
    },
    EVENT_DRIVEN: {
        name: 'Event-Driven Architecture',
        baseUrl: 'http://localhost:3005',
        description: 'Application based on event production, detection, consumption, and reaction'
    }
};

async function testArchitecture(architecture) {
    console.log(`\nTesting ${architecture.name}...`);
    console.log(`Description: ${architecture.description}`);
    console.log('='.repeat(80));

    try {
        // Test 1: Check if server is running
        console.log('\nTest 1: Checking server availability...');
        const healthCheck = await axios.get(`${architecture.baseUrl}`);
        console.log('✓ Server is running:', healthCheck.data);

        // Test 2: Create a new user
        console.log('\nTest 2: Creating a new user...');
        const createResponse = await axios.post(`${architecture.baseUrl}/api/users`, {
            name: 'John Doe',
            email: 'john@example.com'
        });
        console.log('✓ User created successfully:', createResponse.data);
        const userId = createResponse.data.id;

        // Test 3: Get the created user
        console.log('\nTest 3: Getting the created user...');
        const getUserResponse = await axios.get(`${architecture.baseUrl}/api/users/${userId}`);
        console.log('✓ User retrieved successfully:', getUserResponse.data);

        // Test 4: Get all users
        console.log('\nTest 4: Getting all users...');
        const getAllResponse = await axios.get(`${architecture.baseUrl}/api/users`);
        console.log('✓ All users retrieved successfully:', getAllResponse.data);

        // Test 5: Update the user
        console.log('\nTest 5: Updating the user...');
        const updateResponse = await axios.put(`${architecture.baseUrl}/api/users/${userId}`, {
            name: 'John Updated',
            email: 'john.updated@example.com'
        });
        console.log('✓ User updated successfully:', updateResponse.data);

        // Test 6: Delete the user
        console.log('\nTest 6: Deleting the user...');
        await axios.delete(`${architecture.baseUrl}/api/users/${userId}`);
        console.log('✓ User deleted successfully');

        // Test 7: Verify user is deleted
        console.log('\nTest 7: Verifying user deletion...');
        try {
            await axios.get(`${architecture.baseUrl}/api/users/${userId}`);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log('✓ User deletion verified (404 Not Found)');
            } else {
                throw error;
            }
        }

        console.log(`\n✓ All tests completed successfully for ${architecture.name}! 🎉`);
        return true;
    } catch (error) {
        console.error(`\n❌ Tests failed for ${architecture.name}:`, error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
        }
        return false;
    }
}

async function testAllArchitectures() {
    console.log('Starting comprehensive architecture tests...\n');
    
    const results = [];
    for (const [key, architecture] of Object.entries(ARCHITECTURES)) {
        const success = await testArchitecture(architecture);
        results.push({
            name: architecture.name,
            success
        });
    }

    console.log('\nTest Summary:');
    console.log('='.repeat(80));
    results.forEach(result => {
        console.log(`${result.success ? '✓' : '❌'} ${result.name}`);
    });
}

// Run all tests
testAllArchitectures(); 