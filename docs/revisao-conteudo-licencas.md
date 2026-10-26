# Revisão de conteúdo e licenças — BEREIA

Revisão de triagem em 26/10/2026. Este registro descreve as fontes declaradas no código e as afirmações públicas consultadas; não substitui autorização jurídica nem análise por território.

## Conteúdo usado pelo leitor

| Conteúdo | O que foi confirmado | Ação para lançamento |
| --- | --- | --- |
| Almeida 1819 (`almeida-livre`) | O repositório `midvash/bible-data` identifica a edição como “Almeida 1819 (Bíblia Livre)” e declara domínio público para os dados dessa versão. A app recebe os capítulos desse repositório. | Manter atribuição/proveniência e guardar a referência da versão usada. Confirmar o enquadramento para os países em que o app será distribuído. |
| King James 1769 (`kjv`) | O mesmo repositório declara a versão de 1769 em domínio público. | Manter atribuição e a identificação da edição, sem confundir com revisões modernas. |
| Bíblia Portuguesa Mundial (`porbrbsl`) | A página da edição no eBible.org declara domínio público e informa que o texto está em revisão. No código, é oferecida como fonte externa em páginas de leitura. | Identificar claramente que abre um serviço externo e que é uma tradução em revisão. Registrar a página-fonte e revisar o uso de qualquer cópia local. |
| Traduções modernas (NVI, NAA, ARA, NTLH) | O próprio projeto as lista como dependentes de autorização. | Não integrar texto integral, comparação ou download offline sem licença expressa. |

## Idiomas originais e dados de pesquisa

- O laboratório de grego declara SBLGNT e MorphGNT e precisa preservar os créditos e cumprir as licenças individuais indicadas por cada projeto.
- O WLC não deve ser chamado de domínio público: a fonte consultada pelo repositório upstream indica uma licença própria permissiva, com atribuição solicitada. A tela de créditos foi ajustada para refletir isso.
- Dados geográficos, mapas e imagens podem ter licenças diferentes dentro da mesma fonte. A licença da base de dados não libera automaticamente cada imagem.

## Imagens, mapas e achados

- Resultados de imagens arqueológicas são filtrados para CC BY, CC BY-SA, CC0 ou domínio público e mantêm um link para a página do arquivo. A licença, o autor e a atribuição precisam continuar acessíveis ao usuário junto de cada imagem.
- Wikimedia Commons recomenda conferir os termos da página individual do arquivo; a informação de licença é enviada por quem publicou o arquivo e não é uma garantia jurídica da Wikimedia.
- Mapas e imagens fixos no Atlas ainda precisam de conferência individual do autor, página do arquivo, licença exata e atribuição. Rótulos genéricos como “mapa histórico” ou “CC0” não bastam sem essa ficha por item.
- Imagens de Unsplash/Picsum e outros serviços externos devem ser avaliadas separadamente; carregar por URL não prova licença, permanência ou permissão de redistribuição dentro do pacote Android.

## Estado e próximos itens de homologação

1. Preservar no app e no manifesto a fonte, edição, versão e licença atribuída por cada fornecedor.
2. Criar ficha individual dos mapas e imagens que permanecerão no app; remover ou substituir os itens cuja licença não puder ser confirmada.
3. Confirmar os termos das bases de texto e os direitos de redistribuição/offline no território de lançamento.
4. Só concluir as declarações de segurança de dados e conteúdo no Play Console depois de verificar o pacote Android final e todas as requisições reais.

Fontes primárias consultadas em 26/10/2026: `midvash/bible-data` README e SOURCES.md; ficha e copyright da Bíblia Portuguesa Mundial no eBible.org; página de reutilização do Wikimedia Commons; página de licença do WLC/Tanach.us. O manifesto `provedores.json` é um inventário técnico de domínios e não equivale a uma liberação de direitos.
