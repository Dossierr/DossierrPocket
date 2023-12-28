const fetchChatData = async (authToken, activeCase) => {
  console.log('fetching chat history for: ', activeCase)
  try {
    if (!activeCase || typeof activeCase !== 'string') {
      console.error('Invalid or missing active case UUID');
      return null;
    }

    const API_URL = `https://dossierr.vdotvo9a4e2a6.eu-central-1.cs.amazonlightsail.com/chat/chat/history/${activeCase}/`;

    const myHeaders = new Headers();
    myHeaders.append('accept', 'application/json');

    // Add the authorization token to the headers
    if (authToken) {
      myHeaders.append('Authorization', `${authToken}`);
    }

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    console.log('Fetching chat history for case with UUID:', activeCase.uuid);

    const response = await fetch(API_URL, requestOptions);
    const result = await response.json();

    console.log('Received chat history responses: ', result.chat.length);
    //console.log('Received chat history response:', result);

    return result.chat;
  } catch (error) {
    console.error('Error fetching chat history:', error.message);
    throw error;
  }
};

export default fetchChatData;
