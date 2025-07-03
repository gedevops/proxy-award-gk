app.use(bodyParser.json()); // Thêm dòng này để parse JSON body

app.post('/', async (req, res) => {
  try {
    const googleScriptURL = 'https://script.google.com/macros/s/AKfycbyJdy3KgthGz8B6mZ4ycUI3-4jzLGqm00wmea4M-D2lQC4EMiFjOmcRq5KwjI8PyXSY/exec';

    const response = await fetch(googleScriptURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const text = await response.text();
    res.status(200).send(text);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).send('Lỗi proxy');
  }
});
