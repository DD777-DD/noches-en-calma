# Noches en Calma — landing page

Site estático (HTML/CSS/JS puro, sem build) para `nochesencalma.online`.
Envia o tráfego pago para o checkout Hotmart `V107472709O` (oferta base, MX$190.81).

## Arquivos

| Arquivo | O que é |
|---|---|
| `index.html` | Landing page completa. Todo o CSS e JS estão inline: uma única requisição. |
| `terminos.html` · `privacidad.html` · `fuentes.html` | Páginas legais linkadas no rodapé. |
| `assets/` | Capa do produto, thumbnail para redes sociais, favicon, CSS das páginas legais. |
| `vercel.json` | Cabeçalhos de cache e segurança. |
| `creativos/` | Exportador de criativos + copy dos anúncios. **Não vai para o site** (`.vercelignore`). |
| `_material/` | PDF do produto, apenas referência local. Fora do Git. |

## Configuração — o único lugar a editar

No fim do `index.html`, o bloco `window.NEC`:

```js
window.NEC = {
  checkoutBase : "https://pay.hotmart.com/V107472709O",
  offerCode    : "",            // vazio = oferta base do produto
  priceText    : "MX$190.81",
  metaPixelId  : "",   // cole o ID do Pixel quando existir
  sellerContact: ""    // contato público do fornecedor, se for publicar um
};
```

Mudou o preço na Hotmart? Troque só `priceText`: ele se aplica ao herói, à caixa de oferta, ao FAQ e à barra fixa do celular de uma vez.

O Pixel só carrega depois do aceite no banner de privacidade. Com `metaPixelId` vazio, o banner nem aparece e nada é enviado ao Meta.

## Rastreamento

A página repassa `utm_*`, `fbclid`, `gclid` e `ttclid` ao checkout e monta o parâmetro `sck` da Hotmart no formato `origem|campanha|criativo|botão`. Assim o relatório da Hotmart mostra qual criativo e qual botão geraram cada venda, mesmo sem Pixel.

## Publicação — já no ar

Site: **https://www.nochesencalma.online** · repositório `DD777-DD/noches-en-calma` conectado à Vercel.
Todo `git push` na branch `main` publica automaticamente. Não há build: os arquivos vão como estão.

```bash
git add -A && git commit -m "mensagem" && git push
```

DNS na Hostinger: `A @ -> 216.198.79.1` e `CNAME www -> <valor único do projeto>.vercel-dns-017.com`
(os antigos `76.76.21.21` e `cname.vercel-dns.com` continuam funcionando).

O apex redireciona 308 para o www. Para inverter, troque o domínio principal em Vercel → Settings → Domains.

## Antes de comprar tráfego

1. Testar a entrega: comprar, receber o e-mail e abrir os arquivos como aluno no Hotmart Club.
2. Criar o Pixel no Gerenciador de Eventos e colar o ID em `window.NEC.metaPixelId`.
3. Ligar a integração Hotmart -> Meta para a compra aprovada voltar como evento.
4. Definir o orçamento diário.
