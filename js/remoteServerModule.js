const getData = async () => {
  try {
    const response = await fetch('https://29.javascript.pages.academy/kekstagram');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    // После загрузки изображений с сервера показываем блок .img-filters
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching data:', error);
    throw error;
  }
};

const sendDataToServer = async (formData) => {
  try {
    const response = await fetch('https://example.com/api/data', {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error sending data:', error);
    throw { type: 'sendError', error: error };
  }
};

export { getData, sendDataToServer };
