const API_URL = 'https://dossierr.vdotvo9a4e2a6.eu-central-1.cs.amazonlightsail.com';

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/user/token-auth/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Authentication failed. Please enter valid credentials.');
    }
  } catch (error) {
    console.error('Error during authentication:', error);
    throw error;
  }
};