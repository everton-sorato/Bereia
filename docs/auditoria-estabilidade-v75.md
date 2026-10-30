# Auditoria de estabilidade e experiência — BEREIA V78

Atualização: 29/10/2026  
Repositório: `everton-sorato/Bereia`

## Objetivo

Revisar os relatos de lentidão, retorno à tela inicial no celular, controles sem resposta e a aparência da Bíblia Portuguesa Mundial (BPM). A publicação web e a instalação Android precisam ser verificadas separadamente.

## Correções preparadas no código

- A abertura da página inicial não inicia mais uma busca de capítulo bíblico pela internet. A leitura é carregada quando o visitante abre o leitor.
- As fontes do leitor são consultadas em paralelo, com limite de oito segundos por fonte. Foram removidas tentativas duplicadas que podiam prolongar um carregamento com falha por cerca de um minuto.
- A inicialização de recursos do aplicativo não aguarda mais o evento `load` seguido de uma pausa adicional de 2,2 segundos.
- O botão “Início” limpa a rota interna e substitui o fragmento atual do navegador. A navegação do botão Voltar do aparelho também é sincronizada com a tela atual.
- “Ajustes e seus dados” ganhou três temas: **Atual — escuro e dourado**, **Claro** e **Tecnológico — azul e ciano**. A escolha fica salva no dispositivo e ajusta a cor da interface do navegador.
- O catálogo da BPM passou a usar os cartões, os seletores e o contêiner visual do BEREIA. O catálogo externo completo foi removido da tela inicial da biblioteca.

## Limite conhecido da BPM

O texto dos capítulos continua sendo aberto dentro de uma página incorporada do eBible.org, a fonte da tradução. Por ser conteúdo de outro domínio, o BEREIA não pode alterar a fonte, as cores e o leiaute internos dessa página. Para a leitura ficar totalmente nativa, será necessário importar e organizar os arquivos da edição de domínio público no próprio app, mantendo a nota de que a tradução está em revisão e não possui imprimatur.

## Verificação técnica

- Os 64 arquivos JavaScript do repositório foram analisados pelo parser: nenhum erro de sintaxe encontrado.
- Na versão web publicada, as 13 telas principais abriram no navegador de teste. O leitor principal carregou João 1 com 51 versículos.
- “← Início” e o Voltar do navegador retornaram à tela inicial com a mensagem e a entrada de leitura visíveis.
- Os temas Claro e Tecnológico foram selecionados; a escolha Tecnológica continuou após recarregar a página.
- O catálogo BPM abriu com 75 entradas (66 livros e nove suplementos/deuterocanônicos disponíveis na fonte). Gênesis 1 carregou dentro do contêiner do BEREIA.
- A etiqueta web mostra V78; um observador foi adicionado para impedir que módulos históricos troquem o número exibido.
- O inventário existente registra 150 controles estáticos, incluindo 108 botões. Ele próprio alerta que controles gerados por JavaScript precisam de revisão durante a execução; o inventário não comprova que todos funcionam.
- Esta conferência foi feita no navegador desktop. O teste do botão físico Voltar, telas pequenas, TalkBack, modo avião, falta de espaço e atualização sobre instalação existente continua pendente em Android real.

## Próximos itens do levantamento

1. Confirmar no PC e em um Android real: abrir, trocar de tela, voltar, fechar e abrir novamente; incluir navegação pela Bíblia e pela BPM.
2. Testar os três temas em telas pequenas, rotação, texto ampliado e com o leitor de tela.
3. Percorrer os 150 controles do inventário e registrar cada ação como aprovada, corrigida, removida ou ainda não implementada. Dar atenção a controles criados dinamicamente, modais, download, compartilhamento e backup/restauração.
4. Corrigir ou identificar claramente recursos que são demonstração, catálogo ou “em preparação”, para que não pareçam botões quebrados.
5. Fazer o teste offline depois de baixar conteúdo e depois de reiniciar o dispositivo; verificar interrupção de rede e armazenamento cheio.
6. Importar os arquivos públicos da BPM para uma leitura realmente nativa dentro do BEREIA.
7. Antes da Play Store: compilar e instalar APK/AAB em dispositivo real, revisar assinatura e Digital Asset Links, preencher Data safety/classificação/ficha, obter capturas reais e concluir o teste fechado exigido para a conta.

## Critério para declarar pronto

O BEREIA só deve ser tratado como pronto para publicação depois de a matriz de controles estar registrada, os fluxos de abertura/retorno/retomada terem sido aprovados em aparelho real e os itens obrigatórios do Play Console estarem completos. A verificação do código web, sozinha, não certifica o pacote Android.


## Atualização do Atlas e da navegação geográfica

- Geografia passa a ser o único destino do Atlas; a entrada duplicada Mapas foi removida dos fluxos de navegação.
- O Atlas apresenta listas independentes do leitor, separadas em Antigo Testamento e Novo Testamento, com referências bíblicas para cada lugar.
- Selecionar ou mudar o versículo no leitor não muda a seleção do Atlas.
- Mapas interativos permanecem dentro de Geografia, associados ao lugar selecionado no próprio Atlas.
- A navegação e o conteúdo atualizado precisam ser conferidos na versão publicada após a conclusão deste commit.

- Na página inicial, o cartão duplicado “Mapas” foi incorporado em “Geografia”; permanece apenas uma entrada de acesso.


## Temas bíblicos e histórias

- A página inicial ganhou 17 temas bíblicos com referências de leitura e ação explícita para abrir o capítulo no leitor.
- Foi criada uma faixa horizontal com oito histórias ilustradas em SVG autoral, cada uma com resumo e referência bíblica.
- As referências temáticas não alteram o leitor até a pessoa tocar em “Abrir”.

- Os tópicos temáticos e histórias ilustradas foram adicionados ao HTML da página inicial para aparecer mesmo se a inicialização dinâmica atrasar; referências abrem no leitor.
- Os cartões de assunto expandem referências e cada botão seleciona o capítulo no leitor; os cartões de história mostram resumo e leitura sugerida.
- O caminho de abertura das referências foi corrigido e conferido no leitor bíblico.
- A correção final do analisador de referências foi publicada para reconhecer espaços, capítulos e versículos.
- A home foi alinhada ao menu lateral em telas desktop para evitar que a navegação cubra o conteúdo.

- Os 17 temas mostram narrativas devocionais originais com referências relacionadas dentro do app, sem exigir abertura da Bíblia.
- As oito histórias do carrossel usam ilustrações inéditas criadas para o BEREIA e otimizadas em WebP.
