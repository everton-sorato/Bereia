# Revisão 132 — 5 de novembro de 2026

## Alterações
- Navegação centralizada; removidos wrappers concorrentes e o retorno forçado ao início após recarregar. Correção da tag de script dos temas.
- Serviço compartilhado de capítulos para leitor, histórias, pesquisa e downloads. Validação das respostas, limites de espera, deduplicação das buscas e migração do cache antigo.
- Download com progresso, pausa e retomada; catálogo offline acompanha os 66 ou 73 livros da edição escolhida. Falha ao salvar não impede leitura online e é informada.
- Manifesto do service worker gerado a partir dos arquivos e URLs versionadas do HTML. Atualizações removem apenas caches do Bereia.
- Cores compartilhadas nos três temas, contraste do menu, foco de teclado e tamanho do texto bíblico. Histórias organizadas em grade.
- Atlas único, independente do capítulo aberto; distinção entre mapa atual e localização histórica.
- Arqueologia permite explorar o acervo sem selecionar versículo e inclui perguntas para avaliar evidências e limites. Corrigido o endereço do Cilindro de Ciro no British Museum.

## Validação
- 15 testes automatizados: cache, leitura offline, erro de persistência, respostas inválidas, download completo/incompleto, pausa/retomada, backup/rollback, referências dos arquivos, service worker e sessão de estudo.
- Verificação de sintaxe de todos os scripts JavaScript.
- Conferência no Chrome da prévia: abertura do leitor, João e Filemom em Almeida Livre, Tobias 1 na BPM (22 versículos), retorno ao início, manutenção da tela após recarga, seleção dos 73 livros no offline, download de Filemom, temas claro/tecnológico, acervo arqueológico e atlas.

## Limites e próximos critérios de lançamento
Esta revisão não certifica cada capítulo, botão, navegador ou aparelho. Ainda é necessário testar Android real, instalação e atualização, modo avião após reiniciar o aplicativo, pouco espaço, permissões e lembretes com aplicativo fechado. Mapas, fotografias externas e fontes podem exigir internet. A BPM continua com aviso de revisão e ausência de aprovação eclesiástica. A revisão editorial e de licenças de todo o acervo não foi concluída nesta entrega.
