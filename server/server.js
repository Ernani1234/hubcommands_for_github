import express from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static frontend files
const publicDir = path.join(__dirname, '..', 'public');
app.use(express.static(publicDir));

const PORT = process.env.PORT || 5050;
const server = app.listen(PORT, () => {
  console.log(`GitHUB's HUB server running on http://localhost:${PORT}`);
});

// Real shell WebSocket (PowerShell on Windows, bash otherwise)
const wss = new WebSocketServer({ server, path: '/terminal' });

wss.on('connection', (ws) => {
  const shell = process.platform === 'win32' ? 'powershell.exe' : (process.env.SHELL || 'bash');
  const proc = spawn(shell, [], { cwd: process.cwd(), env: process.env, stdio: 'pipe' });

  ws.send(`Conectado ao shell: ${shell}. Digite comandos e pressione Enter.\n`);

  proc.stdout.on('data', (data) => {
    ws.send(data.toString());
  });
  proc.stderr.on('data', (data) => {
    ws.send(data.toString());
  });

  ws.on('message', (msg) => {
    const text = String(msg);
    proc.stdin.write(text);
  });

  ws.on('close', () => {
    try { proc.kill(); } catch {}
  });
});