# L'Artisan — MVP Hackathon

Plateforme qui connecte **clients** et **artisans** (réparation maison) : analyse photo par IA, devis, matching géolocalisé, garantie 48h.

## Stack

- **Frontend:** React, Vite, Tailwind CSS, Leaflet, Supabase (auth)
- **Backend:** FastAPI, Supabase (PostgreSQL), Vision AI (OpenAI/Anthropic ou mock), scikit-learn (prix), Twilio (SMS mock)

## Démarrage rapide

### 1. Base de données (Supabase)

- Créer un projet Supabase.
- Dans SQL Editor, exécuter `database/schema.sql` puis `database/seed.sql`.
- *Note :* le seed utilise des UUID fictifs pour les profils. En production, les profils sont créés à l’inscription (Supabase Auth). Pour un démo sans Auth, vous pouvez temporairement retirer la FK `profiles.id -> auth.users(id)` ou créer des utilisateurs via l’app avant de lancer le seed.

### 2. Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
cp .env.example .env    # remplir SUPABASE_URL, SUPABASE_KEY, etc.
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

- **ML (optionnel):** générer les données et entraîner le modèle de prix :
  - `cd ml && python generate_data.py && python train_price_model.py`

### 3. Frontend

```bash
cd frontend
npm install
cp .env.example .env    # VITE_API_URL=http://localhost:8000/api, VITE_SUPABASE_*
npm run dev
```

- Ouvrir http://localhost:5173. Le proxy Vite envoie `/api` vers le backend.

## Variables d’environnement

**Backend (.env)**  
- `SUPABASE_URL`, `SUPABASE_KEY` (anon), `SUPABASE_SERVICE_ROLE_KEY`  
- `OPENAI_API_KEY` ou `ANTHROPIC_API_KEY`, `VISION_PROVIDER=mock|openai|anthropic`  
- `TWILIO_*` (optionnel, `TWILIO_MOCK=true` pour ne pas envoyer de SMS)

**Frontend (.env)**  
- `VITE_API_URL` (ex: `http://localhost:8000/api`)  
- `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`

## Parcours principaux

1. **Client :** Accueil → Inscription/Connexion → Nouvelle demande (photo + description + ville) → Estimation IA → Confirmer → Carte des artisans → Suivi mission → Notation.
2. **Artisan :** Inscription (rôle worker) → Tableau de bord (niveau, missions proposées) → Accepter / Refuser → Compléter (photos après) → Montée en niveau (Apprenti → Maître Maalem).

## API principales

- `POST /api/register`, `POST /api/login`, `GET /api/me`
- `POST /api/analyze-photo` (multipart: image, description, city, surface_area)
- `POST /api/jobs`, `GET /api/jobs/:id`, `POST /api/jobs/:id/accept`, `refuse`, `complete`, `complaint`, `rate`
- `POST /api/match` (problem_type, latitude, longitude, city, severity, optionnel job_id)
- `GET /api/artisans` (city, profession, user_id pour “mon profil artisan”)

## Garantie 48h

Après “terminé”, le client a 48h pour ouvrir une réclamation. Sans réclamation, la mission est clôturée et le paiement (mock) est libéré.
