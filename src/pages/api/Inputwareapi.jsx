export async function Inputwareapi() {
  try {
    const baseUrl = 'https://inv2api.studioerp.com';
    const url = `${baseUrl}/api/Warehouse/Lookup`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {},
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