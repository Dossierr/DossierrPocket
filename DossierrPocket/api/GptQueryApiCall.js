const GptQueryApiCall = async (newMessage, dossier_id, authToken) => {
  try {
    if (!authToken || typeof authToken !== 'string') {
      console.error('Invalid or missing authToken');
      return null;
    }

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `${authToken}`);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        dossier_id: dossier_id,
        query: newMessage,
      }),
    };

    console.log('Sending POST request to:', 'https://dossierr.com/chat/chat/question');

    const response = await fetch(
      'https://dossierr.com/chat/chat/question',
      requestOptions
    );

    console.log('Received response with status code:', response.status);

    if (!response.ok) {
      console.error('Error making POST request:', response.status);
      return null;
    }

    const responseData = await response.json();
    console.log('Received response:', responseData);

    return responseData.chat || [];
  } catch (error) {
    console.error('Error making POST request:', error);
    return null;
  }
};

export default GptQueryApiCall;
