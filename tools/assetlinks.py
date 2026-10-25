import json,re,sys
sha=sys.argv[1] if len(sys.argv)==2 else ''
if not re.fullmatch(r'(?:[0-9A-Fa-f]{2}:){31}[0-9A-Fa-f]{2}',sha):raise SystemExit('Informe o SHA-256 real do certificado Play App Signing, separado por dois-pontos.')
print(json.dumps([{'relation':['delegate_permission/common.handle_all_urls'],'target':{'namespace':'android_app','package_name':'io.github.everton_sorato.bereia','sha256_cert_fingerprints':[sha.upper()]}}],indent=2))
