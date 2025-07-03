import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

const app = express();
const port = process.env.PORT || 3000;

// ⚠️ Phải đặt sau khi tạo app
app.use(cors());
app.use(bodyParser.json()); // <- Thêm dòng này nếu gửi JSON
app.use(bodyParser.urlencoded({ extended: true })); // Giữ dòng này nếu hỗ trợ x-www-form-urlencoded

app.post('/', async (req, res) => {
  try {
    console.log("Proxy received:", req.body);
    const googleScriptURL = 'https://script.google.com/macros/s/AKfycbyJdy3KgthGz8B6mZ4ycUI3-4jzLGqm00wmea4M-D2lQC4EMiFjOmcRq5KwjI8PyXSY/exec';

    const response = await fetch(googleScriptURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body) // Gửi JSON đúng định dạng
    });

    const text = await response.text();
    res.status(200).send(text);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).send('Lỗi proxy');
  }
});

app.listen(port, () => {
  console.log(`Proxy server đang chạy tại cổng ${port}`);
});
