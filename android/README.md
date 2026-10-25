# BEREIA Android — preparação, ainda não homologado
Modelo escolhido: gratuito, sem anúncios. Projeto TWA reaproveitando o site.

## Compilar
Abra esta pasta no Android Studio com JDK 17, Android SDK 36 e Gradle 8.13.
O projeto utiliza AGP 8.13.0 e Android Browser Helper 2.7.3.
Com Gradle disponível: `gradle wrapper --gradle-version 8.13`, depois `./gradlew :app:assembleDebug :app:bundleRelease`.
O bundle release ainda precisa de assinatura. Use Generate Signed Bundle no Android Studio com sua chave de upload, conservada fora do repositório. Não publique senhas/chaves.

## Verificação do domínio — bloqueador
Após configurar Play App Signing, obtenha o SHA-256 do certificado de assinatura do APP no Play Console (não confundir com a chave de upload).
Use `python ../tools/assetlinks.py SHA256 > assetlinks.json`.
Publique em https://everton-sorato.github.io/.well-known/assetlinks.json.
IMPORTANTE: /Bereia/.well-known/assetlinks.json não é o caminho aceito. Exige acesso ao repositório do site raiz everton-sorato.github.io ou um domínio próprio.
Sem essa associação o aplicativo pode abrir com barra do navegador, em vez de TWA validada.

## Antes da loja
- Definir e-mail público de suporte e completar política de privacidade.
- Confirmar applicationId definitivo antes do primeiro envio.
- Compilar, instalar e testar em Android real; AAB não foi gerado neste ambiente (sem SDK/Gradle).
- Validar botão Voltar, abertura inicial offline, downloads, compartilhamento de arquivos, fontes grandes e TalkBack.
- Executar relatório de pré-lançamento e teste fechado conforme conta do Play Console.
- Finalizar Segurança dos dados, público-alvo, classificação, ficha e screenshots reais do APK final.

Fontes: https://developer.chrome.com/docs/android/trusted-web-activity/quick-start
https://github.com/GoogleChrome/android-browser-helper
https://developer.android.com/build/releases/agp-8-13-0-release-notes
