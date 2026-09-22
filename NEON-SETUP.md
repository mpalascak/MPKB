# Přihlášení a synchronizace MPKB

Aplikace používá Neon PostgreSQL a Neon Auth (Google). Připojení samotné databáze nezapíná Auth.

## Nastavení v Neonu a Vercelu

1. V projektu a správné databázové větvi aktivovat Neon Auth, poskytovatele Google, Email OTP a odesílání e-mailů. Povolit stabilní doménu aplikace v Trusted domains. Pro lokální vývoj přidat odpovídající localhost origin. Používat stále stejnou produkční URL.
2. Ve Vercelu pro produkci nastavit `DATABASE_URL` z integrace, `NEON_AUTH_BASE_URL` z Neon Auth a `NEON_AUTH_COOKIE_SECRET` (náhodný tajný řetězec alespoň 32 znaků). Secret generovat bezpečně, neposílat v chatu a neukládat do repozitáře. Po změně proměnných znovu nasadit aplikaci.
3. Preview prostředí musí mít vlastní odpovídající větev a konfiguraci Auth. Nespojovat testovací identity s produkční databází.
4. První přihlášené načtení vytvoří výhradně novou tabulku `mpkb_study_progress`. Databázová role musí mít oprávnění CREATE TABLE; existující tabulky se nemění. Pro striktnější provoz lze tabulku předem vytvořit migrací a následně odstranit runtime CREATE.
5. Na počítači otevřít Účet, přihlásit se přes Google a použít „Importovat staré výsledky“. Potvrdit až po kontrole správného účtu. Na telefonu se přihlásit stejným účtem.

## Registrace a schvalování

Celá KB včetně studijního JavaScriptu a API je dostupná pouze uživatelům se stavem `approved`. Nový uživatel se registruje jednorázovým kódem na e-mail a po ověření se do tabulky `mpkb_access_requests` zapíše jako `pending`. Do schválení vidí pouze stav žádosti. Administrátor spravuje žádosti na `/admin/users`.

Účet `mpalascak@gmail.com` je bezpečnostní výchozí administrátor a při prvním načtení se automaticky schválí. Další správce lze přidat přes čárkou oddělenou proměnnou `MPKB_ADMIN_EMAILS`. Administrátorská oprávnění nevycházejí z dat odeslaných prohlížečem; server je odvozuje z ověřené session a seznamu správců.

Zamítnutý účet zůstává evidovaný a lze jej později schválit. Schválení ani zamítnutí nemaže uživatele z Neon Auth. Obsah KB se vrací s `private, no-store` a service worker jej neukládá do offline cache.

## Chování

Postup kurzů, nejlepší obecný test, označené produkty a poznámky jsou vázané na serverem ověřené ID uživatele. API nepřijímá klientem zadané ID vlastníka. Zápisy kontrolují origin a revizi dokumentu. Při konfliktu se cloud nepřepíše; uživatel může výslovně sloučit nejlepší výsledky a obě verze poznámek. Změny čekající na síť zůstávají v oddělené lokální kopii daného účtu a opakují se po obnovení spojení. Načtení při návratu do okna aktualizuje postup, pokud zde nejsou neodeslané změny.

Původní anonymní data zůstávají dostupná pro import. Nejde o certifikační systém: klientské výsledky nejsou nezávisle ověřené serverem. Historie jednotlivých pokusů zatím není ukládána. Materiály KB jsou nadále veřejnou částí aplikace; přihlášení chrání osobní postup. Na sdíleném počítači používat samostatný profil prohlížeče, protože lokální kopie poznámek zůstává na zařízení.

## Ověření

- `node tests/courses.cjs`
- `node tests/access.cjs`
- `node tests/security-gate.cjs`
- `node tests/progress-api.cjs`
- `npm run build`
- Po aktivaci infrastruktury: přihlášení, import z PC, načtení na telefonu, změna na telefonu, návrat do PC, souběžný zápis a sloučení, odhlášení a jiný účet, přerušení a obnova spojení.

Dokumentace: https://github.com/neondatabase/neon-js/blob/main/packages/auth/NEXT-JS.md

Známé omezení: Managed Neon Auth může na veřejném Google callbacku přechodně vrátit `STATE_INTEGRITY_CHECK_FAILED`; požadavek se v takovém případě k aplikaci vůbec nevrátí. Sledováno upstreamem v https://github.com/neondatabase/neon-js/issues/194. MPKB proto nabízí přihlášení jednorázovým e-mailovým kódem, které Google OAuth callback nepoužívá.
