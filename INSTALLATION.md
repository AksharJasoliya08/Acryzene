# 📦 Installation Guide - Katargam Store

Complete step-by-step installation instructions for setting up the Katargam Store e-commerce platform.

---

## 🎯 Quick Start (5 Minutes)

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser
# Visit: http://localhost:5173
```

That's it! Your e-commerce store is now running.

---

## 📋 Prerequisites

### Required Software

| Software | Version | Download Link |
|----------|---------|---------------|
| **Node.js** | v18.0.0 or higher | [nodejs.org](https://nodejs.org/) |
| **npm** | v9.0.0 or higher | Comes with Node.js |
| **Git** (optional) | Latest | [git-scm.com](https://git-scm.com/) |

### System Requirements

- **RAM:** 4GB minimum (8GB recommended)
- **Disk Space:** 500MB free space
- **OS:** Windows 10+, macOS 10.15+, Ubuntu 20.04+
- **Browser:** Chrome, Firefox, Safari, Edge (latest versions)

---

## 🔧 Step-by-Step Installation

### Step 1: Install Node.js

#### Windows:
1. Go to [nodejs.org](https://nodejs.org/)
2. Download LTS version (v18 or higher)
3. Run the installer
4. Follow the installation wizard
5. Check installation:
   ```bash
   node --version
   npm --version
   ```

#### macOS:
```bash
# Using Homebrew (recommended)
brew install node

# OR download from nodejs.org
```

#### Linux (Ubuntu/Debian):
```bash
# Using NodeSource
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify
node --version
npm --version
```

---

### Step 2: Get the Project

#### Option A: Download ZIP
1. Click "Download ZIP" from the project page
2. Extract the ZIP file
3. Navigate to the extracted folder

#### Option B: Clone with Git
```bash
git clone <repository-url>
cd katargam-store
```

---

### Step 3: Install Dependencies

Open a terminal/command prompt in the project directory:

```bash
# Navigate to project folder
cd katargam-store

# Install all dependencies
npm install
```

**What this does:**
- Downloads all required packages
- Creates `node_modules/` folder
- Generates `package-lock.json`

**Expected output:**
```
added 245 packages in 15s
```

**Troubleshooting:**
```bash
# If you get permission errors (Linux/macOS):
sudo npm install

# If you get network errors:
npm install --verbose

# If you get peer dependency errors:
npm install --legacy-peer-deps
```

---

### Step 4: Configure Environment (Optional)

Create a `.env` file in the project root:

```bash
# Create .env file
touch .env  # Linux/macOS
# OR create manually in Windows
```

Add your configuration:

```env
# API Configuration
VITE_API_URL=http://localhost:3000/api
VITE_API_KEY=your_api_key_here

# Razorpay (for payments)
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx

# Store Settings
VITE_STORE_NAME=Katargam Store
VITE_STORE_CURRENCY=INR
```

**Note:** The app works without `.env` file using mock data.

---

### Step 5: Start Development Server

```bash
npm run dev
```

**Expected output:**
```
  VITE v6.3.5  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

---

### Step 6: Open in Browser

Visit: **http://localhost:5173**

You should see the Katargam Store homepage!

---

## 🌐 Accessing the Application

### Customer Website
- **Homepage:** http://localhost:5173/
- **Products:** http://localhost:5173/category/all
- **Cart:** http://localhost:5173/cart
- **Wishlist:** http://localhost:5173/wishlist
- **Account:** http://localhost:5173/account

### Admin Panel
- **Dashboard:** http://localhost:5173/admin
- **Products:** http://localhost:5173/admin/products
- **Orders:** http://localhost:5173/admin/orders
- **Customers:** http://localhost:5173/admin/customers
- **Coupons:** http://localhost:5173/admin/coupons
- **Import:** http://localhost:5173/admin/import
- **Settings:** http://localhost:5173/admin/settings

---

## 🏗️ Building for Production

### Create Production Build

```bash
npm run build
```

**Output:**
```
vite v6.3.5 building for production...
✓ 2354 modules transformed.
dist/index.html                   3.21 kB
dist/assets/index-[hash].css     40.38 kB │ gzip: 7.55 kB
dist/assets/index-[hash].js    858.18 kB │ gzip: 236.26 kB
✓ built in 11.67s
```

### Preview Production Build

```bash
npm run preview
```

Visit: **http://localhost:4173**

---

## 🚀 Deployment

### Option 1: Deploy to Netlify

1. Build the project:
   ```bash
   npm run build
   ```

2. Drag and drop `dist/` folder to [Netlify](https://netlify.com/)

3. OR use Netlify CLI:
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=dist
   ```

### Option 2: Deploy to Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts

### Option 3: Deploy to GitHub Pages

1. Install gh-pages:
   ```bash
   npm install -D gh-pages
   ```

2. Add to `package.json`:
   ```json
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```

3. Deploy:
   ```bash
   npm run build
   npm run deploy
   ```

### Option 4: Deploy to Custom Server

1. Build the project:
   ```bash
   npm run build
   ```

2. Upload `dist/` folder to your server

3. Configure web server (Nginx example):
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       root /var/www/katargam-store/dist;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

---

## 🔧 Troubleshooting

### Issue: "npm: command not found"

**Solution:**
- Install Node.js from [nodejs.org](https://nodejs.org/)
- Restart your terminal
- Verify: `node --version`

---

### Issue: "Port 5173 already in use"

**Solution:**
```bash
# Use different port
npm run dev -- --port 3000

# OR kill the process using port 5173
# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Linux/macOS:
lsof -ti:5173 | xargs kill -9
```

---

### Issue: "Cannot find module"

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

### Issue: "Cannot read properties of null (reading 'useReducer')"

**Solution:**
```bash
# Clear cache and rebuild
rm -rf node_modules/.vite
npm run dev
```

---

### Issue: "Build fails with TypeScript errors"

**Solution:**
```bash
# Check TypeScript errors
npm run typecheck

# Fix errors in code, then rebuild
npm run build
```

---

### Issue: "Styles not loading"

**Solution:**
```bash
# Restart dev server
# Press Ctrl+C to stop
npm run dev
```

---

### Issue: "White screen / blank page"

**Solution:**
1. Open browser console (F12)
2. Check for errors
3. Clear browser cache (Ctrl+Shift+R)
4. Restart dev server

---

### Issue: "npm install hangs"

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Use different registry
npm install --registry=https://registry.npmjs.org/

# OR use yarn instead
npm install -g yarn
yarn install
```

---

## 📱 Mobile Development

### Test on Mobile Device

1. Find your computer's IP address:
   ```bash
   # Windows
   ipconfig
   
   # macOS/Linux
   ifconfig
   ```

2. Start dev server with network access:
   ```bash
   npm run dev -- --host
   ```

3. On your mobile device, visit:
   ```
   http://YOUR_IP:5173
   ```

**Note:** Both devices must be on the same WiFi network.

---

## 🔐 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:3000/api` |
| `VITE_API_KEY` | API authentication key | `your_api_key_here` |
| `VITE_RAZORPAY_KEY_ID` | Razorpay public key | `rzp_test_xxxxxxxxxxxx` |
| `VITE_STORE_NAME` | Store display name | `Katargam Store` |
| `VITE_STORE_CURRENCY` | Currency code | `INR` |
| `VITE_ENABLE_COD` | Enable Cash on Delivery | `true` |
| `VITE_ENABLE_WISHLIST` | Enable wishlist feature | `true` |

---

## 📊 Performance Optimization

### Development Mode

- Hot Module Replacement (HMR) enabled
- Source maps for debugging
- Fast refresh on code changes
- TypeScript error checking

### Production Mode

- Code minification
- Tree shaking
- Asset optimization
- Gzip compression
- Code splitting

**Expected Performance:**
- First Load: ~2-3 seconds
- Subsequent Loads: <1 second
- Lighthouse Score: 90+

---

## 🧪 Testing the Application

### Manual Testing Checklist

#### Customer Features:
- [ ] Homepage loads correctly
- [ ] Product carousel works
- [ ] Search functionality works
- [ ] Category filtering works
- [ ] Product page displays correctly
- [ ] Add to cart works
- [ ] Cart updates correctly
- [ ] Coupon application works
- [ ] Checkout process completes
- [ ] Order confirmation shows
- [ ] Wishlist add/remove works
- [ ] Mobile responsive design works

#### Admin Features:
- [ ] Admin dashboard loads
- [ ] Charts display correctly
- [ ] Product management works
- [ ] Order management works
- [ ] Customer list displays
- [ ] Coupon creation works
- [ ] Product import works
- [ ] Settings save correctly

---

## 📞 Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Review the console for errors (F12)
3. Check the [README.md](./README.md) for detailed documentation
4. Contact support: support@katargam.com

---

## ✅ Installation Verification

After installation, verify everything works:

```bash
# 1. Check Node.js version
node --version
# Expected: v18.x.x or higher

# 2. Check npm version
npm --version
# Expected: 9.x.x or higher

# 3. Check dependencies
npm list --depth=0
# Expected: All packages listed

# 4. Start dev server
npm run dev
# Expected: Server starts on port 5173

# 5. Build production
npm run build
# Expected: Build completes successfully
```

---

**🎉 Congratulations! Your Katargam Store is now installed and ready to use!**

**Next Steps:**
1. Explore the customer website at http://localhost:5173
2. Check the admin panel at http://localhost:5173/admin
3. Read the [README.md](./README.md) for detailed feature documentation
4. Customize the store settings in Admin → Settings
5. Deploy to production when ready

---

**Version:** 1.0.0  
**Last Updated:** March 2026  
**Status:** ✅ Installation Verified
