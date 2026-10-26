# BEREIA 1.0 — preparação para Google Play

Data: 25/10/2026. Base: V58. Alterações propostas: V59. Gratuito e sem anúncios.
Esta lista diferencia código implementado de homologação; não afirma aprovação da loja.

## Implementado
- Scripts separados em arquivos, preservando ordem de execução e compatibilidade; módulo de lançamento separado. Consolidação profunda das camadas históricas ainda pendente.
- Registro único de service worker e cache de todos os scripts; limpeza limitada aos caches do Bereia.
- Navegação passa a mostrar as telas fora do modo simplificado; histórico do navegador sincronizado.
- Pesquisa em conteúdo cadastrado e cache de capítulos, filtros acionáveis e saída escapada.
- Comparação respeita seletores; carregamento de capítulos protege contra respostas fora de ordem.
- Exportação/restauração de dados com validação, confirmação e rollback em falha de armazenamento.
- Leitura offline em IndexedDB por livro, validação de quantidade de capítulos e transação atômica por livro.
- Progresso de leitura real, substituindo valores fixos de demonstração.
- Ícones PNG 192/512; fonte ajustável; foco visível, teclado e status acessíveis.
- Privacidade e ajuda com contato público confirmado: everton.sorato@gmail.com (26/10/2026).
- Projeto Android TWA com target/compile SDK 36 e instruções de assinatura/Digital Asset Links.
- Rascunho da ficha, ícone e arte de destaque da loja.

## Verificado automaticamente
- 59 arquivos JavaScript sem erro de sintaxe.
- Backup preserva dados pessoais e exclui dados de outros aplicativos/cache.
- Backup inválido é recusado antes de alterações.
- Falha de quota restaura os valores anteriores.
- Referências a arquivos locais e shell offline conferidos.

## Verificado no navegador de testes
- Download da edição portuguesa concluído: 1.189 capítulos.
- Livro de Obadias carregado e versículo selecionado.
- Menus Meu BEREIA, Descobrir, Biblioteca, Missão e Créditos abrem telas visíveis.
- Busca Jericó: dois resultados; filtro Arqueologia: um resultado; ficha de Josué 6:1 aberta e botão Voltar retorna à busca.
- Anotação salva e persistida após recarregar; tamanho de fonte alterado na interface.
- Comparação Almeida/King James retornou texto; corrigida sessão que reutilizava passagem antiga.

## Homologação necessária antes da loja
- Compilar e instalar APK/AAB em Android real; SDK/Gradle ausentes no ambiente atual.
- Validar toda a matriz de controles (inventario-controles.json), inclusive todos os modais, downloads e compartilhamento de imagens.
- Testar TalkBack, fonte máxima, telas pequenas, teclado, orientação, botão Voltar e atualização sobre versão anterior.
- Modo avião após download e após reiniciar o aparelho; falta de espaço e interrupção de rede.
- Fontes dos quatro mapas fixos do Atlas revisadas e créditos/links adicionados; fundos diários limitados a imagens Unsplash sob licença geral. Continuam pendentes revisão das imagens arqueológicas dinâmicas e confirmação jurisdicional final.
- Conta Play Console, verificação de identidade e dispositivo; pagamento e termos pelo titular.
- Definir assinatura e publicar assetlinks no domínio raiz; não publicar certificado fictício.
- Preencher Data safety, classificação, público-alvo e ficha no Console; capturas reais do Android final.
- Teste fechado e feedback documentado (quando aplicável, 12 testadores por 14 dias consecutivos); solicitar produção.

## Limites conhecidos
- Catálogos e estudos são parciais; não prometer cobertura integral.
- Fotos arqueológicas são resultados licenciados de busca; identificação visual individual ainda demanda curadoria.
- Backup não é criptografado; não há sincronização em nuvem.
- A revisão web não equivale à certificação Android.
