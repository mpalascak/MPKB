# MP Knowledge Base — osobní SDM knowledge base

MP Knowledge Base je webová studijní aplikace v Next.js pro enterprise infrastrukturu, Dell Technologies a VMware/Broadcom. Neodesílá poznámky ani studijní postup na server; zatím je ukládá do úložiště konkrétního prohlížeče.

## Spuštění na macOS

1. V adresáři projektu spusť `npm install` a potom `npm run dev`.
2. Otevři adresu, kterou vypíše Next.js, standardně `http://localhost:3000`.
3. Pro ukončení stiskni v terminálu `Ctrl+C`.

Pokud macOS první spuštění zablokuje, použij na soubor pravé tlačítko → Otevřít. Spouštěcí soubor nepřistupuje k internetu; pouze zpřístupní složku `dist` na lokální adrese `127.0.0.1:4173`.

## Co aplikace obsahuje

- 17 produktových a průřezových modulů;
- více než 140 vysvětlených pojmů;
- čtyřblokové základní školení s postupným odemykáním při výsledku alespoň 80 %;
- 32 kurzových otázek navázaných na výklad a společnou testovací banku;
- studijní cestu v šesti etapách;
- krátký i úplný test znalostí;
- osobní poznámky ke každému produktu;
- označování zvládnutých modulů a lokální přehled postupu;
- veřejně doložené portfolio KSPCS a DC-tec a interně potvrzený profil KSP IT Systems;
- pět responzivních architektonických diagramů a map datových toků;
- odkazy na oficiální produktové zdroje a původní rozsáhlý referenční dokument.

## Mobilní použití a budoucí nasazení

Aplikace je postavená na Next.js App Routeru, je responzivní a obsahuje webový manifest i service worker pro základní offline režim. Soubor `vercel.json` obsahuje potřebné hlavičky pro service worker, takže je projekt připravený pro pozdější připojení k Vercelu. Po zveřejnění lze aplikaci v mobilním prohlížeči přidat na domovskou obrazovku.

Poznámky a postup jsou zatím uložené pouze v konkrétním prohlížeči. Synchronizace mezi počítačem a telefonem bude vyžadovat přihlášení a vzdálené úložiště.

## Jak databázi dál rozvíjet

Obsah je připravený jako první verze dlouhodobé knowledge base. Další vhodné rozšíření:

1. samostatné úrovně testů Foundation / Delivery / Architecture;
2. zákaznické situace a rozhodovací simulace pro SDM;
3. produktové moduly Dell PowerEdge, Dell Networking, HPE, Cisco, Veeam, Rubrik, IBM, Huawei a Hitachi;
4. checklisty pro převzetí služby, incident, change a kapacitní plán;
5. import dalších poznámek a slidů z callů;
6. export osobních poznámek a výsledků testů.

Veřejné portfolio integrátorů je v aplikaci oddělené od interních předpokladů. Před zákaznickým projektem se vždy ověřuje konkrétní kontrakt, role týmu, model produktu, verze, licence a support matrix.
