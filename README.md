## Backend: Django Struktur

## Frontend: React Native Struktur
- services: Zentralisiert API-Aufrufe, die in verschiedenen Teilen der App verwendet werden können.
- store: Verwalte den globalen Zustand der Anwendung, wie z.B. Authentifizierungsinformationen.
- Zusammenarbeit: API-Aufrufe in services werden mit dem Zustand in store verbunden, um eine reaktive und gut strukturierte App zu schaffen.

#### Allgemein


SemVer Struktur: MAJOR.MINOR.PATCH
MAJOR (1.0.0): Die erste Zahl (1) wird erhöht, wenn es größere Änderungen oder Breaking Changes gibt, die nicht abwärtskompatibel sind.
MINOR (1.1.0): Die zweite Zahl (0) wird erhöht, wenn neue Features hinzugefügt werden, die abwärtskompatibel sind.
PATCH (1.0.1): Die dritte Zahl (0) wird erhöht, wenn kleine Bugfixes gemacht werden, ohne neue Funktionen oder Breaking Changes.
In deiner app.json ist die Angabe "version": "1.0.0" also korrekt. Bei kleineren Bugfixes würdest du auf "version": "1.0.1" wechseln, bei neuen Features ohne Breaking Changes auf "version": "1.1.0" usw.

Du kannst also die SemVer Version in "version" weiterführen, aber bei jedem neuen Release musst du den versionCode erhöhen. Zum Beispiel:

Version 1.0.0: "versionCode": 1
Version 1.0.1 (Bugfix): "versionCode": 2
Version 1.1.0 (neue Features): "versionCode": 3