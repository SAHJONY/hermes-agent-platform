// Freebuff API Service
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'freebuff-api', timestamp: new Date().toISOString() });
});

app.post('/v1/coding/task', async (req, res) => {
  try {
    const { instruction, files, context } = req.body;
    if (!instruction) {
      return res.status(400).json({ error: 'Missing required field: instruction' });
    }
    console.log(`[FreebuffAPI] Processing task: ${instruction.substring(0, 50)}...`);
    res.json({
      success: true,
      task_id: `freebuff-${Date.now()}`,
      changes: [],
      logs: ['[Freebuff] Processing coding task via API...']
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/v1/chat/completions', async (req, res) => {
  try {
    const { messages, model } = req.body;
    const lastMessage = messages[messages.length - 1]?.content || '';
    res.json({
      id: `freebuff-${Date.now()}`,
      model: model || 'freebuff',
      choices: [{
        message: { role: 'assistant', content: `[Freebuff] Processing: "${lastMessage.substring(0, 100)}..."` },
        finish_reason: 'stop'
      }],
      usage: { prompt_tokens: 10, completion_tokens: 50, total_tokens: 60 }
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[FreebuffAPI] Service started on port ${PORT}`);
});
