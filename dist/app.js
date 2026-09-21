const products = [
  {
    id: "powervault", name: "Dell PowerVault ME", vendor: "Dell Technologies", category: "Primary storage", level: "Základ",
    oneLiner: "Cenově dostupné externí blokové úložiště pro menší a střední prostředí, pobočky a vybrané virtualizační workloady.",
    role: "Block storage", scaling: "Převážně scale-up", protocols: "FC, iSCSI nebo SAS dle modelu",
    terms: ["block-storage", "lun", "san", "fc", "iscsi", "sas", "raid", "thin-provisioning", "multipathing", "snapshot"],
    sections: [
      ["Co produkt řeší", "PowerVault odděluje data od jednotlivého serveru a zpřístupňuje hostům logická bloková zařízení. Server nebo hypervisor je vidí podobně jako disky; nad nimi vytváří filesystem, databázový prostor nebo VMFS datastore. Je vhodný tam, kde zákazník požaduje externí sdílenou storage bez rozsahu a provozní složitosti nejvyšších enterprise řad."],
      ["Jak vypadá datová cesta", "Aplikace zapisuje do virtuálního nebo fyzického disku. Požadavek projde operačním systémem či ESXi, multipathingem a hostitelským adaptérem přes FC, iSCSI nebo SAS k řadičům PowerVaultu. Pole data uloží do chráněné diskové struktury. Výkon proto neurčuje pouze rychlost disků; omezením může být host, cesta, port, řadič, pool i charakter I/O."],
      ["Architektura a dostupnost", "Typické pole používá redundantní řadiče, zdroje a cesty. Redundance ale funguje jen tehdy, pokud jsou fyzické větve skutečně nezávislé a host používá správnou multipath politiku. Společné pole stále představuje sdílenou failure domain. VMware HA může po výpadku hostu restartovat VM pouze tehdy, když zůstane datastore dostupný."],
      ["Škálování", "PowerVault se typicky rozšiřuje přidáním podporovaných disků nebo rozšiřujících polic. Roste zejména kapacita; výkon řadičů a portů nemusí růst stejným tempem. Změna často pokračuje přes pool, volume/LUN, mapping, datastore či filesystem až k aplikaci. SDM koordinuje všechny vlastníky tohoto řetězce."],
      ["Co musí rozumět SDM/PM", "Potřebuje znát přesný model a firmware, typ konektivity, závislé služby, kapacitu raw/usable/used, výkonnostní profil, stav podpory, monitoring, backup a odpovědnosti týmů. Nemusí konfigurovat zoning, ale musí rozpoznat, zda incident leží na hostu, fabric, poli nebo v aplikaci a zajistit společnou časovou osu."],
      ["Typické otázky zákazníka", "Kolik kapacity skutečně dostaneme? Lze přidat disky bez odstávky? Co se stane při výpadku řadiče? Jak rychle obnovíme smazaná data? Jak se pole připojí k VMware? Kdo řeší firmware a kdo SAN? Správná odpověď vždy závisí na přesném modelu, návrhu a smluvené službě."],
      ["Rizika a hranice", "Snapshot není nezávislá záloha. Přidání kapacity nemusí odstranit výkonové omezení. Dvě cesty mohou sdílet jeden přepínač. Thin provisioning může skrývat blížící se fyzické vyčerpání. Marketingové maximum není bezpečný provozní limit."],
    ],
    scenario: "Zákazník hlásí pomalé VM. SDM nejprve vymezí postižené hosty a datastory, porovná čas incidentu se změnami a spojí metriky aplikace, ESXi, cest a pole. Neuzavírá problém jako „VMware“ nebo „storage“ jen podle jedné zelené konzole.",
    source: "https://www.dell.com/en-us/shop/storage/sf/powervault"
  },
  {
    id: "powerstore", name: "Dell PowerStore", vendor: "Dell Technologies", category: "Primary storage", level: "Středně pokročilé",
    oneLiner: "Univerzální all-flash enterprise platforma pro blokové a souborové workloady s integrovanými datovými službami.",
    role: "Block + file", scaling: "Scale-up i scale-out", protocols: "FC, iSCSI, NVMe-oF, NFS, SMB dle modelu",
    terms: ["block-storage", "file-storage", "nvme", "vvols", "active-active", "scale-up", "scale-out", "replication", "qos"],
    sections: [
      ["Co produkt řeší", "PowerStore konsoliduje virtualizaci, databáze, aplikační volumes a souborové služby na jedné platformě. Jeho positioning je universal enterprise: poskytuje širší datové služby a automatizaci než entry storage, ale není prostě menší PowerMax."],
      ["Architektura", "Appliance obsahuje dvojici aktivních uzlů/řadičů a NVMe média. U podporovaných konfigurací lze zvětšovat kapacitu uvnitř appliance a spojovat více appliances do clusteru. Active/active neznamená automatické rovnoměrné využití všech cest; hostitelský návrh a umístění dat zůstávají důležité."],
      ["VMware integrace", "Vedle klasických VMFS nebo NFS datastore může PowerStore podporovat vVols. vVols mění granularitu správy: storage objekty a policies se více vážou ke konkrétní VM. Integrace usnadňuje provoz, nenahrazuje však backup ani test aplikační obnovy."],
      ["Scale-up a scale-out", "Scale-up přidává média a kapacitu do appliance. Scale-out přidává další appliance a tím také řadičové prostředky. Výkon neroste dokonale lineárně a jediný workload nemusí využít celý součet. Před rozšířením se kontroluje kompatibilita modelů, placement a datový pohyb."],
      ["SDM/PM pohled", "Hlídej společné failure domains, QoS, kapacitní rezervu, replikační politiky, závislosti file služeb na identitě a rozsah podpory VMware integrace. U konsolidace více týmů musí existovat pravidla priorit a eskalace při sporu o sdílený výkon."],
    ],
    scenario: "Databáze a VMware farma sdílejí jedno pole. Během dávky naroste latence VM. SDM potřebuje korelovat workloady a ověřit, zda jedna služba nevyčerpává sdílené prostředky; celkový průměr pole může lokální problém skrýt.",
    source: "https://www.dell.com/en-us/shop/storage/sf/power-store"
  },
  {
    id: "powermax", name: "Dell PowerMax", vendor: "Dell Technologies", category: "Primary storage", level: "Pokročilé",
    oneLiner: "High-end NVMe storage pro rozsáhlé a mission-critical prostředí s pokročilou kontinuitou a datovými službami.",
    role: "Mission-critical block/file", scaling: "Scale-up i scale-out", protocols: "FC, NVMe/FC, iSCSI, NVMe/TCP a další dle modelu",
    terms: ["nvme", "srdf", "rpo", "rto", "replication", "active-active", "san", "consistency-group"],
    sections: [
      ["Co znamená mission-critical", "Nejde pouze o vysoké IOPS. Platforma je určena pro náročný soubor požadavků na rozsah, předvídatelnost, dostupnost, servisovatelnost a kontinuitu. SLA aplikace však stále závisí na síti, hostech, databázi, identitě a provozních procesech."],
      ["Architektura", "PowerMax používá škálovatelnou architekturu s páry uzlů, velkou cache a NVMe médii. Konkrétní limity se liší mezi modely. Katalogové maximum nelze použít jako sizing bez znalosti bloku, poměru čtení/zápisu, latence, ochrany a chování při degradaci."],
      ["SRDF", "SRDF je rodina vzdálené replikace. Synchronní režim váže potvrzení zápisu na vzdálenou stranu a je citlivý na latenci. Asynchronní režim dovoluje větší vzdálenost, ale vzdálená kopie zaostává. SRDF/Metro podporuje vybrané aktivní topologie. Replikace nechrání sama proti logické chybě, která se zkopíruje."],
      ["SDM/PM pohled", "U nejkritičtějších služeb koordinuješ storage, SAN, virtualizaci, DBA, aplikace, sítě a DR. Potřebuješ znát rozhodovací pravomoc pro failover, konzistenční skupiny, pořadí spuštění, test failbacku a rozdíl mezi technickým a obchodním obnovením."],
    ],
    scenario: "Pole úspěšně replikuje databázová volumes do druhé lokality, ale aplikace závisí na identitě a integračním serveru, které v DR chybějí. Storage RPO může být splněno a obchodní služba přesto není obnovitelná.",
    source: "https://www.dell.com/en-us/shop/storage-servers-and-networking-for-business/sf/powermax"
  },
  {
    id: "powerscale", name: "Dell PowerScale", vendor: "Dell Technologies", category: "Unstructured data", level: "Středně pokročilé",
    oneLiner: "Scale-out NAS s OneFS pro velké množství souborových a nestrukturovaných dat.",
    role: "File storage / NAS", scaling: "Scale-out po uzlech", protocols: "NFS, SMB, S3 a další dle OneFS",
    terms: ["file-storage", "nas", "scale-out", "namespace", "onefs", "nfs", "smb", "metadata", "quota"],
    sections: [
      ["Co produkt řeší", "PowerScale spojuje uzly do jednoho distribuovaného filesystemu a namespace. Typické využití zahrnuje multimédia, dokumenty, výzkumná data, analytiku a AI datasety. Produkt navazuje na původní řadu Isilon."],
      ["Proč jsou metadata důležitá", "Miliony malých souborů představují jiný workload než několik velkých videí. Otevírání, vyhledávání a procházení adresářů zatěžuje metadata. Kapacita v TB proto nestačí k sizingu; důležité jsou počty souborů, velikosti, souběh klientů a operace za sekundu."],
      ["OneFS a datové služby", "OneFS poskytuje jednotný filesystem. SmartConnect řídí klientská připojení, SmartQuotas kvóty, SnapshotIQ snapshoty, SyncIQ replikaci a SmartPools umísťování dat. Dostupnost funkcí a licencování se ověřují pro konkrétní verzi."],
      ["SDM/PM pohled", "Sleduj kapacitu poolů, kvóty, ochranu, background jobs, replikační lag, DNS a identity. U obnovy velkého počtu malých souborů měř skutečný čas a metadata, nikoli pouze datový tok v TB/h."],
    ],
    scenario: "Tým chce ukládat miliardy malých objektů jako soubory a očekává stejný výkon jako u velkých sekvenčních datasetů. PM musí zajistit workload analýzu před nabídkou kapacity.",
    source: "https://www.dell.com/en-us/shop/storage-servers-and-networking-for-business/sf/powerscale"
  },
  {
    id: "objectscale", name: "Dell ObjectScale", vendor: "Dell Technologies", category: "Unstructured data", level: "Pokročilé",
    oneLiner: "Distribuovaná objektová platforma pro S3 workloady, datová jezera, obsah, AI a archivaci.",
    role: "Object storage", scaling: "Scale-out", protocols: "S3 API",
    terms: ["object-storage", "s3", "bucket", "erasure-coding", "object-lock", "api", "metadata"],
    sections: [
      ["Objektový model", "Aplikace pracuje s objektem, klíčem a metadaty přes API. Nejde o tradiční blokový disk ani automatickou náhradu SMB share. Aplikace musí S3 model podporovat a u každého klienta se ověřují konkrétní API funkce."],
      ["Distribuovaná ochrana", "ObjectScale rozkládá data a metadata mezi uzly a používá kontrolní součty, replikaci a erasure coding podle typu a verze systému. Erasure coding chrání proti definovaným poruchám fragmentů, ne proti oprávněnému smazání přes kompromitovaný účet."],
      ["Retence a neměnnost", "Versioning, lifecycle a Object Lock řeší odlišné potřeby. Object Lock musí být podporovaný platformou i backup/aplikačním klientem. Retence zvyšuje kapacitní závazek a omezuje i legitimní administrativní zásahy."],
      ["SDM/PM pohled", "Vedle kapacity hlídej počet objektů, API kompatibilitu, endpointy, DNS, certifikáty, access keys, tenanty, replikaci a postup obnovy aplikace. Samotný bucket bez aplikační databáze nemusí být použitelná služba."],
    ],
    scenario: "Aplikace ukládá dokumenty do S3 a jejich index do databáze. Obnova musí sladit oba recovery pointy; samostatně obnovený bucket může obsahovat objekty, které aplikace neumí najít.",
    source: "https://www.dell.com/en-us/dt/storage/ecs/index.htm"
  },
  {
    id: "powerflex", name: "Dell PowerFlex", vendor: "Dell Technologies", category: "Software-defined storage", level: "Pokročilé",
    oneLiner: "Distribuovaná bloková storage s možností HCI, odděleného compute/storage modelu nebo jejich kombinace.",
    role: "Software-defined block storage", scaling: "Scale-out", protocols: "Nativní datová cesta; další frontendy dle verze",
    terms: ["sds", "sdc", "mdm", "hci", "two-layer", "scale-out", "protection-domain"],
    sections: [
      ["Základní princip", "PowerFlex sdružuje lokální média serverových uzlů do distribuovaného systému. Data jsou rozložena napříč storage uzly. Na rozdíl od klasického pole není storage řadič pouze jedna dvojice v jedné šasi."],
      ["SDS, SDC a MDM", "SDS přispívá disky do storage systému. SDC zpřístupňuje volumes konzumentovi. MDM řídí metadata a konfiguraci; není zjednodušeně centrálním průchodem každého datového I/O. Přesná architektura závisí na verzi a frontendu."],
      ["Deployment modely", "HCI uzly poskytují compute i storage. Two-layer odděluje compute od storage a dovoluje je rozšiřovat samostatně. Mixed model kombinuje obojí. PowerFlex není VMware vSAN, i když oba produkty mohou tvořit software-defined storage."],
      ["SDM/PM pohled", "Musíš znát hranice storage a compute clusteru, síťovou fault domain, postup rozšíření, rebuild, lifecycle a support. V two-layer modelu mohou mít vrstvy odlišná maintenance okna i vlastníky."],
    ],
    scenario: "Compute potřebuje více CPU, zatímco storage má rezervu. Two-layer architektura umožní rozšířit compute bez stejného růstu disků; HCI by mohl vytvořit nevyužitou storage kapacitu.",
    source: "https://www.dell.com/en-us/shop/powerflex/sf/powerflex"
  },
  {
    id: "vxrail", name: "Dell VxRail", vendor: "Dell Technologies", category: "HCI", level: "Pokročilé",
    oneLiner: "Integrovaný Dell systém pro VMware HCI s validovaným lifecycle hardwaru a softwaru.",
    role: "VMware HCI", scaling: "Přidáváním uzlů", protocols: "vSAN datová síť + VMware networking",
    terms: ["hci", "vsan", "esxi", "vcenter", "lcm", "readynode", "resync", "fault-domain"],
    sections: [
      ["Co VxRail přidává", "VxRail staví na Dell serverech a VMware technologiích, ale přidává VxRail Manager, validované kombinace firmware, ovladačů a software a integrační support model. Není to pouze server s nainstalovaným ESXi."],
      ["Lifecycle", "Aktualizace probíhají přes podporované VxRail workflow a validované balíčky. Předpokladem je zdravý cluster, fungující migrace VM, dostatečná rezerva a splněné prechecks. Externě spravované komponenty mohou mít vlastní lifecycle."],
      ["HCI provoz", "Odstavení uzlu odebere současně compute a storage prostředky. Evakuace VM ještě nedokazuje obnovenou ochranu vSAN dat. Resync může prodloužit okno a zvýšit zátěž sítě a disků."],
      ["SDM/PM pohled", "Koordinuj maintenance, kapacitní rezervu, support matrix, síť, witness, backup a akceptaci po upgrade. Ruční patch jednotlivé komponenty může vyvést řešení z validovaného stavu."],
    ],
    scenario: "Po aktualizaci uzlu běží všechny VM, ale vSAN stále resynchronizuje data. Změna ještě není bezpečně dokončena a pokračování na další uzel vyžaduje kontrolní rozhodnutí.",
    source: "https://www.dell.com/support/product-details/en-us/product/vxrail-software/resources/manuals"
  },
  {
    id: "datadomain", name: "PowerProtect Data Domain", vendor: "Dell Technologies", category: "Data protection", level: "Středně pokročilé",
    oneLiner: "Protection storage optimalizovaná pro efektivní ukládání a ochranu záložních kopií.",
    role: "Backup target", scaling: "Dle modelu kapacitou a systémy", protocols: "DD Boost, NFS, SMB, VTL dle modelu",
    terms: ["backup", "deduplication", "compression", "dd-boost", "retention-lock", "restore", "rpo", "rto"],
    sections: [
      ["Role v řešení", "Data Domain je úložiště pro zálohy. Backup software typicky rozhoduje, co a kdy se chrání; Data Domain data efektivně přijímá, ukládá a poskytuje pro obnovu. Zdravé zařízení neznamená, že všechny aplikace mají správnou zálohu."],
      ["Deduplikace", "Opakující se segmenty se fyzicky neukládají znovu. Úspora závisí na typu dat, změnovosti, šifrování a backup formátu. Marketingový redukční poměr nelze automaticky použít pro kapacitní závazek."],
      ["DD Boost a Retention Lock", "DD Boost integruje podporovaný backup software s Data Domain a optimalizuje datovou cestu. Retention Lock chrání kopie proti změně nebo smazání během nastavené doby. Neměnnost současně omezuje řešení kapacitní nouze mazáním."],
      ["SDM/PM pohled", "Sleduj coverage, retence, fyzickou kapacitu, replikaci a především restore test. Rychlý denní backup malých změn nic neříká o času obnovy desítek TB po havárii."],
    ],
    scenario: "Backup joby jsou zelené, ale při obnově chybí katalog a přístupový účet. Data na targetu existují, služba však nesplní RTO. Obnovitelnost je end-to-end vlastnost.",
    source: "https://www.dell.com/support/kbdoc/en-us/000126375/powerprotect-and-data-domain-core-documents"
  },
  {
    id: "ppdm", name: "PowerProtect Data Manager", vendor: "Dell Technologies", category: "Data protection", level: "Středně pokročilé",
    oneLiner: "Software pro inventář workloadů, protection policies, plánování kopií a řízení obnovy.",
    role: "Backup orchestration", scaling: "Řízením workloadů a data moverů", protocols: "Integrace s VMware, databázemi, NAS, Kubernetes a DD",
    terms: ["backup", "protection-policy", "asset", "application-consistent", "crash-consistent", "cbt", "dd-boost"],
    sections: [
      ["Co PPDM dělá", "PPDM objevuje podporované assets a přiřazuje jim protection policies: harmonogram, cíl, retenci a replikační kroky. Data mohou proudit přes různé data movery; management appliance nemusí být fyzickým průchodem všech záloh."],
      ["Konzistence", "Crash-consistent kopie odpovídá přibližně náhlému vypnutí. Application-consistent kopie koordinuje stav aplikace. U databází se řeší logy a point-in-time recovery. Image backup VM nemusí splnit všechny databázové požadavky."],
      ["Coverage", "Stoprocentní úspěšnost naplánovaných jobů může skrývat novou VM bez správného tagu, která není v žádné politice. Coverage je proto třeba porovnávat s inventářem služby nebo CMDB."],
      ["SDM/PM pohled", "Sleduj stáří posledního použitelného recovery pointu, coverage, konzistenci, kapacitu targetu a výsledky obnov. Do DR zahrň i PPDM konfiguraci, katalog, identity a klíče potřebné pro obnovu."],
    ],
    scenario: "Automatizace vytvoří VM bez backup tagu. Všechny existující joby uspějí, ale nová VM není chráněna. Dobrá služba měří coverage, ne jen success rate.",
    source: "https://www.dell.com/en-us/shop/powerprotect-data-manager/sf/power-protect-data-manager"
  },
  {
    id: "cyber-recovery", name: "PowerProtect Cyber Recovery", vendor: "Dell Technologies", category: "Data protection", level: "Pokročilé",
    oneLiner: "Izolovaný recovery vault s řízeným air gapem pro obnovu po kybernetické události.",
    role: "Cyber recovery", scaling: "Podle kritických datasetů a vaultu", protocols: "Řízená replikace do vaultu",
    terms: ["cyber-vault", "air-gap", "immutability", "cybersense", "clean-room", "ransomware", "rto"],
    sections: [
      ["Problém, který řeší", "Ransomware může zasáhnout produkci, administrátorské identity, repliky i běžné zálohy. Cyber Recovery odděluje vybrané kritické kopie do vaultu a omezuje dobu, kdy je replikační cesta otevřená."],
      ["Izolace a analytika", "Operational air gap je řízené otevírání a zavírání spojení, ne nutně kabel navždy odpojený od sítě. CyberSense může analyzovat známky poškození. Analytický výsledek není sám o sobě zárukou bezpečnosti celé aplikace."],
      ["Clean room", "Obnova se ověřuje v kontrolovaném prostředí odděleném od kompromitované produkce. Potřebuje síť, identity, DNS, licence, certifikáty a kapacitu. Čistá data bez těchto služeb nejsou obnovená obchodní služba."],
      ["SDM/PM pohled", "Předem určuj minimální sadu kritických služeb, pravomoc pro izolaci, proces výběru recovery pointu a akceptaci návratu. Cvičení musí měřit technické i obchodní RTO."],
    ],
    scenario: "Druhá lokalita obsahuje aktuální repliku, ale škodlivé šifrování se již replikovalo. Geografická vzdálenost není bezpečnostní izolace; je potřeba historická, neměnná a řízeně izolovaná kopie.",
    source: "https://www.dell.com/en-us/shop/powerprotect-cyber-recovery/sf/powerprotect-cyber-recovery"
  },
  {
    id: "vsphere", name: "VMware vSphere", vendor: "VMware by Broadcom", category: "Virtualizace", level: "Základ",
    oneLiner: "Virtualizační platforma tvořená hypervisory ESX/ESXi, centrální správou vCenter a clusterovými službami.",
    role: "Compute virtualization", scaling: "Hosty a clustery", protocols: "Management, vMotion, storage a VM networking",
    terms: ["esxi", "vcenter", "vm", "cluster", "ha", "drs", "vmotion", "datastore", "vcpu", "numa"],
    sections: [
      ["ESXi/ESX a vCenter", "Hypervisor běží na fyzickém serveru a poskytuje CPU, RAM, síť a disky virtuálním strojům. vCenter spravuje více hostů, clustery, oprávnění a operace. Výpadek vCenter zpravidla nevypne běžící VM, ale omezuje management a automatizaci."],
      ["HA, DRS a vMotion", "HA při definovaných poruchách restartuje VM na jiném hostu. DRS vyhodnocuje umístění zátěže a může použít vMotion. vMotion živě přesouvá běžící VM a potřebuje funkční zdrojový host. Po náhlém pádu se obvykle používá restart přes HA."],
      ["Clusterová rezerva", "N+1 znamená schopnost zvládnout ztrátu jedné uvažované jednotky. Rezerva se posuzuje zvlášť pro CPU, RAM, storage a síť. Údržba jednoho hostu může spotřebovat rezervu právě ve chvíli, kdy selže další."],
      ["SDM/PM pohled", "Mapuj aplikaci na VM, hosty, cluster, datastore, síť a backup. Při incidentu rozlišuj nedostupný management, degradovanou redundanci a skutečný dopad na službu. VMware Tools heartbeat není syntetický test obchodní transakce."],
    ],
    scenario: "Host náhle selže. HA restartuje VM, ale databáze přehrává logy a aplikace ještě deset minut nefunguje. Dosažené RTO se měří návratem služby, ne okamžikem zapnutí VM.",
    source: "https://www.vmware.com/products/cloud-infrastructure/vsphere"
  },
  {
    id: "vsan", name: "VMware vSAN", vendor: "VMware by Broadcom", category: "Software-defined storage", level: "Pokročilé",
    oneLiner: "Distribuované storage vytvářené z lokálních médií hostů a řízené pomocí VM storage policies.",
    role: "HCI / disaggregated storage", scaling: "Hosty nebo podporovanými storage uzly", protocols: "vSAN interní datová síť",
    terms: ["vsan", "hci", "osa", "esa", "storage-policy", "ftt", "resync", "witness"],
    sections: [
      ["Princip", "vSAN distribuuje objekty VM mezi hosty podle storage policy. Lokální disky se stanou součástí společného datastore. Síť mezi hosty je kritická datová cesta, nikoli jen management."],
      ["OSA a ESA", "Original Storage Architecture používá diskové skupiny s cache a capacity tierem. Express Storage Architecture je navržena pro kvalifikovaná NVMe zařízení a nemá stejný cache model. Upgrade verze OSA clusteru automaticky neznamená konverzi na ESA."],
      ["Policies a resync", "FTT a způsob ochrany určují počet a rozložení komponent. Po poruše nebo údržbě může probíhat resync. VM mohou běžet, zatímco cluster ještě nemá plnou ochranu. Volná kapacita musí pokrýt provoz i opravu."],
      ["SDM/PM pohled", "Před maintenance kontroluj health, compliance policies, resync backlog a rezervu. U stretched clusteru rozlišuj datové lokality, witness, síťové latence a rozhodnutí při partition."],
    ],
    scenario: "Jeden disk selže a vSAN zahájí opravu. Další plánovaný zásah může odstranit další fault domain dříve, než se ochrana obnoví. Zelené VM nejsou jediným kritériem go/no-go.",
    source: "https://www.vmware.com/docs/vmw-vsan-faqs"
  },
  {
    id: "nsx", name: "NSX / VCF Networking", vendor: "VMware by Broadcom", category: "Networking", level: "Pokročilé",
    oneLiner: "Softwarově definované sítě, segmenty, routing a cloudový VPC model nad fyzickou underlay sítí.",
    role: "Network virtualization", scaling: "Hosty, edges, VPC a domény", protocols: "Overlay/underlay networking",
    terms: ["nsx", "overlay", "underlay", "vpc", "east-west", "north-south", "tep", "bgp", "vlan"],
    sections: [
      ["Overlay a underlay", "Underlay je fyzická síť, která přenáší pakety. Overlay vytváří logické sítě nad ní. Virtuální síť neodstraňuje fyzické závislosti: MTU, routing, kapacitu, kabeláž a dostupnost přepínačů."],
      ["East–west a north–south", "East–west je komunikace mezi workloady uvnitř prostředí. North–south spojuje prostředí s okolím. Distribuované funkce mohou provoz zpracovat na hostu, některé hraniční služby používají Edge komponenty."],
      ["VCF VPC", "VCF 9 používá Virtual Private Cloud jako logicky oddělený prostor pro projekty nebo tenanty. Transit Gateway propojuje VPC a další sítě. Zákazník může podle návrhu stále používat VLAN-backed port groups."],
      ["SDM/PM pohled", "Stanov hranici odpovědnosti fyzické sítě, virtualizačního týmu a security. V předání vyžaduj IP plán, DNS/NTP, MTU, routing, pravidla, monitoring a diagnostický postup."],
    ],
    scenario: "Logický segment existuje, ale workload nemá konektivitu kvůli nesprávné MTU v underlay. Úspěšná konfigurace NSX není důkazem funkční end-to-end cesty.",
    source: "https://www.vmware.com/products/cloud-infrastructure/networking"
  },
  {
    id: "vdefend", name: "VMware vDefend", vendor: "VMware by Broadcom", category: "Security", level: "Pokročilé",
    oneLiner: "Lateral security a distribuovaný firewall pro mikrosegmentaci workloadů ve VCF.",
    role: "Microsegmentation", scaling: "S workloady a bezpečnostními politikami", protocols: "Distribuované L4–L7 policy dle licence",
    terms: ["microsegmentation", "distributed-firewall", "zero-trust", "east-west", "rbac", "least-privilege"],
    sections: [
      ["Mikrosegmentace", "Pravidla omezují, které workloady spolu smějí komunikovat. Cílem je zmenšit lateral movement po kompromitaci jednoho systému. Politiky mohou využívat skupiny a tagy místo ručních seznamů IP adres."],
      ["Co firewall neřeší", "Nenahrazuje patching, EDR, identity, ochranu záloh ani incident response. Povoleným aplikačním portem může projít škodlivý požadavek. Zero Trust je provozní princip, nikoli jeden produkt."],
      ["Zavedení", "Nejdříve zmapuj reálné aplikační toky, batch úlohy, backup a monitoring. Poté navrhni pravidla, otestuj je a teprve následně přejdi k enforcementu. Každá výjimka potřebuje vlastníka, důvod a expiraci."],
      ["SDM/PM pohled", "Koordinuj vlastníky aplikací a security, stanov akceptaci a rollback, hlídej licenční rozsah. NSX Networking a vDefend spolu souvisejí, ale základní síťová instalace nedokazuje nárok na všechny bezpečnostní funkce."],
    ],
    scenario: "Aplikace funguje přes den, ale noční dávka je po zpřísnění pravidel blokovaná. Mapování komunikace musí zahrnout všechny provozní režimy, ne jen interaktivní test.",
    source: "https://www.vmware.com/products/security/vdefend-distributed-firewall"
  },
  {
    id: "vcf", name: "VMware Cloud Foundation", vendor: "VMware by Broadcom", category: "Private cloud", level: "Pokročilé",
    oneLiner: "Integrovaná platforma privátního cloudu pro virtualizaci, storage, networking, operations a automation.",
    role: "Private cloud platform", scaling: "Clustery, workload domains, instances a fleets", protocols: "Integrovaný SDDC stack",
    terms: ["vcf", "management-domain", "workload-domain", "fleet", "sddc-manager", "vcf-operations", "vcf-automation", "lcm"],
    sections: [
      ["Architektonické úrovně", "Hosty tvoří clustery, clustery patří do workload domains, instance obsahuje management domain a další domains a více instancí může být řízeno jako fleet. Workload domain není Active Directory doména."],
      ["Management domain", "Hostuje základní řídicí komponenty VCF instance. Její dostupnost ovlivňuje lifecycle a správu, i když některé workloady nadále běží. Je třeba chránit také management, DNS, NTP, identity, certifikáty a klíče."],
      ["VCF 9", "VCF 9 rozvíjí společný installer, fleet operations, VPC networking a automatizaci. Přesné workflow a podporovaná storage se liší mezi 9.0, 9.1 a dalšími releasy; označení „VCF 9“ nestačí pro implementační plán."],
      ["SDM/PM pohled", "Řiď komponentový lifecycle jako jeden program se závislostmi, nikoli jako nezávislé patche. Rozlišuj greenfield, import existujícího prostředí a migraci workloadů. Instalace prázdné platformy není dokončená obchodní služba."],
    ],
    scenario: "Nová VCF farma je technicky nasazená, ale chybí katalog služeb, backup, monitoring a role. Projekt dokončil infrastrukturu, nikoli provozně převzatý privátní cloud.",
    source: "https://www.vmware.com/products/cloud-infrastructure/vmware-cloud-foundation"
  },
  {
    id: "dell-private-cloud", name: "Dell Private Cloud", vendor: "Dell Technologies", category: "Private cloud", level: "Pokročilé",
    oneLiner: "Automatizované privátní cloudy na modulární Dell infrastruktuře s validovanými blueprinty a odděleným škálováním.",
    role: "Private cloud infrastructure", scaling: "Nezávislé compute, storage a clustery", protocols: "Dell Automation Platform + podporovaný cloud stack",
    terms: ["disaggregated", "blueprint", "orchestration", "lcm", "private-cloud", "byol", "automation"],
    sections: [
      ["Disaggregated infrastructure", "Compute a storage jsou oddělené resource pools a mohou růst podle rozdílné potřeby. Cílem je spojit flexibilitu 3-tier architektury s automatizovaným nasazením a lifecycle. Síť a interoperabilita zůstávají zásadní."],
      ["Dell Automation Platform", "Portál, katalog a orchestrátor používají validované blueprinty pro sestavení podporovaného řešení. Automatizace potřebuje připravený inventář, IP adresy, přístupy a kompatibilitu; neurčuje sama požadavky aplikace."],
      ["Softwarové ekosystémy", "Veřejné materiály uvádějí VMware, Red Hat OpenShift a Nutanix, s dalšími nabídkami podle dostupnosti. Bring-your-own-license neznamená, že lze každý historický kontrakt převést bez ověření."],
      ["SDM/PM pohled", "Vyžádej přesný blueprint a verzi, podporovaný hardware, automatizované i ruční kroky, lifecycle a eskalaci mezi Dell a dodavatelem cloudového softwaru. Repurpose hardwaru není automatická migrace aplikací."],
    ],
    scenario: "Firma chce změnit hypervisor a znovu použít hardware. Platforma může repurpose podporovat, ale migrace VM, sítí, backupů a licencí zůstává samostatný projekt.",
    source: "https://www.dell.com/en-ca/lp/dt/private-cloud"
  },
  {
    id: "san", name: "SAN a Fibre Channel", vendor: "Průřezové téma", category: "Networking", level: "Středně pokročilé",
    oneLiner: "Specializovaná infrastruktura pro blokový přístup mezi hosty a storage poli.",
    role: "Storage connectivity", scaling: "Porty, switche, fabrics a cesty", protocols: "FC, případně IP storage v širším kontextu",
    terms: ["san", "fc", "hba", "wwpn", "zoning", "lun-masking", "multipathing", "fabric"],
    sections: [
      ["Co je SAN", "SAN je síť a soubor komponent, nikoli samotné diskové pole. Datová cesta vede od hostitelského adaptéru přes jednu či více fabrics k portům storage. Porucha může být na kterémkoli místě této cesty."],
      ["Zoning a LUN masking", "Zoning určuje, které FC iniciátory a targety se v síti vidí. LUN masking nebo mapping na poli určuje, které volume host dostane. Správná zóna tedy ještě nezaručuje správně prezentovaný LUN."],
      ["Multipathing", "Host udržuje více cest ke stejnému zařízení. Dvě viditelné cesty nemusí být fyzicky nezávislé. Návrh se ověřuje testem výpadku adaptéru, linky, switche a portu pole podle podporovaného postupu."],
      ["SDM/PM pohled", "Potřebuješ schéma obou větví, vlastníky host/fabric/storage, support, monitoring a test redundance. Při incidentu koordinuj stejnou časovou osu a nerozděluj jednu cestu do nesouvisejících tiketů bez společného řízení."],
    ],
    scenario: "Host vidí čtyři cesty, ale všechny vedou jedním fyzickým switchem. Dashboard ukazuje multipathing, přesto existuje single point of failure.",
    source: "https://www.dell.com/en-us/shop/storage/sf/powervault"
  }
];

const glossary = [
  ["active-active", "Active/active", "Obě řídicí nebo servisní strany mohou současně obsluhovat provoz. Konkrétní rozložení I/O a failover se liší podle produktu; název negarantuje rovnoměrné využití všech cest."],
  ["air-gap", "Air gap", "Fyzické nebo logické oddělení chráněného prostředí. Operational air gap otevírá spojení pouze na řízenou dobu a za stanovených podmínek."],
  ["api", "API", "Programové rozhraní, přes které aplikace používá funkce jiné služby. Kompatibilita se posuzuje podle konkrétních operací a verzí."],
  ["application-consistent", "Application-consistent backup", "Kopie vytvořená s koordinací aplikace tak, aby její data tvořila podporovaný konzistentní bod pro obnovu."],
  ["asset", "Asset", "Objekt spravovaný nebo chráněný službou, například VM, databáze, filesystem nebo Kubernetes namespace."],
  ["automation", "Automation", "Provedení definovaných kroků softwarem. Zvyšuje opakovatelnost, ale stále potřebuje správné vstupy, hranice a akceptaci."],
  ["backup", "Backup", "Historická ochranná kopie určená k obnově. Její hodnota se prokazuje použitelným recovery pointem a restore testem."],
  ["bgp", "BGP", "Směrovací protokol používaný mezi síťovými systémy; v datacentru může propojovat fyzickou fabric a virtualizovanou síť."],
  ["block-storage", "Block storage", "Úložiště poskytující hostu adresovatelná bloková zařízení. Filesystem nebo databázovou strukturu nad nimi spravuje konzument."],
  ["blueprint", "Blueprint", "Verzovaný, parametrizovaný předpis pro automatizované sestavení nebo změnu podporovaného řešení."],
  ["bucket", "Bucket", "Logický kontejner objektů v S3 objektovém úložišti. Obsahuje objekty, politiky a další nastavení podle implementace."],
  ["byol", "BYOL", "Bring Your Own License: zákazník přináší vlastní oprávnění k softwaru. Přenositelnost konkrétní licence se ověřuje smluvně."],
  ["cbt", "CBT", "Changed Block Tracking: evidence změněných bloků, kterou mohou podporované backup nástroje využít pro inkrementální ochranu VM."],
  ["clean-room", "Clean room", "Kontrolované prostředí pro bezpečnou obnovu a ověření systémů před jejich návratem do produkce."],
  ["cluster", "Cluster", "Skupina koordinovaných uzlů. Význam uzlu a sdílených služeb se liší podle produktu."],
  ["compression", "Komprese", "Zmenšení reprezentace dat. Výsledek závisí na jejich typu; již komprimovaná nebo šifrovaná data se zmenšují málo."],
  ["consistency-group", "Consistency group", "Skupina storage objektů, jejichž kopie nebo replikace mají zachovat vzájemně sladěný bod."],
  ["crash-consistent", "Crash-consistent backup", "Kopie odpovídající přibližně stavu po náhlém vypnutí; aplikace může po obnově provádět vlastní recovery."],
  ["cyber-vault", "Cyber vault", "Oddělené prostředí pro kritické ochranné kopie a proces obnovy po kybernetické události."],
  ["cybersense", "CyberSense", "Analytická komponenta Dell Cyber Recovery pro hledání známek poškození dat. Není sama zárukou čistoty celé aplikace."],
  ["datastore", "Datastore", "Logický storage prostor, do kterého vSphere ukládá virtuální stroje a jejich objekty."],
  ["dd-boost", "DD Boost", "Integrační technologie mezi podporovanými backup aplikacemi a Data Domain pro efektivní datovou cestu a správu storage units."],
  ["deduplication", "Deduplikace", "Omezení opakovaného fyzického ukládání stejných datových segmentů."],
  ["disaggregated", "Disaggregated infrastructure", "Model s oddělenými resource pools, kde lze například compute a storage škálovat nezávisle."],
  ["distributed-firewall", "Distributed Firewall", "Firewallová funkce aplikovaná distribuovaně blízko workloadu místo jediného centrálního průchodu."],
  ["drs", "DRS", "Distributed Resource Scheduler: vyhodnocuje potřeby VM a dostupné zdroje a řídí nebo doporučuje jejich umístění."],
  ["east-west", "East–west traffic", "Komunikace mezi workloady uvnitř datacentra nebo cloudového prostředí."],
  ["erasure-coding", "Erasure coding", "Rozdělení dat na datové a opravné fragmenty, které umožní rekonstrukci po definovaném počtu poruch."],
  ["esa", "vSAN ESA", "Express Storage Architecture: novější vSAN architektura navržená pro kvalifikovaná NVMe zařízení."],
  ["esxi", "ESXi / ESX", "Bare-metal hypervisor VMware, který poskytuje fyzické prostředky virtuálním strojům."],
  ["fabric", "Fabric", "Propojovací infrastruktura, například nezávislá FC síť nebo Ethernetová leaf-spine síť."],
  ["fault-domain", "Fault domain", "Skupina prvků, které mohou selhat společně: disk, server, chassis, rack, fabric, lokalita nebo identitní doména."],
  ["fc", "Fibre Channel", "Technologie pro blokový storage provoz přes specializovanou fabric. Host obvykle používá HBA a WWPN."],
  ["file-storage", "File storage", "Úložiště zpřístupňující soubory a adresáře přes protokoly jako SMB nebo NFS."],
  ["fleet", "VCF Fleet", "Úroveň společného provozního řízení jedné nebo více VCF instancí v architektuře VCF 9."],
  ["ftt", "FTT", "Failures To Tolerate: požadavek storage policy na toleranci definovaných poruch."],
  ["ha", "vSphere HA", "Clusterová služba, která při definovaných poruchách restartuje postižené VM na dostupných hostech."],
  ["hba", "HBA", "Host Bus Adapter: adaptér hostu pro připojení ke storage fabric, typicky Fibre Channel."],
  ["hci", "HCI", "Hyperconverged Infrastructure: compute a software-defined storage běží na společných uzlech."],
  ["immutability", "Immutability", "Vlastnost kopie, která po definovanou dobu omezuje změnu nebo smazání i privilegovanými účty podle konkrétní implementace."],
  ["iscsi", "iSCSI", "Přenos SCSI příkazů přes TCP/IP. Používá IP síť, ale potřebuje návrh redundance, kapacity a multipathingu."],
  ["lcm", "Lifecycle management", "Koordinované řízení verzí, patchů, firmware, ovladačů, kompatibility a podporovaného postupu změn."],
  ["least-privilege", "Least privilege", "Princip, podle kterého subjekt dostává pouze oprávnění nezbytná pro svou roli a dobu."],
  ["lun", "LUN / volume", "Logické blokové zařízení prezentované hostu. Moderní protokoly mohou používat jiné názvy, například NVMe namespace."],
  ["lun-masking", "LUN masking", "Pravidlo na storage poli určující, který host nebo host group smí vidět konkrétní volume."],
  ["management-domain", "VCF Management Domain", "Doména hostující základní řídicí komponenty VCF instance. Není to Active Directory doména."],
  ["mdm", "PowerFlex MDM", "Metadata Manager řídící metadata a konfiguraci PowerFlex systému; není zjednodušeně centrální datovou cestou."],
  ["metadata", "Metadata", "Data popisující jiná data, například jméno, vlastník, oprávnění, objektový klíč nebo umístění komponent."],
  ["microsegmentation", "Mikrosegmentace", "Jemné řízení komunikace mezi jednotlivými workloady nebo aplikačními vrstvami."],
  ["multipathing", "Multipathing", "Použití více storage cest k jednomu zařízení pro odolnost a podle implementace i rozložení provozu."],
  ["nas", "NAS", "Network-Attached Storage: síťové souborové úložiště."],
  ["namespace", "Namespace", "Logický prostor jmen, například jednotný adresářový strom v distribuovaném filesystemu."],
  ["nfs", "NFS", "Síťový souborový protokol běžný v Unix/Linux prostředí a podporovaný i pro VMware datastory."],
  ["north-south", "North–south traffic", "Komunikace mezi datacentrem/cloudem a externí sítí nebo uživateli."],
  ["numa", "NUMA", "Architektura serveru, ve které má CPU rychlejší přístup k lokální části paměti než ke vzdálené paměti jiného socketu."],
  ["nvme", "NVMe / NVMe-oF", "Moderní protokol pro nevolatilní paměti; NVMe-oF jej přenáší přes podporovanou fabric, například FC nebo TCP."],
  ["object-lock", "S3 Object Lock", "S3 mechanismus retenční ochrany objektů. Musí jej podporovat platforma i klient a musí být správně nastaven."],
  ["object-storage", "Object storage", "Úložiště pracující s objekty, klíči a metadaty přes API, často S3."],
  ["onefs", "OneFS", "Distribuovaný filesystem a operační prostředí Dell PowerScale."],
  ["orchestration", "Orchestrace", "Koordinace více automatizovaných kroků, systémů a závislostí do jednoho workflow."],
  ["osa", "vSAN OSA", "Original Storage Architecture: původní vSAN model s diskovými skupinami a oddělenou cache/capacity rolí."],
  ["overlay", "Overlay network", "Logická síť vytvořená nad fyzickou underlay sítí, často pomocí tunelování."],
  ["private-cloud", "Private cloud", "Cloudový provozní model na vyhrazené infrastruktuře s automatizací, katalogem, governance a samoobslužnými službami."],
  ["protection-domain", "Protection Domain", "PowerFlex hranice sdružující SDS a storage pooly pro izolaci a ochranu."],
  ["protection-policy", "Protection policy", "Pravidla definující, které assets se chrání, jak často, kam, jak dlouho a jakým způsobem."],
  ["qos", "QoS", "Quality of Service: mechanismy pro řízení priorit, limitů nebo zajištění výkonu sdílených prostředků."],
  ["quota", "Kvóta", "Logický limit spotřeby kapacity. Nemusí znamenat fyzické oddělení zdrojů."],
  ["raid", "RAID / distribuovaná ochrana", "Mechanismy ukládání redundantních dat nebo parity pro zvládnutí definovaných poruch médií."],
  ["ransomware", "Ransomware", "Útok, který omezuje dostupnost dat typicky šifrováním nebo destrukcí a může zasáhnout i online zálohy."],
  ["rbac", "RBAC", "Role-Based Access Control: oprávnění se přiřazují rolím a role uživatelům či službám."],
  ["readynode", "ReadyNode", "Výrobcem validovaná serverová konfigurace pro konkrétní software-defined řešení a verzi."],
  ["replication", "Replikace", "Kopírování dat do dalšího systému nebo lokality. Synchronní a asynchronní režim mají odlišný vztah k latenci a RPO."],
  ["resync", "Resync / rebuild", "Proces obnovy požadovaného rozložení a ochrany dat po změně nebo poruše."],
  ["restore", "Restore", "Praktický proces návratu dat nebo služby z ochranné kopie. Úspěšný backup není důkazem úspěšného restore."],
  ["retention-lock", "Retention Lock", "Ochrana Data Domain kopií proti změně nebo smazání během nastavené retenční doby."],
  ["rpo", "RPO", "Recovery Point Objective: jak stará mohou být obnovená data, tedy tolerovaná ztráta změn v čase."],
  ["rto", "RTO", "Recovery Time Objective: cílová doba návratu služby po incidentu."],
  ["s3", "S3", "Rozšířené API pro objektové úložiště. S3-compatible neznamená automaticky podporu každé funkce AWS S3."],
  ["san", "SAN", "Storage Area Network: síťová infrastruktura pro storage přístup, typicky blokový."],
  ["sas", "SAS", "Serial Attached SCSI; používá se pro média, expanzní propojení i přímé hostitelské připojení podle kontextu."],
  ["scale-out", "Scale-out", "Rozšíření přidáním dalších uzlů nebo appliances do distribuované architektury."],
  ["scale-up", "Scale-up", "Rozšíření existujícího systému, například přidáním disků, kapacity nebo polic."],
  ["sdc", "PowerFlex SDC", "Storage Data Client zpřístupňující PowerFlex volume operačnímu systému nebo hypervisoru."],
  ["sddc-manager", "SDDC Manager", "Řídicí appliance VCF pro vybrané lifecycle a workload-domain operace podle verze platformy."],
  ["sds", "PowerFlex SDS", "Storage Data Server přispívající lokální disky do distribuovaného PowerFlex storage poolu."],
  ["smb", "SMB", "Souborový protokol běžný v prostředí Windows. Nezaměňovat s označením small and medium-sized business."],
  ["snapshot", "Snapshot", "Bodový stav dat vytvořený konkrétní technologií. Často sdílí systém a failure domain s produkcí, takže není automaticky záloha."],
  ["srdf", "SRDF", "Rodina replikačních technologií Dell PowerMax/VMAX pro synchronní, asynchronní a metro scénáře."],
  ["storage-policy", "VM Storage Policy", "Deklarace požadovaných vlastností storage objektů VM, například ochrany a dostupnosti."],
  ["tep", "TEP", "Tunnel Endpoint používaný pro zapouzdření a transport overlay síťového provozu."],
  ["thin-provisioning", "Thin provisioning", "Logické přidělení kapacity, při kterém se fyzické místo spotřebovává až skutečnými zápisy."],
  ["two-layer", "Two-layer architecture", "Oddělená compute a storage vrstva, které lze podle návrhu rozšiřovat nezávisle."],
  ["underlay", "Underlay network", "Fyzická IP/Ethernet síť přenášející overlay tunely i další provoz."],
  ["vcenter", "vCenter Server", "Centrální management VMware hostů, clusterů, VM, oprávnění a operací."],
  ["vcf", "VMware Cloud Foundation", "Integrovaná platforma privátního cloudu zahrnující compute, storage, networking, operations a automation."],
  ["vcf-automation", "VCF Automation", "Samoobslužná automatizace infrastruktury a aplikačních služeb v platformě VCF."],
  ["vcf-operations", "VCF Operations", "Provozní, kapacitní, observability a fleet management schopnosti VCF podle konkrétní verze."],
  ["vcpu", "vCPU", "Virtuální procesor přidělený VM a plánovaný hypervisorem na fyzických CPU prostředcích."],
  ["vlan", "VLAN", "Logické oddělení ethernetové broadcast domény na fyzické nebo virtuální síti."],
  ["vm", "Virtual Machine", "Virtuální počítač s vCPU, pamětí, virtuálními disky, síťovými adaptéry a guest OS."],
  ["vmotion", "vMotion", "Živá migrace běžící VM mezi kompatibilními hosty. Potřebuje funkční zdrojový host a podporovanou cílovou cestu."],
  ["vpc", "Virtual Private Cloud", "Logicky oddělené cloudové síťové prostředí pro projekt nebo tenanta s vlastními subnety a politikami."],
  ["vsan", "vSAN", "VMware software-defined storage vytvářené z médií hostů nebo podporovaných disaggregovaných storage uzlů."],
  ["vvols", "vVols", "VMware storage model, který reprezentuje data VM jako samostatné storage objekty řízené policies."],
  ["witness", "Witness", "Rozhodovací komponenta v některých distribuovaných topologiích; zpravidla není plnou další kopií všech dat."],
  ["workload-domain", "VCF Workload Domain", "Logický a lifecycle celek s vlastním vCenter a jedním nebo více clustery pro vybrané workloady."],
  ["wwpn", "WWPN", "World Wide Port Name: jednoznačný identifikátor Fibre Channel portu."],
  ["access-port", "Access port", "Switch port přenášející provoz jedné přístupové VLAN bez VLAN tagu směrem ke koncovému zařízení."],
  ["alert", "Alert", "Upozornění vytvořené při splnění definované podmínky. Alert signalizuje potřebu vyhodnocení, sám ale neurčuje příčinu ani obchodní dopad."],
  ["bare-metal", "Bare metal", "Provoz operačního systému nebo aplikace přímo na fyzickém serveru bez virtualizačního hypervisoru mezi nimi."],
  ["baseline", "Baseline", "Zdokumentovaný obraz normálního chování systému nebo služby, proti kterému lze porovnávat aktuální metriky a odchylky."],
  ["bios", "BIOS / UEFI", "Firmware serveru inicializující hardware a poskytující základní nastavení platformy před spuštěním operačního systému nebo hypervisoru."],
  ["cache", "Cache", "Rychlá dočasná vrstva uchovávající často používaná nebo čekající data, aby se omezil přístup k pomalejší vrstvě. Cache není automaticky trvalá kopie."],
  ["cpu-core", "CPU jádro", "Samostatná výpočetní jednotka uvnitř procesoru schopná vykonávat instrukce. Počet jader není jediným ukazatelem aplikačního výkonu."],
  ["data-path", "Datová cesta", "Úplný řetězec vrstev a komponent, kterými prochází požadavek od aplikace k datům a odpověď zpět."],
  ["driver", "Driver / ovladač", "Software umožňující operačnímu systému nebo hypervisoru komunikovat s konkrétním hardwarovým zařízením."],
  ["effective-capacity", "Effective kapacita", "Odhad množství logických dat, které lze uložit po započtení úspor, například komprese a deduplikace. Závisí na charakteru dat."],
  ["ethernet-frame", "Ethernetový rámec", "Jednotka dat přenášená na ethernetové linkové vrstvě, obsahující mimo jiné zdrojovou a cílovou MAC adresu."],
  ["event", "Event / událost", "Časově označený záznam změny stavu nebo významné činnosti systému. Událost nemusí znamenat poruchu."],
  ["headroom", "Headroom", "Bezpečná rezerva prostředku nad běžnou spotřebou určená pro špičky, poruchy, údržbu a růst."],
  ["initiator", "Storage initiator", "Klientská strana blokového storage spojení, typicky HBA port nebo iSCSI initiator hostu, která zahajuje komunikaci s targetem."],
  ["jumbo-frames", "Jumbo frames", "Ethernetové rámce používající větší MTU než standardních 1500 bytů. Vyžadují konzistentní podporu po celé datové cestě."],
  ["lead-time", "Lead time", "Celkový čas potřebný od zahájení požadavku po dostupný výsledek, například schválení, nákup, dodání, instalaci a změnu."],
  ["log", "Log", "Časově označený textový nebo strukturovaný záznam činnosti, stavu či chyby systému používaný pro provoz, audit a diagnostiku."],
  ["mac-address", "MAC adresa", "Identifikátor síťového rozhraní používaný ethernetovou linkovou vrstvou při komunikaci v lokální síti."],
  ["metric", "Metrika", "Číselná hodnota sledovaná v čase, například využití CPU, počet IOPS, latence nebo volná kapacita."],
  ["mtu", "MTU", "Maximum Transmission Unit: největší velikost paketu nebo payloadu přeneseného danou síťovou vrstvou bez potřeby fragmentace."],
  ["nic-teaming", "NIC teaming / bonding", "Spojení více síťových adaptérů pro redundanci a podle návrhu také rozložení provozu."],
  ["observability", "Observability / pozorovatelnost", "Schopnost odvozovat vnitřní stav systému z metrik, logů, událostí a trasování napříč jeho závislostmi."],
  ["oversubscription", "Oversubscription", "Stav, kdy je konzumentům logicky přislíbeno více zdrojů, než je fyzicky okamžitě dostupné, na základě očekávání, že je nevyužijí současně."],
  ["pdu", "PDU", "Power Distribution Unit: zařízení distribuující elektrické napájení v racku k jednotlivým IT komponentám."],
  ["percentile", "Percentil", "Statistická hranice, pod kterou leží daný podíl měření. Například p95 latence je hodnota, kterou nepřekročí 95 % operací."],
  ["queue", "Fronta / queue", "Místo, kde požadavky čekají na zpracování. Dlouhodobý růst fronty obvykle zvyšuje latenci a ukazuje na omezenou část cesty."],
  ["rack", "Rack", "Standardizovaný rám v datacentru pro montáž serverů, storage a síťových zařízení, vybavený napájením a kabelovou organizací."],
  ["rack-unit", "Rack unit / U", "Standardní jednotka výšky zařízení v racku; 1U odpovídá přibližně 44,45 mm."],
  ["random-io", "Random I/O", "Vstupně-výstupní operace přistupující k nesousedícím místům dat. Často jsou náročnější na média a cache než sekvenční přístup."],
  ["raw-capacity", "Raw kapacita", "Součet jmenovitých kapacit fyzických úložných médií před odečtením ochrany dat, systémové režie a rezerv."],
  ["router", "Router", "Síťové zařízení nebo funkce směrující IP pakety mezi různými subnety podle směrovací tabulky."],
  ["sequential-io", "Sekvenční I/O", "Čtení nebo zápis sousedících dat v pořadí, typický například pro velké soubory a některé backup workloady."],
  ["site-readiness", "Site readiness", "Ověření připravenosti lokality před instalací: rack, napájení, chlazení, kabeláž, porty, adresace, přístupy a odpovědnosti."],
  ["socket", "CPU socket", "Fyzická pozice procesoru na základní desce serveru. Jeden socket obsahuje procesor s více jádry."],
  ["storage", "Storage", "Technologická vrstva pro dlouhodobé ukládání a zpřístupnění dat pomocí blokového, souborového nebo objektového modelu."],
  ["support-matrix", "Support matrix", "Oficiální matice výrobcem podporovaných kombinací modelů, verzí firmwaru, driverů, operačních systémů, hypervisorů a dalších závislostí."],
  ["switch", "Síťový switch", "Zařízení propojující síťové porty a přeposílající ethernetové rámce podle MAC adres; podle typu může poskytovat i další funkce."],
  ["target", "Storage target", "Serverová strana blokového storage spojení poskytovaná portem nebo službou úložného systému initiatorům."],
  ["trace", "Trace / trasování", "Záznam průchodu jednoho požadavku přes více komponent nebo služeb, používaný pro analýzu distribuovaných systémů."],
  ["trunk-port", "Trunk port", "Switch port přenášející více VLAN, obvykle s označením rámců pomocí standardu 802.1Q."],
  ["ups", "UPS", "Uninterruptible Power Supply: záložní napájecí systém, který krátkodobě udržuje provoz a překlene výpadek nebo přechod na generátor."],
  ["usable-capacity", "Usable kapacita", "Kapacita dostupná po odečtení ochrany dat, systémové režie, formátování a povinných rezerv od raw kapacity."],
  ["application", "Aplikace", "Software, který poskytuje konkrétní funkci uživateli nebo jinému systému. Aplikace obvykle závisí na operačním systému, síti, datech a infrastruktuře."],
  ["availability", "Dostupnost", "Schopnost služby plnit požadovanou funkci v dohodnutém čase. Vyjadřuje se často procentem a musí mít přesně definovaný způsob měření."],
  ["bandwidth", "Bandwidth / šířka pásma", "Maximální teoretická nebo smluvená přenosová kapacita komunikační cesty. Sama o sobě neříká skutečnou rychlost aplikace."],
  ["capacity", "Kapacita", "Množství zdroje, které je k dispozici nebo se spotřebovává, například úložný prostor, RAM, CPU čas či síťová propustnost."],
  ["cpu", "CPU", "Central Processing Unit: procesor vykonávající instrukce programů. U serveru jsou důležité počty socketů, jader, frekvence a architektura."],
  ["database", "Databáze", "Systém pro strukturované ukládání a řízený přístup k datům. Databázová služba zahrnuje software, data, logy, konfiguraci i provozní závislosti."],
  ["datacenter", "Datacentrum", "Prostředí pro bezpečný provoz IT infrastruktury: servery, storage, sítě, napájení, chlazení, fyzická ochrana a provozní procesy."],
  ["dns", "DNS", "Domain Name System překládá jména na IP adresy a poskytuje další záznamy. Porucha DNS může vyřadit službu i tehdy, když její servery běží."],
  ["failure-domain", "Failure domain", "Skupina komponent, které může zasáhnout jedna společná porucha, například server, rack, napájecí větev, datový sál nebo lokalita."],
  ["firmware", "Firmware", "Nízká softwarová vrstva zařízení uložená v jeho nevolatilní paměti. Řídí hardware a musí být kompatibilní s ovladači a ostatními komponentami."],
  ["filesystem", "Filesystem", "Struktura, kterou operační systém používá k organizaci souborů a adresářů nad blokovým zařízením nebo vzdálenou souborovou službou."],
  ["gateway", "Default gateway", "Síťový uzel, kterému zařízení předává provoz určený mimo vlastní IP subnet."],
  ["hardware", "Hardware", "Fyzické součásti IT systému, například server, procesor, paměť, disk, síťový adaptér, switch nebo napájecí zdroj."],
  ["incident", "Incident", "Neplánované přerušení služby nebo snížení její kvality. Cílem incident managementu je co nejrychlejší obnova služby a řízení dopadu."],
  ["iops", "IOPS", "Počet vstupně-výstupních operací za sekundu. Bez velikosti bloků, poměru čtení/zápisu a latence nemá samotná hodnota úplný význam."],
  ["ip-address", "IP adresa", "Logická síťová adresa rozhraní v IP síti. Společně s maskou určuje, která část označuje síť a která konkrétní zařízení."],
  ["latency", "Latence", "Doba mezi požadavkem a odpovědí nebo mezi odesláním a doručením dat. U storage se běžně sleduje v milisekundách či mikrosekundách."],
  ["memory", "RAM", "Rychlá pracovní paměť používaná běžícími programy. Je volatilní: po ztrátě napájení její obsah běžně zaniká."],
  ["nic", "NIC", "Network Interface Card: fyzický nebo virtuální síťový adaptér připojující zařízení k síti."],
  ["ntp", "NTP", "Network Time Protocol synchronizuje čas systémů. Přesný čas je nutný pro logy, autentizaci, certifikáty, clustery a vyšetřování incidentů."],
  ["operating-system", "Operační systém", "Základní software spravující hardware a poskytující služby aplikacím, například procesy, paměť, zařízení, filesystem a síť."],
  ["problem-management", "Problem management", "Proces hledání a řízení základních příčin opakovaných nebo významných incidentů. Výsledkem může být workaround i trvalá náprava."],
  ["protocol", "Protokol", "Dohodnutá pravidla komunikace mezi systémy, včetně formátu zpráv, pořadí kroků a reakcí na chyby."],
  ["redundancy", "Redundance", "Záměrné zdvojení nebo rozmnožení komponent či cest, aby porucha jedné části nemusela přerušit službu."],
  ["server", "Server", "Počítač nebo softwarový proces poskytující služby jiným systémům. Fyzický server obvykle obsahuje CPU, RAM, síťová rozhraní, lokální storage a management."],
  ["service", "IT služba", "Výsledek poskytovaný zákazníkovi nebo uživateli prostřednictvím kombinace lidí, procesů, aplikací, dat a technologií."],
  ["sla", "SLA", "Service Level Agreement: dohoda o měřitelné úrovni služby, například dostupnosti, době reakce nebo obnovy, včetně podmínek a výjimek."],
  ["software", "Software", "Programový kód, konfigurace a související data, které dávají hardwaru konkrétní funkci."],
  ["spof", "Single Point of Failure", "Komponenta bez dostatečné náhrady, jejíž jediná porucha způsobí nedostupnost služby nebo ztrátu požadované funkce."],
  ["subnet", "IP subnet", "Logická část IP sítě definovaná síťovou adresou a maskou. Zařízení ve stejném subnetu spolu obvykle komunikují přímo na druhé vrstvě."],
  ["throughput", "Throughput / propustnost", "Skutečné množství dat přenesené za jednotku času, například MB/s nebo Gb/s. Ovlivňuje jej celý řetězec komponent."],
  ["workload", "Workload", "Konkrétní aplikační nebo výpočetní zátěž se svými požadavky na CPU, paměť, síť, storage, dostupnost a ochranu dat."],
  ["zero-trust", "Zero Trust", "Bezpečnostní princip průběžného ověřování, minimálních oprávnění a omezení implicitní důvěry."],
  ["zoning", "FC zoning", "Konfigurace FC fabric určující, které iniciátory a targety se mohou navzájem vidět."],
].map(([id, term, definition]) => ({ id, term, definition }));

const glossaryCategories = {
  "Datacentrum a fyzická infrastruktura": ["datacenter","rack","rack-unit","pdu","ups","site-readiness","failure-domain","hardware"],
  "Compute a operační systémy": ["cpu","cpu-core","socket","numa","memory","server","bare-metal","bios","driver","firmware","operating-system","application","software","workload","cache","headroom"],
  "Síť a konektivita": ["nic","nic-teaming","mac-address","ethernet-frame","switch","router","vlan","access-port","trunk-port","ip-address","subnet","gateway","mtu","jumbo-frames","dns","ntp","protocol","bandwidth","underlay","overlay","north-south","east-west"],
  "Storage a SAN": ["storage","block-storage","file-storage","object-storage","san","fc","iscsi","sas","hba","wwpn","zoning","lun-masking","initiator","target","multipathing","lun","filesystem","raid","thin-provisioning","raw-capacity","usable-capacity","effective-capacity","oversubscription","random-io","sequential-io","data-path","queue","iops","throughput","latency","percentile"],
  "Virtualizace a cloud": ["hypervisor","vm","vcpu","vcenter","vmotion","vsan","storage-policy","datastore","cluster","readynode","private-cloud","vcf","workload-domain","sddc-manager","orchestration"],
  "Dostupnost a ochrana dat": ["availability","redundancy","spof","ha","rpo","rto","backup","restore","snapshot","replication","retention-lock","ransomware","air-gap","cyber-recovery"],
  "Provoz a observability": ["service","sla","incident","problem-management","capacity","lead-time","support-matrix","metric","log","event","alert","trace","observability","baseline","qos"],
  "Bezpečnost a identita": ["rbac","zero-trust","microsegmentation","identity","encryption","object-lock"]
};

for (const item of glossary) {
  item.category = Object.entries(glossaryCategories).find(([,ids])=>ids.includes(item.id))?.[0] || "Enterprise infrastruktura";
}

const glossaryAliases = [
  ["IT služba","service"],["služba","service"],["server","server"],["CPU","cpu"],["RAM","memory"],["storage","storage"],
  ["firmware","firmware"],["driver","driver"],["ovladač","driver"],["support matrix","support-matrix"],["rack","rack"],["PDU","pdu"],["UPS","ups"],
  ["socket","socket"],["jádro","cpu-core"],["cache","cache"],["bare metal","bare-metal"],["headroom","headroom"],["workload","workload"],
  ["VLAN","vlan"],["subnet","subnet"],["gateway","gateway"],["DNS","dns"],["NTP","ntp"],["firewall","firewall"],["MTU","mtu"],["jumbo frames","jumbo-frames"],
  ["SAN","san"],["LUN","lun"],["zoning","zoning"],["LUN masking","lun-masking"],["initiator","initiator"],["target","target"],["multipathing","multipathing"],
  ["datová cesta","data-path"],["IOPS","iops"],["throughput","throughput"],["latence","latency"],["percentil","percentile"],["baseline","baseline"],
  ["monitoring","monitoring"],["metrika","metric"],["log","log"],["alert","alert"],["observability","observability"],["failure domain","failure-domain"],
  ["redundance","redundancy"],["SPOF","spof"],["snapshot","snapshot"],["backup","backup"],["RPO","rpo"],["RTO","rto"]
].filter(([,id])=>glossary.some(item=>item.id===id));

const quizQuestions = [
  ["PowerVault", "Co se při typickém scale-up rozšíření PowerVaultu mění jako první?", ["Počet VCF workload domains", "Fyzické disky nebo rozšiřující police", "Počet ESXi clusterů", "Počet NSX Edge uzlů"], 1, "PowerVault se typicky škáluje uvnitř existujícího pole přidáním podporovaných médií nebo polic."],
  ["PowerVault", "Proč přidání disků nemusí úměrně zvýšit výkon?", ["Protože zmizí multipathing", "Protože řadiče a hostitelské porty zůstávají sdíleným limitem", "Protože disky nepřidávají kapacitu", "Protože VMFS zakazuje rozšíření"], 1, "Kapacita může růst rychleji než výkon řadičů, portů nebo SAN/IP cest."],
  ["Storage", "Kdo typicky vytváří filesystem nad blokovým LUN?", ["Host, hypervisor nebo aplikace", "FC switch", "DNS server", "Objektový bucket"], 0, "Block storage poskytuje blokové zařízení; vyšší strukturu nad ním vytváří konzument."],
  ["SAN", "Jaký je rozdíl mezi zoningem a LUN maskingem?", ["Žádný", "Zoning řídí viditelnost ve fabric, masking prezentaci volume na poli", "Zoning řídí backup, masking DNS", "Masking funguje jen pro NFS"], 1, "Jde o dvě odlišné vrstvy přístupu."],
  ["VMware", "Co typicky udělá vSphere HA po náhlém pádu hostu?", ["Provede vMotion z vypnutého hostu", "Restartuje postižené VM na dostupných hostech", "Obnoví VM ze zálohy", "Automaticky přepne celou lokalitu"], 1, "Živá migrace vyžaduje fungující zdroj. HA standardně restartuje VM."],
  ["VMware", "Co je hlavní rolí DRS?", ["Dlouhodobá archivace", "Řízení umístění VM podle zdrojů a pravidel", "FC zoning", "Neměnnost záloh"], 1, "DRS vyhodnocuje dostupné compute zdroje a může doporučit nebo provést migrace."],
  ["vSAN", "Co znamená, že VM běží během resync?", ["Cluster má automaticky plnou ochranu", "Aplikace je určitě obnovitelná", "Provoz může fungovat v degradovaném stavu", "Witness obsahuje kompletní kopii dat"], 2, "Dostupnost workloadu a plná redundance jsou různé stavy."],
  ["PowerStore", "Co vyjadřuje active/active?", ["Oba řadiče mohou obsluhovat provoz", "Každé I/O vždy prochází všemi cestami", "Pole nepotřebuje multipathing", "Každá appliance je samostatný tenant"], 0, "Konkrétní rozložení provozu stále závisí na architektuře a hostitelské konfiguraci."],
  ["PowerMax", "Jaké riziko neřeší samotná synchronní replikace?", ["Poruchu média", "Logickou chybu nebo šifrování replikované na druhou stranu", "Ztrátu primárního portu", "Vzdálenost mezi lokalitami"], 1, "Replikace může velmi rychle vytvořit stejnou chybnou kopii."],
  ["Object", "Proč S3 kompatibilita neznamená totožné chování s AWS S3?", ["S3 nemá API", "Implementace mohou podporovat různý rozsah funkcí", "S3 funguje pouze na pásce", "Objekty nemají metadata"], 1, "Vždy se ověřuje konkrétní klient a požadované API funkce."],
  ["PowerScale", "Který parametr je zásadní vedle celkové kapacity?", ["Pouze počet racků", "Počet a velikost souborů a metadata workload", "Barva šasi", "Počet vCenter licencí"], 1, "Miliardy malých souborů se chovají jinak než několik velkých."],
  ["PowerFlex", "Co je výhoda two-layer architektury?", ["Compute a storage lze rozšiřovat nezávisle", "Není potřeba síť", "Každý disk je samostatný objektový bucket", "Odpadá lifecycle"], 0, "Oddělení vrstev pomáhá při rozdílném růstu CPU/RAM a storage."],
  ["Backup", "Co prokazuje úspěšný backup job?", ["Že celá služba splní RTO", "Že všechny povinné assets jsou chráněné", "Že konkrétní job dokončil definovaný krok", "Že vault je izolovaný"], 2, "Coverage, konzistence a obnovitelnost se musí ověřit samostatně."],
  ["Backup", "Jaký je rozdíl PPDM a Data Domain?", ["PPDM řídí ochranu, Data Domain ukládá ochranné kopie", "Jde o dva názvy stejného produktu", "Data Domain řídí vMotion", "PPDM je FC switch"], 0, "Jeden je řídicí backup software, druhý protection storage."],
  ["Cyber Recovery", "Co je operational air gap?", ["Trvale vytažený každý kabel", "Řízeně otevíraná a zavíraná cesta do vaultu", "VLAN pro vMotion", "Komprese záloh"], 1, "Izolace může být logická a provozně řízená."],
  ["VCF", "Je workload domain totéž co AD doména?", ["Ano", "Jen ve VCF 9.1", "Ne, je to infrastrukturní a lifecycle celek", "Pouze na VxRail"], 2, "VCF workload domain organizuje clustery a vCenter, nikoli uživatelské identity AD."],
  ["VCF", "Proč označení „VCF 9“ nestačí pro implementační plán?", ["VCF nemá verze", "Workflow a podpora se liší mezi minor releasy a buildy", "Protože vždy znamená VCF 5", "Protože neobsahuje vSphere"], 1, "Je třeba znát přesný release, build a podporovanou cestu."],
  ["Networking", "Co je underlay?", ["Fyzická síť přenášející overlay", "Backup katalog", "Storage snapshot", "Role ve vCenter"], 0, "Overlay stále závisí na fyzické IP/Ethernet konektivitě."],
  ["Security", "Co musí předcházet tvrdé mikrosegmentaci?", ["Smazání všech VLAN", "Mapování skutečných aplikačních toků", "Vypnutí monitoringu", "Zrušení backupu"], 1, "Bez znalosti toků lze zablokovat dávky, management i obnovu."],
  ["SDM", "Kdy je infrastrukturní změna opravdu akceptovaná?", ["Jakmile instalátor napíše Completed", "Po ověření managementu, datové cesty, aplikace, monitoringu a redundance", "Po objednání hardwaru", "Po vytvoření ticketu"], 1, "Technické dokončení kroku není totéž jako funkční a provozní akceptace."],
].map(([topic, question, answers, correct, explanation], index) => ({ id: index + 1, topic, question, answers, correct, explanation }));

quizQuestions.push(...[
  ["Kurz 1", "Co nejlépe vystihuje IT službu?", ["Jeden fyzický server", "Kombinace lidí, procesů, aplikací, dat a technologií přinášející uživateli výsledek", "Pouze aplikace v prohlížeči", "Libovolný produkt s podporou"], 1, "Služba je end-to-end výsledek. Samotný produkt nebo server je pouze jedna z jejích závislostí."],
  ["Kurz 1", "Jaký je hlavní rozdíl mezi RAM a trvalým úložištěm?", ["RAM je obvykle volatilní pracovní paměť, storage uchovává data dlouhodobě", "RAM slouží jen pro síť", "Storage je vždy rychlejší než RAM", "Žádný"], 0, "RAM drží aktivní pracovní stav, zatímco storage je určeno pro dlouhodobé uložení dat."],
  ["Kurz 1", "Co dělá operační systém?", ["Pouze zálohuje data", "Spravuje hardware a poskytuje služby aplikacím", "Nahrazuje datacentrum", "Funguje pouze jako firewall"], 1, "Operační systém zprostředkovává procesor, paměť, zařízení, filesystem a síť aplikacím."],
  ["Kurz 1", "Proč může porucha DNS vyřadit aplikaci, i když její server běží?", ["DNS vypne CPU", "Klienti nemusí přeložit jméno služby na správnou adresu", "DNS smaže databázi", "DNS je fyzické napájení"], 1, "Funkční server není užitečný, pokud jej závislé systémy nedokážou najít."],
  ["Kurz 1", "Co je single point of failure?", ["Každá redundantní komponenta", "Jediná nechráněná komponenta, jejíž porucha přeruší službu", "Jakýkoli alarm", "Testovací server"], 1, "SPOF je místo, kde jedna porucha stačí ke ztrátě požadované funkce."],
  ["Kurz 1", "Které tvrzení o dostupnosti je správné?", ["Je to pouze stav zapnutí serveru", "Musí být definována pro konkrétní službu, čas a způsob měření", "Je vždy 100 %", "Je totožná s výkonem"], 1, "Dostupnost bez definice služby, měřicího okna a výjimek není jednoznačná."],
  ["Kurz 1", "Co znamená workload?", ["Jméno výrobce", "Konkrétní zátěž se svými požadavky na zdroje a provoz", "Pouze velikost disku", "Seznam zaměstnanců"], 1, "Workload popisuje chování a nároky aplikace či výpočtu."],
  ["Kurz 1", "Jaký je nejlepší první krok při neznámém odborném pojmu na callu?", ["Předstírat porozumění", "Požádat o upřesnění významu v daném kontextu a zapsat rozhodnutí", "Změnit téma", "Automaticky eskalovat P1"], 1, "Stejný pojem může mít v různých produktech jiný význam. Přesná otázka snižuje riziko nedorozumění."],

  ["Kurz 2", "Které tři technologické vrstvy tvoří klasickou 3-tier architekturu?", ["Compute, network a storage", "DNS, DHCP a NTP", "CPU, licence a smlouva", "Backup, archiv a tisk"], 0, "Compute zpracovává, síť propojuje a storage trvale ukládá data."],
  ["Kurz 2", "Jaký je rozdíl mezi bandwidth a throughput?", ["Žádný", "Bandwidth je dostupná kapacita cesty, throughput skutečně dosažený přenos", "Throughput je pouze latence", "Bandwidth se týká jen disků"], 1, "Teoretická šířka pásma sama nezaručuje skutečně dosažený přenos."],
  ["Kurz 2", "Co určuje IP subnet?", ["Skupinu adres ve stejné logické síti", "RAID úroveň", "Retenci backupu", "Počet CPU jader"], 0, "Síťová adresa a maska určují rozsah adres a přímou lokální komunikaci."],
  ["Kurz 2", "K čemu slouží default gateway?", ["Ukládá soubory", "Předává provoz mimo lokální subnet", "Synchronizuje čas", "Spouští VM"], 1, "Zařízení posílá provoz do jiných sítí přes gateway/router."],
  ["Kurz 2", "Co je failure domain?", ["Skupina komponent zasažitelná jednou společnou poruchou", "Seznam hesel", "Jeden soubor", "Měsíční report"], 0, "Správný návrh odděluje kopie a redundantní cesty do různých failure domains."],
  ["Kurz 2", "Proč je synchronizace času důležitá?", ["Jen kvůli vzhledu hodin", "Pro korelaci logů, autentizaci, certifikáty a clustery", "Nahrazuje backup", "Zvyšuje kapacitu disků"], 1, "Rozdílný čas komplikuje provoz i bezpečnost a může způsobit funkční chyby."],
  ["Kurz 2", "Který údaj nejlépe popisuje odezvu?", ["Latence", "Kapacita", "Počet racků", "Retence"], 0, "Latence měří dobu od požadavku k odpovědi; propustnost a IOPS popisují jiné rozměry výkonu."],
  ["Kurz 2", "Co musí SDM udělat při hledání bottlenecku?", ["Obvinit storage", "Najít první vrstvu, kde se metriky zhoršují, a pracovat s důkazy", "Restartovat vše", "Ignorovat aplikační vrstvu"], 1, "End-to-end datová cesta vyžaduje korelovat telemetrii více vrstev."],

  ["Kurz 3", "Co je hypervisor?", ["Vrstva vytvářející a provozující virtuální stroje nad fyzickým hardwarem", "Typ zálohovací pásky", "DNS záznam", "FC kabel"], 0, "Hypervisor rozděluje fyzické zdroje mezi virtuální stroje a řídí jejich běh."],
  ["Kurz 3", "Co poskytuje block storage hostu?", ["Hierarchii souborů přes SMB", "Blokové zařízení, nad kterým host vytváří vyšší strukturu", "HTTP stránku", "Pouze metadata objektů"], 1, "Host typicky vidí LUN/volume jako disk a přidává filesystem nebo datastore."],
  ["Kurz 3", "Jakou roli má multipathing?", ["Spravuje více podporovaných cest host–storage", "Zakládá uživatele", "Komprimuje VM", "Nahrazuje RAID"], 0, "Multipathing zajišťuje failover cest a podle konfigurace také rozložení I/O."],
  ["Kurz 3", "Co znamená scale-out?", ["Výměnu názvu produktu", "Přidávání uzlů do distribuovaného systému", "Pouze přidání disků do jedné police", "Smazání clusteru"], 1, "Scale-out rozšiřuje systém o další nody, často zároveň s kapacitou a výkonem."],
  ["Kurz 3", "Proč snapshot není automaticky backup?", ["Často sdílí systém a failure domain s produkcí", "Nemá čas vytvoření", "Nelze jej nikdy obnovit", "Je vždy na pásce"], 0, "Snapshot je užitečný bodový stav, ale nemusí přežít ztrátu nebo kompromitaci zdrojového systému."],
  ["Kurz 3", "Co typicky udělá HA při pádu ESXi hostu?", ["Restartuje VM na dostupném hostu", "Provede vMotion z mrtvého hostu", "Obnoví datacentrum ze zálohy", "Změní DNS doménu"], 0, "HA reaguje na poruchu restartem VM; vMotion potřebuje fungující zdroj."],
  ["Kurz 3", "Která trojice musí být při hodnocení storage výkonu čtena společně?", ["IOPS, throughput a latence", "DNS, NTP a DHCP", "RPO, barva a hmotnost", "CPU, SLA a faktura"], 0, "Jedna metrika bez charakteru workloadu a ostatních rozměrů může být zavádějící."],
  ["Kurz 3", "Co je datastore ve VMware kontextu?", ["Logický prostor, kde mohou být uloženy soubory a objekty virtuálních strojů", "Fyzický rack", "Uživatelská role", "Síťový router"], 0, "Datastore zpřístupňuje ESXi prostor nad podporovaným storage backendem."],

  ["Kurz 4", "Co je hlavní cíl incident managementu?", ["Najít vždy kořenovou příčinu před obnovou", "Co nejrychleji obnovit službu a řídit dopad", "Provést nákup hardwaru", "Zrušit SLA"], 1, "Kořenovou příčinu může následně řešit problem management; incident se soustředí na obnovu."],
  ["Kurz 4", "Kdy je technická změna úspěšná?", ["Když skončí instalační krok", "Když jsou splněna technická i funkční validační kritéria a služba je provozně převzatá", "Po založení ticketu", "Když neexistuje rollback"], 1, "Hotový příkaz není důkazem funkční služby, monitoringu ani zachované redundance."],
  ["Kurz 4", "Co má obsahovat kvalitní eskalace?", ["Pouze větu nefunguje to", "Dopad, časovou osu, symptomy, důkazy, provedené kroky a konkrétní požadavek", "Jen jméno zákazníka", "Pouze screenshot"], 1, "Strukturovaný kontext zkracuje čas specialisty k diagnóze a rozhodnutí."],
  ["Kurz 4", "Jaký je vztah incidentu a problému?", ["Jsou vždy totožné", "Incident obnovuje službu, problem management hledá a řídí příčinu", "Problem je vždy P1", "Incident se týká jen hardware"], 1, "Jeden problém může způsobit více incidentů a workaround může službu obnovit před trvalou opravou."],
  ["Kurz 4", "Co má SDM sledovat při kapacitním řízení?", ["Trend spotřeby, headroom, limity a dobu potřebnou k rozšíření", "Pouze dnešní volnou kapacitu", "Jen pořizovací cenu", "Počet schůzek"], 0, "Kapacita se řídí s předstihem, protože nákup, dodání a změna mají vlastní lead time."],
  ["Kurz 4", "K čemu slouží RACI?", ["K přiřazení odpovědností za činnosti a rozhodnutí", "K měření latence", "K vytvoření RAID skupiny", "K překladu DNS"], 0, "RACI rozlišuje vykonavatele, konečnou odpovědnost, konzultované a informované strany."],
  ["Kurz 4", "Jak má SDM reagovat, když technické rozhodnutí přesahuje jeho kompetenci?", ["Rozhodnout bez důkazů", "Přesně formulovat otázku, dopad a termín a zapojit vlastníka nebo specialistu", "Debatu ukončit bez záznamu", "Převzít roli výrobce"], 1, "Silný SDM zná hranice role a zajistí včasné rozhodnutí správného vlastníka."],
  ["Kurz 4", "Co je účelem PIR po významné změně nebo incidentu?", ["Hledat viníka", "Zachytit výsledek, odchylky, poučení a následná opatření", "Smazat logy", "Nahradit monitoring"], 1, "Post-implementation/incident review převádí zkušenost do konkrétního zlepšení."],
].map(([topic, question, answers, correct, explanation], index) => ({ id: 21 + index, topic, question, answers, correct, explanation })));

const trainingBlocks = [
  {
    id: "foundations", order: 1, title: "Jak funguje IT služba", subtitle: "Od hardwaru a softwaru k dostupné službě", duration: "6–8 hodin", topic: "Kurz 1",
    objective: "Získat společný jazyk. Po tomto bloku dokážeš rozložit službu na lidi, procesy, aplikace, data a infrastrukturu a vysvětlit, proč běžící server ještě neznamená fungující službu.",
    chapters: [
      ["1. Od obchodní potřeby k IT službě", "Než začneme mluvit o serverech, diskových polích nebo VMware, je potřeba pochopit, proč IT vůbec existuje. Organizace neprovozuje infrastrukturu proto, aby měla co nejvíce technologií. Provozuje ji proto, aby zaměstnanec mohl vystavit fakturu, klient provést platbu, lékař otevřít dokumentaci nebo výrobní linka přijmout další zakázku. Tomuto výsledku říkáme obchodní nebo uživatelská potřeba. IT služba je organizovaný způsob, jak tuto potřebu dlouhodobě, bezpečně a v dohodnuté kvalitě naplňovat.||Služba proto není totožná s jedním produktem. Například služba elektronické pošty může využívat uživatelský účet, více aplikačních serverů, databázi, DNS, certifikáty, síť, load balancer, storage, zálohování, monitoring, service desk a několik interních i externích týmů. Každá část může být samostatně v pořádku, a přesto služba jako celek nemusí fungovat. Uživatel také obvykle nepozná, která komponenta selhala. Vidí pouze to, že zprávu nemůže odeslat nebo že odpověď trvá příliš dlouho.||Pro SDM je zásadní přemýšlet end-to-end, tedy od uživatele až k nejnižší technické závislosti a zpět. Potřebuje vědět, kdo službu používá, které činnosti podporuje, kdy je nejkritičtější, jaké systémy na ní závisejí a jaký dopad má její omezení. Stejně důležité je znát vlastníky. Business owner odpovídá za obchodní smysl, service owner za řízení služby, aplikační tým za aplikaci a infrastrukturní týmy za jednotlivé platformy. Jeden člověk nemusí rozumět všemu do nejmenšího detailu, ale rozdělení odpovědností musí být zřejmé.||Při technické debatě proto nestačí otázka, zda běží server. Je potřeba ověřit, zda uživatel dokončí požadovanou činnost, zda jsou data správná, zda služba odpovídá v přijatelném čase a zda funguje monitoring, podpora a obnova. Tím se liší stav komponenty od stavu služby. Server může být zapnutý, operační systém může odpovídat na ping, ale aplikace může být nefunkční kvůli chybné konfiguraci, nedostupné databázi nebo vypršenému certifikátu.||Pro projektového manažera má tento pohled stejný význam. Dodávka hardwaru není dokončená služba. Projekt musí zahrnout instalaci, integraci, migraci, testování, dokumentaci, školení, provozní převzetí, podporu a akceptaci zákazníkem. Teprve když jsou splněna dohodnutá kritéria a provozní tým umí službu spravovat, lze mluvit o skutečném výsledku.", ["Produkt je stavební prvek; služba je výsledek pro zákazníka.", "Technická dostupnost komponenty a obchodní dostupnost služby mohou být odlišné.", "Každá služba potřebuje vlastníka, podporu, měření a dohodnutý způsob eskalace."], "E-shop může mít funkční webové servery, ale zákazník nenakoupí, pokud nefunguje databáze, DNS, identita nebo platební brána."],
      ["2. Hardware, software a firmware", "Hardware označuje fyzické části počítačového systému. U běžného enterprise serveru jde například o šasi, základní desku, procesory, paměťové moduly, disky, síťové adaptéry, HBA adaptéry pro storage, napájecí zdroje, ventilátory a samostatný management řadič. Server tedy není jedna nedělitelná krabice. Je to soustava komponent, z nichž každá může mít vlastní stav, redundanci, výkonový limit a způsob výměny.||Software je sada instrukcí, konfigurací a dat, která určuje, co má hardware dělat. Do softwaru patří operační systém, hypervisor, ovladače zařízení, databáze, aplikační služby, management nástroje i automatizační skripty. Stejný fyzický server může podle nainstalovaného softwaru plnit velmi odlišné role. Konfigurace je přitom stejně důležitá jako samotný program. Dva servery se stejným softwarem se mohou chovat jinak, pokud mají rozdílné parametry, oprávnění nebo připojení.||Firmware je software uložený přímo v zařízení nebo jeho řadiči. Spouští se velmi blízko hardwaru a zajišťuje jeho základní funkce. Firmware najdeme v serverovém BIOSu, síťové kartě, HBA, řadiči diskového pole, SSD i switchi. Není běžně viditelný koncovému uživateli, ale zásadně ovlivňuje stabilitu, kompatibilitu a bezpečnost. Jeho aktualizace může opravit chybu nebo zranitelnost, ale také změnit chování zařízení. Proto se firmware neaktualizuje bez ověření podporované kombinace.||Mezi firmwarem a operačním systémem stojí často ovladač neboli driver. Driver umožňuje vyšší softwarové vrstvě komunikovat s konkrétním zařízením. Výrobce může podporovat například určitou kombinaci modelu HBA, verze jeho firmwaru, verze driveru a konkrétního buildu ESXi. Pokud se aktualizuje pouze jedna část, technicky může systém chvíli fungovat, ale kombinace nemusí být podporovaná. To komplikuje incidenty a výrobce může před další diagnostikou požadovat návrat do podporovaného stavu.||Z pohledu SDM a PM je důležité řízení lifecycle. Každá vrstva má verzi, datum vydání, bezpečnostní opravy a konec podpory. Aktualizace se proto plánuje jako změna celé technologické cesty, ne jako izolovaný krok. Je potřeba znát support matrix, závislosti, pořadí kroků, možnost rollbacku, validační test a vlastníka rozhodnutí. Věta „nainstalujeme nejnovější verzi“ není technický plán.", ["Server není jedna součástka, ale systém vzájemně závislých komponent.", "Firmware není totéž co běžná aplikace, ale stále podléhá lifecycle a bezpečnostním opravám.", "Support matrix je důležitější než předpoklad, že novější verze musí automaticky fungovat."], "Nový firmware HBA může vyžadovat podporovanou verzi driveru v ESXi. Samostatně úspěšný upgrade může vytvořit nepodporovanou kombinaci."],
      ["3. CPU, RAM a trvalá data", "CPU neboli procesor vykonává instrukce programů. Moderní server má často více fyzických procesorů, kterým říkáme sockety, a každý procesor obsahuje více jader. Jádro může v daném okamžiku zpracovávat určité množství práce. Výkon CPU nepopisuje jediná hodnota: záleží na počtu jader, frekvenci, architektuře, cache, typu instrukcí a charakteru aplikace. Více jader pomůže pouze tehdy, když workload dokáže práci vhodně paralelizovat.||RAM je rychlá pracovní paměť, ve které operační systém drží právě používaný programový kód a data. Je mnohem rychlejší než běžné trvalé úložiště, ale její obsah po ztrátě napájení zpravidla zaniká. Pokud aplikace nemá dostatek RAM, operační systém může přesouvat části paměti na disk, čemuž se říká swapping nebo paging. To může výrazně zpomalit systém, protože storage je proti RAM pomalejší. Některé aplikace, zejména databáze, se snaží využít velkou část RAM jako cache, protože tím omezí potřebu číst data z disků.||Storage uchovává data dlouhodobě. Může jít o lokální disk v serveru, externí diskové pole, distribuované softwarově definované úložiště nebo cloudovou službu. Storage má dvě odlišné vlastnosti: kapacitu a výkon. Kapacita říká, kolik dat lze uložit. Výkon říká, jak rychle a v jakém množství lze data číst nebo zapisovat. Pole může mít desítky terabajtů volného místa a přesto reagovat pomalu, pokud řadiče, porty nebo média nezvládají aktuální I/O zátěž.||Workload je konkrétní charakter zátěže. Webový server může potřebovat mnoho CPU při špičce uživatelů, databáze velkou RAM a nízkou storage latenci, backup vysoký sekvenční throughput a analytická úloha kombinaci výpočtu a čtení velkých objemů dat. Proto neexistuje univerzální tvrzení, že určitý server nebo storage je „rychlý“. Vždy je nutné říct, pro jaký workload, při jaké souběžnosti, s jakou rezervou a podle jaké metriky.||Při incidentu se stejné uživatelské hlášení může pojit s různými zdroji. Pomalý report může čekat na CPU, na volnou RAM, na storage, na síť nebo na zámek v databázi. SDM nemusí okamžitě určit příčinu, ale musí zabránit předčasnému obvinění jedné vrstvy. Správný postup je stanovit čas, rozsah a podmínky problému a nechat jednotlivé týmy porovnat metriky na společné časové ose.", ["Kapacita a výkon jsou různé vlastnosti.", "Volná kapacita neprokazuje dostatečný výkon.", "Metriky musí být čteny v čase a v kontextu workloadu."], "Report se ráno generuje pomalu. Příčinou může být CPU databáze, nedostatek RAM, čekání na disk nebo síťová komunikace, nikoli automaticky storage."],
      ["4. Operační systém a aplikace", "Operační systém je základní softwarová vrstva mezi aplikacemi a hardwarem. Spravuje procesy, plánuje jejich práci na CPU, přiděluje paměť, komunikuje se zařízeními přes ovladače, řídí uživatele a oprávnění, poskytuje síťový stack a organizuje data pomocí filesystemu. Příklady jsou Linux, Windows Server nebo specializované systémy vestavěné do storage a síťových zařízení.||Proces je běžící instance programu. Jedna aplikace může používat jeden proces, ale také desítky služeb a pomocných procesů. Operační systém rozhoduje, kdy proces dostane čas CPU a ke které paměti nebo souborům smí přistoupit. Služba v operačním systému je program běžící obvykle na pozadí, například webový server, databázový engine nebo monitoring agent. Slovo služba se zde používá v užším technickém významu než pojem IT služba pro zákazníka. Kontext je proto důležitý.||Filesystem dává blokům na disku strukturu souborů a adresářů. Udržuje také metadata, například jména, velikosti, vlastníky, oprávnění a časy změn. Windows často používá NTFS nebo ReFS, Linux například XFS nebo ext4. Filesystem může ležet na lokálním disku, na LUN z externího pole nebo může být vzdáleně poskytovaný pomocí NFS či SMB. Aplikace obvykle nepracuje přímo s fyzickým diskem; volá služby operačního systému a ten provádí další kroky v datové cestě.||Aplikace poskytuje konkrétní funkci. Moderní aplikace je často vícevrstvá. Front-end komunikuje s uživatelem, aplikační vrstva provádí logiku, databáze ukládá strukturovaná data a další komponenty zajišťují fronty zpráv, cache, autentizaci nebo integrace přes API. Jedna obrazovka v prohlížeči tak může záviset na desítkách procesů a několika technologických týmech. Aplikace může být provozována na fyzickém serveru, ve virtuálním stroji, v kontejneru nebo jako kombinace více modelů.||Pro provoz je nutné znát nejen seznam serverů, ale také aplikační topologii: které komponenty spolu komunikují, v jakém pořadí se spouštějí, kde mají data, jak se autentizují a jak se pozná jejich zdraví. Pouhé ověření, že proces běží, nemusí prokazovat funkčnost. Aplikace může běžet, ale vracet chyby kvůli nedostupné databázi. Proto mají smysl end-to-end health checky a uživatelské testy, které ověřují skutečný výsledek.", ["Aplikace může být rozdělena do mnoha komponent a serverů.", "Filesystem organizuje data nad blokovým zařízením nebo využívá vzdálenou file službu.", "Konfigurace je součástí služby a musí být řízena stejně pečlivě jako programový kód."], "Webová aplikace používá front-end, aplikační server a databázi. Výpadek kterékoliv vrstvy může uživatel vnímat jako stejnou chybu stránky."],
      ["5. Síť jako systém závislostí", "Počítačová síť umožňuje zařízením a aplikacím komunikovat. Fyzické spojení může tvořit metalický nebo optický kabel a zařízení se k němu připojuje přes síťový adaptér neboli NIC. Na ethernetové síti se komunikace na lokální vrstvě doručuje pomocí MAC adres. Switch propojuje porty v rámci této vrstvy a přeposílá rámce správným směrem. To je zjednodušený základ, na kterém následně běží IP komunikace.||IP adresa je logická adresa síťového rozhraní. Maska nebo prefix určuje, která část adresy označuje síť a která konkrétní zařízení. Skupině adres ve stejné logické síti říkáme subnet. Zařízení ve stejném subnetu spolu obvykle komunikují přímo. Pokud je cílová adresa v jiné síti, zařízení odešle provoz na default gateway, která jej routuje dál. Router nebo L3 switch proto propojuje různé IP sítě.||VLAN umožňuje logicky rozdělit jednu fyzickou ethernetovou infrastrukturu do více oddělených broadcast domén. Oddělení však samo o sobě neurčuje, zda mezi VLAN může probíhat komunikace. Tu řídí routing a bezpečnostní pravidla. Firewall komunikaci povoluje nebo zakazuje podle definovaných politik, například zdrojové a cílové adresy, protokolu a portu. TCP nebo UDP port je logické číslo služby, například HTTPS běžně používá TCP 443. Nesmí se zaměňovat s fyzickým portem na switchi.||DNS překládá lidsky použitelná jména na IP adresy a poskytuje další informace. Aplikace často používají jména právě proto, aby se fyzická adresa mohla změnit. Chybný nebo zastaralý DNS záznam však může posílat klienty na nesprávný server. NTP synchronizuje čas. Přesný čas je nutný pro vyhodnocení logů, platnost certifikátů, autentizaci a koordinaci clusterů. Síťové služby DNS a NTP tedy mohou být kritickými závislostmi, i když nepřenášejí samotná obchodní data.||Pojem protokol označuje sadu pravidel komunikace. Ethernet, IP, TCP, HTTP, NFS, SMB, iSCSI nebo Fibre Channel řeší různé vrstvy a účely. Když někdo řekne, že „síť funguje“, je potřeba upřesnit, co bylo ověřeno. Funkční kabel a ping neprokazují správné DNS, otevřený aplikační port, platný certifikát ani funkční odpověď aplikace. SDM proto žádá důkaz na úrovni, která odpovídá symptomu.", ["IP adresa identifikuje rozhraní, DNS jméno poskytuje stabilnější logický název.", "Port v TCP/UDP kontextu identifikuje službu; fyzický switch port je jiný pojem.", "Firewall může cestu fyzicky zachovat, ale logicky komunikaci zakázat."], "Server odpovídá na ping, ale aplikace není dostupná, protože DNS vrací starou adresu nebo firewall blokuje aplikační port."],
      ["6. Data, databáze a ochrana", "Data představují stav a historii organizace: objednávky, smlouvy, účty, zdravotní záznamy, konfigurace, zdrojové kódy nebo analytické datasety. Aplikaci lze často znovu nainstalovat, ale ztracená unikátní data nemusí být možné znovu vytvořit. Proto je potřeba vědět, která data služba používá, kde se nacházejí, kdo je vlastní, jak dlouho se uchovávají a jak se obnovují.||Databáze poskytuje řízený způsob ukládání a vyhledávání strukturovaných dat. Databázový systém řeší transakce, souběžný přístup, oprávnění, integritu a obnovu po chybě. Transakce sdružuje související změny tak, aby se provedly konzistentně. Databáze často používá datové soubory, transakční logy a vlastní cache v RAM. Prosté kopírování otevřených souborů proto nemusí vytvořit konzistentní zálohu. Ochranný nástroj musí s aplikací nebo databází správně koordinovat bod zachycení.||Storage je vrstva, která data fyzicky nebo logicky uchovává. Může nabízet blokové volumes, sdílené filesystémy nebo objektové API. RAID a jiné formy redundance rozkládají data tak, aby systém zvládl definovanou poruchu médií. Chrání dostupnost proti selhání disku, ne proti smazání souboru uživatelem, chybě aplikace nebo ransomwaru. Redundance udržuje aktuální stav, a proto může správně a rychle zachovat i nechtěnou změnu.||Snapshot zachycuje bodový stav dat v rámci konkrétní technologie. Bývá rychlý a vhodný pro krátkodobý návrat nebo tvorbu konzistentního bodu, ale často sdílí zdrojové pole, administraci a failure domain. Backup vytváří řízenou ochrannou kopii s retenční politikou, katalogem a možností obnovy. Kvalitní strategie používá více vrstev ochrany a zvažuje oddělení, neměnnost, replikaci i kybernetický scénář.||RPO říká, jak velkou ztrátu změn v čase organizace toleruje. RTO říká, za jak dlouho musí být služba obnovena. Tyto cíle nemůže určit pouze technický tým; vycházejí z obchodního dopadu a následně ovlivňují architekturu a cenu. Zelený backup job dokládá pouze dokončení konkrétní úlohy. Skutečnou obnovitelnost potvrzuje pravidelný restore test včetně aplikace, závislostí, pořadí kroků a měření času.", ["RAID není backup.", "Snapshot ve stejné failure domain nemusí přežít ztrátu nebo kompromitaci pole.", "Obnovitelnost se dokazuje testem restore, ne jen zeleným stavem backup jobu."], "Dva redundantní řadiče udrží provoz při poruše jednoho řadiče, ale nevrátí databázi před chybnou hromadnou změnu dat."],
      ["7. Dostupnost, redundance a failure domains", "Dostupnost popisuje, zda služba v určeném čase plní dohodnutou funkci. Není to pouze stav zapnuto nebo vypnuto. Služba může být dostupná, ale tak pomalá, že prakticky nesplní účel. Může být dostupná jen části uživatelů nebo bez některých funkcí. Proto musí definice dostupnosti uvádět, co se měří, odkud, jak často, v jakém období a které výjimky se započítávají.||Redundance znamená, že kritická funkce není závislá pouze na jedné komponentě. Server může mít dva zdroje, storage dva řadiče, host dvě síťové karty a SAN dvě nezávislé fabric. Samotný počet komponent však nestačí. Musí existovat mechanismus, který poruchu detekuje, přepne provoz a následně oznámí degradovaný stav. Pokud jsou dva zdroje zapojené do stejné napájecí větve, nechrání proti poruše této větve.||Single Point of Failure je místo, kde jedna porucha stačí k přerušení služby. Jeho odstranění vyžaduje pochopit failure domain, tedy oblast zasažitelnou jednou společnou událostí. Failure domain může být komponenta, šasi, rack, switch, napájecí větev, datový sál, lokalita, administrátorský účet nebo dokonce chybná automatizace. Dvě kopie dat ve stejném poli chrání proti jinému scénáři než kopie v oddělené lokalitě a pod jinou administrativní kontrolou.||Vysoce dostupná architektura není totéž co disaster recovery. High Availability řeší běžně poruchy uvnitř prostředí a snaží se minimalizovat přerušení. Disaster Recovery řeší ztrátu větší části prostředí nebo lokality a obnovu služby jinde. Backup zase umožňuje návrat k dřívějším datům. Jedna technologie může přispívat více cílům, ale žádný jednotlivý mechanismus automaticky neřeší všechny scénáře.||Degradovaný stav znamená, že služba stále funguje, ale část ochrany nebo rezervy chybí. To je pro SDM zásadní. Zákazník nemusí vidět výpadek, přesto další porucha může mít mnohem větší dopad. Degradace proto vyžaduje evidenci rizika, prioritu opravy, komunikaci a někdy omezení dalších změn. Plánovaná údržba a pravidelné failover testy ověřují, zda redundance funguje nejen na diagramu, ale i v realitě.", ["Každá redundantní komponenta potřebuje mechanismus detekce a přepnutí.", "Degradovaný systém může být dostupný, ale už bez rezervy pro další poruchu.", "Plánovaná údržba je praktický test architektury i provozních postupů."], "Pole funguje na jednom řadiči po poruše druhého. Služba je dostupná, ale riziko je vyšší a oprava má jinou prioritu než běžná kosmetická chyba."],
      ["8. Role SDM/PM v technické debatě", "Service Delivery Manager odpovídá za to, aby poskytovaná služba dlouhodobě plnila dohodnuté cíle a aby mezi zákazníkem, provozem, specialisty a dodavateli fungovala koordinace. Project Manager řídí dočasnou iniciativu s definovaným rozsahem, termínem, rozpočtem a výsledkem. V praxi se jejich témata často potkávají: projekt předává novou technologii do provozu a provozní zkušenosti určují další projekty.||SDM ani PM nemusí nahradit storage architekta, síťového specialistu nebo VMware administrátora. Potřebuje však chápat společný systém dostatečně hluboko, aby poznal chybějící informaci, závislost a riziko. Jeho hodnotou není vydávat neověřená technická rozhodnutí. Hodnotou je zajistit, že správný odborník dostane přesnou otázku, potřebné důkazy a časový rámec a že rozhodnutí bude zaznamenané, komunikované a provedené.||Technická debata musí rozlišovat fakta, symptomy, hypotézy a závěry. Fakt je například hodnota metriky v konkrétním čase. Symptom je pozorovaný projev, třeba pomalé přihlášení. Hypotéza je možné vysvětlení, například vysoká storage latence. Root cause je příčina podložená důkazy. V průběhu incidentu se hypotézy mění. Pokud se domněnka začne komunikovat jako potvrzená příčina, týmy mohou ztratit čas a zákazník dostane nepřesnou informaci.||Dobrá otázka uvádí systém, čas, rozsah a kontext. Místo „je storage v pořádku?“ je vhodnější říct: „Od 10:15 se u tří VM na datastore X zvýšila write latency, ostatní datastore jsou bez změny. Ve stejném čase začal reporting job. Potřebujeme potvrdit, zda se čekání objevuje už na hostu, nebo až na poli, a určit další měření.“ Taková formulace nesměřuje k předčasnému viníkovi, ale pomáhá specialistům pracovat s důkazy.||Na začátku callu má být známý cíl: obnovit službu, schválit změnu, vybrat variantu nebo uzavřít riziko. Během debaty SDM udržuje časovou osu, rozhodovací log a seznam otevřených bodů. Na konci nahlas rekapituluje, co je potvrzené, co zůstává hypotézou, kdo provede další krok, do kdy, jak se ověří výsledek a kdy proběhne další checkpoint. Přesně toto je cesta, jak se zapojit do technické praxe ještě předtím, než člověk získá hlubokou specializaci.", ["Přiznat neznámý pojem je bezpečnější než skrýt nedorozumění.", "Technický vlastník rozhoduje o odborném řešení; SDM zajišťuje, že rozhodnutí vznikne včas a je dohledatelné.", "Každý call má skončit rekapitulací vlastníků, termínů a podmínek uzavření."], "Místo otázky „Je storage v pořádku?“ se ptej: „Od 10:15 roste write latency u dvou LUN ze 2 na 25 ms; změna začala po spuštění dávky. Potřebujeme potvrdit vrstvu vzniku a další diagnostický krok.“"]
    ]
  },
  {
    id: "datacenter", order: 2, title: "Datacentrum a datová cesta", subtitle: "Compute, síť, storage, výkon a poruchové domény", duration: "8–10 hodin", topic: "Kurz 2",
    objective: "Umět nakreslit klasickou infrastrukturu, sledovat cestu požadavku a rozlišit kapacitu, výkon, odezvu a dostupnost.",
    chapters: [
      ["1. Fyzické datacentrum", "Datacentrum je řízené prostředí určené pro bezpečný a dlouhodobý provoz IT technologií. Není to pouze místnost se servery. Kromě výpočetní a síťové techniky zahrnuje elektrické napájení, záložní zdroje, chlazení, rozvaděče, kabelové trasy, požární ochranu, fyzickou bezpečnost, monitoring prostředí a provozní procesy. Pokud selže některá z těchto podpůrných částí, může být nedostupná celá technologická služba, i když jednotlivé servery a disková pole nemají technickou poruchu.||Zařízení se instalují do racků. Rack je standardizovaný rám, jehož využitelná výška se vyjadřuje v jednotkách U; jedna jednotka má přibližně 44,45 mm. Server může zabírat například 1U nebo 2U, storage pole více jednotek a některé systémy celé šasi. Při plánování nestačí ověřit volné U pozice. Musí se posoudit hloubka zařízení, hmotnost, způsob montáže, servisní prostor, umístění těžkých prvků, přístup k portům a kabelům i směr proudění vzduchu.||Napájení bývá navrženo redundantně. Zařízení se dvěma zdroji by mělo být připojeno do dvou nezávislých napájecích větví označovaných například A a B. PDU v racku distribuuje elektřinu jednotlivým zařízením, UPS překlene krátkodobý výpadek a generátor může zajistit delší provoz. Redundance však funguje jen tehdy, když větve skutečně nesdílejí kritický prvek. Dva napájecí kabely zapojené do stejné PDU vytvářejí zdání redundance, ale porucha této PDU odstaví oba zdroje.||Elektrická energie se téměř celá mění na teplo, které musí chlazení odvést. Datacentra proto pracují s oddělením studených a teplých uliček, řízeným prouděním vzduchu, teplotními senzory a kontrolou vlhkosti. Přidání výkonných GPU serverů nebo hustého storage systému může překročit napájecí či chladicí kapacitu racku, i když je v něm fyzicky volné místo. Projekt musí znát příkon, tepelný výkon, typ zásuvek, počet napájecích zdrojů a požadavky výrobce.||Fyzická bezpečnost zahrnuje kontrolu vstupu, evidenci návštěv, kamerový dohled a pravidla práce v sálu. Provozní bezpečnost znamená také přesné označení kabelů, dokumentaci portů a řízené zásahy. Zdánlivě jednoduché odpojení nesprávného kabelu může vyřadit redundantní cestu. SDM nebo PM proto musí při instalaci hlídat site readiness checklist: rack, napájení, chlazení, kabeláž, porty, adresy, přístupová oprávnění, termín dodání i odpovědnosti jednotlivých týmů.||Datacentrum může být rozděleno na sály, budovy nebo geografické lokality. Každá úroveň představuje jinou failure domain. Dvě zařízení v jednom racku chrání proti poruše serveru, nikoli proti ztrátě rackového napájení. Dva sály v jedné budově nemusí chránit proti výpadku celé budovy. Při debatě o odolnosti je proto vždy nutné pojmenovat scénář, proti kterému se návrh chrání.", ["Dvě zařízení ve stejném racku mohou sdílet napájení i chlazení.", "Inventář musí znát fyzické umístění a závislosti.", "Změna příkonu nebo hustoty může ovlivnit kapacitu sálu."], "Nový storage systém se vejde do racku rozměrem, ale projekt musí ověřit napájení, chlazení, nosnost, porty a kabelové trasy."],
      ["2. Compute vrstva", "Compute vrstva poskytuje výpočetní prostředky potřebné pro běh operačních systémů a aplikací. Základem je fyzický server s procesory, RAM, základní deskou, síťovými a storage adaptéry, napájením a management řadičem. Server může provozovat operační systém přímo, což označujeme jako bare metal, nebo hypervisor, který rozděluje jeho prostředky mezi více virtuálních strojů. V moderním datacentru je běžná kombinace fyzických, virtuálních a kontejnerových workloadů.||Procesorový výkon nelze posuzovat jen počtem CPU. Server může mít více socketů a každý procesor více jader. Důležitá je frekvence, generace procesoru, velikost cache, podporované instrukce a chování konkrétní aplikace. Některé úlohy dobře využijí mnoho jader, jiné závisí na výkonu jednoho vlákna. Softwarové licence mohou být navázané na sockety nebo jádra, takže výkonnější konfigurace mění nejen výkon, ale i cenu provozu.||U víceprocesorových serverů se uplatňuje NUMA. Procesor má rychlejší přístup k lokálně připojené části paměti a pomalejší k paměti připojené k jinému socketu. Hypervisor a operační systém se snaží workload umístit tak, aby CPU a RAM byly vhodně lokalizované. Velmi široká virtuální mašina může překročit hranici jednoho NUMA uzlu a získat jiný výkonový profil. Pro SDM není nutné ladit NUMA, ale je užitečné vědět, proč prosté přidání vCPU nemusí aplikaci zrychlit.||Management řadič, například Dell iDRAC, umožňuje sledovat hardware a pracovat se serverem nezávisle na běžném operačním systému. Poskytuje informace o teplotách, zdrojích, ventilátorech, chybách paměti nebo stavu disků a umožňuje vzdálenou konzoli. Management síť by měla být oddělená a bezpečně řízená, protože přístup k ní dává velmi silnou kontrolu nad zařízením.||Sizing je návrh velikosti řešení podle měřených nebo odhadovaných požadavků. Nestačí sečíst průměrné využití CPU a RAM. Je potřeba zohlednit špičky, růst, rezervu pro údržbu, poruchu hostu, režii hypervisoru, limity licencí a chování aplikací. Cluster, který běžně spotřebovává téměř všechny zdroje, může fungovat bez chyby, ale při výpadku jednoho hostu nemá kam přesunout jeho workloady.||Pro provoz je důležitý headroom, tedy bezpečná rezerva. Rezerva není plýtvání; je to kapacita pro poruchu, údržbu, neočekávanou špičku a budoucí růst. SDM sleduje trend spotřeby a riziko vyčerpání, zatímco technický vlastník určuje konkrétní prahy. PM musí rezervu zahrnout do návrhu a rozpočtu, jinak může projekt dodat prostředí, které funguje pouze za ideálních podmínek.", ["Průměrné vytížení může skrýt krátké kritické špičky.", "Přidělené vCPU není totéž co fyzické jádro.", "Maintenance vyžaduje kapacitu pro přesun nebo restart workloadů."], "Cluster běží běžně na 75 % RAM. Při odstavení jednoho hostu už nemusí zbýt kapacita pro všechny VM."],
      ["3. Ethernet a IP síť", "Ethernet je nejrozšířenější technologie lokálních datových sítí. Síťový adaptér zařízení vytváří a přijímá ethernetové rámce a switch je přeposílá mezi porty podle MAC adres. Rychlost linky může být například 1, 10, 25, 100 nebo více gigabitů za sekundu. Uvedená linková rychlost je maximální kapacita konkrétního spojení; skutečně dosažený přenos ovlivňuje protokol, velikost paketů, souběh provozu, ztráty, fronty i výkon koncových systémů.||VLAN logicky rozděluje ethernetovou síť. Port může být nastaven jako access pro jednu VLAN nebo jako trunk přenášející více označených VLAN. Server s virtualizací často potřebuje více logických sítí pro management, virtuální stroje, vMotion, storage nebo jiné účely. Ty mohou sdílet fyzické adaptéry, ale musí mít správně navrženou kapacitu, bezpečnost a prioritu. Chybějící VLAN na jediném trunku může vyřadit konkrétní typ provozu, zatímco ostatní funkce hostu zůstanou zdánlivě zdravé.||IP vrstva umožňuje komunikaci napříč subnety. Router rozhoduje, kam paket poslat podle cílové IP adresy a směrovací tabulky. Default gateway je cesta, kterou zařízení použije, pokud cíl neleží v jeho lokální síti. Síť může mít více možných tras a dynamické směrovací protokoly mohou reagovat na výpadky. Redundantní fyzické cesty však musí mít správnou logickou konfiguraci; kabel navíc nepomůže, pokud routing nebo firewall používá pouze nefunkční cestu.||MTU určuje největší velikost paketu přeneseného bez fragmentace na dané vrstvě. Standardní Ethernet běžně používá MTU 1500 bytů, některé datacentrové provozy využívají jumbo frames. Vyšší MTU může snížit režii u velkých přenosů, ale musí být podporované a konzistentně nastavené po celé cestě. Nesoulad se může projevit zvláštním chováním, kdy malé pakety projdou, ale větší komunikace selhává nebo se výrazně zpomalí.||Dostupná síť obvykle používá více NIC, switchů a uplinků. Teaming nebo bonding spojuje adaptéry pro redundanci nebo využití kapacity. Návrh musí řešit, kam jsou adaptéry fyzicky zapojené a jak se provoz přepne. Dvě NIC ve stejném serveru nejsou úplnou redundancí, pokud obě vedou do jednoho switche. Dva switche nemusí pomoci, pokud sdílejí jeden kritický uplink nebo napájení.||Underlay je fyzická IP/Ethernet síť a overlay je logická síť vytvořená nad ní pomocí tunelování. Technologie jako NSX mohou vytvářet segmenty a politiky nezávisle na fyzické topologii, ale overlay stále plně závisí na kvalitě underlay. Pro SDM je důležité vědět, který tým vlastní kterou vrstvu, jak se předávají důkazy a zda monitoring umožní odlišit chybu fyzické konektivity od chyby logické sítě.", ["Dvě NIC nejsou redundance, pokud obě končí ve stejném switchi bez odpovídajícího návrhu.", "MTU musí být konzistentní podél celé cesty.", "Fyzická underlay nese logické overlay sítě."], "Jedna chybná VLAN na trunku může vyřadit jen část provozu, zatímco management zůstane dostupný."],
      ["4. Storage a SAN", "Externí storage odděluje dlouhodobá data od konkrétního compute serveru. Diskové pole obsahuje řadiče, cache, hostitelské porty, interní propojení, fyzická média a software, který z nich vytváří logické úložné prostředky. Hostu může prezentovat volume neboli LUN, který operační systém nebo hypervisor vnímá podobně jako disk. Nad LUN pak vzniká partition, filesystem, databázová struktura nebo VMware datastore.||SAN je specializovaná síť pro blokový storage provoz. U Fibre Channel ji tvoří HBA adaptéry v serverech, FC switche, optické transceivery, kabeláž a target porty pole. Obvykle se staví dvě nezávislé fabric, označované například A a B. Host má cesty přes obě fabric a oba řadiče storage. Cílem je, aby porucha jednoho adaptéru, kabelu, switche, portu nebo řadiče nepřerušila přístup k datům.||Fibre Channel identifikuje porty pomocí WWPN. Zoning na switchi určuje, které iniciátory hostů smějí komunikovat s target porty storage. Na samotném poli se používá host mapping nebo LUN masking, který určuje, jaké volumes se konkrétním hostům prezentují. Tyto dvě vrstvy řeší rozdílné části přístupu. Správný zoning bez správného mappingu nestačí a opačně. Změna musí respektovat obě vrstvy i konfiguraci hostu.||iSCSI přenáší blokový SCSI provoz přes IP síť. Iniciátor je obvykle softwarový nebo hardwarový klient na hostu a target poskytuje storage pole. iSCSI využívá ethernetové switche, IP adresy, subnety, VLAN a často vyhrazené síťové cesty. To neznamená, že jej lze bez plánování smíchat s libovolným aplikačním provozem. Potřebuje odpovídající kapacitu, redundanci, latenci a konzistentní MTU.||Multipathing na hostu rozpozná více cest ke stejnému zařízení a řídí jejich použití. Při poruše cesty může provoz přepnout jinam a podle politiky se může mezi cesty také rozkládat. Multipathing musí odpovídat typu pole a podporovanému nastavení. Čtyři viditelné cesty nejsou automaticky čtyři nezávislé failure domains; mohou sdílet adaptér, switch nebo řadič. Proto se dokumentuje úplné mapování.||Pro SDM je storage služba součástí širší cesty. Při incidentu je potřeba zjistit, které hosty, LUN, datastore a aplikace jsou zasažené, zda chybí jedna cesta nebo celý přístup a zda je prostředí pouze degradované. Při změně se musí koordinovat serverový, SAN, storage a často VMware tým. Úspěšné vytvoření LUN na poli je pouze první krok, nikoli hotová služba.", ["FC a iSCSI jsou běžné blokové transporty s odlišnou fabric.", "LUN není automaticky filesystem ani datastore.", "Redundantní cesta musí být validována řízeným testem."], "Host vidí LUN čtyřmi cestami přes dvě fabric a dva řadiče. Ztráta jedné fabric nesmí přerušit I/O."],
      ["5. Datová cesta", "Datová cesta je úplný řetězec vrstev, kterými projde požadavek od aplikace k datům a odpověď zpět. U virtuálního serveru může zápis začít v aplikačním procesu, pokračovat přes databázi nebo filesystem, kernel operačního systému, virtuální disk, hypervisor, ovladač, fyzický adaptér, SAN nebo IP síť, hostitelský port storage, řadič, cache a nakonec fyzická média. Každá vrstva může požadavek zpracovat, uložit do fronty, rozdělit nebo potvrdit.||Fronta vzniká, když požadavky přicházejí rychleji, než je další část cesty dokáže zpracovat. Krátká fronta může být běžná a efektivní, dlouhodobý růst fronty však zvyšuje latenci. Důležité je zjistit, kde se čekání objevuje poprvé. Aplikace může měřit vysokou dobu odpovědi, zatímco storage pole vykazuje nízkou latenci. To naznačuje, že se čeká dříve, například na CPU virtuálního stroje, zámek databáze nebo frontu v hypervisoru.||Čtení a zápis se mohou chovat odlišně. Storage může potvrdit zápis po bezpečném uložení do chráněné cache a data následně destagovat na média. Čtení lze někdy obsloužit z cache bez přístupu na disk. Účinnost cache závisí na opakování a charakteru workloadu. Sekvenční přístup k velkým souborům se chová jinak než náhodný přístup databáze k malým blokům.||Virtualizace přidává další mapování. Aplikace vidí soubor, guest OS virtuální disk, ESXi datastore, storage tým volume a fyzické pole pool nebo RAID skupinu. Názvy v jednotlivých nástrojích se mohou lišit. Bez dokumentace je při incidentu obtížné rychle spojit pomalou VM s konkrétním LUN, hostitelskými cestami a backendem pole. Service map má proto obsahovat technická mapování, ne pouze seznam produktů.||End-to-end diagnostika potřebuje společný čas. Pokud mají systémy nesynchronizované hodiny nebo týmy dodají grafy z různých intervalů, nelze spolehlivě určit pořadí událostí. Je vhodné zaznamenat začátek a konec symptomu, rozsah, změny workloadu a všechny infrastrukturní události. Jeden screenshot po odeznění problému je slabý důkaz; časová řada před, během a po incidentu je mnohem hodnotnější.||Role SDM spočívá v koordinaci vrstev. Nemusí interpretovat každý storage counter, ale musí zajistit společnou časovou osu, jednoznačný seznam zasažených objektů a konkrétní otázku pro každý tým. Cílem není dokázat, čí technologie je vinna, ale najít první místo degradace, obnovit službu a uchovat důkazy pro následnou analýzu.", ["Symptom na konci cesty neurčuje místo příčiny.", "Stejná časová osa je podmínkou korelace metrik.", "Změna workloadu může být příčinou i bez infrastrukturní poruchy."], "Storage reportuje nízkou odezvu, ale VM čeká na CPU. Aplikační latency proto roste mimo storage vrstvu."],
      ["6. Výkon bez zkratek", "Výkon infrastruktury má více rozměrů. IOPS je počet vstupně-výstupních operací za sekundu. Throughput je objem dat přenesený za sekundu, například MB/s nebo GB/s. Latence je doba potřebná k dokončení jedné operace. Tyto metriky spolu souvisejí, ale žádná sama o sobě výkon úplně nepopisuje. Velké množství malých operací může vytvořit vysoké IOPS a malý datový tok, zatímco několik velkých operací může mít nízké IOPS a vysoký throughput.||Velikost bloku říká, kolik dat jedna operace přenáší. Databáze může používat malé bloky a náhodný přístup, backup velké bloky a sekvenční čtení. Poměr read/write je důležitý, protože zápis může vyžadovat více interní práce kvůli ochraně dat, replikaci nebo destagingu cache. Náhodnost určuje, zda lze data efektivně číst v pořadí a využít cache nebo prefetch. Proto musí každé výkonové tvrzení uvést profil workloadu.||Latence se měří na konkrétním místě. Aplikace měří celou dobu operace, host čekání v operačním systému nebo hypervisoru a storage pole pouze část od přijetí požadavku po jeho potvrzení. Hodnoty se proto nemusí rovnat. Průměrná latence navíc může skrýt krátké, ale výrazné špičky. Pro uživatelskou zkušenost jsou někdy důležitější percentily, například hodnota, pod kterou se vejde 95 nebo 99 procent operací.||Bandwidth je maximální dostupná kapacita linky, throughput skutečně dosažený přenos. Dvě 25Gb/s síťové cesty automaticky neznamenají, že jeden datový tok dosáhne 50 Gb/s; záleží na teaming politice, protokolu, paralelismu a celé cestě. Stejně tak počet disků nebo NVMe médií nezaručuje lineární výkon, pokud je limitem řadič, CPU pole, front-end port, fabric nebo host.||Bottleneck je část systému, která v dané situaci omezuje výsledek. Není navždy pevně daný. Po odstranění jednoho limitu se může projevit jiný. Zvýšení storage výkonu nepomůže workloadu čekajícímu na databázový zámek. Přidání CPU nepomůže, pokud proces čeká na síťovou odpověď. Výkonové řešení proto začíná měřením a hypotézou, nikoli nákupem.||Pro SDM má výkon také smluvní a komunikační rozměr. Vágní požadavek „systém musí být rychlý“ nelze otestovat. Je nutné definovat transakci, počet uživatelů, datový objem, časové okno, očekávanou dobu odezvy a měřicí bod. Při incidentu se zaznamenává baseline a odchylka. Při projektu se provádí výkonový a zátěžový test s realistickými daty a jasnými akceptačními kritérii.", ["Vysoké IOPS malých bloků nemusí znamenat vysoký throughput.", "Nízká průměrná latence může skrýt vysoké percentily.", "Bottleneck je nejslabší část aktuální end-to-end cesty."], "8k databázové random I/O a 1MB sekvenční backup nelze porovnávat pouze podle počtu IOPS."],
      ["7. Kapacita a růst", "Kapacita vyjadřuje množství dostupného zdroje. U storage se často setkáš s několika různými čísly. Raw kapacita je součet jmenovitých kapacit fyzických médií. Usable kapacita zohledňuje ochranu dat, systémovou režii, rezervované místo a formátování. Effective kapacita může vyjadřovat, kolik logických dat systém uloží po započtení deduplikace a komprese. Tyto hodnoty se nesmějí zaměňovat.||Data reduction ratio závisí na typu dat. Virtuální stroje s opakujícími se operačními systémy se mohou deduplikovat dobře, zatímco již komprimované video, šifrovaná data nebo některé databázové formáty téměř vůbec. Marketingový příklad proto není jistota pro konkrétního zákazníka. Sizing musí pracovat s měřením, realistickým odhadem a bezpečnou rezervou.||Thin provisioning umožňuje přidělit hostům větší logickou kapacitu, než je právě fyzicky spotřebováno. Může zvýšit efektivitu, protože prostor se přiděluje až skutečnými zápisy. Současně vytváří riziko oversubscription: pokud více konzumentů začne přidělenou kapacitu skutečně využívat, fyzický pool se může zaplnit. Proto musí existovat monitoring, prahy, předpověď a jasný postup rozšíření.||Storage potřebuje volné místo nejen pro nová uživatelská data. Kapacitu mohou spotřebovávat snapshoty, replikace, metadata, rebuild, resync, garbage collection a interní operace. Některé platformy při vysokém zaplnění zpomalují nebo omezují funkce. Bezpečný provozní práh tedy není 100 %. Přesná hodnota závisí na produktu, verzi, ochraně dat a doporučení výrobce.||Capacity management sleduje trend, sezónnost a rychlost růstu. Nestačí reportovat, že je dnes 20 % volno. Je potřeba odhadnout, kdy systém dosáhne varovného a kritického prahu, jak dlouho trvá nákup, dodání, instalace a změna a zda lze růst dočasně omezit. Lead time může být delší než zbývající čas do vyčerpání, a proto se rozšíření zahajuje s předstihem.||Rozšíření není jen objednávka disků. Může vyžadovat volné pozice, novou polici, licence, napájení, SAS nebo síťové porty, firmware, změnu poolu, rebalance, prezentaci volume a rozšíření filesystemu či datastore. SDM drží kapacitní riziko a termíny, technický tým potvrzuje podporovaný postup a PM koordinuje dodávku, změnové okno a akceptaci.", ["Marketingový redukční poměr není garantovaný pro každý dataset.", "Volná kapacita musí respektovat provozní rezervy a rebuild.", "Rozšíření může vyžadovat licence, porty, rack a změnové okno."], "Při růstu 5 TB měsíčně a tříměsíčním dodání je 12 TB volného prostoru už aktivní kapacitní riziko."],
      ["8. Pozorovatelnost a důkazy", "Monitoring je systematické sledování technického a provozního stavu. Sbírá metriky, logy, události, alarmy a výsledky kontrol. Metrika je číselná hodnota v čase, například využití CPU, volná kapacita nebo latence. Log je záznam o konkrétní události nebo činnosti. Event oznamuje změnu stavu a alert vzniká, když je splněna definovaná podmínka. Tyto zdroje se doplňují.||Observability neboli pozorovatelnost je schopnost odvozovat vnitřní stav systému z dostupných výstupů. Nejde jen o množství grafů. Kvalitní pozorovatelnost umožní propojit uživatelský požadavek s aplikační transakcí, logy, síťovou komunikací a infrastrukturními metrikami. V distribuovaném prostředí mohou pomoci traces, které sledují průchod jednoho požadavku více službami.||Alert není diagnóza. Vysoké CPU může být normální a žádoucí během dávky, nebo může signalizovat problém. Význam určuje doba trvání, proces, historický kontext, dopad a další metriky. Alarm musí mít závažnost, vlastníka, reakční postup a podmínku uzavření. Pokud každá krátká špička vytváří kritický alarm, vzniká alert fatigue a tým začne upozornění ignorovat.||Baseline popisuje normální chování služby v různých obdobích. Denní špička může být běžná, stejně jako měsíční účetní uzávěrka. Bez baseline se obtížně rozhoduje, zda je aktuální hodnota anomálie. Baseline se mění s růstem a změnami systému, takže se musí pravidelně aktualizovat. U nové služby je potřeba výchozí chování teprve vytvořit a ověřit.||Korelace spojuje data podle času, objektu a vztahu. Pokud se ve stejném okamžiku zhorší aplikační odezva, naroste hostitelská fronta a storage pole zaznamená vysokou write latency, vzniká silnější důkaz než z jednoho grafu. Stále však nemusí jít o kořenovou příčinu. Může to být následek nové dávky, která systém legitimně přetížila. Technická analýza musí porovnat změny a kauzalitu.||SDM potřebuje dashboard zaměřený na službu, ne pouze na zařízení. Má vidět dostupnost, uživatelský dopad, otevřené incidenty, kapacitní rizika, degradovanou redundanci, stav backupu a významné změny. Při eskalaci předává časovou osu, zasažené objekty a relevantní důkazy. PM zase před akceptací ověřuje, že monitoring nové komponenty existuje, alarmy mají vlastníky a dokumentace popisuje reakci. Neviditelná technologie není připravená pro spolehlivý provoz.", ["Alarm bez vlastníka a reakčního postupu je jen hluk.", "Čas, rozsah a korelace jsou důležitější než jeden izolovaný údaj.", "Monitoring musí pokrývat i závislosti a datovou cestu."], "Alert na vysoké CPU je relevantní až po spojení s dobou trvání, konkrétními procesy, dopadem a chováním služby."]
    ]
  },
  {
    id: "virtualization-storage", order: 3, title: "Virtualizace a storage", subtitle: "VMware, LUN, datastore, HA a základ produktového portfolia", duration: "10–12 hodin", topic: "Kurz 3",
    objective: "Rozumět tomu, jak virtualizace sdílí hardware a storage, jak vzniká dostupnost clusteru a kde se potkávají odpovědnosti VMware, SAN a storage týmů.",
    chapters: [
      ["1. Proč virtualizujeme", "Hypervisor odděluje operační systémy od fyzického serveru a umožňuje sdílet zdroje, standardizovat provoz a přesouvat workloady. Virtualizace však fyzické limity neruší; vytváří další řídicí vrstvu a nové závislosti.", ["VM je sada virtuálních zařízení a souborů nebo objektů.", "Konsolidace zvyšuje dopad poruchy hostu.", "Overcommit je řízené riziko, nikoli bezplatná kapacita."], "Deset VM sdílí dva fyzické procesory. Přidělených 80 vCPU neznamená 80 fyzických jader."],
      ["2. ESXi, vCenter a cluster", "ESXi provozuje VM, vCenter centrálně spravuje hosty a cluster seskupuje zdroje a pravidla. Management rovina může být nedostupná, zatímco VM běží; provozní stav proto musí rozlišit management a data plane.", ["vCenter není datová cesta běžného I/O virtuálního stroje.", "Cluster vyžaduje konzistentní síť, storage a kompatibilitu hostů.", "Oprávnění a certifikáty jsou součástí provozuschopnosti."], "Výpadek vCenter omezí správu a některé operace, ale existující VM na ESXi mohou dál poskytovat službu."],
      ["3. HA, DRS a vMotion", "HA restartuje VM po poruše hostu, DRS vyvažuje umístění podle zdrojů a pravidel a vMotion živě přesouvá běžící VM mezi kompatibilními hosty. Každá funkce řeší jiný problém a má vlastní předpoklady.", ["vMotion není mechanismus pro přesun z mrtvého hostu.", "HA potřebuje rezervní kapacitu a dostupná data VM.", "DRS pravidla mohou dostupnost posílit i nechtěně omezit."], "Před údržbou se VM přesunou vMotion; při náhlém pádu hostu je HA restartuje jinde."],
      ["4. LUN, VMFS a datastore", "Storage pole prezentuje hostům LUN. ESXi nad ním může vytvořit VMFS datastore, který sdílí více hostů. Mapování pokračuje od virtuálního disku VM přes datastore a multipath až k volume, poolu a fyzickým médiím.", ["Jméno datastore nemusí být shodné se jménem LUN na poli.", "Změna velikosti vyžaduje kroky na poli i v konzumentovi.", "Dokumentace mapování výrazně urychluje incidenty."], "Storage rozšíří volume, ale datastore zůstane původní velikosti, dokud administrátor nerozšíří VMFS."],
      ["5. Block, file a object", "Block poskytuje blokové zařízení, file sdílí hierarchii souborů a object pracuje s objekty a metadaty přes API. Nejde o pořadí kvality; každý model odpovídá jiným aplikacím, způsobu přístupu a škálování.", ["FC/iSCSI jsou běžné block transporty.", "NFS/SMB jsou file protokoly.", "S3 je dominantní object API, ale kompatibilita má konkrétní rozsah."], "Databáze může požadovat blokový volume, tým sdílené dokumenty SMB a analytický datový lake S3."],
      ["6. PowerVault v architektuře", "PowerVault ME je cost-efficient externí block storage. SDM musí znát připojené hosty, porty, fabric, volumes, kapacitu, firmware, alerty, support entitlement a závislé služby. Produkt se neposuzuje izolovaně od serverů a SAN.", ["Dual-controller pole stále potřebuje správný multipathing.", "Scale-up rozšíření kapacity může narazit na limit řadičů nebo portů.", "Firmware change vyžaduje ověřenou kompatibilitu celé cesty."], "Nová police zvýší raw kapacitu, ale projekt musí naplánovat RAID/pool, volume, host mapping, rozšíření datastore a validaci."],
      ["7. HCI a vSAN", "HCI spojuje compute a storage do clusterových nodů. vSAN skládá média hostů do distribuovaného datastore a politiky určují ochranu objektů. Porucha nebo maintenance nodu proto ovlivňuje compute i storage zdroje.", ["Dostupná VM může běžet během resyncu v degradované ochraně.", "Síť je kritickou součástí distribuované storage.", "Kapacita clusteru musí počítat s ochranou a maintenance."], "Po odstavení nodu běží VM jinde, ale data se mohou resynchronizovat a cluster má dočasně menší rezervu."],
      ["8. Záloha versus dostupnost", "HA zkracuje výpadek po poruše infrastruktury, replikace kopíruje změny, snapshot zachycuje bodový stav a backup chrání obnovu. RPO a RTO se potvrzují pro konkrétní službu a obnovovací scénář.", ["Synchronní replikace může replikovat logickou chybu.", "Backup bez restore testu nedokazuje obnovitelnost.", "Obnova aplikace zahrnuje pořadí a konzistenci více komponent."], "Po ransomwaru může HA i replikace šířit nebo udržovat zašifrovaný stav; čistá obnova potřebuje chráněné kopie a postup."]
    ]
  },
  {
    id: "service-delivery", order: 4, title: "Provoz služby pro SDM a PM", subtitle: "Incident, change, kapacita, rizika a technická komunikace", duration: "8–10 hodin", topic: "Kurz 4",
    objective: "Vést provozní a projektovou debatu na slušné technické úrovni, držet rozhodnutí a rizika a zapojovat specialisty s přesným zadáním.",
    chapters: [
      ["1. Service map a vlastnictví", "Service map propojuje obchodní službu, aplikace, data, infrastrukturu, lokality, dodavatele a podpůrné týmy. RACI doplňuje, kdo práci provádí, kdo nese konečnou odpovědnost, kdo je konzultován a kdo informován.", ["Bez mapy závislostí nelze spolehlivě určit dopad změny.", "Technický vlastník a komunikační vlastník mohou být různé role.", "Kontakty a eskalační cesty musí být aktuální před incidentem."], "PowerVault spravuje storage tým, SAN jiný tým a VMware třetí. SDM propojuje jejich kroky k obnově jedné aplikace."],
      ["2. Incident management", "Incident začíná detekcí nebo hlášením a pokračuje triage, stanovením dopadu a priority, diagnostikou, workaroundem, obnovou a komunikací. Major incident potřebuje rytmus aktualizací, rozhodovací log a jednoznačné řízení.", ["Priorita vychází z dopadu a naléhavosti, ne z hlasitosti žadatele.", "Symptom není automaticky kořenová příčina.", "Časová osa a změny před incidentem jsou zásadní důkazy."], "Jedna VM je pomalá, ale ostatní na stejném datastore ne. Rozsah je důležitý pro směrování diagnostiky."],
      ["3. Problem management", "Problem management hledá a řídí příčiny incidentů, známé chyby a workaroundy. Root cause analysis má pracovat s důkazy a systémovými podmínkami, nikoli jen s poslední chybou člověka.", ["Obnova služby může předcházet nalezení příčiny.", "Workaround snižuje dopad, ale nemusí odstranit problém.", "Nápravné opatření potřebuje vlastníka, termín a ověření účinnosti."], "Restart obnovuje službu každý týden. Problem record má zjistit, proč zdroje unikají, a odstranit opakování."],
      ["4. Change management", "Změna musí mít účel, rozsah, závislosti, riziko, implementační kroky, validaci, komunikační plán a rollback. CAB posuzuje připravenost a obchodní riziko; nenahrazuje technický návrh.", ["Rollback musí být proveditelný v dostupném čase.", "Úspěch se měří předem definovanými kritérii.", "Po změně se ověřuje služba, monitoring i redundance."], "Firmware pole je technicky aktualizovaný, ale změna není uzavřena, dokud hosté vidí všechny cesty a aplikace projde validačním testem."],
      ["5. Kapacita a lifecycle", "Capacity management předpovídá, kdy zdroje dosáhnou bezpečného limitu. Lifecycle management sleduje verze, kompatibilitu, konec podpory, bezpečnostní opravy a obnovu platformy. Oba procesy potřebují dlouhý výhled kvůli rozpočtu a lead time.", ["EOL produktu je projektové i provozní riziko.", "Kapacitní plán obsahuje scénáře růstu a rezervu.", "Technický dluh vzniká i odkládáním podporovaných upgrade cest."], "Pole má 25 % volné kapacity, ale při současném růstu a šestiměsíčním nákupu musí rozšíření začít nyní."],
      ["6. SLA, metriky a reporting", "SLA musí přesně určit službu, měřicí období, zdroj dat, výjimky a cíle. Provozní report propojuje dostupnost, incidenty, změny, kapacitu, rizika, lifecycle a akční položky; seznam zelených grafů bez kontextu není řízení služby.", ["Metrika musí vést k rozhodnutí nebo kontrole cíle.", "Průměr může skrýt extrémní dopad konkrétního incidentu.", "Technické KPI a uživatelská zkušenost se mají číst společně."], "99,9 % dostupnosti může být splněno za měsíc, ale hodinový výpadek při účetní uzávěrce má vysoký obchodní dopad."],
      ["7. Eskalace a práce se specialisty", "Kvalitní eskalace předává dopad, rozsah, časovou osu, symptomy, změny, důkazy, provedené kroky a konkrétní otázku. SDM nemá diktovat neověřenou příčinu; má zajistit správného vlastníka a rozhodnutí v potřebném čase.", ["Eskalace je nástroj řízení rizika, ne trest.", "Vendor case potřebuje technická data a support entitlement.", "Pravidelné stručné aktualizace budují důvěru více než spekulace."], "Místo „urgently fix storage“ pošli mapu postižených hostů, LUN, čas, latence, cesty, změny a support bundle."],
      ["8. Vedení technického callu", "Call začíná cílem a potvrzením aktuálního stavu. Průběžně se oddělují fakta, hypotézy a rozhodnutí. Na konci se čtou vlastníci, termíny, závislosti, rizika a další checkpoint. Neznámý pojem se vysvětlí v kontextu a zapíše do knowledge base.", ["Agenda chrání čas specialistů.", "Rozhodovací log zabraňuje opakování stejné debaty.", "Dobré shrnutí je technicky přesné a zároveň srozumitelné zákazníkovi."], "Po incident callu existuje pět hypotéz, ale jen dvě mají důkaz. SDM zajistí testy, vlastníky a čas dalšího rozhodnutí."]
    ]
  }
];

const productTrainingExtras = {
  powervault: {
    estimated: "12–16 hodin",
    sources: [
      ["Dell PowerVault ME5 Administrator’s Guide", "https://www.dell.com/support/manuals/en-us/powervault-me5084/me5_series_ag"],
      ["Dell PowerVault ME5 Deployment Guide", "https://www.dell.com/support/manuals/en-us/powervault-me5012/me5_series_dg"],
      ["Dell PowerVault ME5 Support Matrix", "https://www.dell.com/support/product-details/en-us/product/powervault-me5012/resources/manuals"],
      ["Dell ME5: VMware vSphere Best Practices", "https://infohub.delltechnologies.com/en-au/t/dell-powervault-me5-series-vmware-vsphere-best-practices/"]
    ],
    chapters: [
      ["1. Pozice PowerVaultu v portfoliu", "PowerVault ME je externí blokové úložiště zaměřené na cenově efektivní provoz menších a středních prostředí, poboček, samostatných aplikací a vybraných virtualizačních workloadů. Jeho úlohou není nahradit každou funkci vyšších enterprise platforem. Hodnotu přináší tam, kde zákazník potřebuje spolehlivé sdílené block storage, předvídatelnou správu a podporované FC, iSCSI nebo SAS připojení bez nákladů a komplexity nejvyšších produktových řad.||Při produktové debatě se nezačíná názvem pole, ale požadavky workloadu. Potřebujeme znát hosty a operační systémy, datový model, kapacitu, I/O profil, dostupnost, očekávaný růst, způsob zálohování, support a provozní dovednosti týmu. PowerVault může být vhodný pro konkrétní databázi nebo VMware cluster, ale samotné označení „virtualizace“ ke správnému návrhu nestačí."],
      ["2. Hardware a dual-controller architektura", "Systém tvoří controller enclosure, dva řadičové moduly, hostitelské porty, management porty, cache, interní diskové propojení, napájecí a chladicí moduly a podporovaná média. Podle modelu lze připojovat expanzní enclosure. Dual-controller konfigurace omezuje dopad poruchy řadiče, ale vysoká dostupnost vzniká až společně s redundantním zapojením hostů, správným multipathingem a podporovanou konfigurací.||Každý kabel a port patří do konkrétní datové cesty. Dokumentace musí ukázat HBA nebo NIC hostu, switch/fabric, port řadiče a prezentovaný volume. Cílem je odstranit společné body poruchy a umožnit maintenance jednotlivých komponent bez ztráty přístupu. Stav „oba řadiče jsou online“ neprokazuje, že host skutečně používá všechny očekávané cesty."],
      ["3. Virtual a linear storage, disk groups a pooly", "ME5 podporuje virtual a linear storage model. V praxi musí návrh respektovat přesnou verzi, typy médií, RAID, počet disků, požadovaný výkon a doporučení Dellu. Disky se sdružují do disk groups a ty vytvářejí kapacitní a výkonový základ poolu. Volume je logický prostředek vytvořený nad tímto základem a následně prezentovaný hostu.||Volba ochrany ovlivňuje usable kapacitu, zápisový výkon, dobu rebuildu a počet současně tolerovaných poruch. Pool nesmí být hodnocen pouze podle volného prostoru; důležité jsou také rozložení disk groups, tier, stav médií a rezerva pro interní operace. Každé rozšíření musí mít předem potvrzený cílový stav, podporovanou kombinaci disků a plán validace."],
      ["4. FC, iSCSI a SAS připojení", "Fibre Channel používá HBA, WWPN, FC switche, zoning a target porty pole. Pro vysokou dostupnost se běžně navrhují dvě nezávislé fabric. iSCSI přenáší blokový provoz přes Ethernet/IP a vyžaduje vyhrazené nebo správně řízené VLAN, adresaci, odpovídající MTU, switche a iSCSI initiatory. SAS lze využít pro přímé podporované připojení v určitých scénářích.||Dell Deployment Guide popisuje přesné hostitelské postupy pro Windows, Linux, ESXi a další platformy. SDM musí vyžadovat ověření Support Matrix pro konkrétní HBA/NIC, transceiver, firmware, driver, operační systém a protokol. Obecné tvrzení, že FC nebo iSCSI je podporované, nenahrazuje kontrolu celé kombinace."],
      ["5. Hosty, initiatory, volumes a multipathing", "Na poli se identifikátory initiatorů sdružují do hostů a podle potřeby host groups. Volume se připojuje pouze ke správným hostům. Na FC fabric se přístup omezuje zoningem a na poli mappingem/maskingem. Host následně provede rescan, rozpozná zařízení a použije podporovaný multipathing.||U VMware prostředí pokračuje postup vytvořením nebo rozšířením datastore. U Windows nebo Linuxu může následovat partition, filesystem nebo předání volume databázi. Akceptace proto končí až na úrovni konzumenta. Je potřeba ověřit očekávaný počet cest, aktivní/optimalizované stavy, failover a návrat po obnovení komponenty."],
      ["6. VMware vSphere integrace", "Oficiální Dell best practices řeší HBA, fyzickou konektivitu, iSCSI vSwitch a VMkernel adaptéry, MPIO, virtual SCSI controllery, velikost datastore a počet VM. Doporučení se musí číst pro konkrétní release a architekturu. Univerzální nastavení převzaté z jiného pole může být nevhodné.||V provozu je nutné mapovat VM na datastore, datastore na zařízení ESXi, zařízení na ME5 volume a volume na disk group/pool. Při výkonovém incidentu se porovnávají metriky hostu, datastoru, cest a pole na stejné časové ose. VMware alarm, storage event a uživatelský symptom musí být spojeny konkrétními objekty."],
      ["7. Management, monitoring a support", "PowerVault Manager slouží k prvotní konfiguraci, provisioningu, monitoringu a administraci. Guided setup podle Dell dokumentace zahrnuje management síť, DNS, NTP, uživatele, notifikace, SupportAssist, storage konfiguraci, hosty a volumes. Tyto kroky jsou také základem provozního předání.||Provoz musí mít bezpečné účty a role, aktuální kontakty, notifikace přes e-mail/SNMP/syslog, přístup k logům, evidenci sériových čísel a platný support entitlement. SupportAssist nebo související observability služba pomáhá s telemetrií a podporou, ale nenahrazuje lokální monitoring, proces incidentu ani odpovědnost za reakci na alarm."],
      ["8. Lifecycle, změny a role SDM", "Firmware změna začíná ověřením release notes, Support Matrix, známých problémů a podporované upgrade cesty. Plán zahrnuje pre-check, zálohu konfigurace, potvrzení zdraví pole a všech cest, komunikační okno, implementaci, monitoring, funkční validaci a rollback nebo eskalační postup. Bez aktuálního support bundle a kontaktu na podporu roste riziko prodlouženého incidentu.||SDM vede service map, přehled kapacity, incidentů, změn, firmware, supportu a rizik. U degradované komponenty rozlišuje dostupnost služby od ztráty redundance. Při capacity review sleduje trend, bezpečný práh a lead time. Při incidentu koordinuje host, SAN/IP, storage a aplikační tým a vyžaduje společnou časovou osu. Technické rozhodnutí ponechává specialistovi, ale hlídá důkaz, vlastníka a termín." ]
    ]
  }
};

const productTrainingPrerequisites = {
  powervault: "datacenter", powerstore: "datacenter", powermax: "datacenter", powerscale: "datacenter", objectscale: "datacenter", powerflex: "virtualization-storage",
  vxrail: "virtualization-storage", datadomain: "virtualization-storage", ppdm: "virtualization-storage", "cyber-recovery": "service-delivery",
  vsphere: "datacenter", vsan: "virtualization-storage", nsx: "virtualization-storage", vdefend: "virtualization-storage", vcf: "service-delivery", "dell-private-cloud": "service-delivery", san: "datacenter"
};

const companies = [
  {
    name: "KSP Computer & Services", status: "Ověřeno z veřejného webu",
    summary: "Český integrátor zaměřený na návrh, dodávku a podporu IT infrastruktury.",
    portfolio: ["Datová centra na míru", "Software, virtualizace a cloud", "Koncová zařízení", "Bezpečnostní analýza a poradenství", "Pozáruční servis a náhradní díly"],
    vendors: "Ve veřejných materiálech zmiňuje Dell Technologies, HPE, Oracle, Hitachi Vantara, Microsoft, Rubrik, Huawei, IBM, Cisco, VMware/Broadcom, Veeam a další.",
    source: "https://kspcs.cz/"
  },
  {
    name: "KSP IT Systems", status: "Interně potvrzený profil",
    summary: "Tým zkušených specialistů na moderní enterprise IT infrastrukturu, automatizaci, hybridní cloud, kontejnerové platformy, datová úložiště a provoz kritických systémů. Pomáhá velkým organizacím řešení navrhovat, implementovat a dlouhodobě rozvíjet se zaměřením na spolehlivost, bezpečnost, efektivitu a škálovatelnost.",
    portfolio: [
      "Návrh a rozvoj enterprise IT infrastruktury a kritických systémů",
      "Automatizované patchování rozsáhlých prostředí s tisíci serverů",
      "Centrální správa Linux infrastruktury a automatizace rutinních činností",
      "Kontejnerizace aplikací a návrh či provoz Kubernetes platforem",
      "Hybridní cloud a hyperkonvergovaná infrastruktura",
      "Datová úložiště včetně object storage",
      "Disaster recovery architektury, scénáře obnovy a provozní připravenost",
      "Pilotní AI prostředí s GPU akcelerací"
    ],
    vendors: "Silnou stránkou je spojení architektonického know-how, hluboké technické expertizy a dlouhodobé provozní zkušenosti. Tým pracuje s celkovou architekturou, procesy, automatizací a bezpečným rozvojem prostředí podle obchodních a provozních potřeb zákazníka.",
    sectors: ["Telekomunikace", "Finance", "Pojišťovnictví", "Veřejná správa", "Média", "Zdravotnictví", "Energetika"],
    delivery: "Návrh řešení → dodávka → implementace → migrace → dlouhodobá podpora → lifecycle management → další rozvoj.",
    relationship: "KSP IT Systems je součástí KSP Computer & Services. Specializovanou technologickou expertizu tak propojuje se širším zázemím stabilní IT společnosti a s možností zajistit celé řešení od návrhu po dlouhodobý provoz.",
    source: "https://kspcs.cz/",
    sourceLabel: "Veřejný zdroj ke skupině KSPCS ↗",
    sourceNote: "Popis kompetencí KSP IT Systems byl interně potvrzen a doplněn uživatelem 21. 9. 2026."
  },
  {
    name: "DC-tec Partners", status: "Ověřeno z veřejného webu",
    summary: "Specialisté na návrh, implementaci, migraci a podporu technologií datových center.",
    portfolio: ["Virtualizace", "Servery", "Disková pole", "Objektová pole", "SAN sítě", "Backup řešení", "Pozáruční servis"],
    vendors: "Veřejně uvádí DellEMC, VMware/Broadcom, Huawei, HPE, IBM, Hitachi a další.",
    source: "https://www.dctec.cz/"
  }
];


// PowerVault course expansion: educational explanations and original exercises.
const powerVaultExpansion = {
  "texts": [
    "Nejdříve si představ konkrétní obchodní službu: zaměstnanec zadá objednávku, aplikace ji zpracuje a databáze uloží změnu. PowerVault obsluhuje až část tohoto řetězce: přijímá blokové požadavky od připojených serverů. Neví, že právě ukládá objednávku. Rozlišuje adresy bloků a operace čtení či zápisu. Význam dat vytváří filesystem, databáze a aplikace nad ním. Proto zelený stav pole ještě nedokazuje funkční obchodní službu.||Block storage poskytuje hostu zařízení podobné disku. File storage naproti tomu sdílí soubory a adresáře, například pomocí SMB nebo NFS. Object storage pracuje s objekty, jejich klíči a metadaty, často přes S3 API. Pokud Windows server uloží sdílenou složku na disk z PowerVaultu, SMB poskytuje Windows server. PowerVault se tím nestává nativním file serverem. To je důležité pro rozdělení odpovědností: problém s oprávněním složky může patřit týmu Windows, zatímco chyba přístupu k blokovému zařízení patří do společné diagnostiky hostu a storage.||Označení entry nebo cost-efficient popisuje pozici produktu, nikoliv toleranci zákazníka k výpadku. I na levnějším poli může ležet velmi důležitá aplikace. Potřebné SLA se musí převést do architektury, podpory a obnovy. PowerStore a PowerMax nelze srovnávat jen podle počtu disků: při výběru se hodnotí datové služby, výkon za poruchy, rozšiřitelnost, provozní model a integrační požadavky. Vyšší řada sama o sobě nezachrání chybějící zálohy nebo jedinou síťovou cestu.||Na discovery workshop si připrav seznam aplikací, vlastníků a špiček. Ptej se, zda noční dávka může trvat déle, zda se objem dat mění skokově a jak dlouho smí být služba nedostupná. Výstupem není jen počet TB. Je to soubor požadavků, proti kterému architekt ověří vhodnost konkrétní konfigurace. SDM později používá stejný soubor jako základ service review.",
    "Datová cesta má front-end a back-end. Front-end propojuje hosty s porty řadičů. Back-end propojuje řadiče s disky a případnými expanzními skříněmi. Management síť slouží správě a nemusí přenášet aplikační data. Výpadek management přístupu proto nemusí znamenat zastavení I/O, ale omezuje schopnost diagnostiky a řízení. V incidentu vždy přesně pojmenuj, která rovina selhala.||Redundance je vlastnost celé cesty. Dva zdroje zapojené do stejného napájecího prvku mohou sdílet bod poruchy. Dvě síťové karty připojené přes jediný switch nechrání před výpadkem tohoto switche. Dva řadiče bez funkčního multipathingu na hostu nezaručují transparentní pokračování aplikace. V dokumentaci proto kresli skutečné kabely, porty a nezávislé části infrastruktury, nikoli pouze dvě zelené ikony.||Failure domain je oblast, jejíž porucha zasáhne několik komponent současně. Může to být switch, skříň, napájecí větev nebo celá lokalita. Pro každou plánovanou poruchu si polož otázku: co přesně se ztratí a která nezávislá cesta zbývá? Počet kopií či komponent bez znalosti jejich umístění nedává úplnou informaci o odolnosti.||Modelová situace: řadič A hlásí závadu, ale aplikace pracuje. To je dostupná služba ve zhoršeném stavu, nikoliv bezrizikový provoz. SDM zajistí potvrzení přeživší cesty, eskalaci podle kontraktu, dostupnost náhradního dílu a omezení dalších změn. Zákaznická komunikace má oddělit současný dopad od zvýšeného rizika druhé poruchy.",
    "Základní hierarchie je fyzický disk → disk group → pool → volume → host. Disk group sdružuje média s vybranou ochranou. Pool poskytuje prostor pro logické volumes. Host obvykle nevidí, který fyzický disk právě obsloužil jeho zápis. Toto oddělení umožňuje správci přidělovat kapacitu aplikacím bez přímého přiřazení každé aplikace k jednomu disku.||Dell v doporučení pro ME5/ME52 rozlišuje virtual a linear model. Virtual model umožňuje sdílení kapacity a související datové služby; linear pool je spojen s jednou disk group. Dokument rovněž popisuje přiřazení poolů jednotlivým řadičům. Návrh tedy musí sledovat nejen celkovou volnou kapacitu, ale také rozložení zátěže. Volbu modelu je potřeba potvrdit před implementací podle skutečných požadavků.||Raw kapacita je součet fyzických médií. Usable kapacita zbývá po ochraně a dalších režijních nákladech. Allocated kapacita je prostor přidělený logickým objektům a consumed je skutečně spotřebovaný prostor v daném měřicím bodě. U thin provisioningu může logicky přidělený prostor převýšit fyzicky dostupný. To není dodatečně vytvořená kapacita; je to závazek, který musí hlídat monitoring a plán růstu.||RAID řeší vybrané poruchy disků, ale neochrání před každým smazáním nebo poškozením dat aplikací. Rebuild obnovuje ochranu po poruše a současně spotřebovává prostředky. Zdravotní stav a výkon pole během rebuildu mohou být jiné než za běžného provozu. Nákup podle výsledku ideálního benchmarku proto nevystihuje všechny provozní podmínky.||Cvičný výpočet: z 80 TB použitelné kapacity je spotřebováno 56 TB. Tým zvolil pracovní hranici 64 TB a růst 2 TB měsíčně. Do hranice zbývají přibližně čtyři měsíce. Jestli nákup a realizace trvají tři měsíce, zbývá jen měsíc rezervy. Hranice 80 % je v tomto příkladu interní rozhodnutí, nikoliv univerzální limit Dellu. Do plánu navíc patří nejistota růstu a prostor pro provozní operace.",
    "Fibre Channel používá oddělenou storage síť. Identita portu se označuje WWPN. Zoning určuje, které porty spolu smějí komunikovat v dané fabric. iSCSI přenáší blokové příkazy přes TCP/IP; initiator má identitu IQN a komunikuje s targetem přes IP adresy. Ani jeden protokol sám o sobě neurčuje, které volume host dostane: to doplňuje konfigurace na poli.||U iSCSI je nutné uvažovat celou síťovou cestu. MTU je maximální velikost přenášeného rámce či paketu v příslušném kontextu. Nastavení větší MTU jen na hostu neznamená, že ji podporuje každý prvek cesty. VLAN odděluje provoz logicky, ale nemusí zajistit samostatnou fyzickou kapacitu ani nezávislost při poruše. SDM proto žádá potvrzení topologie, propustnosti a testu konektivity od síťového týmu.||SAS může sloužit přímému připojení podporovaných hostů k poli. Vynechání SAN switchů snižuje počet prvků, současně však mění možnosti připojení a růstu. Rozhodnutí závisí na podporované topologii, počtu hostů a portů. Nezaměňuj hostitelské SAS připojení s interním propojením diskových skříní: stejná rodina technologie může mít jinou úlohu.||Příklad z dokumentace výrobce: Dell ve VMware best practices ukazuje dva hosty, dva switche a pole ME5084. Každý host má přístup přes oba switche a oba řadiče jsou připojené do obou stran. Níže je zjednodušené překreslení principu, nikoliv instalační schéma s kompletními porty. Nejde o zákaznickou případovou studii. Praktická hodnota je v rozpoznání nezávislých cest a v možnosti připravit test výpadku jedné fabric.",
    "Initiator zahajuje komunikaci, target ji přijímá. Host object na poli sdružuje identifikátory konkrétního serveru. Mapping určuje, které volume je tomuto hostu prezentováno. LUN je číslo logické jednotky v příslušném přístupovém kontextu; nepoužívej samotné číslo LUN jako celosvětově jedinečný identifikátor dat. V evidenci potřebuješ také zařízení, volume a hosty.||Multipathing spojuje více fyzických cest k témuž zařízení. Operační systém nemá stejné volume považovat za několik nezávislých disků. Důležité je rozlišit dostupnou cestu a preferovanou či optimalizovanou cestu. ALUA pomáhá hostu rozpoznat asymetrii přístupu přes řadiče. Dvě aktivní komponenty automaticky neznamenají, že všechny cesty mají stejné vlastnosti.||Dell pro SAN připojený ME5 ve VMware dokumentaci popisuje Round Robin a využití cest k vlastnícímu řadiči. U přímého zapojení s jedinou cestou k vlastníkovi nelze očekávat stejný přínos rozdělování provozu. Konkrétní nastavení se musí převzít z odpovídajícího návodu a ověřit pro danou kombinaci verzí; tento kurz není změnový runbook.||Cvičný incident: jeden ESXi host vidí méně cest než ostatní, ale VM běží. Nejprve porovnej stejný datastore na více hostech a zjisti čas změny. Poté zkontroluj alarmy HBA, switch portů, zoning a porty pole. Nesnaž se problém řešit současným restartem několika vrstev: ztratíš důkazy a můžeš odstranit poslední funkční cestu. SDM sestaví společnou časovou osu a určí vlastníka každé ověřovací akce.",
    "VM obsahuje virtuální disk, například soubor VMDK na VMFS datastore. ESXi přistupuje k blokovému zařízení prezentovanému polem a VMFS na něm organizuje soubory virtuálních strojů. Jeden problém na sdíleném zařízení může proto ovlivnit více VM i aplikací. Při incidentu potřebuješ mapu vztahů, nikoliv pouze seznam názvů serverů.||vCenter zajišťuje centrální správu, zatímco běžné I/O virtuálního stroje nevykonává místo ESXi. Výpadek konzole vCenter tedy neznamená automaticky zastavení všech VM. Naopak funkční konzole neprokazuje zdravý datastore. Pro správný rozsah incidentu odděluj správu, výpočetní vrstvu, storage a aplikaci.||Latence říká, jak dlouho operace trvá. IOPS je počet operací za sekundu a throughput objem dat za sekundu. Tyto veličiny je nutné číst spolu s velikostí bloků, poměrem čtení a zápisu a paralelismem. Sto tisíc malých čtení není stejný workload jako sekvenční zápis velkých souborů. Číslo IOPS bez kontextu není univerzální známka rychlosti.||Fronta vzniká, když požadavky čekají na obsloužení. Větší fronta může být důsledkem vyšší zátěže nebo pomalejšího zpracování. Samotné zvýšení limitu fronty nemusí odstranit úzké místo. Při diagnostice porovnej aplikační odezvu, latenci hostu a pole ve stejném čase, včetně běžících backupů a dávkových úloh. Rozdíl mezi měřicími body pomáhá specialistovi zúžit oblast problému.||Cvičný scénář: každou noc se prodlouží dávka a ráno je vše zdravé. Denní screenshot konzole incident nevysvětlí. Připrav časové řady kolem noční špičky, seznam dotčených datastore a plán záloh. Cílem prvního callu je dohodnout měření a ověřit hypotézy, ne bez důkazu objednat rychlejší disky.",
    "Monitoring potřebuje tři pohledy: zdraví komponent, chování služby a vývoj kapacity. Zdravotní alarm upozorní na disk či řadič, výkonová metrika na latenci nebo zatížení a kapacitní trend na budoucí vyčerpání. Každý alarm má mít vlastníka a reakční postup. Notifikace do nečtené schránky je technicky odeslaná, ale provozně neúčinná.||Časová synchronizace pomocí NTP umožňuje spojit události z různých systémů. Pokud je čas na switchi posunutý, může analýza zaměnit příčinu a následek. DNS pomáhá překládat jména a musí být součástí dokumentace management závislostí. Výpadek podpůrné služby vždy posuzuj podle skutečné vazby; ne každá závislost managementu leží přímo v datové cestě.||Support bundle je soubor diagnostických informací pro analýzu. Při předání podpoře přilož identifikaci zařízení, verze, čas incidentu a časové pásmo, dopad, poslední změny a provedené kroky. Citlivá data se předávají schváleným kanálem. SDM má zajistit úplnost a dostupnost podkladů, nemusí sám interpretovat všechny interní logy.||Měsíční report má končit rozhodnutím. U incidentů uveď opakování a otevřené příčiny. U kapacity čas do pracovního limitu a stav rozšíření. U podpory datum konce a vlastníka obnovy. U lifecycle plánovanou verzi a blokující závislosti. U záloh dolož obnovu relevantní služby; počet úspěšných jobů není totožný s důkazem obnovitelnosti.||Cvičný úkol: připrav jednostránkový service review pro pole bez zákaznického výpadku, ale s vadným diskem, rostoucí kapacitou a firmware mimo interní standard. Rozděl současný dopad, budoucí riziko a schválené kroky. U každé akce napiš vlastníka, termín a důkaz, kterým bude uzavřena.",
    "Změnový plán je smlouva o tom, co se provede a jak se pozná úspěch. Obsahuje rozsah zařízení, výchozí stav, podporovanou cestu, závislosti, implementační kroky, kontrolní body a odpovědnosti. Nestačí napsat „upgrade firmware“. Musí být jasné, kdy se pokračuje, kdy se zastavuje a kdo rozhoduje při neočekávaném stavu.||Rollback není automaticky downgrade. Některé změny mají omezenou vratnost, proto se předem ověřuje výrobcem podporovaný postup. Pokud jednoduchý návrat neexistuje, plán musí popsat zastavení, eskalaci a obnovu služby. Tvrzení „změna je bezvýpadková“ je podmíněné zdravím prostředí, podporovanou konfigurací a správně fungující redundancí.||Akceptace má technickou i provozní část. Technická ověří dostupnost zařízení, cesty, datastore a aplikační funkci v dohodnutém rozsahu. Provozní ověří monitoring, přístupy, dokumentaci, podporu, kontakty a předání týmu. PM hlídá dodání těchto výstupů a SDM jejich použitelnost při skutečném incidentu.||Pro nácvik připrav plán rozšíření: kdo potvrdí kompatibilitu médií, kdo schválí kapacitní model, kdy dorazí díly, kdo provede implementaci a kdo ověří kapacitu až na straně konzumenta. Přidaný disk nemusí automaticky znamenat zvětšený filesystem aplikace. Změna má několik vrstev a každá potřebuje vlastní validaci.||Závěrečná ústní zkouška: během pěti minut vysvětli zákazníkovi cestu od VM k disku, během dalších pěti popiš ztrátu jedné cesty a nakonec navrhni důkazy pro převzetí služby. Pokud umíš rozlišit potvrzené skutečnosti, hypotézy a chybějící údaje, máš dobrý základ pro vedení technické debaty. Praktická oprávnění a zásahy ale dál náleží vyškoleným specialistům podle dohodnutých rolí."
  ],
  "terms": [
    [
      "alua",
      "ALUA",
      "Mechanismus, kterým storage hostu oznamuje různé stavy přístupových cest. Souvisí s vlastnictvím poolu, řadiči a multipathingem; dostupné cesty nemusí být stejně optimalizované."
    ],
    [
      "initiator",
      "Initiator",
      "Koncový bod, který zahajuje storage komunikaci. FC používá například port HBA s WWPN, iSCSI softwarový nebo hardwarový initiator s IQN."
    ],
    [
      "target",
      "Target",
      "Koncový bod storage komunikace poskytující přístup k logickým jednotkám. Přístup dále řídí konfigurace sítě a mapping na poli."
    ],
    [
      "wwpn",
      "WWPN",
      "World Wide Port Name: identifikátor portu Fibre Channel. Používá se při identifikaci hostů a v zoningu."
    ],
    [
      "iqn",
      "IQN",
      "iSCSI Qualified Name: identita iSCSI uzlu. Není totožná s jeho IP adresou."
    ],
    [
      "mapping",
      "Mapping",
      "Přiřazení volume konkrétnímu hostu či skupině hostů na poli. Doplňuje síťovou dostupnost; samotný zoning volume nepřidělí."
    ],
    [
      "disk-group",
      "Disk group",
      "Skupina disků s daným způsobem ochrany, která dodává kapacitu poolu. Konkrétní pravidla závisí na storage modelu a produktu."
    ],
    [
      "rebuild",
      "Rebuild",
      "Obnovení datové ochrany po poruše média. Spotřebovává prostředky a do jeho dokončení může být odolnost snížená."
    ],
    [
      "round-robin",
      "Round Robin",
      "Politika střídání podporovaných datových cest. Přesná pravidla a doporučení závisí na poli, hostu a topologii."
    ],
    [
      "support-bundle",
      "Support bundle",
      "Diagnostický balík logů a konfigurace pro podporu. K analýze patří také čas, verze, dopad a popis změn."
    ],
    [
      "front-end",
      "Front-end",
      "V kontextu pole rozhraní směrem k hostům. Nezaměňovat s uživatelským rozhraním webové aplikace."
    ],
    [
      "back-end",
      "Back-end",
      "V kontextu pole vnitřní propojení k médiím a expanzním skříním. Odlišná část cesty od hostitelských portů."
    ]
  ],
  "questions": [
    [
      "Aplikace přes SMB ukládá na Windows server s diskem z ME5. Kdo poskytuje SMB?",
      [
        "Windows server",
        "ME5 automaticky",
        "FC switch",
        "HBA"
      ],
      0,
      "Pole poskytuje blokové zařízení; souborovou službu v této topologii poskytuje Windows."
    ],
    [
      "Dva zdroje používají jedinou napájecí větev. Co musíš prověřit?",
      [
        "Pouze počet disků",
        "Společný bod poruchy napájení",
        "Jméno datastore",
        "Velikost VMDK"
      ],
      1,
      "Počet komponent neprokazuje nezávislost jejich závislostí."
    ],
    [
      "Co spojuje více cest ke stejnému blokovému zařízení?",
      [
        "DNS",
        "SMB",
        "Multipathing",
        "Thin provisioning"
      ],
      2,
      "Multipathing umožňuje hostu pracovat s více cestami jako s cestami k témuž zařízení."
    ],
    [
      "K čemu slouží ALUA?",
      [
        "K zálohování VM",
        "K překladu DNS",
        "K vytvoření VLAN",
        "K rozlišení stavů přístupu přes řadiče"
      ],
      3,
      "ALUA pomáhá hostu rozeznat asymetrii přístupových cest."
    ],
    [
      "Zoning je hotový, ale volume není prezentováno hostu. Co ověřit?",
      [
        "Mapping na poli",
        "Barvu kabelu",
        "Retenci záloh",
        "Heslo aplikace"
      ],
      0,
      "Síťový přístup nenahrazuje přiřazení volume hostu."
    ],
    [
      "Spotřeba je 56 TB, pracovní limit 64 TB, růst 2 TB měsíčně. Kolik času zbývá?",
      [
        "Osm měsíců",
        "Čtyři měsíce",
        "Dva roky",
        "Nelze počítat ani odhad"
      ],
      1,
      "(64−56)/2 = 4 měsíce. Jde o odhad při konstantním růstu, nikoli záruku."
    ],
    [
      "Co znamená úspěšný RAID rebuild?",
      [
        "Existuje offsite záloha",
        "Aplikace je vždy konzistentní",
        "Obnovila se příslušná datová ochrana",
        "Bylo splněno RTO"
      ],
      2,
      "RAID ochrana není záloha ani ověření aplikační obnovy."
    ],
    [
      "VM běží, ale jeden host ztratil cestu. Jak stav popsat?",
      [
        "Bez rizika",
        "Všechny VM jsou vypnuté",
        "Jistě vadný disk",
        "Služba dostupná, redundance degradovaná"
      ],
      3,
      "Aktuální dostupnost a odolnost vůči další poruše jsou rozdílné vlastnosti."
    ],
    [
      "Co je správný první krok u pravidelného nočního zpomalení?",
      [
        "Sjednotit časovou osu metrik a plánovaných úloh",
        "Restartovat celé pole",
        "Nakoupit disky bez měření",
        "Ignorovat problém, protože ráno zmizí"
      ],
      0,
      "Korelace metrík a událostí umožní testovat příčiny namísto hádání."
    ],
    [
      "Znamená výpadek vCenter automaticky zastavení diskového I/O všech VM?",
      [
        "Ano vždy",
        "Ne, běžné I/O obsluhují hosty ESXi",
        "Ano pouze u FC",
        "Ano pouze u iSCSI"
      ],
      1,
      "Řídicí rovina a datová cesta mají odlišné role."
    ],
    [
      "Jak číst rollback ve změnovém plánu firmware?",
      [
        "Vždy jako downgrade",
        "Jako restart bez kontroly",
        "Jako předem ověřený podporovaný návrat nebo postup obnovy",
        "Jako smazání konfigurace"
      ],
      2,
      "Vratnost změny nelze předpokládat. Je nutné ověřit podporovaný postup."
    ],
    [
      "Co dokládá provozní převzetí?",
      [
        "Zapnutá konzole",
        "Pouze dodací list",
        "Počet TB",
        "Funkce, monitoring, dokumentace, support, role a akceptační důkazy"
      ],
      3,
      "Převzetí musí zajistit, že službu dokáže provozní tým skutečně podporovat."
    ]
  ]
};
powerVaultExpansion.texts.forEach((text,i)=>{productTrainingExtras.powervault.chapters[i][1] += "||"+text; productTrainingExtras.powervault.chapters[i][3] = ["Připrav discovery otázky a rozděl požadavky na kapacitu, výkon, dostupnost a obnovu.","Nakresli společné body poruchy od hostu až po napájení.","Spočítej čas do kapacitního limitu a rezervu proti dodací lhůtě.","Vyznač obě fabric a vysvětli dopad výpadku každé z nich.","Sestav plán diagnostiky ztracené cesty bez zásahu do přeživší cesty.","Propoj jednu aplikaci s VM, datastore, volume a poolem.","Připrav service review se třemi rozhodnutími a jejich vlastníky.","Sepiš akceptační kritéria a podmínky zastavení změny."][i];});
productTrainingExtras.powervault.estimated = "Rozšířený výklad + 8 cvičení";
powerVaultExpansion.terms.forEach(([id,term,definition])=>{ if(!glossary.some(g=>g.id===id)) glossary.push({id,term,definition,category:"PowerVault · datová cesta a provoz"}); if(!glossaryAliases.some(([label])=>label.toLowerCase()===term.toLowerCase()))glossaryAliases.push([term,id]); if(!products.find(p=>p.id==="powervault").terms.includes(id))products.find(p=>p.id==="powervault").terms.push(id); });
const powerVaultQuestions = powerVaultExpansion.questions.map(([question,answers,correct,explanation],i)=>({id:200+i,topic:"PowerVault",question,answers,correct,explanation}));
quizQuestions.push(...powerVaultQuestions);

const state = {
  route: location.hash.slice(1) || "dashboard",
  productFilter: "Vše",
  search: "",
  quiz: null,
  courseQuiz: null,
  productQuiz: null,
  progress: JSON.parse(localStorage.getItem("infrabase-progress") || "{}"),
  courseProgress: JSON.parse(localStorage.getItem("infrabase-course-progress") || "{}"),
  productTrainingProgress: JSON.parse(localStorage.getItem("infrabase-product-training") || "{}"),
  notes: JSON.parse(localStorage.getItem("infrabase-notes") || "{}")
};

if (!state.courseProgress["general-quiz"] && localStorage.getItem("infrabase-best")) state.courseProgress["general-quiz"] = {best:Number(localStorage.getItem("infrabase-best")),passed:false};

const nav = [
  ["PŘEHLED", null], ["dashboard", "⌂", "Můj přehled"], ["training", "▶", "Školení", trainingBlocks.length + products.length], ["path", "↗", "Studijní cesta"],
  ["ZNALOSTI", null], ["products", "▦", "Produkty", products.length], ["architecture", "◇", "Architektury", 5], ["glossary", "Aa", "Slovník", glossary.length], ["companies", "⌘", "Portfolio firem"],
  ["PROCVIČOVÁNÍ", null], ["quiz", "✓", "Test znalostí", quizQuestions.length], ["sources", "↗", "Zdroje"]
];

const view = document.querySelector("#view");
const navEl = document.querySelector("#mainNav");
const searchInput = document.querySelector("#globalSearch");
const termDialog = document.querySelector("#termDialog");

function saveState() {
  localStorage.setItem("infrabase-progress", JSON.stringify(state.progress));
  localStorage.setItem("infrabase-course-progress", JSON.stringify(state.courseProgress));
  localStorage.setItem("infrabase-product-training", JSON.stringify(state.productTrainingProgress));
  localStorage.setItem("infrabase-notes", JSON.stringify(state.notes));
  updateProgressUI();
}

function getMasteredCount() { return Object.values(state.progress).filter(Boolean).length; }
function progressPercent() { return Math.round((getMasteredCount() / products.length) * 100); }
function levelName(percent) { return percent >= 80 ? "Delivery partner" : percent >= 50 ? "Praktik" : percent >= 20 ? "Orientace" : "Start"; }

function updateProgressUI() {
  const percent = progressPercent();
  document.querySelector("#sidebarProgress").style.width = `${percent}%`;
  document.querySelector("#sidebarProgressText").textContent = `${percent} % zvládnuto`;
  document.querySelector("#levelName").textContent = levelName(percent);
}

function renderNav() {
  navEl.innerHTML = nav.map(item => {
    if (!item[1]) return `<div class="nav-section">${item[0]}</div>`;
    const [route, icon, label, count] = item;
    const current = state.route.split("/")[0] === route;
    return `<button class="nav-link ${current ? "active" : ""}" data-route="${route}"><span class="nav-icon">${icon}</span><span>${label}</span>${count ? `<span class="nav-count">${count}</span>` : ""}</button>`;
  }).join("");
}

function routeTo(route) {
  location.hash = route;
  state.route = route;
  state.search = "";
  searchInput.value = "";
  document.querySelector(".sidebar").classList.remove("open");
  render();
  document.querySelector("#main").focus({ preventScroll: true });
  scrollTo({ top: 0, behavior: "smooth" });
}

function productCard(p) {
  return `<button class="product-card" data-product="${p.id}">
    <span class="category">${p.category}</span>
    <h3>${p.name}</h3><p>${p.oneLiner}</p>
    <footer><span>${p.vendor}</span><span class="${state.progress[p.id] ? "mastery" : ""}">${state.progress[p.id] ? "✓ zvládnuto" : p.level}</span></footer>
  </button>`;
}

function dashboardView() {
  const percent = progressPercent();
  const lastId = localStorage.getItem("infrabase-last") || "powervault";
  const last = products.find(p => p.id === lastId) || products[0];
  return `<section class="welcome-hero"><div><p class="eyebrow">Osobní studijní databáze</p><h1>Rozuměj infrastruktuře jako celku.</h1><p class="lede">Produkty, architektonické vztahy a provozní otázky, které potřebuješ jako SDM nebo PM při jednání se zákazníkem.</p><div class="hero-actions"><button class="primary-button" data-route="path">Začít studijní cestu</button><button class="secondary-button" data-route="architecture">Prohlédnout architektury</button></div></div><div class="hero-visual" aria-label="Zjednodušené vrstvy datacentra"><div class="hero-node compute"><span>01</span><strong>Compute</strong></div><div class="hero-link"></div><div class="hero-node network"><span>02</span><strong>Network</strong></div><div class="hero-link"></div><div class="hero-node storage"><span>03</span><strong>Storage</strong></div></div></section>
  <section class="metrics" aria-label="Studijní přehled">
    <div class="metric"><span>Produktové moduly</span><strong>${products.length}</strong><small>Dell, VMware a průřezová témata</small></div>
    <div class="metric"><span>Pojmy ve slovníku</span><strong>${glossary.length}</strong><small>Srozumitelná vysvětlení</small></div>
    <div class="metric"><span>Zvládnuté moduly</span><strong>${getMasteredCount()} / ${products.length}</strong><small>${levelName(percent)}</small></div>
    <div class="metric"><span>Nejlepší test</span><strong>${state.courseProgress["general-quiz"]?.best ?? "—"}${state.courseProgress["general-quiz"] ? " %" : ""}</strong><small>${quizQuestions.length} otázek v databázi</small></div>
  </section>
  <div class="dashboard-grid"><div class="stack">
    <section class="panel"><div class="panel-head"><div><p class="eyebrow">Doporučené pořadí</p><h2>Od infrastruktury ke službě</h2></div><button class="action-link" data-route="path">Celá cesta →</button></div>
      <div class="learning-path">${[
        ["1", "Základy", "Compute, storage, síť a virtualizace", "vsphere"],
        ["2", "PowerVault", "Tvůj první prioritní produkt", "powervault"],
        ["3", "Ochrana dat", "Backup, PPDM a Data Domain", "datadomain"],
        ["4", "Private cloud", "VCF, networking a lifecycle", "vcf"]
      ].map(([n,t,d,id]) => `<button class="path-step ${state.progress[id] ? "done" : ""}" data-product="${id}"><span class="step-no">${state.progress[id] ? "✓" : n}</span><strong>${t}</strong><small>${d}</small></button>`).join("")}</div>
    </section>
    <section class="panel"><div class="panel-head"><div><p class="eyebrow">Priorita pro roli</p><h2>Produkty, které si spoj jako první</h2></div><button class="action-link" data-route="products">Všechny produkty →</button></div><div class="panel-body"><div class="product-grid">${["powervault","vsphere","san"].map(id => productCard(products.find(p=>p.id===id))).join("")}</div></div></section>
  </div><aside class="stack">
    <section class="panel"><div class="panel-head"><div><p class="eyebrow">Pokračovat</p><h3>${last.name}</h3></div></div><div class="panel-body"><p class="lede">${last.oneLiner}</p><button class="primary-button wide" data-product="${last.id}">Otevřít modul</button></div></section>
    <section class="panel"><div class="panel-head"><div><p class="eyebrow">Rychlé procvičení</p><h3>Ověř si souvislosti</h3></div></div><div class="panel-body"><p class="lede">Náhodných 8 otázek s okamžitým vysvětlením odpovědi.</p><button class="secondary-button wide" data-start-quiz="8">Spustit krátký test</button></div></section>
    <section class="panel"><div class="panel-head"><div><p class="eyebrow">Dnešní pojem</p><h3>${glossary[new Date().getDate() % glossary.length].term}</h3></div></div><div class="panel-body"><p class="lede">${glossary[new Date().getDate() % glossary.length].definition}</p></div></section>
  </aside></div>`;
}

function architectureView() {
  return `<div class="page-head"><div><p class="eyebrow">Vizuální mapa infrastruktury</p><h1>Architektury a datové toky</h1><p class="lede">Diagramy ukazují logické vztahy. Nejsou fyzickým návrhem konkrétního zákazníka ani sizingem. Kliknutím na pojmy se můžeš přesunout do souvisejících produktových modulů.</p></div><span class="status-pill">5 studijních map</span></div>

  <section class="diagram-card"><div class="diagram-copy"><p class="diagram-number">01</p><h2>Klasická 3-tier architektura</h2><p>Compute, síť a storage jsou samostatné vrstvy s vlastním lifecyclem. Virtualizace běží na serverech, data VM leží na externím poli a SAN přenáší blokový provoz mezi nimi.</p><div class="diagram-questions"><strong>SDM sleduje:</strong> odpovědnosti týmů, redundantní cesty, kompatibilitu firmware a driverů, dopad změn a společné SLA.</div></div><div class="tier-diagram">
    <button data-product="vsphere" class="tier-layer tier-compute"><small>TIER 1</small><b>COMPUTE</b><span>x86 servery · ESXi · VM · cluster</span></button>
    <div class="flow-line"><span>FC / iSCSI / NFS</span></div>
    <button data-product="san" class="tier-layer tier-network"><small>TIER 2</small><b>NETWORK</b><span>LAN · SAN fabric · zoning · multipathing</span></button>
    <div class="flow-line"><span>LUN / datastore</span></div>
    <button data-product="powervault" class="tier-layer tier-storage"><small>TIER 3</small><b>STORAGE</b><span>PowerVault · PowerStore · PowerMax</span></button>
  </div></section>

  <section class="diagram-card reverse"><div class="diagram-copy"><p class="diagram-number">02</p><h2>Od aplikace k fyzickému disku</h2><p>Každá vrstva překládá požadavek do dalšího formátu. Zpomalení může vzniknout v aplikaci, hostu, síti, řadiči i na médiu. Proto se incident nesmí automaticky označit jako „problém storage“.</p><div class="diagram-questions"><strong>Diagnostická otázka:</strong> Ve které vrstvě se poprvé zvyšuje latence a jaká telemetrie to dokládá?</div></div><div class="data-path">
    <div><span>1</span><b>Aplikace</b><small>čtení / zápis</small></div><i>→</i><div><span>2</span><b>VM + OS</b><small>filesystem</small></div><i>→</i><div><span>3</span><b>ESXi</b><small>datastore</small></div><i>→</i><div><span>4</span><b>SAN</b><small>FC / iSCSI</small></div><i>→</i><div><span>5</span><b>Storage</b><small>LUN · RAID · disk</small></div>
  </div></section>

  <section class="diagram-card"><div class="diagram-copy"><p class="diagram-number">03</p><h2>HCI: compute a storage v jednom clusteru</h2><p>U HCI přidání nodu typicky rozšíří výpočetní i úložné zdroje. vSAN skládá lokální disky nodů do sdíleného datastore a dostupnost dat řídí pomocí storage policies.</p><div class="diagram-questions"><strong>Projektový dopad:</strong> kapacita, výkon, síť a failure domains se plánují společně; maintenance jednoho nodu ovlivňuje více vrstev.</div></div><div class="hci-diagram">
    ${[1,2,3,4].map(n=>`<button data-product="vxrail" class="hci-node"><span>NODE ${n}</span><b>Compute</b><i></i><b>Local storage</b></button>`).join("")}
    <div class="hci-bus"><b>vSAN distributed datastore</b><span>policy-based availability</span></div>
  </div></section>

  <section class="diagram-card reverse"><div class="diagram-copy"><p class="diagram-number">04</p><h2>VCF: management a workload domény</h2><p>Management domain hostuje řídicí komponenty cloudové platformy. Workload domains oddělují clustery a jejich lifecycle podle potřeb aplikací, týmů nebo bezpečnostních zón. Externí služby doplňují ochranu dat, identitu a dohled.</p><div class="diagram-questions"><strong>SDM sleduje:</strong> hranice odpovědností, upgrade pořadí, závislosti služeb, certifikáty, identity a obnovu management vrstvy.</div></div><div class="vcf-diagram">
    <button data-product="vcf" class="vcf-management"><small>VCF MANAGEMENT DOMAIN</small><b>Management · lifecycle · automation</b></button>
    <div class="vcf-workloads"><div><small>WORKLOAD DOMAIN A</small><b>Business aplikace</b></div><div><small>WORKLOAD DOMAIN B</small><b>Kritické systémy</b></div><div><small>WORKLOAD DOMAIN C</small><b>Kubernetes / AI</b></div></div>
    <div class="external-services"><span>Backup</span><span>Identity</span><span>Monitoring</span><span>DNS / NTP / PKI</span></div>
  </div></section>

  <section class="diagram-card"><div class="diagram-copy"><p class="diagram-number">05</p><h2>Čtyři různé významy škálování</h2><p>Slovo „rozšíření“ neříká, co přesně se mění. Každý model má jiný dopad na objednávku, implementaci, migraci, síť, licence, podporu a změnové okno.</p><div class="diagram-questions"><strong>Před schválením změny:</strong> potvrď, zda roste kapacita appliance, počet nodů, HCI cluster, workload domain nebo celá lokalita.</div></div><div class="scale-grid">
    <button data-product="powervault"><span>01</span><b>Scale-up</b><small>disky / kapacita</small></button><button data-product="powerflex"><span>02</span><b>Scale-out</b><small>nody / appliance</small></button><button data-product="vxrail"><span>03</span><b>HCI cluster</b><small>compute + storage</small></button><button data-product="dell-private-cloud"><span>04</span><b>Cloud domény</b><small>clustery / workloady</small></button>
  </div></section>`;
}

function productsView() {
  const categories = ["Vše", ...new Set(products.map(p => p.category))];
  const filtered = products.filter(p => state.productFilter === "Vše" || p.category === state.productFilter);
  return `<div class="page-head"><div><p class="eyebrow">Produktová knowledge base</p><h1>Produkty a technologické oblasti</h1><p class="lede">Každý modul spojuje technickou podstatu, vztahy k ostatním vrstvám, typické zákaznické otázky a úkoly SDM/PM.</p></div></div>
  <div class="filter-row">${categories.map(c => `<button class="chip ${state.productFilter === c ? "active" : ""}" data-filter="${c}">${c}</button>`).join("")}</div>
  <div class="product-grid">${filtered.map(productCard).join("")}</div>`;
}

function productDetail(id) {
  const p = products.find(x => x.id === id);
  if (!p) return notFound();
  localStorage.setItem("infrabase-last", p.id);
  const note = state.notes[p.id] || "";
  return `<button class="action-link" data-route="products">← Zpět na produkty</button>
  <div class="detail-layout"><article class="detail-main">
    <header class="detail-hero"><span class="tag">${p.category}</span><h1>${p.name}</h1><p class="one-liner">${p.oneLiner}</p>
      <div class="key-points"><div class="key-point"><span>Role</span><strong>${p.role}</strong></div><div class="key-point"><span>Škálování</span><strong>${p.scaling}</strong></div><div class="key-point"><span>Rozhraní</span><strong>${p.protocols}</strong></div></div>
    </header>
    ${p.sections.map(([title, text]) => `<section class="article-section"><h2>${title}</h2><p>${text}</p></section>`).join("")}
    <section class="article-section"><h2>Modelová situace</h2><div class="callout">${p.scenario}</div></section>
  </article>
  <aside class="detail-aside">
    <div class="side-card"><h3>Produktové školení</h3><p>Projdi výklad, praktický scénář a závěrečný test.</p><button class="primary-button wide" data-product-training="${p.id}">Otevřít školení</button></div>
    <div class="side-card"><h3>Související pojmy</h3><div class="term-links">${p.terms.map(id => { const t=glossary.find(g=>g.id===id); return t ? `<button class="term-link" data-term="${id}">${t.term}</button>` : ""; }).join("")}</div></div>
    <div class="side-card"><h3>Moje poznámky</h3><textarea class="note-area" id="productNote" data-note="${p.id}" placeholder="Co si potřebuji zapamatovat?">${escapeHtml(note)}</textarea><button class="secondary-button wide" id="saveNote">Uložit poznámku</button></div>
    <div class="side-card"><h3>Stav modulu</h3><button class="${state.progress[p.id] ? "secondary-button" : "primary-button"} wide" data-mastery="${p.id}">${state.progress[p.id] ? "Označit jako nerozpracované" : "Označit jako zvládnuté"}</button></div>
    <div class="side-card"><h3>Oficiální zdroj</h3><a href="${p.source}" target="_blank" rel="noreferrer">Otevřít dokumentaci ↗</a></div>
  </aside></div>`;
}

function isTrainingUnlocked(index) {
  if (index === 0) return true;
  return Boolean(state.courseProgress[trainingBlocks[index - 1].id]?.passed);
}

function trainingOverview() {
  const passed = trainingBlocks.filter(b => state.courseProgress[b.id]?.passed).length;
  return `<div class="page-head"><div><p class="eyebrow">Řízený základní kurz</p><h1>Od úplných základů k technické debatě</h1><p class="lede">Studuj blok po bloku. Každý obsahuje rozsáhlý výklad, příklady a pojmy ve slovníku. Další blok se otevře po dosažení alespoň 80 % v závěrečném testu.</p></div><span class="status-pill">${passed}/${trainingBlocks.length} bloků dokončeno</span></div>
  <section class="course-rule"><div><strong>1. Studuj</strong><span>Projdi všechny kapitoly a otevři neznámé pojmy ve slovníku.</span></div><div><strong>2. Vysvětli</strong><span>Zkus každou kapitolu převyprávět vlastními slovy.</span></div><div><strong>3. Otestuj se</strong><span>Test má 8 otázek a hranici úspěchu 80 %.</span></div><div><strong>4. Pokračuj</strong><span>Úspěšný výsledek automaticky odemkne další blok.</span></div></section>
  <div class="course-map">${trainingBlocks.map((block,index)=>{const unlocked=isTrainingUnlocked(index);const result=state.courseProgress[block.id];return `<article class="course-card ${unlocked?"":"locked"}"><div class="course-order">${String(block.order).padStart(2,"0")}</div><div><div class="course-meta"><span>${block.duration}</span><span>${block.chapters.length} kapitol</span>${result?`<span>Nejlépe ${result.best}%</span>`:""}</div><h2>${block.title}</h2><p class="course-subtitle">${block.subtitle}</p><p>${block.objective}</p>${unlocked?`<button class="${result?.passed?"secondary-button":"primary-button"}" data-training="${block.id}">${result?.passed?"Zopakovat blok":"Otevřít školení"}</button>`:`<div class="lock-message">🔒 Nejdříve dokonči předchozí blok</div>`}</div></article>`}).join("")}</div>
  <section class="product-training-head"><div><p class="eyebrow">Produktová akademie</p><h2>Školení ke každému produktu</h2><p>Produkty zůstávají v KB jako rychlá reference. Zde mají samostatnou výukovou cestu s architekturou, provozem, scénářem, oficiální dokumentací a testem.</p></div><span>${Object.values(state.productTrainingProgress).filter(x=>x.passed).length}/${products.length} dokončeno</span></section>
  <div class="product-training-grid">${products.map(p=>{const extra=productTrainingExtras[p.id];const progress=state.productTrainingProgress[p.id];const prereq=trainingBlocks.find(b=>b.id===productTrainingPrerequisites[p.id]);return `<article class="product-training-card ${extra?"deep":""}"><div class="course-meta"><span>${p.category}</span><span>${extra?"Rozšířený kurz":"Základní kurz"}</span></div><h3>${p.name}</h3><p>${p.oneLiner}</p><small>Doporučený základ: ${prereq?.title||"Jak funguje IT služba"}</small>${progress?`<div class="training-score">Nejlépe ${progress.best}% ${progress.passed?"· splněno":""}</div>`:""}<button class="${progress?.passed?"secondary-button":"primary-button"} wide" data-product-training="${p.id}">${progress?.passed?"Zopakovat kurz":"Otevřít kurz"}</button></article>`}).join("")}</div>`;
}

function annotateTrainingText(text) {
  const aliases = [...new Map(glossaryAliases.map(([label,id])=>[label.toLocaleLowerCase("cs"),[label,id]])).values()].sort((a,b)=>b[0].length-a[0].length);
  const lookup = new Map(aliases.map(([label,id])=>[label.toLocaleLowerCase("cs"),id]));
  const pattern = aliases.map(([label])=>label.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).join("|");
  if (!pattern) return text;
  const regex = new RegExp(`(^|[^\\p{L}\\p{N}])(${pattern})(?=$|[^\\p{L}\\p{N}])`, "giu");
  return text.replace(regex, (whole, prefix, match) => {
    const id = lookup.get(match.toLocaleLowerCase("cs"));
    const term = glossary.find(item=>item.id===id);
    if (!term) return whole;
    return `${prefix}<button class="glossary-token" data-term="${term.id}" data-definition="${escapeHtml(term.definition)}" aria-label="${escapeHtml(match)}: ${escapeHtml(term.definition)}">${match}</button>`;
  });
}

function trainingBlockView(id) {
  const index = trainingBlocks.findIndex(b=>b.id===id);
  const block = trainingBlocks[index];
  if (!block || !isTrainingUnlocked(index)) return trainingOverview();
  const result = state.courseProgress[id];
  return `<button class="action-link" data-route="training">← Zpět na přehled školení</button>
  <header class="course-hero"><div><p class="eyebrow">Blok ${block.order} · ${block.duration}</p><h1>${block.title}</h1><p>${block.subtitle}</p></div><div class="course-goal"><span>Cíl bloku</span><p>${block.objective}</p></div></header>
  <nav class="chapter-index" aria-label="Obsah bloku">${block.chapters.map((chapter,i)=>`<a href="#chapter-${block.id}-${i+1}"><span>${String(i+1).padStart(2,"0")}</span>${chapter[0].replace(/^\d+\.\s*/,"")}</a>`).join("")}</nav>
  <div class="training-content">${block.chapters.map(([title,text,points,example],i)=>`<section class="lesson-chapter" id="chapter-${block.id}-${i+1}"><div class="chapter-no">${String(i+1).padStart(2,"0")}</div><div><p class="eyebrow">Kapitola ${i+1} z ${block.chapters.length}</p><h2>${title}</h2><div class="lesson-text">${text.split("||").map(paragraph=>`<p>${annotateTrainingText(paragraph)}</p>`).join("")}</div><h3>Co si zapamatovat</h3><ul>${points.map(x=>`<li>${annotateTrainingText(x)}</li>`).join("")}</ul><div class="lesson-example"><span>PRAKTICKÝ PŘÍKLAD</span><p>${annotateTrainingText(example)}</p></div></div></section>`).join("")}</div>
  <section class="course-test-cta"><div><p class="eyebrow">Závěrečné ověření</p><h2>Otestuj pochopení bloku</h2><p>Test obsahuje 8 otázek. K odemčení dalšího bloku potřebuješ alespoň 80 %, tedy minimálně 7 správných odpovědí.</p>${result?`<p><strong>Nejlepší výsledek: ${result.best} %</strong>${result.passed?" · Blok je splněný.":" · Zkus test znovu."}</p>`:""}</div><button class="primary-button" data-course-test="${id}">${result?"Opakovat test":"Spustit test"}</button></section>`;
}

function startCourseTest(id) {
  const block = trainingBlocks.find(b=>b.id===id);
  if (!block) return;
  const questions = shuffle(quizQuestions.filter(q=>q.topic===block.topic));
  state.courseQuiz = { blockId:id, questions, index:0, score:0, selected:null, answered:false };
  routeTo(`training-test/${id}`);
}

function courseTestView(id) {
  const qz = state.courseQuiz;
  const block = trainingBlocks.find(b=>b.id===id);
  if (!block || !qz || qz.blockId!==id) return trainingBlockView(id);
  if (qz.index >= qz.questions.length) return courseTestResult(block);
  const q = qz.questions[qz.index];
  return `<div class="quiz-shell"><button class="action-link" data-training="${id}">← Zpět ke školení</button><div class="quiz-progress">${qz.questions.map((_,i)=>`<span class="${i<=qz.index?"active":""}"></span>`).join("")}</div><section class="quiz-card"><div class="quiz-meta"><span>${block.title}</span><span>Otázka ${qz.index+1} z ${qz.questions.length}</span></div><h2>${q.question}</h2><div class="answers">${q.answers.map((a,i)=>{let cls=qz.selected===i?"selected":"";if(qz.answered){if(i===q.correct)cls="correct";else if(i===qz.selected)cls="wrong";}return `<button class="answer ${cls}" data-course-answer="${i}" ${qz.answered?"disabled":""}><span class="answer-letter">${String.fromCharCode(65+i)}</span><span>${a}</span></button>`}).join("")}</div>${qz.answered?`<div class="explanation"><strong>${qz.selected===q.correct?"Správně.":"Správná odpověď je "+String.fromCharCode(65+q.correct)+"."}</strong> ${q.explanation}</div>`:""}<div class="quiz-actions">${qz.answered?`<button class="primary-button" id="nextCourseQuestion">${qz.index===qz.questions.length-1?"Vyhodnotit blok":"Další otázka"}</button>`:""}</div></section></div>`;
}

function courseTestResult(block) {
  const qz = state.courseQuiz;
  const pct = Math.round(qz.score/qz.questions.length*100);
  const passed = pct >= 80;
  const old = state.courseProgress[block.id] || {best:0,passed:false};
  state.courseProgress[block.id] = {best:Math.max(old.best,pct),passed:old.passed||passed,completedAt:passed?new Date().toISOString():old.completedAt};
  saveState();
  const next = trainingBlocks[block.order];
  return `<div class="quiz-shell"><section class="quiz-card course-result ${passed?"passed":"failed"}"><p class="eyebrow">Výsledek bloku ${block.order}</p><div class="result-score">${pct} %</div><h2>${passed?"Blok je splněný.":"Ještě jednou projdi slabá místa."}</h2><p class="lede">Správně ${qz.score} z ${qz.questions.length}. Hranice úspěchu je 80 %. ${passed&&next?`Odemkl se blok „${next.title}“.`:passed?"Dokončil jsi celé základní školení.":"Výklad i test můžeš opakovat bez omezení."}</p><div class="filter-row" style="margin-top:25px">${passed&&next?`<button class="primary-button" data-training="${next.id}">Pokračovat dalším blokem</button>`:`<button class="primary-button" data-training="${block.id}">${passed?"Zopakovat školení":"Vrátit se k výkladu"}</button>`}<button class="secondary-button" data-course-test="${block.id}">Opakovat test</button><button class="secondary-button" data-route="training">Přehled školení</button></div></section></div>`;
}

function productTrainingChapters(product) {
  const extra = productTrainingExtras[product.id];
  if (extra?.chapters) return extra.chapters;
  return [
    ["1. Pozice a problém, který produkt řeší", `${product.oneLiner}||Produkt patří do oblasti ${product.category}. Při rozhodování se neporovnává pouze podle názvu nebo maximálních parametrů. Je potřeba znát workload, datový model, požadovanou dostupnost, růst, integrační body, provozní dovednosti a podporu.`, ["Začni potřebou zákazníka, ne produktem.", `Hlavní role: ${product.role}.`, `Typická úroveň: ${product.level}.`], product.scenario],
    ["2. Architektura a technické vztahy", product.sections.map(([title,text])=>`${title}: ${text}`).join("||"), [`Škálování: ${product.scaling}.`, `Rozhraní a protokoly: ${product.protocols}.`, "Ověř přesný model, verzi a support matrix."], `Nakresli produkt uprostřed a doplň všechny hosty, sítě, identity, monitoring, backup a podpůrné týmy, na kterých závisí.`],
    ["3. Provozní pohled SDM/PM", `Provoz produktu zahrnuje monitoring zdraví, kapacity a výkonu, incidenty, změny, firmware nebo software lifecycle, podporu výrobce, dokumentaci, zálohování konfigurace a pravidelné ověřování obnovy či redundance.||SDM musí znát vlastníky jednotlivých vrstev a předem dohodnutou eskalační cestu. PM musí při implementaci zajistit integrační test, provozní předání, dokumentaci, školení a akceptační kritéria.`, ["Produktová konzole není jediným zdrojem pravdy o službě.", "Technické dokončení instalace není provozní akceptace.", "Každé riziko potřebuje vlastníka, termín a podmínku uzavření."], product.scenario],
    ["4. Praktický scénář a příprava na call", `Použij modelovou situaci produktu a rozděl ji na fakta, neznámé informace, rizika, vlastníky a další kroky. Připrav otázky na rozsah dopadu, časovou osu, poslední změny, health, kapacitu, redundanci a support.||Na závěr dokážeš produkt vysvětlit ve třech úrovních: jednou větou vedení, pěti minutami zákazníkovi a technickou mapou specialistovi.`, ["Odděluj fakta od hypotéz.", "Ptej se na důkaz a měřicí bod.", "Uzavírej call konkrétními vlastníky a termíny."], product.scenario]
  ];
}

function productTrainingQuestions(product) {
  if(product.id === "powervault") return shuffle(powerVaultQuestions);
  const others = products.filter(p=>p.id!==product.id);
  const pick = key => shuffle(others.map(p=>p[key]).filter((v,i,a)=>v&&v!==product[key]&&a.indexOf(v)===i)).slice(0,3);
  const questions = [
    {topic:product.name,question:`Jaká je hlavní role produktu ${product.name}?`,answers:shuffle([product.role,...pick("role")]),correctValue:product.role,explanation:product.oneLiner},
    {topic:product.name,question:`Jaký model škálování nejlépe odpovídá produktu ${product.name}?`,answers:shuffle([product.scaling,...pick("scaling")]),correctValue:product.scaling,explanation:`Pro tento modul je klíčové zařazení: ${product.scaling}.`},
    {topic:product.name,question:`Která rozhraní nebo protokoly jsou pro ${product.name} relevantní?`,answers:shuffle([product.protocols,...pick("protocols")]),correctValue:product.protocols,explanation:`Produktový modul uvádí: ${product.protocols}.`},
    {topic:product.name,question:`Do které oblasti je ${product.name} v této KB zařazen?`,answers:shuffle([product.category,...pick("category")]),correctValue:product.category,explanation:`${product.name} je zde zařazen do oblasti ${product.category}.`},
    {topic:product.name,question:"Co je nejlepší první krok při návrhu nebo změně produktu?",answers:["Začít maximální konfigurací","Potvrdit workload, požadavky, závislosti a podporovanou kombinaci","Přeskočit support matrix","Řešit pouze pořizovací cenu"],correctValue:"Potvrdit workload, požadavky, závislosti a podporovanou kombinaci",explanation:"Produkt se navrhuje z požadavků a ověřené podporované architektury."},
    {topic:product.name,question:"Kdy je produktová implementace provozně akceptovaná?",answers:["Po zapnutí zařízení","Po instalaci management konzole","Po ověření funkce, závislostí, monitoringu, dokumentace, podpory a akceptačních kritérií","Po vytvoření objednávky"],correctValue:"Po ověření funkce, závislostí, monitoringu, dokumentace, podpory a akceptačních kritérií",explanation:"Technická instalace je jen část připravenosti služby."}
  ].map(q=>({...q,correct:q.answers.indexOf(q.correctValue)}));
  const existing = quizQuestions.filter(q=>q.topic.toLowerCase().includes(product.id.replace("-"," ")) || q.topic.toLowerCase()===product.name.toLowerCase() || (product.id==="powervault"&&q.topic==="PowerVault"));
  return shuffle([...existing,...questions]).slice(0,8);
}


function powerVaultDiagram(chapter) {
  const references = {
    2: ["Dell: výběr poolů a disk groups", "https://www.dell.com/support/kbdoc/en-us/000426601/powervault-me5-me52-pool-and-disk-group-selection-guidance?lang=en"],
    3: ["Dell: SAN-attached storage — referenční topologie", "https://infohub.delltechnologies.com/en-uk/l/dell-powervault-me5-series-vmware-vsphere-best-practices/san-attached-storage/"],
    4: ["Dell: doporučený multipathing pro ME5 a VMware", "https://infohub.delltechnologies.com/en-us/l/dell-powervault-me5-series-vmware-vsphere-best-practices/recommended-multipathing-mpio-settings/"]
  };
  const chains = {
    2: ["Kapacitní hierarchie", ["Disky", "Disk group", "Pool", "Volume", "Host"], "Šipky vyjadřují logické vztahy. Nejde o pořadí, v jakém fyzicky protéká každý zápis."],
    5: ["Od aplikace k médiím", ["Aplikace ve VM", "Virtuální disk", "VMFS datastore", "ME5 volume", "Pool a disky"], "Zjednodušený příklad VMFS nad blokovým úložištěm. ESXi a síť zajišťují přístup mezi datastore a polem; vCenter zajišťuje správu."],
    7: ["Životní cyklus změny", ["Požadavky", "Kompatibilita", "Pre-check", "Implementace", "Validace a předání"], "Na každém kontrolním bodu existuje podmínka pokračování, zastavení a odpovědná osoba. Vlastní výukové schéma."]
  };
  let result = "";
  if(chains[chapter]) { const [title,labels,caption]=chains[chapter]; result = `<figure class="course-diagram"><figcaption><strong>${title}</strong></figcaption><ol class="dependency-chain">${labels.map(label=>`<li>${label}</li>`).join("")}</ol><p>${caption}</p></figure>`; }
  if(chapter===3) result = `<figure class="course-diagram"><figcaption><strong>Dvě nezávislé fabric mezi hosty a polem</strong></figcaption><svg viewBox="0 0 720 340" role="img" aria-labelledby="pv-topology-title pv-topology-desc"><title id="pv-topology-title">Redundantní SAN topologie</title><desc id="pv-topology-desc">Dva hosty se připojují do fabric A i B. Každá fabric je připojena k oběma řadičům ME5. Jde o zjednodušenou topologii podle Dell dokumentace.</desc><g stroke="#1884ce" stroke-width="3" fill="none"><path d="M180 75 L180 145 M180 75 L540 145 M540 75 L180 145 M540 75 L540 145"/><path d="M180 195 L180 265 M180 195 L540 265 M540 195 L180 265 M540 195 L540 265"/></g><g fill="#e8f4fc" stroke="#1884ce" stroke-width="2"><rect x="85" y="25" width="190" height="50" rx="10"/><rect x="445" y="25" width="190" height="50" rx="10"/><rect x="85" y="145" width="190" height="50" rx="10"/><rect x="445" y="145" width="190" height="50" rx="10"/><rect x="85" y="265" width="190" height="50" rx="10"/><rect x="445" y="265" width="190" height="50" rx="10"/></g><g fill="#17364a" font-size="19" text-anchor="middle" font-family="sans-serif"><text x="180" y="57">Host 1</text><text x="540" y="57">Host 2</text><text x="180" y="177">Fabric A</text><text x="540" y="177">Fabric B</text><text x="180" y="297">ME5 řadič A</text><text x="540" y="297">ME5 řadič B</text></g></svg><p>Vlastní schematické překreslení principu z příkladu Dell se dvěma hosty, dvěma switchi a ME5084. Konkrétní porty, kabeláž a podporované kombinace určuje implementační dokumentace.</p></figure>`;
  if(references[chapter]) result += `<p class="chapter-source">Zdroj k technickému doplnění: <a href="${references[chapter][1]}" target="_blank" rel="noreferrer">${references[chapter][0]} ↗</a>. Ověřeno 21. 9. 2026. Modelová cvičení jsou vlastní výukové situace, nejsou záznamem zákaznických incidentů.</p>`;
  return result;
}

function productTrainingView(id) {
  const product = products.find(p=>p.id===id);
  if (!product) return notFound();
  const extra = productTrainingExtras[id];
  const chapters = productTrainingChapters(product);
  const result = state.productTrainingProgress[id];
  const prereq = trainingBlocks.find(b=>b.id===productTrainingPrerequisites[id]);
  const sources = extra?.sources || [[`Oficiální zdroj: ${product.name}`,product.source]];
  return `<button class="action-link" data-route="training">← Zpět na všechna školení</button><header class="course-hero product-course-hero"><div><p class="eyebrow">Produktové školení · ${extra?.estimated||"Úvodní produktový blok"}</p><h1>${product.name}</h1><p>${product.oneLiner}</p></div><div class="course-goal"><span>Doporučený základ</span><p>${prereq?.title||"Jak funguje IT služba"}</p><button class="secondary-button" data-training="${prereq?.id||"foundations"}">Otevřít základní blok</button></div></header>
  <nav class="chapter-index">${chapters.map((chapter,i)=>`<a href="#product-chapter-${id}-${i+1}"><span>${String(i+1).padStart(2,"0")}</span>${chapter[0].replace(/^\d+\.\s*/,"")}</a>`).join("")}</nav>
  <div class="training-content">${chapters.map(([title,text,points=[],example=product.scenario],i)=>`<section class="lesson-chapter" id="product-chapter-${id}-${i+1}"><div class="chapter-no">${String(i+1).padStart(2,"0")}</div><div><p class="eyebrow">${product.name} · kapitola ${i+1}</p><h2>${title}</h2><div class="lesson-text">${text.split("||").map(paragraph=>`<p>${annotateTrainingText(paragraph)}</p>`).join("")}</div>${id==="powervault"?powerVaultDiagram(i):""}${points.length?`<h3>Co si zapamatovat</h3><ul>${points.map(x=>`<li>${annotateTrainingText(x)}</li>`).join("")}</ul>`:""}<div class="lesson-example"><span>MODELOVÉ CVIČENÍ · VLASTNÍ SCÉNÁŘ</span><p>${annotateTrainingText(example)}</p></div></div></section>`).join("")}</div>
  <section class="official-study"><div><p class="eyebrow">Primární studijní zdroje</p><h2>Pokračuj v oficiální dokumentaci</h2><p>Pro implementaci vždy ověř přesný model, firmware/software release, build a datum dokumentu.</p></div><div>${sources.map(([name,url])=>`<a href="${url}" target="_blank" rel="noreferrer">${name}<span>↗</span></a>`).join("")}</div></section>
  <section class="course-test-cta"><div><p class="eyebrow">Produktový test</p><h2>Ověř si ${product.name}</h2><p>Pro splnění produktu potřebuješ alespoň 80 %. Výsledek se promítne do Studijní cesty.</p>${result?`<p><strong>Nejlepší výsledek: ${result.best}%</strong></p>`:""}</div><button class="primary-button" data-product-test="${id}">${result?"Opakovat test":"Spustit test"}</button></section>`;
}

function startProductTest(id) {
  const product=products.find(p=>p.id===id); if(!product)return;
  state.productQuiz={productId:id,questions:productTrainingQuestions(product),index:0,score:0,selected:null,answered:false};
  routeTo(`product-test/${id}`);
}

function productTestView(id) {
  const qz=state.productQuiz; const product=products.find(p=>p.id===id);
  if(!qz||!product||qz.productId!==id)return productTrainingView(id);
  if(qz.index>=qz.questions.length){const pct=Math.round(qz.score/qz.questions.length*100);const old=state.productTrainingProgress[id]||{best:0,passed:false};const passed=pct>=80;state.productTrainingProgress[id]={best:Math.max(old.best,pct),passed:old.passed||passed};saveState();return `<div class="quiz-shell"><section class="quiz-card course-result ${passed?"passed":"failed"}"><p class="eyebrow">${product.name}</p><div class="result-score">${pct}%</div><h2>${passed?"Produktové školení je splněné.":"Vrať se k výkladu a test zopakuj."}</h2><p class="lede">Správně ${qz.score} z ${qz.questions.length}. Hranice úspěchu je 80 %.</p><div class="filter-row" style="margin-top:25px"><button class="primary-button" data-product-training="${id}">Zpět ke školení</button><button class="secondary-button" data-product-test="${id}">Opakovat test</button><button class="secondary-button" data-route="path">Studijní cesta</button></div></section></div>`;}
  const q=qz.questions[qz.index];return `<div class="quiz-shell"><div class="quiz-progress">${qz.questions.map((_,i)=>`<span class="${i<=qz.index?"active":""}"></span>`).join("")}</div><section class="quiz-card"><div class="quiz-meta"><span>${product.name}</span><span>Otázka ${qz.index+1} z ${qz.questions.length}</span></div><h2>${q.question}</h2><div class="answers">${q.answers.map((a,i)=>{let cls=qz.selected===i?"selected":"";if(qz.answered){if(i===q.correct)cls="correct";else if(i===qz.selected)cls="wrong";}return `<button class="answer ${cls}" data-product-answer="${i}" ${qz.answered?"disabled":""}><span class="answer-letter">${String.fromCharCode(65+i)}</span><span>${a}</span></button>`}).join("")}</div>${qz.answered?`<div class="explanation"><strong>${qz.selected===q.correct?"Správně.":"Správná odpověď je "+String.fromCharCode(65+q.correct)+"."}</strong> ${q.explanation}</div>`:""}<div class="quiz-actions">${qz.answered?`<button class="primary-button" id="nextProductQuestion">${qz.index===qz.questions.length-1?"Vyhodnotit":"Další otázka"}</button>`:""}</div></section></div>`;
}

function pathView() {
  const levels = [
    { n:"00", title:"Úplný začátečník", time:"1–2 týdny", ids:[], goal:"Přestat se ztrácet v základních slovech a umět nakreslit jednoduché datacentrum.", learn:["Co je server, CPU, RAM, disk, síť, operační systém a aplikace","Rozdíl mezi hardwarem, softwarem, službou a daty","Co znamenají dostupnost, výkon, kapacita, latence, záloha a obnova","Jak se ptát, když pojmu nerozumíš, bez předstírání znalosti"], practice:["Nakresli cestu uživatele k aplikaci a jejím datům","Vysvětli laikovi, proč záloha není totéž co vysoká dostupnost","Vytvoř vlastní slovníček 30 pojmů a každý popiš jednou větou"], gate:"Bez nápovědy vysvětlíš server, síť, storage, VM, backup a incident a správně je propojíš."},
    { n:"01", title:"Jazyk infrastruktury", time:"2–3 týdny", ids:["vsphere","san"], goal:"Rozumět základní architektuře a sledovat technickou poradu bez ztráty kontextu.", learn:["3-tier architektura: compute, network a storage","x86, hypervisor, ESXi, vCenter, cluster a virtuální stroj","Block, file a object storage; LUN, datastore a filesystem","LAN versus SAN; FC, iSCSI, SAS, NFS a SMB","HA, DRS, vMotion, RPO, RTO a failure domain"], practice:["Projdi všech pět map v sekci Architektury","Nakresli dvě redundantní cesty server–switch–storage","Z callu vypiš fakta, předpoklady, rozhodnutí, rizika a otevřené otázky"], gate:"Dokážeš deset minut popisovat 3-tier prostředí a u každé vrstvy uvést vlastníka, riziko a metriku."},
    { n:"02", title:"První produkt do hloubky: PowerVault", time:"3–5 týdnů", ids:["powervault"], goal:"Být připravený plnit roli SDM u služby PowerVault a vést její provozní agendu.", learn:["Řadiče, host porty, disky, RAID, pooly, volumes/LUN a front-end/back-end","FC, iSCSI a SAS připojení, zoning, initiator, target a multipathing","Kapacita raw/usable/effective, výkon IOPS/throughput/latence a limity pole","Health, alerty, support bundle, firmware, kompatibilita a lifecycle","Incident, change, capacity, escalation, maintenance a evidence konfigurace"], practice:["Vytvoř service map konkrétního prostředí KSPCS","Připrav checklist převzetí služby a měsíční service review","Nacvič incident: host ztratil jednu cestu ke storage","Nacvič change: rozšíření kapacity a prezentace rizika CAB"], gate:"Zvládneš vést 30minutový PowerVault status, shrnout zdraví služby, rizika, změny a vyžádat správné technické důkazy."},
    { n:"03", title:"Produktové portfolio a volba technologie", time:"4–6 týdnů", ids:["powerstore","powermax","powerscale","objectscale","powerflex"], goal:"Rozlišit produkty podle problému, který řeší, a nepřenášet vlastnosti jednoho produktu na jiný.", learn:["Entry/cost-efficient, universal enterprise a mission-critical storage","Kdy zákazník potřebuje block, file nebo object storage","Scale-up a scale-out a jejich projektové dopady","PowerVault, PowerStore a PowerMax; PowerScale, ObjectScale a PowerFlex","Use case, workload, SLA, dostupnost, růst a provozní model jako kritéria volby"], practice:["Pro každý produkt vytvoř kartu: problém, data, protokol, škálování, riziko","Porovnej tři varianty pro jednu modelovou poptávku","Nahlas obhaj, proč je určitý produkt nevhodný pro daný workload"], gate:"Po deseti otázkách o workloadu umíš zúžit vhodnou produktovou rodinu a pojmenovat údaje nutné pro sizing."},
    { n:"04", title:"Virtualizace, HCI a privátní cloud", time:"5–8 týdnů", ids:["vsan","vxrail","nsx","vdefend","vcf","dell-private-cloud"], goal:"Rozumět vztahům mezi serverem, virtualizací, software-defined storage, sítí, bezpečností a lifecyclem platformy.", learn:["vSphere cluster, HA, DRS, vMotion a základ kapacitního modelu","vSAN policies, HCI nody, failure domains a maintenance mode","VxRail jako integrovaná HCI platforma a odpovědnosti při lifecycle","NSX/VCF Networking, segmentace a vDefend","VCF management domain, workload domains a externí služby"], practice:["Nakresli závislosti VCF včetně DNS, NTP, identity, backupu a monitoringu","Simuluj plán upgrade a sestav pořadí závislých komponent","Vysvětli dopad výpadku jednoho HCI nodu na compute, storage a SLA"], gate:"Na architektonickém callu rozpoznáš rozhodnutí, závislost a riziko a umíš je převést do vlastníka a termínu."},
    { n:"05", title:"Ochrana dat a kybernetická obnova", time:"3–5 týdnů", ids:["datadomain","ppdm","cyber-recovery"], goal:"Převést debatu o backupu z počtu jobů na obnovitelnost obchodní služby.", learn:["Backup software, backup target, deduplikace, retence a replikace","PPDM a PowerProtect Data Domain jako rozdílné role řešení","RPO, RTO, aplikační konzistence, immutable kopie a izolace","Cyber Recovery, clean room a důkaz obnovitelnosti","Rozdíl mezi úspěšným backup jobem a úspěšným restore testem"], practice:["Sestav restore matici pro tři úrovně kritičnosti","Nacvič situaci ransomware a rozhodovací body eskalace","Navrhni měsíční report ochrany dat založený na riziku"], gate:"Umíš moderovat restore test a doložit, zda výsledek splnil RPO, RTO a obchodní očekávání."},
    { n:"06", title:"Technicky sebejistý SDM/PM", time:"průběžně", ids:[], goal:"Vést strukturovanou technickou debatu, aniž bys nahrazoval architekta nebo specialistu.", learn:["Oddělení symptomu, hypotézy, důkazu, příčiny a nápravného opatření","Service map, RACI, RAID log, SLA/OLA, support matrix a lifecycle plán","Řízení incidentu, problému, změny, kapacity, rizika a eskalace","Překlad technického dopadu do jazyka zákazníka","Včasné přizvání specialisty a přesné formulování otázky"], practice:["Veď část reálného service review nejprve se shadowingem","Po každém callu napiš technické shrnutí a nech ho zkontrolovat specialistou","Převezmi jednu bezpečnou změnu od plánování po PIR","Jednou měsíčně nacvič krizový scénář nanečisto"], gate:"Dokážeš udržet směr debaty, odhalit chybějící důkaz, pojmenovat riziko, určit vlastníka a uzavřít další krok."}
  ];
  return `<div class="page-head"><div><p class="eyebrow">Od základů k technické debatě</p><h1>Tvoje cesta od laika k technicky sebejistému SDM</h1><p class="lede">Cílem není stát se přes noc storage nebo VMware specialistou. Cílem je rozumět systému, klást přesné otázky, rozeznat riziko a vést debatu tak, aby specialisté mohli efektivně rozhodovat.</p></div><span class="status-pill">7 úrovní · přibližně 4–7 měsíců</span></div>
  <section class="path-principle"><div><span>01</span><strong>Pochop</strong><small>Pojmy a vztahy vlastními slovy</small></div><i>→</i><div><span>02</span><strong>Nakresli</strong><small>Architekturu a datový tok</small></div><i>→</i><div><span>03</span><strong>Nacvič</strong><small>Modelovou situaci bez rizika</small></div><i>→</i><div><span>04</span><strong>Shadowuj</strong><small>Sleduj specialistu v praxi</small></div><i>→</i><div><span>05</span><strong>Veď</strong><small>Převezmi část reálné agendy</small></div></section>
  <section class="weekly-plan"><div><p class="eyebrow">Udržitelný rytmus</p><h2>Každý týden 3–5 hodin</h2></div><div><b>2× 35 min</b><span>výklad a pojmy</span></div><div><b>1× 45 min</b><span>diagram nebo lab</span></div><div><b>1× 30 min</b><span>test a opakování</span></div><div><b>1× 30 min</b><span>reflexe reálného callu</span></div></section>
  <div class="maturity-roadmap">${levels.map(level=>{const done=level.ids.filter(id=>state.productTrainingProgress[id]?.passed).length;return `<section class="maturity-level"><header><div class="level-index">${level.n}</div><div><p class="eyebrow">${level.time}${level.ids.length?` · ${done}/${level.ids.length} produktových školení`:""}</p><h2>${level.title}</h2><p>${level.goal}</p></div></header><div class="level-content"><div><h3>Co musíš pochopit</h3><ul>${level.learn.map(x=>`<li>${x}</li>`).join("")}</ul></div><div><h3>Jak to dostat do ruky</h3><ul>${level.practice.map(x=>`<li>${x}</li>`).join("")}</ul>${level.ids.length?`<div class="term-links">${level.ids.map(id=>{const p=products.find(x=>x.id===id);return `<button class="term-link" data-product-training="${id}">${state.productTrainingProgress[id]?.passed?"✓ ":""}${p.name} — školení</button>`}).join("")}</div>`:""}</div></div><div class="readiness-gate"><span>READY GATE</span><p>${level.gate}</p></div></section>`}).join("")}</div>
  <section class="article-section practice-bridge"><p class="eyebrow">Most do skutečné praxe</p><h2>Jak získat zkušenost dříve, než dostaneš plnou odpovědnost</h2><div class="bridge-grid"><div><b>1. Poslech</b><p>Na callu sleduj jeden konkrétní tok: incident, change nebo kapacitu. Nesnaž se zachytit všechno.</p></div><div><b>2. Rekonstrukce</b><p>Po callu nakresli, co se dělo, a odděl fakta od domněnek. Nech specialistu opravit chyby.</p></div><div><b>3. Simulace</b><p>Před změnou si nanečisto projdi plán, rollback, validační kroky, komunikaci a eskalaci.</p></div><div><b>4. Částečné vedení</b><p>Převezmi agendu, rekapitulaci, rizika a další kroky. Technické rozhodnutí ponech vlastníkovi.</p></div><div><b>5. Samostatné vedení</b><p>Veď rutinní service review a bezpečné změny. Specialistu zapojuj podle předem domluvených hranic.</p></div><div><b>6. Zpětná vazba</b><p>Po každé důležité situaci udělej krátké PIR: co jsem přehlédl, na co jsem se měl zeptat a co příště změním.</p></div></div></section>`;
}

function trainingUsesForTerm(id) {
  const item = glossary.find(g=>g.id===id);
  if (!item) return [];
  const labels = [item.term, ...glossaryAliases.filter(([,aliasId])=>aliasId===id).map(([label])=>label)].map(x=>x.toLocaleLowerCase("cs"));
  return trainingBlocks.filter(block => block.chapters.some(chapter => labels.some(label => String(chapter).toLocaleLowerCase("cs").includes(label))));
}

function glossaryView(filter = state.search) {
  const q = filter.toLowerCase().trim();
  const items = glossary.filter(g => !q || `${g.term} ${g.definition} ${g.category}`.toLowerCase().includes(q)).sort((a,b)=>a.term.localeCompare(b.term,"cs"));
  const letters = [...new Set(glossary.map(g => g.term[0].toUpperCase()))].sort((a,b)=>a.localeCompare(b,"cs"));
  return `<div class="page-head"><div><p class="eyebrow">Terminologie</p><h1>Slovník pojmů</h1><p class="lede">Definice jsou psané pro praktickou orientaci. U konkrétní implementace vždy rozhoduje verze produktu a podporovaná architektura.</p></div><span class="status-pill">${items.length} pojmů</span></div>
  <div class="glossary-layout"><aside class="alpha-index">${letters.map(l=>`<button data-letter="${l}">${l}</button>`).join("")}</aside><div class="term-list">${items.length ? items.map(g=>`<article class="term-card" id="term-${g.id}" data-term="${g.id}"><div class="term-meta"><span>${g.category}</span>${trainingUsesForTerm(g.id).length?`<span>${trainingUsesForTerm(g.id).length}× ve školení</span>`:""}</div><h3>${g.term}</h3><p>${g.definition}</p></article>`).join("") : `<div class="empty-state"><h2>Nic jsem nenašel</h2><p>Zkus kratší výraz nebo jiný název produktu.</p></div>`}</div></div>`;
}

function companiesView() {
  return `<div class="page-head"><div><p class="eyebrow">Ověřený organizační kontext</p><h1>Portfolio firem</h1><p class="lede">Tato část spojuje veřejně doložené informace s interně potvrzenými kompetencemi. U každé karty je uvedeno, z jakého typu zdroje profil vychází. Konkrétní vlastnictví zákaznického kontraktu a odpovědnosti je vždy nutné potvrdit v projektové dokumentaci.</p></div></div>
    <div class="company-grid">${companies.map(c=>`<article class="company-card"><span class="tag">${c.status}</span><h2>${c.name}</h2><p>${c.summary}</p><h3>Kompetence a oblasti řešení</h3><ul>${c.portfolio.map(x=>`<li>${x}</li>`).join("")}</ul><p><strong>Technologický a provozní kontext:</strong> ${c.vendors}</p>${c.sectors ? `<h3>Typická odvětví zákazníků</h3><div class="company-tags">${c.sectors.map(x=>`<span>${x}</span>`).join("")}</div>` : ""}${c.delivery ? `<h3>Zapojení v životním cyklu</h3><p>${c.delivery}</p>` : ""}${c.relationship ? `<h3>Vztah ke skupině</h3><p>${c.relationship}</p>` : ""}<a href="${c.source}" target="_blank" rel="noreferrer">${c.sourceLabel || "Veřejný zdroj ↗"}</a>${c.sourceNote ? `<p class="source-note">${c.sourceNote}</p>` : ""}</article>`).join("")}</div>
    <section class="article-section" style="margin-top:18px"><h2>Jak portfolio číst pro delivery</h2><p>Široké portfolio integrátora znamená, že projekt může překročit hranice jednoho výrobku. PowerVault může být napojen na servery, SAN, VMware a backup od různých výrobců. Před zahájením proto vytvoř mapu odpovědností: kdo navrhuje, kdo implementuje, kdo poskytuje support, kdo vlastní změnu a kdo potvrzuje obchodní funkčnost.</p></section>`;
}

function quizIntro() {
  const best = state.courseProgress["general-quiz"]?.best;
  return `<div class="page-head"><div><p class="eyebrow">Aktivní opakování</p><h1>Test znalostí</h1><p class="lede">Otázky ověřují vztahy a praktické rozhodování, nejen názvy. Po každé odpovědi dostaneš vysvětlení.</p></div>${best ? `<span class="status-pill">Nejlepší výsledek ${best} %</span>` : ""}</div>
  <div class="quiz-shell"><section class="quiz-card"><h2>Vyber délku testu</h2><p class="lede">Krátký test je vhodný pro denní opakování. Plný test projde všechny oblasti.</p><div class="filter-row" style="margin-top:24px"><button class="primary-button" data-start-quiz="8">8 náhodných otázek</button><button class="secondary-button" data-start-quiz="${quizQuestions.length}">Plný test (${quizQuestions.length})</button></div></section></div>`;
}

function shuffle(items) { return [...items].sort(() => Math.random() - .5); }
function startQuiz(count) {
  state.quiz = { questions: shuffle(quizQuestions).slice(0, Number(count)), index: 0, score: 0, selected: null, answered: false };
  state.route = "quiz/run";
  location.hash = "quiz/run";
  render();
}

function quizRunView() {
  const qz = state.quiz;
  if (!qz) return quizIntro();
  if (qz.index >= qz.questions.length) return quizResult();
  const q = qz.questions[qz.index];
  return `<div class="quiz-shell"><div class="quiz-progress">${qz.questions.map((_,i)=>`<span class="${i<=qz.index?"active":""}"></span>`).join("")}</div>
    <section class="quiz-card"><div class="quiz-meta"><span>${q.topic}</span><span>Otázka ${qz.index+1} z ${qz.questions.length}</span></div><h2>${q.question}</h2>
      <div class="answers">${q.answers.map((a,i)=>{let cls=qz.selected===i?"selected":"";if(qz.answered){if(i===q.correct)cls="correct";else if(i===qz.selected)cls="wrong";}return `<button class="answer ${cls}" data-answer="${i}" ${qz.answered?"disabled":""}><span class="answer-letter">${String.fromCharCode(65+i)}</span><span>${a}</span></button>`}).join("")}</div>
      ${qz.answered?`<div class="explanation"><strong>${qz.selected===q.correct?"Správně.":"Správná odpověď je "+String.fromCharCode(65+q.correct)+"."}</strong> ${q.explanation}</div>`:""}
      <div class="quiz-actions">${qz.answered?`<button class="primary-button" id="nextQuestion">${qz.index===qz.questions.length-1?"Výsledek":"Další otázka"}</button>`:""}</div>
    </section></div>`;
}

function quizResult() {
  const qz = state.quiz;
  const pct = Math.round((qz.score/qz.questions.length)*100);
  const best = Math.max(Number(state.courseProgress["general-quiz"]?.best||0),pct);
  state.courseProgress["general-quiz"] = {best,passed:best>=80};
  saveState();
  const message = pct >= 85 ? "Výborně — souvislosti už držíš pohromadě." : pct >= 65 ? "Dobrý základ. Vrať se k chybným oblastem." : "Začni prioritními moduly a test zopakuj po kratších blocích.";
  return `<div class="quiz-shell"><section class="quiz-card"><p class="eyebrow">Výsledek testu</p><div class="result-score">${pct} %</div><h2>${message}</h2><p class="lede">Správně ${qz.score} z ${qz.questions.length}. Nejlepší uložený výsledek: ${best} %.</p><div class="filter-row" style="margin-top:25px"><button class="primary-button" data-start-quiz="8">Nový krátký test</button><button class="secondary-button" data-route="products">Studovat produkty</button></div></section></div>`;
}

function sourcesView() {
  const sources = [
    ["KSPCS", "https://kspcs.cz/"], ["DC-tec Partners", "https://www.dctec.cz/"],
    ...products.map(p=>[p.name,p.source]),
    ["Podrobný lokální referenční dokument", "./reference.md"]
  ];
  return `<div class="page-head"><div><p class="eyebrow">Evidence</p><h1>Zdroje a přesnost</h1><p class="lede">Produktové informace se mění. Pro implementaci vždy ověř přesný model, verzi, support matrix, licenční entitlement a datum dokumentace.</p></div></div>
    <section class="article-section"><h2>Pravidla databáze</h2><ul><li>Veřejné portfolio firem je oddělené od interního přiřazení lidí a kontraktů.</li><li>Produktové maximum není sizing ani SLA.</li><li>Modelové situace nejsou popisem skutečného zákazníka.</li><li>Pro projekt rozhoduje aktuální oficiální dokumentace a konkrétní smlouva.</li></ul></section>
    <div class="source-list">${sources.map(([name,url],i)=>`<div class="source-item"><span>${String(i+1).padStart(2,"0")}</span><div><strong>${name}</strong><br><a href="${url}" ${url.startsWith("http")?'target="_blank" rel="noreferrer"':""}>${url}</a></div></div>`).join("")}</div>`;
}

function searchView(query) {
  const q = query.toLowerCase().trim();
  const pResults = products.filter(p => `${p.name} ${p.vendor} ${p.category} ${p.oneLiner} ${p.sections.flat().join(" ")}`.toLowerCase().includes(q));
  const gResults = glossary.filter(g => `${g.term} ${g.definition} ${g.category}`.toLowerCase().includes(q));
  return `<div class="page-head"><div><p class="eyebrow">Vyhledávání</p><h1>Výsledky pro „${escapeHtml(query)}“</h1><p class="lede">${pResults.length} produktových modulů a ${gResults.length} pojmů.</p></div></div>
    ${pResults.length?`<h2>Produkty</h2><div class="product-grid" style="margin-bottom:30px">${pResults.map(productCard).join("")}</div>`:""}
    ${gResults.length?`<h2>Pojmy</h2><div class="term-list">${gResults.slice(0,20).map(g=>`<article class="term-card" data-term="${g.id}"><h3>${g.term}</h3><p>${g.definition}</p></article>`).join("")}</div>`:""}
    ${!pResults.length&&!gResults.length?`<div class="empty-state"><h2>Nic jsem nenašel</h2><p>Zkus obecnější výraz, například storage, HA, backup nebo VCF.</p></div>`:""}`;
}

function notFound() { return `<div class="empty-state"><h1>Stránka neexistuje</h1><button class="primary-button" data-route="dashboard">Zpět na přehled</button></div>`; }
function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c])); }

function render() {
  renderNav(); updateProgressUI();
  const [base, arg] = state.route.split("/");
  if (state.search) view.innerHTML = searchView(state.search);
  else if (base === "dashboard") view.innerHTML = dashboardView();
  else if (base === "product-test" && arg) view.innerHTML = productTestView(arg);
  else if (base === "product-training" && arg) view.innerHTML = productTrainingView(arg);
  else if (base === "training-test" && arg) view.innerHTML = courseTestView(arg);
  else if (base === "training" && arg) view.innerHTML = trainingBlockView(arg);
  else if (base === "training") view.innerHTML = trainingOverview();
  else if (base === "products" && arg) view.innerHTML = productDetail(arg);
  else if (base === "products") view.innerHTML = productsView();
  else if (base === "architecture") view.innerHTML = architectureView();
  else if (base === "path") view.innerHTML = pathView();
  else if (base === "glossary") view.innerHTML = glossaryView();
  else if (base === "companies") view.innerHTML = companiesView();
  else if (base === "quiz" && arg === "run") view.innerHTML = quizRunView();
  else if (base === "quiz") view.innerHTML = quizIntro();
  else if (base === "sources") view.innerHTML = sourcesView();
  else view.innerHTML = notFound();
}

function openTerm(id) {
  const t = glossary.find(g => g.id === id);
  if (!t) return;
  const related = products.filter(p => p.terms.includes(id));
  const trainingUses = trainingUsesForTerm(id);
  document.querySelector("#termDialogContent").innerHTML = `<p class="eyebrow">${t.category}</p><h2>${t.term}</h2><p>${t.definition}</p>${trainingUses.length?`<h3>Použito ve školení</h3><div class="term-links">${trainingUses.map(block=>`<button class="term-link" data-training="${block.id}">Blok ${block.order}: ${block.title}</button>`).join("")}</div>`:""}${related.length?`<h3>Související produktové moduly</h3><div class="term-links">${related.map(p=>`<button class="term-link" data-product="${p.id}">${p.name}</button>`).join("")}</div>`:""}`;
  termDialog.showModal();
}

function toast(message) {
  const el = document.querySelector("#toast"); el.textContent = message; el.classList.add("show");
  clearTimeout(toast.timer); toast.timer = setTimeout(()=>el.classList.remove("show"),2200);
}

document.addEventListener("click", e => {
  const chapterLink = e.target.closest('.chapter-index a');
  if(chapterLink) { e.preventDefault(); document.getElementById(chapterLink.getAttribute('href').slice(1))?.scrollIntoView({behavior:"smooth",block:"start"}); return; }
  const route = e.target.closest("[data-route]"); if (route) return routeTo(route.dataset.route);
  const training = e.target.closest("[data-training]"); if (training) { if (termDialog.open) termDialog.close(); return routeTo(`training/${training.dataset.training}`); }
  const productTraining = e.target.closest("[data-product-training]"); if (productTraining) { if (termDialog.open) termDialog.close(); return routeTo(`product-training/${productTraining.dataset.productTraining}`); }
  const productTest = e.target.closest("[data-product-test]"); if (productTest) return startProductTest(productTest.dataset.productTest);
  const productAnswer = e.target.closest("[data-product-answer]"); if (productAnswer && state.productQuiz && !state.productQuiz.answered) { state.productQuiz.selected=Number(productAnswer.dataset.productAnswer); state.productQuiz.answered=true; if(state.productQuiz.selected===state.productQuiz.questions[state.productQuiz.index].correct)state.productQuiz.score++; return render(); }
  if (e.target.closest("#nextProductQuestion")) { state.productQuiz.index++; state.productQuiz.selected=null; state.productQuiz.answered=false; return render(); }
  const courseTest = e.target.closest("[data-course-test]"); if (courseTest) return startCourseTest(courseTest.dataset.courseTest);
  const courseAnswer = e.target.closest("[data-course-answer]"); if (courseAnswer && state.courseQuiz && !state.courseQuiz.answered) { state.courseQuiz.selected=Number(courseAnswer.dataset.courseAnswer); state.courseQuiz.answered=true; if(state.courseQuiz.selected===state.courseQuiz.questions[state.courseQuiz.index].correct)state.courseQuiz.score++; return render(); }
  if (e.target.closest("#nextCourseQuestion")) { state.courseQuiz.index++; state.courseQuiz.selected=null; state.courseQuiz.answered=false; return render(); }
  const product = e.target.closest("[data-product]"); if (product) { if (termDialog.open) termDialog.close(); return routeTo(`products/${product.dataset.product}`); }
  const term = e.target.closest("[data-term]"); if (term) return openTerm(term.dataset.term);
  const filter = e.target.closest("[data-filter]"); if (filter) { state.productFilter=filter.dataset.filter; return render(); }
  const letter = e.target.closest("[data-letter]"); if (letter) { const first=glossary.find(g=>g.term.toUpperCase().startsWith(letter.dataset.letter)); document.querySelector(`#term-${first?.id}`)?.scrollIntoView({behavior:"smooth"}); return; }
  const start = e.target.closest("[data-start-quiz]"); if (start) return startQuiz(start.dataset.startQuiz);
  const answer = e.target.closest("[data-answer]"); if (answer && state.quiz && !state.quiz.answered) { state.quiz.selected=Number(answer.dataset.answer); state.quiz.answered=true; if(state.quiz.selected===state.quiz.questions[state.quiz.index].correct)state.quiz.score++; return render(); }
  if (e.target.closest("#nextQuestion")) { state.quiz.index++; state.quiz.selected=null; state.quiz.answered=false; return render(); }
  const mastery = e.target.closest("[data-mastery]"); if (mastery) { const id=mastery.dataset.mastery; state.progress[id]=!state.progress[id]; saveState(); toast(state.progress[id]?"Modul označen jako zvládnutý.":"Modul vrácen do studia."); return render(); }
  if (e.target.closest("#saveNote")) { const area=document.querySelector("#productNote"); state.notes[area.dataset.note]=area.value; saveState(); return toast("Poznámka byla uložena do tohoto prohlížeče."); }
});

searchInput.addEventListener("input", e => { state.search=e.target.value; render(); });
document.addEventListener("keydown", e => { if(e.key==="/" && document.activeElement!==searchInput && !["INPUT","TEXTAREA"].includes(document.activeElement.tagName)){e.preventDefault();searchInput.focus();} if(e.key==="Escape"&&termDialog.open)termDialog.close(); });
document.querySelector("#randomTermButton").addEventListener("click",()=>openTerm(glossary[Math.floor(Math.random()*glossary.length)].id));
document.querySelector("#menuButton").addEventListener("click",e=>{const sb=document.querySelector(".sidebar");sb.classList.toggle("open");e.currentTarget.setAttribute("aria-expanded",sb.classList.contains("open"));});
window.addEventListener("hashchange",()=>{state.route=location.hash.slice(1)||"dashboard";state.search="";searchInput.value="";render();});

render();
