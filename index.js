const venom = require('venom-bot');
const fs = require('fs');

const FILE = 'rifas.json';

// Carrega rifas
let rifas = {};
if (fs.existsSync(FILE)) {
  rifas = JSON.parse(fs.readFileSync(FILE));
} else {
  console.log('Arquivo rifas.json não encontrado.');
  process.exit(1);
}

// Salvar rifas
function salvar() {
  fs.writeFileSync(FILE, JSON.stringify(rifas, null, 2));
}

// Gera status de uma rifa
function getStatus(rifa) {
  const r = rifas[rifa];
  let msg = `📋 Rifa: ${rifa}\n\n`;
  for (const item in r.metas) {
    msg += `• ${item}: ${r.atual[item]}/${r.metas[item]}\n`;
  }
  msg += "\n🙏 Obrigado pela ajuda!";
  return msg;
}

// Identifica a rifa pelo texto da mensagem
function identificarRifa(message) {
  const texto = message.body.toLowerCase();
  if (texto.includes('alive')) return 'alive-games';
  if (texto.includes('kids')) return 'cantina-kids';
  if (texto.includes('mulheres')) return 'cantina-mulheres';
  return 'alive-games';
}

// Atualiza item na rifa
function atualizarItem(rifa, item, qtd) {
  if (!rifas[rifa].atual[item]) rifas[rifa].atual[item] = 0;
  rifas[rifa].atual[item] += qtd;
  salvar();
  return true;
}

// Inicia o bot
venom
  .create('session', undefined, undefined, {
    headless: "new",
    useChrome: false,
    browserArgs: ["--no-sandbox", "--disable-setuid-sandbox"]
  })
  .then(client => {
    console.log('✅ Bot iniciado com sucesso!');
    client.onMessage(message => {
      if (!message.isGroupMsg) return;

      const rifa = identificarRifa(message);
      const txt = message.body.toLowerCase();
      const qtd = parseInt(txt.match(/\d+/)) || 1;

      let atualizado = false;
      for (const item in rifas[rifa].metas) {
        if (txt.includes(item)) {
          atualizado = atualizarItem(rifa, item, qtd);
          if (atualizado) {
            client.sendText(
              message.from,
              `✅ ${qtd} ${item}(s) adicionado(s) à ${rifa}!\n\n${getStatus(rifa)}`
            );
          }
        }
      }

      if (!atualizado) {
        client.sendText(message.from, `❌ Item não encontrado na rifa ${rifa}.`);
      }
    });
  })
  .catch(err => console.log(err));
