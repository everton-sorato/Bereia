# Revisão de conteúdo e licenças — BEREIA

Revisão de triagem em 27/10/2026. Este registro descreve as fontes declaradas no código e as afirmações públicas consultadas; não substitui autorização jurídica nem análise por território.

## Conteúdo usado pelo leitor

| Conteúdo | O que foi confirmado | Ação para lançamento |
| --- | --- | --- |
| Almeida 1819 (`almeida-livre`) | O repositório `midvash/bible-data` identifica a edição como “Almeida 1819 (Bíblia Livre)” e declara domínio público para os dados dessa versão. A app recebe os capítulos desse repositório. | Manter atribuição/proveniência e guardar a referência da versão usada. Confirmar o enquadramento para os países em que o app será distribuído. |
| King James 1769 (`kjv`) | O mesmo repositório declara a versão de 1769 em domínio público. | Manter atribuição e a identificação da edição, sem confundir com revisões modernas. |
| Bíblia Portuguesa Mundial (`porbrbsl`) | O eBible.org declara domínio público, lista os livros deuterocanônicos e também outros livros de coleções antigas; informa que o texto é rascunho em revisão. | O BEREIA abre o catálogo e capítulos diretamente no eBible.org, exibe o status de revisão e não mantém cópia local nem leitura offline desta edição. A fonte não apresenta imprimatur. |
| Traduções modernas (NVI, NAA, ARA, NTLH) | O próprio projeto as lista como dependentes de autorização. | Não integrar texto integral, comparação ou download offline sem licença expressa. |

## Inventário de conteúdo público e aberto — V69

### Textos bíblicos e apócrifos

- **Bíblia Portuguesa Mundial (BPM):** o eBible.org a declara em domínio público e informa que ainda é rascunho em revisão. O BEREIA abre o catálogo online; não baixa a obra para o pacote nem oferece busca ou leitura offline nessa edição. O catálogo contém o conjunto católico de 73 livros e outras obras antigas, além das formas gregas de Ester e Daniel. Não é uma edição com imprimatur.
- **Almeida 1819:** o provedor de dados declara domínio público para essa edição histórica; preservar edição, fonte e atribuição.
- **KJV 1769:** edição em inglês, não deve ser confundida com BKJ/KJA em português. Traduções brasileiras modernas e notas de estudo exigem checagem/licença próprias.
- **Bíblia Livre em Jesus (BLJ):** fonte declara CC BY 4.0; preservar atribuição e indicar alterações se houver.
- **1 Enoque, Jubileus e outras traduções em português:** não incluir texto integral até registrar uma edição específica em domínio público/licença aberta ou autorização. O domínio público do original antigo não libera automaticamente uma tradução moderna.

### Mapas, lugares e arqueologia

| Fonte | Material que podemos usar | Condição |
| --- | --- | --- |
| OpenBible.info Bible Geocoding Data | Dados de nomes e coordenadas de locais bíblicos para desenhar mapas próprios | CC BY 4.0 e atribuição; verificar separadamente geometrias OpenStreetMap/ODbL e termos de cada camada de mapa |
| Pleiades | Dados de lugares antigos e geografia histórica | CC BY 3.0 e atribuição |
| The Met Open Access | Imagens de itens identificados como domínio público/Open Access | CC0 somente nos itens elegíveis; confirmar a ficha do objeto |
| Smithsonian Open Access | Imagens e metadados marcados como CC0 | Confirmar a indicação individual do item |
| Wikimedia Commons | Imagens e mapas publicados sob licenças diversas | Avaliar cada arquivo, atribuir autor/fonte/licença e cumprir ShareAlike quando aplicável |
| IPHAN Banco de Imagens | Fotografias do patrimônio e sítios arqueológicos brasileiros | CC BY-NC 4.0; não reutilizar em versão comercial/monetizada sem autorização |

Textos curatoriais de museus servem para pesquisa e citação factual; o BEREIA deve redigir seus próprios resumos e apontar a ficha institucional. O direito de usar os dados de um achado não concede automaticamente o direito de reproduzir a fotografia do objeto.

## Idiomas originais e dados de pesquisa

- O laboratório de grego declara SBLGNT e MorphGNT e precisa preservar os créditos e cumprir as licenças individuais indicadas por cada projeto.
- O WLC não deve ser chamado de domínio público: a fonte consultada pelo repositório upstream indica uma licença própria permissiva, com atribuição solicitada. A tela de créditos foi ajustada para refletir isso.
- Dados geográficos, mapas e imagens podem ter licenças diferentes dentro da mesma fonte. A licença da base de dados não libera automaticamente cada imagem.

## Imagens, mapas e achados

- Resultados de imagens arqueológicas são filtrados para licenças reconhecidas CC BY/CC BY-SA, CC0 ou domínio público. Para CC BY/CC BY-SA, a ficha precisa trazer autor e URL de licença; todas as imagens precisam vir de URLs HTTPS do Wikimedia e manter link da página Commons. A legenda identifica cada foto como relacionada, podendo ser réplica, detalhe ou reconstrução.
- Wikimedia Commons recomenda conferir os termos da página individual do arquivo; a informação de licença é enviada por quem publicou o arquivo e não é uma garantia jurídica da Wikimedia.
- Mapas e imagens fixos no Atlas ainda precisam de conferência individual do autor, página do arquivo, licença exata e atribuição. Rótulos genéricos como “mapa histórico” ou “CC0” não bastam sem essa ficha por item.
- Imagens de Unsplash/Picsum e outros serviços externos devem ser avaliadas separadamente; carregar por URL não prova licença, permanência ou permissão de redistribuição dentro do pacote Android.

### Revisão editorial dos achados arqueológicos — V63

| Item conferido | Ajuste no BEREIA | Referência institucional |
| --- | --- | --- |
| Estela de Tel Dan | A relação bíblica foi movida de 2 Samuel 1 para 2 Samuel 7, por afinidade temática com a dinastia davídica. O texto limita a evidência à menção da “Casa de Davi”; não atribui à estela prova dos episódios do reinado. A localização atual fica indicada como Israel Museum; o empréstimo temporário ao Jewish Museum é datado de 2024–2025. | [The Jewish Museum — Tel Dan Stele](https://thejewishmuseum.org/exhibitions/tel-dan-stele/) |
| Fragmentos do Cântico do Mar | Corrigida a mistura de fragmentos de Qumran e manuscritos de outras épocas e proveniências. O cartão agora identifica as diferentes datas, não presume que todos vieram do deserto da Judeia e diz que o conjunto documenta transmissão textual, não o evento do Êxodo. | [Israel Museum — Piecing Together the Past](https://www.imj.org.il/en/exhibitions/piecing-together-past) |
| Apócrifo de Gênesis | Datação ajustada para o fim do século I a.C.; o texto identifica o manuscrito como uma releitura antiga, não como testemunha independente dos eventos de Gênesis. | [Israel Museum — Genesis Retold](https://www.imj.org.il/en/exhibitions/genesis-retold-0) |
| Relevos de Laquis | A fonte ampla do British Museum foi substituída pela ficha de um painel da sala XXXVI do Palácio Sudoeste de Nínive, datado pelo museu entre 700–692 a.C. O cartão mantém explícito que a cena mostra Laquis, não Jerusalém. | [British Museum — painel 124904](https://www.britishmuseum.org/collection/object/W_1856-0909-14_1) |
| Cafarnaum | Especificado que a sinagoga monumental visível é do século V d.C. e que há estruturas mais antigas sob ela. A associação dessas estruturas com a sinagoga do tempo de Jesus é apresentada como interpretação arqueológica. | [Custódia da Terra Santa — Capernaum](https://www.custodia.org/en/sanctuaries/capernaum/) |
| Grande Rolo de Isaías | Período, descoberta em Qumran e localização no Shrine of the Book mantidos; sua relevância fica circunscrita à transmissão textual de Isaías. | [Israel Museum — A Voice from the Desert](https://www.imj.org.il/en/exhibitions/voice-desert) |

As fotos arqueológicas continuam sob busca explícita do usuário. A busca filtra licenças e registra autor/link/licença, mas o resultado não é prova de que a fotografia seja o objeto original; a legenda informa que pode ser réplica, detalhe ou reconstrução. A ficha da fonte do achado e a ficha de licença da foto são verificações separadas.

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


## Fichas arqueológicas abertas — V69

- **Estela de Mesha (AO 5066):** o Louvre registra data, descoberta em Dhiban e localização atual. A foto de Tangopaso no Wikimedia Commons está em domínio público. A ficha relaciona o achado a 2 Reis 3 e sinaliza que a leitura “Casa de Davi” na linha 31 é debatida.
- **Cilindro de Ciro (BM 90920):** objeto do British Museum; foto de M-nemat no Wikimedia Commons sob CC0 1.0. As fichas de Esdras 1, 2 Crônicas 36 e Isaías 45 tratam o cilindro como contexto comparativo da política persa. O app esclarece que ele não menciona Judá, Jerusalém, judeus ou Javé e não é o decreto judaico de Esdras.
- As duas fichas mostram período, local de descoberta, localização atual, relação com a passagem, o que a evidência sustenta e o que não comprova, além de links para a fonte institucional e a licença da imagem.
