const express = require('express');
const translatte = require('translatte');
const cors = require('cors');
const data=require('./data.json');

const app = express();

app.use(cors());
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/',(req,res)=>{
    res.json("server is started");
})
 app.get('/data',async(req,res)=>{
    try {
        await res.json(data);
    } catch (error) {
        console.log(error);
    }
 })
app.post('/translate', async (req, res) => {
  const { headings, paragraphs, to_lang } = req.body;

  try {
    const translatedHeadings = await translateContent(headings, to_lang);
    const translatedParagraphs = await translateContent(paragraphs, to_lang);

    res.json({ translatedHeadings, translatedParagraphs });
  } catch (error) {
    res.status(500).json({ error: 'Translation failed', message: error.message });
  }
});

async function translateContent(contentObj, to_lang) {
  const translatedContent = {};

  for (const key in contentObj) {
    if (contentObj.hasOwnProperty(key)) {
      const text = contentObj[key];
      const translatedObj = await translatte(text, { to: to_lang });
      translatedContent[key] = translatedObj.text;
    }
  }

  return translatedContent;
}

app.listen(4000, () => {
  console.log('API server is runnings');
});
