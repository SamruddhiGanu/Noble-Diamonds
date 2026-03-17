# ◈ Noble Diamonds — Full-Stack MERN Application

A complete luxury diamond jewellery e-commerce website built with the MERN stack, matching the Noble Diamonds brand identity.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router v6, Axios, Framer Motion, React Hot Toast |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose ODM |
| Auth | JWT (JSON Web Tokens) + bcryptjs |
| File Uploads | Multer (local) → Cloudinary (production) |
| Styling | Custom CSS with CSS Variables (no framework) |
| Fonts | Cormorant Garamond + Montserrat (Google Fonts) |

---

## Project Structure

```
noble-diamonds/
├── backend/
│   ├── models/
│   │   ├── User.js          # User schema + bcrypt password hashing
│   │   ├── Product.js       # Product schema with text search index
│   │   ├── Enquiry.js       # Customer enquiry schema
│   │   └── Collection.js    # Collection schema
│   ├── routes/
│   │   ├── auth.js          # Register, login, /me, wishlist toggle
│   │   ├── products.js      # CRUD with image upload + filtering
│   │   ├── enquiries.js     # Submit + admin management
│   │   ├── collections.js   # CRUD collections
│   │   └── admin.js         # Dashboard stats, user list
│   ├── middleware/
│   │   ├── auth.js          # JWT protect + adminOnly guards
│   │   └── upload.js        # Multer config
│   ├── server.js            # Express app entry point
│   ├── seed.js              # Database seeder
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── context/
│       │   └── AuthContext.js    # Global auth state
│       ├── components/
│       │   ├── Navbar.js / .css
│       │   ├── Footer.js / .css
│       │   └── ProductCard.js / .css
│       ├── pages/
│       │   ├── HomePage.js / .css
│       │   ├── CollectionsPage.js / .css
│       │   ├── ProductDetailPage.js / .css
│       │   ├── AboutPage.js / .css
│       │   ├── ContactPage.js / .css
│       │   ├── LoginPage.js
│       │   ├── RegisterPage.js
│       │   ├── WishlistPage.js / .css
│       │   ├── AuthPages.css
│       │   └── admin/
│       │       ├── AdminDashboard.js
│       │       ├── AdminProducts.js
│       │       ├── AdminProductForm.js
│       │       ├── AdminEnquiries.js
│       │       └── Admin.css
│       ├── App.js
│       ├── index.js
│       └── index.css         # Global CSS variables + shared styles
│
├── .gitignore
├── package.json              # Root convenience scripts
└── README.md
```

---

## Local Development Setup

### Prerequisites
- Node.js v18+ (https://nodejs.org)
- MongoDB Community Edition (https://www.mongodb.com/try/download/community)
- Git

### Step 1 — Clone & Install Dependencies

```bash
git clone <your-repo-url>
cd noble-diamonds

# Install backend
cd backend
npm install

# Install frontend
cd ../frontend
npm install
```

### Step 2 — Configure Environment Variables

Create `backend/.env` (copy from `.env.example`):

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/noble-diamonds
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000

# Optional: Email (for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### Step 3 — Seed the Database

```bash
cd backend
node seed.js
```

This creates:
- **Admin account**: `admin@noblediamonds.com` / `admin123`
- 4 collections (Engagement, Statement, Signature, Classic)
- 8 sample products with real Unsplash images

### Step 4 — Run Both Servers

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev       # runs on http://localhost:5000
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm start         # runs on http://localhost:3000
```

The React app proxies `/api/*` to the Express backend via `"proxy": "http://localhost:5000"` in `frontend/package.json`.

---

## API Reference

### Authentication
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login, returns JWT |
| GET | `/api/auth/me` | User | Get current user |
| PUT | `/api/auth/wishlist/:id` | User | Toggle wishlist item |

### Products
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/products` | Public | List with filters: `?category=&collection=&featured=&search=&page=&limit=` |
| GET | `/api/products/:id` | Public | Single product |
| POST | `/api/products` | Admin | Create (multipart/form-data) |
| PUT | `/api/products/:id` | Admin | Update |
| DELETE | `/api/products/:id` | Admin | Delete |

### Enquiries
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/enquiries` | Public | Submit enquiry |
| GET | `/api/enquiries` | Admin | List all, filter `?status=pending` |
| PUT | `/api/enquiries/:id` | Admin | Update status / notes |

### Admin
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/admin/stats` | Admin | Dashboard stats |
| GET | `/api/admin/users` | Admin | All registered users |

---

## Application Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, collection tiles, featured products, about strip |
| `/collections` | All products with category filter + search |
| `/collections/:category` | Pre-filtered by category |
| `/product/:id` | Product detail with specs, gallery, enquiry form |
| `/about` | Brand story + values |
| `/contact` | Enquiry form + contact info |
| `/login` | Sign in |
| `/register` | Create account |
| `/wishlist` | Saved products (auth required) |
| `/admin` | Dashboard stats + recent enquiries (admin only) |
| `/admin/products` | Product list with edit/delete/feature toggle |
| `/admin/products/new` | Add product with image upload |
| `/admin/products/edit/:id` | Edit existing product |
| `/admin/enquiries` | Manage customer enquiries |

---

## Production Deployment

### Option A — Deploy on Render.com (Free Tier)

**Backend:**
1. Push code to GitHub
2. Go to https://render.com → New → Web Service
3. Connect GitHub repo, set root directory: `backend`
4. Build command: `npm install`
5. Start command: `node server.js`
6. Add Environment Variables (from your `.env`)
7. Set `MONGO_URI` to your MongoDB Atlas connection string

**Frontend:**
1. New → Static Site on Render
2. Root directory: `frontend`
3. Build command: `npm install && npm run build`
4. Publish directory: `build`
5. Add environment variable: `REACT_APP_API_URL=https://your-backend.onrender.com`

> **Note:** Update `frontend/package.json` proxy to your Render backend URL for production builds, OR use `REACT_APP_API_URL` in an axios base URL config.

---

### Option B — Deploy on Railway.app

```bash
# Install Railway CLI
npm i -g @railway/cli
railway login

# Deploy backend
cd backend
railway init
railway up

# Set env vars
railway variables set MONGO_URI=... JWT_SECRET=... CLIENT_URL=...
```

For frontend, deploy on **Vercel**:
```bash
cd frontend
npm i -g vercel
vercel
# Follow prompts, set REACT_APP_API_URL to Railway backend URL
```

---

### Option C — VPS / DigitalOcean Droplet

**1. Server Setup (Ubuntu 22.04)**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install MongoDB
curl -fsSL https://pgp.mongodb.com/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt update && sudo apt install -y mongodb-org
sudo systemctl start mongod && sudo systemctl enable mongod

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx
```

**2. Deploy Code**
```bash
git clone <repo> /var/www/noble-diamonds
cd /var/www/noble-diamonds/backend
npm install
cp .env.example .env
nano .env  # fill in values

# Seed DB
node seed.js

# Start backend with PM2
pm2 start server.js --name noble-backend
pm2 startup && pm2 save
```

**3. Build Frontend**
```bash
cd /var/www/noble-diamonds/frontend
npm install
REACT_APP_API_URL=https://yourdomain.com npm run build
```

**4. Nginx Configuration**
```nginx
# /etc/nginx/sites-available/noble-diamonds
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Serve React frontend
    location / {
        root /var/www/noble-diamonds/frontend/build;
        index index.html;
        try_files $uri /index.html;
    }

    # Proxy API to Express
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Serve uploaded images
    location /uploads/ {
        alias /var/www/noble-diamonds/backend/uploads/;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/noble-diamonds /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# Add SSL with Certbot
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

### MongoDB Atlas (Cloud Database — Recommended for Production)

1. Sign up at https://cloud.mongodb.com
2. Create a free M0 cluster
3. Database Access → Add DB user with password
4. Network Access → Allow from `0.0.0.0/0` (or your server IP)
5. Connect → Drivers → Copy the connection string
6. Replace `MONGO_URI` in your `.env`:
```
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/noble-diamonds?retryWrites=true&w=majority
```

---

### Image Storage — Cloudinary (Production)

For production, replace local Multer storage with Cloudinary:

```bash
cd backend
npm install cloudinary multer-storage-cloudinary
```

Update `backend/middleware/upload.js`:
```js
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: { folder: 'noble-diamonds', allowed_formats: ['jpg', 'jpeg', 'png', 'webp'] },
});

module.exports = multer({ storage });
```

Add to `.env`:
```
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
```

---

## Admin Access

After seeding, log in at `/login` with:
- Email: `admin@noblediamonds.com`
- Password: `admin123`

> **Change the admin password in production!**

To promote any user to admin directly in MongoDB:
```js
db.users.updateOne({ email: "user@example.com" }, { $set: { role: "admin" } })
```

---

## Features Summary

**Customer-Facing:**
- Luxury dark-gold design matching Noble Diamonds brand
- Responsive across mobile, tablet, desktop
- Browse all collections with category filter + text search
- Product detail pages with image gallery, specs table
- Wishlist (save pieces, requires login)
- Enquiry forms (product-specific + general contact)
- User registration & login with JWT

**Admin Panel:**
- Dashboard with stats (products, enquiries, users)
- Add / edit / delete products with multi-image upload
- Toggle featured status on products
- View and manage customer enquiries
- Update enquiry status (pending → responded → closed)

