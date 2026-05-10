# Online Napló

## Projekt leírása

Az Online Napló egy egyszerű webalkalmazás, amely lehetőséget biztosít jegyzetek létrehozására, listázására, szerkesztésére és törlésére.

A projekt célja egy alapvető webprogramozási alkalmazás elkészítése frontend, backend és relációs adatbázis használatával.

## Használt technológiák

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- SQLite
- Jest
- Git

## Fő funkciók

- Új jegyzet létrehozása
- Jegyzetek listázása
- Meglévő jegyzet szerkesztése
- Jegyzet törlése
- Adatok tárolása SQLite adatbázisban

## API végpontok

GET - /api/notes , Jegyzetek lekérdezése 
POST - /api/notes , Új jegyzet létrehozása
PUT  /api/notes/:id , Jegyzet módosítása |
DELETE  /api/notes/:id , Jegyzet törlése |

## Adatbázis

Az alkalmazás SQLite relációs adatbázist használ.

A `notes` tábla mezői:

id(INTEGER : Egyedi azonosító)
title(TEXT : Jegyzet címe)
content(TEXT : Jegyzet tartalma)
created_at(DATETIME : Létrehozás dátuma)

## Telepítés és futtatás

A projekt futtatásához Node.js szükséges.

Csomagok telepítése:

```bash
npm install