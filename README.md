# Essensplan Tracker – PWA

Kalorien- und Makro-Tracker mit Foto-Scan (Gemini). Läuft komplett im Browser, Daten bleiben lokal auf dem Gerät.

## Dateien

| Datei | Zweck |
|---|---|
| `index.html` | Die App |
| `manifest.json` | PWA-Beschreibung (Name, Farben, Icons) |
| `sw.js` | Service Worker (Offline-Start) |
| `icon.svg`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` | Icons |

Alle Dateien müssen im **gleichen Ordner** liegen (oberste Ebene des Repositorys).

## Auf GitHub Pages veröffentlichen

1. Auf github.com ein neues Repository anlegen (z. B. `essensplan`). Es darf öffentlich sein – die App enthält keine persönlichen Daten.
2. Alle Dateien aus diesem Ordner hochladen (**Add file → Upload files**), dann **Commit changes**.
3. **Settings → Pages**: unter *Build and deployment* bei *Source* **Deploy from a branch** wählen, Branch `main`, Ordner `/ (root)`, speichern.
4. Nach ca. 1 Minute ist die App erreichbar unter `https://DEIN-NAME.github.io/essensplan/`.

## Auf dem Android-Handy installieren

1. Die Adresse in **Chrome** öffnen.
2. Menü (drei Punkte) → **App installieren** (oder *Zum Startbildschirm hinzufügen*).
3. Die App liegt jetzt mit Icon auf dem Startbildschirm und startet im Vollbild, auch offline.

## Bestehende Daten übernehmen

Die lokalen Daten hängen an der Adresse der Seite. Auf der neuen Adresse startet die App deshalb leer.

1. In der **alten Version**: *Ziele & Backup → JSON-Datei herunterladen*.
2. In der **neuen App**: *Ziele & Backup → JSON-Datei importieren* und bestätigen.

## Foto-Scan einrichten

Unter *Ziele & Backup → Gemini Vision API-Key* den eigenen Key (kostenlos in Google AI Studio) eintragen und mit *Verbindung testen* prüfen. Der Key liegt nur in diesem Browser und ist im JSON-Backup enthalten – Backups deshalb nicht weitergeben. Der Scan braucht Internet, alles andere funktioniert offline.

Falls Google das Standardmodell einmal abkündigt, den Modellnamen im gleichen Bereich ändern (Standard: `gemini-2.5-flash`).

## Updates einspielen

Geänderte Dateien einfach im Repository ersetzen. Die App holt die neue Version beim nächsten Start im Hintergrund und zeigt dann den Hinweis „Neue Version verfügbar“ mit einem Button zum Aktualisieren. Ein Hochzählen der Version in `sw.js` ist nicht nötig.

## Wichtig: regelmäßig sichern

Android kann App-Daten bei Speichermangel löschen. Die App fragt dafür dauerhaften Speicher an und erinnert nach 7 Tagen ohne Backup. Trotzdem gilt: gelegentlich ein JSON-Backup herunterladen.
