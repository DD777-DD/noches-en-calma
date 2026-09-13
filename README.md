# Noches en Calma — landing page

Site estático em espanhol mexicano: https://www.nochesencalma.online/
Repositório DD777-DD/noches-en-calma, branch main, conectado à Vercel. Sem build.

## Arquivos

- index.html: página de venda, oferta, leitor expansível e informações comerciais.
- styles.css: layout responsivo e movimento reduzido.
- app.js: leitor, download, demonstrações, consentimento e atribuição.
- ritual-pages.js: texto das nove páginas do Ritual e das amostras do sistema.
- descargas/Ritual_CALMA_de_12_Minutos.pdf: original gratuito, preservado integralmente.
- assets/ritual e assets/sistema: páginas reais renderizadas.
- assets/ads: anúncios existentes preservados.
- vercel.json: cabeçalhos e redirecionamento das páginas legais para a página única.
- creativos: arquivos de campanha preservados, fora do deploy por .vercelignore.

## Oferta e entrega

Checkout https://pay.hotmart.com/V107472709O, oferta base. Total México MX$190.81, IVA incluído (164.49 + 26.32). Preço anterior MX$249 informado pelo produtor. Garantia de 15 dias conferida no checkout. Sem prazo de promoção inventado.

Ritual gratuito sem compra ou cadastro. Leitor de nove páginas em texto e imagem; download original com verificação de tipo, tamanho e assinatura PDF. Não há formulário de e-mail.

O sistema pago contém guia de 22 páginas, Mapa CALMA, plano, seis protocolos, sete dias de prática, registro e ferramenta HTML. Acesso vitalício à plataforma não foi confirmado e não é anunciado. Não há promessa de resultado médico.

## Medição

Pixel 2147764496116257, carregado somente no domínio real e após consentimento. PageView, RitualOpen, RitualPreviewPage, RitualPdfOpenRequested, RitualDownloadRequested, RitualFileReceived, OfferView/ViewContent e CheckoutClick/InitiateCheckout. Recebimento do arquivo não implica salvamento no disco. Compra aprovada deve vir da integração Hotmart–Meta, nunca do clique.

Atribuição UTM e IDs de clique permitidos são preservados; parâmetros pessoais e arbitrários são descartados. Respostas do checklist não são transmitidas nem persistidas.

## Publicação e retorno

Push em main inicia publicação automática na Vercel. Antes de alterar preço ou garantia, conferir a configuração real e atualizar a copy e os valores dos eventos em app.js.

Ponto anterior à reestruturação: commit 8e771bcb83f08971948e81672cc10d98513379c9; deployment dpl_GT8Lr8gJ6vMhrCPWdnQizeXvz2KN. Para retorno, usar o deployment anterior na Vercel ou reverter o commit de publicação sem reescrever o histórico.

## Rotas dos ativos

Esta publicação foi enviada em um único lote pela interface autenticada do GitHub.
Os arquivos físicos da revisão estão na raiz: ritual-*.webp, sistema-*.webp, calma-favicon.svg e Ritual_CALMA_de_12_Minutos.pdf.
Os rewrites em vercel.json mantêm os endereços públicos /assets/ritual/*, /assets/sistema/*, /assets/favicon.svg e /descargas/Ritual_CALMA_de_12_Minutos.pdf usados pela página.
Ao atualizar um ativo, substituir seu arquivo físico correspondente. Não remover os rewrites sem atualizar as referências.
Os diretórios assets/ads e creativos existentes continuam preservados.
