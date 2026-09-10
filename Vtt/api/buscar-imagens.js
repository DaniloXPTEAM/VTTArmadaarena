export default async function handler(req, res) {
  // 1. Pegar o termo de busca e provedor (padronizando para unsplash)
  const { query, provider = 'unsplash' } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Faltando o parâmetro de busca.' });
  }

  // Habilitar CORS para que seu site no GitHub Pages consiga acessar essa API da Vercel
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  try {
    if (provider === 'pexels') {
      const apiKey = process.env.PEXELS_API_KEY || 'dLBE0nAJB45cRSbm65Ej1JeLNOI5JAKiR0tw0E7niNk7TMeDE6XurC4X';
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=15`,
        {
          headers: {
            'Authorization': apiKey
          }
        }
      );
      const data = await response.json();
      return res.status(200).json(data);
    } else if (provider === 'pixabay') {
      const apiKey = process.env.PIXABAY_API_KEY || '56232677-4d3f788e61cab49986809d088';
      const response = await fetch(
        `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&per_page=15`
      );
      const data = await response.json();
      return res.status(200).json(data);
    } else {
      const apiKey = process.env.UNSPLASH_ACCESS_KEY;
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${apiKey}`
      );
      const data = await response.json();
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ error: `Erro ao buscar imagens no ${provider}.` });
  }
}