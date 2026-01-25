# 🌱 Külvikalender

Veebipõhine külvikalender, mis aitab kasutajal planeerida aiatöid ajas, mõista külvi- ja istutusaegu ning saada selge ülevaade, mida teha lähiajal.

## Funktsioonid

- ✅ **Kasutaja valikud**: Vali kasvukoht (avamaa või kasvuhoone) ja kultuurid, mida kasvatada
- ✅ **Kultuuride info**: Iga kultuuri kohta on nimetus, külvimeetod, soovituslik ajavahemik ja lühike selgitus
- ✅ **Külvikalender**: Kuvab tegevusi ajas ja näitab lähimaid tegevusi (14 päeva)
- ✅ **Kultuuri lõikes vaade**: Vaata infot kultuuri lõikes

## Tehnoloogiad

- **Frontend**: React 18
- **Backend**: Node.js + Express
- **API**: REST API
- **Andmete valideerimine**: Serveripoolne valideerimine
- **Git**: Versioonihaldus

## Paigaldamine

### Eeltingimused

- Node.js (versioon 14 või uuem)
- npm või yarn

### Sammud

1. **Klooni repositoorium**
   ```bash
   git clone <repository-url>
   cd Kylvikalender
   ```

2. **Paigalda sõltuvused**
   ```bash
   npm run install-all
   ```

3. **Käivita rakendus**

   Arendusrežiimis (frontend + backend koos):
   ```bash
   npm run dev
   ```

   Või eraldi:
   ```bash
   # Terminal 1 - Backend
   npm run server

   # Terminal 2 - Frontend
   npm run client
   ```

4. **Ava brauseris**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## API Endpointid

### Kultuurid

- `GET /api/crops` - Kõik saadaolevad kultuurid
- `GET /api/crops/:id` - Kultuuri info ID järgi

### Kasutaja tegevused

- `GET /api/user/crops` - Kasutaja valitud kultuurid
- `POST /api/user/crops` - Lisa kultuur valikutesse
  ```json
  {
    "cropId": "tomat",
    "location": "avamaa"
  }
  ```
- `DELETE /api/user/crops/:cropId?location=avamaa` - Eemalda kultuur valikutest
- `GET /api/user/activities?location=avamaa&days=14` - Kasutaja tegevused

### Tervisekontroll

- `GET /api/health` - Serveri tervisekontroll

## Projekti struktuur

```
Kylvikalender/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React komponendid
│   │   ├── services/       # API teenused
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server/                 # Express backend
│   ├── data/              # Andmebaas (crops.js)
│   ├── utils/             # Utiliidid (validation.js)
│   └── index.js           # Serveri põhifail
├── package.json
└── README.md
```

## Kasutamine

1. **Vali kasvukoht**: Kliki "Avamaa" või "Kasvuhoone" nupule
2. **Lisa kultuurid**: Vali vasakult kultuurid, mida soovid kasvatada
3. **Vaata tegevusi**: Allpool kuvatakse automaatselt lähimad tegevused valitud kultuuride jaoks
4. **Eemalda kultuurid**: Kliki "×" nuppu kasutaja valitud kultuuride juures

## Saadaolevad kultuurid

- Tomat
- Kurk
- Porgand
- Sibul
- Kartul
- Salat

Iga kultuuri kohta on määratud:
- Külvimeetod
- Soovituslik ajavahemik (avamaa/kasvuhoone)
- Tegevused ajas (külv, istutamine, hooldus, koristus)

## Arendamine

### Backend arendusrežiim
```bash
npm run server
```

### Frontend arendusrežiim
```bash
npm run client
```

### Production build
```bash
cd client
npm run build
```

## Autor

Loodud haridusliku eesmärgiga.

## Litsents

MIT
