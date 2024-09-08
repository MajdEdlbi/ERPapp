export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { data } = req.body;

    console.log('Incoming data:', data);  

    try {
      const response = await fetch('https://inv2api.studioerp.com/api/AssemplyAndDisassemblyOperation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Error');
      }

      res.status(200).json(responseData);
    } catch (error) {
      console.error('Error api:', error);  
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Per', ['POST']);
    res.status(405).end(`Not allowed`);
  }
}
