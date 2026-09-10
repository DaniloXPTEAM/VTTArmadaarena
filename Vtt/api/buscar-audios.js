export default async function handler(req, res) {
  const { query, token } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Faltando o parâmetro de busca.' });
  }

  if (!token) {
    return res.status(400).json({ error: 'Faltando a Freesound API Key.' });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  try {
    const response = await fetch(
      `https://freesound.org/apiv2/search/text/?query=${encodeURIComponent(query)}&fields=id,name,tags,duration,previews&page_size=20&token=${token}`
    );
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar áudios no Freesound.' });
  }
}
