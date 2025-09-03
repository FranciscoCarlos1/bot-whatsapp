# Bot WhatsApp - Lista de Lanches Alive Games

Este é um bot para WhatsApp que ajuda a organizar a lista de lanches do culto **Alive Games**, registrando quem vai levar **refrigerantes, milho para pipoca e azeite**.  
O bot é feito com **Node.js** e **Venom-bot**, e salva os dados em um arquivo JSON para não perder ao reiniciar.

---

## ⚡ Funcionalidades

- Recebe mensagens no grupo do WhatsApp do tipo:
  - `2 refris`
  - `3 pipoca`
  - `1 azeite`
- Atualiza automaticamente o total de cada item.
- Responde no grupo com a lista completa:

- Salva os dados em `dados.json` para persistência.

---

## 🛠️ Pré-requisitos

- Node.js (versão LTS recomendada)
- npm
- Conta no WhatsApp para escanear o QR Code

---

## 💻 Instalação e execução local

1. Clone este repositório ou baixe o projeto.  
2. No terminal, entre na pasta do projeto:  
 ```bash
 cd bot-whatsapp
