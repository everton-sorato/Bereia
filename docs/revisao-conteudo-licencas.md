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

- Resultados de imagens arqueológicas são filtrados para licenças reconhecidas CC BY/CC BY-SA, CC0 ou domínio público. Para CC BY/CC BY-SA, a ficha precisa trazer autor e URL de licença; todas as imagens precisam vir de URLs HTTPS do Wikimedia e manter link da página Commons. A legenda identifica cada foto como relacionada, podendo ser réplica, detalhe ou reconstrução.
- Wikimedia Commons recomenda conferir os termos da página individual do arquivo; a informação de licença é enviada por quem publicou o arquivo e não é uma garantia jurídica da Wikimedia.
- Mapas e imagens fixos no Atlas ainda precisam de conferência individual do autor, página do arquivo, licença exata e atribuição. Rótulos genéricos como “mapa histórico” ou “CC0” não bastam sem essa ficha por item.
- Imagens de Unsplash/Picsum e outros serviços externos devem ser avaliadas separadamente; carregar por URL não prova licença, permanência ou permissão de redistribuição dentro do pacote Android.

### Mapas fixos do Atlas conferidos por arquivo

| Arquivo | Crédito/licença declarados na página do arquivo | Tratamento no BEREIA |
| --- | --- | --- |
| `Holy_sites_of_Jesus_in_Palestine.svg` | Fonte-base ONU; CC0 1.0. | Link e crédito da fonte-base incluídos no cartão. |
| `The_Ministry_of_Jesus-es.svg` | DEGA MD; CC BY-SA 4.0. Exige crédito, link da licença e mesma licença em adaptações. | Crédito e links do arquivo/licença incluídos. Revisar se futura edição do mapa aciona compartilhamento pela mesma licença. |
| `1771_Bonne_Map_of_the_New_Testament_Lands...jpg` | Rigobert Bonne; página Commons registra Public Domain Mark e observa que a reutilização pode variar fora dos EUA. | Crédito, data, link e aviso sobre jurisdição incluídos. |
| `Rawson,_A.L._Map_of_Sinai_Peninsula._1873.jpg` | A. L. Rawson; fonte indicada: Norman B. Leventhal Map Center/Boston Public Library; página informa domínio público nos EUA. | Crédito, fonte, link e aviso de jurisdição incluídos. |

Os quatro cartões usam hotlinks para páginas de arquivo Commons; os arquivos não foram copiados para o pacote. Verificação de licença no Commons é uma triagem baseada nas informações da página do arquivo, não garantia da plataforma.

### Fundos de imagem do criador de cards

- A busca na Wikimedia Commons para fundos compartilháveis agora só oferece imagens cuja ficha identifica CC0 ou domínio público. Arquivos CC BY/CC BY-SA sem créditos incorporados ao arquivo final deixam de aparecer nessa ferramenta.
- As imagens remotas de `images.unsplash.com` são cobertas pela licença geral da Unsplash, que permite uso comercial e não exige atribuição. A licença proíbe compilar imagens para criar serviço concorrente; o BEREIA usa algumas imagens como ilustração de fundo, não como coleção de fotos. A licença também não garante todos os direitos de imagem, marcas ou propriedades representadas.
- A rotação diária foi alterada para usar sete imagens fixas `images.unsplash.com`, cobertas pela licença geral da Unsplash. A fonte não exige crédito, embora seja bem-vindo; a página de licença não garante automaticamente direitos de imagem, marcas ou propriedades representadas.
- A busca de imagens CC0 no Wikimedia Commons continua consultando metadados informados pelo publicador do arquivo. Guardar o link de origem junto ao arquivo escolhido e permitir que a pessoa confira os detalhes antes de gerar/compartilhar a arte.

## Estado e próximos itens de homologação

1. Preservar no app e no manifesto a fonte, edição, versão e licença atribuída por cada fornecedor.
2. Criar ficha individual dos mapas e imagens que permanecerão no app; remover ou substituir os itens cuja licença não puder ser confirmada.
3. Confirmar os termos das bases de texto e os direitos de redistribuição/offline no território de lançamento.
4. Só concluir as declarações de segurança de dados e conteúdo no Play Console depois de verificar o pacote Android final e todas as requisições reais.

Fontes primárias consultadas em 26/10/2026: `midvash/bible-data` README e SOURCES.md; ficha e copyright da Bíblia Portuguesa Mundial no eBible.org; página de reutilização do Wikimedia Commons; página de licença do WLC/Tanach.us. O manifesto `provedores.json` é um inventário técnico de domínios e não equivale a uma liberação de direitos.
