// Update your fetchCases function
const fetchCases = async (authToken) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append('accept', 'application/json');

    if (authToken) {
      myHeaders.append('Authorization', authToken);
    }

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    const response = await fetch('https://dossierr.vdotvo9a4e2a6.eu-central-1.cs.amazonlightsail.com/cases/cases/', requestOptions);

    if (!response.ok) {
      console.error('Error making GET request:', response.status);
      throw new Error('Error making GET request');
    }

    const responseData = await response.json();
    console.log('Cases received', responseData);

    return responseData || [];
  } catch (error) {
    console.error('Error fetching cases:', error);
    throw new Error('Error fetching cases');
  }
};

export { fetchCases };
