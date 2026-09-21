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
  ["zero-trust", "Zero Trust", "Bezpečnostní princip průběžného ověřování, minimálních oprávnění a omezení implicitní důvěry."],
  ["zoning", "FC zoning", "Konfigurace FC fabric určující, které iniciátory a targety se mohou navzájem vidět."],
].map(([id, term, definition]) => ({ id, term, definition }));

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

const state = {
  route: location.hash.slice(1) || "dashboard",
  productFilter: "Vše",
  search: "",
  quiz: null,
  progress: JSON.parse(localStorage.getItem("infrabase-progress") || "{}"),
  notes: JSON.parse(localStorage.getItem("infrabase-notes") || "{}")
};

const nav = [
  ["PŘEHLED", null], ["dashboard", "⌂", "Můj přehled"], ["path", "↗", "Studijní cesta"],
  ["ZNALOSTI", null], ["products", "▦", "Produkty", products.length], ["architecture", "◇", "Architektury", 5], ["glossary", "Aa", "Slovník", glossary.length], ["companies", "⌘", "Portfolio firem"],
  ["PROCVIČOVÁNÍ", null], ["quiz", "✓", "Test znalostí", quizQuestions.length], ["sources", "↗", "Zdroje"]
];

const view = document.querySelector("#view");
const navEl = document.querySelector("#mainNav");
const searchInput = document.querySelector("#globalSearch");
const termDialog = document.querySelector("#termDialog");

function saveState() {
  localStorage.setItem("infrabase-progress", JSON.stringify(state.progress));
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
    <div class="metric"><span>Nejlepší test</span><strong>${localStorage.getItem("infrabase-best") || "—"}${localStorage.getItem("infrabase-best") ? " %" : ""}</strong><small>${quizQuestions.length} otázek v databázi</small></div>
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
    <div class="side-card"><h3>Související pojmy</h3><div class="term-links">${p.terms.map(id => { const t=glossary.find(g=>g.id===id); return t ? `<button class="term-link" data-term="${id}">${t.term}</button>` : ""; }).join("")}</div></div>
    <div class="side-card"><h3>Moje poznámky</h3><textarea class="note-area" id="productNote" data-note="${p.id}" placeholder="Co si potřebuji zapamatovat?">${escapeHtml(note)}</textarea><button class="secondary-button wide" id="saveNote">Uložit poznámku</button></div>
    <div class="side-card"><h3>Stav modulu</h3><button class="${state.progress[p.id] ? "secondary-button" : "primary-button"} wide" data-mastery="${p.id}">${state.progress[p.id] ? "Označit jako nerozpracované" : "Označit jako zvládnuté"}</button></div>
    <div class="side-card"><h3>Oficiální zdroj</h3><a href="${p.source}" target="_blank" rel="noreferrer">Otevřít dokumentaci ↗</a></div>
  </aside></div>`;
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
  <div class="maturity-roadmap">${levels.map(level=>{const done=level.ids.filter(id=>state.progress[id]).length;return `<section class="maturity-level"><header><div class="level-index">${level.n}</div><div><p class="eyebrow">${level.time}${level.ids.length?` · ${done}/${level.ids.length} modulů`:""}</p><h2>${level.title}</h2><p>${level.goal}</p></div></header><div class="level-content"><div><h3>Co musíš pochopit</h3><ul>${level.learn.map(x=>`<li>${x}</li>`).join("")}</ul></div><div><h3>Jak to dostat do ruky</h3><ul>${level.practice.map(x=>`<li>${x}</li>`).join("")}</ul>${level.ids.length?`<div class="term-links">${level.ids.map(id=>{const p=products.find(x=>x.id===id);return `<button class="term-link" data-product="${id}">${state.progress[id]?"✓ ":""}${p.name}</button>`}).join("")}</div>`:""}</div></div><div class="readiness-gate"><span>READY GATE</span><p>${level.gate}</p></div></section>`}).join("")}</div>
  <section class="article-section practice-bridge"><p class="eyebrow">Most do skutečné praxe</p><h2>Jak získat zkušenost dříve, než dostaneš plnou odpovědnost</h2><div class="bridge-grid"><div><b>1. Poslech</b><p>Na callu sleduj jeden konkrétní tok: incident, change nebo kapacitu. Nesnaž se zachytit všechno.</p></div><div><b>2. Rekonstrukce</b><p>Po callu nakresli, co se dělo, a odděl fakta od domněnek. Nech specialistu opravit chyby.</p></div><div><b>3. Simulace</b><p>Před změnou si nanečisto projdi plán, rollback, validační kroky, komunikaci a eskalaci.</p></div><div><b>4. Částečné vedení</b><p>Převezmi agendu, rekapitulaci, rizika a další kroky. Technické rozhodnutí ponech vlastníkovi.</p></div><div><b>5. Samostatné vedení</b><p>Veď rutinní service review a bezpečné změny. Specialistu zapojuj podle předem domluvených hranic.</p></div><div><b>6. Zpětná vazba</b><p>Po každé důležité situaci udělej krátké PIR: co jsem přehlédl, na co jsem se měl zeptat a co příště změním.</p></div></div></section>`;
}

function glossaryView(filter = state.search) {
  const q = filter.toLowerCase().trim();
  const items = glossary.filter(g => !q || `${g.term} ${g.definition}`.toLowerCase().includes(q)).sort((a,b)=>a.term.localeCompare(b.term,"cs"));
  const letters = [...new Set(glossary.map(g => g.term[0].toUpperCase()))].sort((a,b)=>a.localeCompare(b,"cs"));
  return `<div class="page-head"><div><p class="eyebrow">Terminologie</p><h1>Slovník pojmů</h1><p class="lede">Definice jsou psané pro praktickou orientaci. U konkrétní implementace vždy rozhoduje verze produktu a podporovaná architektura.</p></div><span class="status-pill">${items.length} pojmů</span></div>
  <div class="glossary-layout"><aside class="alpha-index">${letters.map(l=>`<button data-letter="${l}">${l}</button>`).join("")}</aside><div class="term-list">${items.length ? items.map(g=>`<article class="term-card" id="term-${g.id}" data-term="${g.id}"><h3>${g.term}</h3><p>${g.definition}</p></article>`).join("") : `<div class="empty-state"><h2>Nic jsem nenašel</h2><p>Zkus kratší výraz nebo jiný název produktu.</p></div>`}</div></div>`;
}

function companiesView() {
  return `<div class="page-head"><div><p class="eyebrow">Ověřený organizační kontext</p><h1>Portfolio firem</h1><p class="lede">Tato část spojuje veřejně doložené informace s interně potvrzenými kompetencemi. U každé karty je uvedeno, z jakého typu zdroje profil vychází. Konkrétní vlastnictví zákaznického kontraktu a odpovědnosti je vždy nutné potvrdit v projektové dokumentaci.</p></div></div>
    <div class="company-grid">${companies.map(c=>`<article class="company-card"><span class="tag">${c.status}</span><h2>${c.name}</h2><p>${c.summary}</p><h3>Kompetence a oblasti řešení</h3><ul>${c.portfolio.map(x=>`<li>${x}</li>`).join("")}</ul><p><strong>Technologický a provozní kontext:</strong> ${c.vendors}</p>${c.sectors ? `<h3>Typická odvětví zákazníků</h3><div class="company-tags">${c.sectors.map(x=>`<span>${x}</span>`).join("")}</div>` : ""}${c.delivery ? `<h3>Zapojení v životním cyklu</h3><p>${c.delivery}</p>` : ""}${c.relationship ? `<h3>Vztah ke skupině</h3><p>${c.relationship}</p>` : ""}<a href="${c.source}" target="_blank" rel="noreferrer">${c.sourceLabel || "Veřejný zdroj ↗"}</a>${c.sourceNote ? `<p class="source-note">${c.sourceNote}</p>` : ""}</article>`).join("")}</div>
    <section class="article-section" style="margin-top:18px"><h2>Jak portfolio číst pro delivery</h2><p>Široké portfolio integrátora znamená, že projekt může překročit hranice jednoho výrobku. PowerVault může být napojen na servery, SAN, VMware a backup od různých výrobců. Před zahájením proto vytvoř mapu odpovědností: kdo navrhuje, kdo implementuje, kdo poskytuje support, kdo vlastní změnu a kdo potvrzuje obchodní funkčnost.</p></section>`;
}

function quizIntro() {
  const best = localStorage.getItem("infrabase-best");
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
  const best = Math.max(Number(localStorage.getItem("infrabase-best")||0),pct);
  localStorage.setItem("infrabase-best", best);
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
  const gResults = glossary.filter(g => `${g.term} ${g.definition}`.toLowerCase().includes(q));
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
  document.querySelector("#termDialogContent").innerHTML = `<p class="eyebrow">Pojem</p><h2>${t.term}</h2><p>${t.definition}</p>${related.length?`<h3>Související moduly</h3><div class="term-links">${related.map(p=>`<button class="term-link" data-product="${p.id}">${p.name}</button>`).join("")}</div>`:""}`;
  termDialog.showModal();
}

function toast(message) {
  const el = document.querySelector("#toast"); el.textContent = message; el.classList.add("show");
  clearTimeout(toast.timer); toast.timer = setTimeout(()=>el.classList.remove("show"),2200);
}

document.addEventListener("click", e => {
  const route = e.target.closest("[data-route]"); if (route) return routeTo(route.dataset.route);
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
