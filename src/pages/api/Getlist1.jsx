export async function Getlist1() {
  try {
    const baseUrl = 'https://inv2api.studioerp.com';
    const url = `${baseUrl}/api/AssemplyAndDisassemblyOperation/list/0`;
    const params = {
      length: '11',
      start: '0',
      'search-value': '',
    };
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: queryString,
    });

    if (!response.ok) {
      throw new Error( `Network Error (status: ${response.status})`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Fetch error:', error);
    return false;
  }
}