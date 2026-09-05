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

## Publicar na Vercel + apontar o domínio da Hostinger

1. **GitHub** — criar um repositório e subir esta pasta:
   ```bash
   git init && git add . && git commit -m "Landing page Noches en Calma"
   git branch -M main && git remote add origin git@github.com:USUARIO/noches-en-calma.git && git push -u origin main
   ```
2. **Vercel** — *Add New → Project → Import* o repositório. Framework: **Other**. Build command: vazio. Output directory: vazio (raiz). *Deploy*.
3. **Domínio** — no projeto: *Settings → Domains → Add* `nochesencalma.online` e `www.nochesencalma.online`.
4. **Hostinger** — em *Domínios → DNS/Nameservers → Gerenciar registros DNS*, apagar os registros A/CNAME antigos de `@` e `www` e criar:

   | Tipo | Nome | Valor | TTL |
   |---|---|---|---|
   | A | `@` | `76.76.21.21` | 3600 |
   | CNAME | `www` | `cname.vercel-dns.com` | 3600 |

   Confirme os valores na tela da própria Vercel: ela mostra o alvo exato para a sua conta e avisa quando o DNS propagar (costuma levar de 5 minutos a algumas horas). O HTTPS é emitido sozinho.

5. **Depois de publicar**, testar no celular: anúncio → página → CTA → checkout com preço em MXN → pagamento → e-mail de acesso → área de membros.
