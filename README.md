# Micro-Frontend Application with Module Federation

This project demonstrates a micro-frontend architecture using Webpack 5's Module Federation. It consists of a host application that consumes components from multiple remote micro-frontends built with different technologies (React and Vue.js).

## 📁 Project Structure

```
├── MFApp/              # Host Application (React) - Port 3000
├── product/            # Product Components Remote (React) - Port 3001
├── checkout/           # Checkout Component Remote (React) - Port 3002
├── cart/               # Vue.js Application Remote (Vue) - Port 3003
└── README.md           # This file
```

## 🏗️ Architecture Overview

### Host Application (MFApp)
- **Port**: 3000
- **Technology**: React with React Router
- **Role**: Main application that orchestrates and consumes remote components
- **Remote Dependencies**:
  - Product components from `localhost:3001`
  - Checkout component from `localhost:3002`
  - Vue.js application from `localhost:3003`

### Remote Applications

#### 1. Product Components (product/)
- **Port**: 3001
- **Technology**: React
- **Module Federation Name**: `commonComponents`
- **Exposed Components**:
  - `./CardDetails` - Product detail card component
  - `./CardShort` - Short product card component
  - `./ProductCard` - Product card component

#### 2. Checkout Application (checkout/)
- **Port**: 3002
- **Technology**: React
- **Module Federation Name**: `Checkout`
- **Exposed Components**:
  - `./Checkout` - Checkout component

#### 3. Vue.js Application (cart/)
- **Port**: 3003
- **Technology**: Vue.js 3
- **Module Federation Name**: `VueApp`
- **Exposed Components**:
  - Vue.js cart application

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation & Setup

1. **Clone the repository and navigate to the project directory**
   ```powershell
   cd "d:\MicroFE\4. MFEs-routing"
   ```

2. **Install dependencies for all applications**

   Navigate to each directory and install dependencies:

   ```powershell
   # Install dependencies for Product Components (Remote)
   cd product
   npm install
   cd ..

   # Install dependencies for Checkout (Remote)
   cd checkout
   npm install
   cd ..

   # Install dependencies for Vue Cart (Remote)
   cd cart
   npm install
   cd ..

   # Install dependencies for Host Application
   cd MFApp
   npm install
   cd ..
   ```

## 🏃‍♂️ Running the Applications

### Important: Start Order Matters!

**You must start the remote applications BEFORE the host application** because the host application depends on the remote applications being available.

### Step 1: Start Remote Applications

Open **4 separate terminal windows** and run the following commands:

#### Terminal 1 - Product Components (Port 3001)
```powershell
cd "d:\MicroFE\4. MFEs-routing\product"
npm start
```

#### Terminal 2 - Checkout Application (Port 3002)
```powershell
cd "d:\MicroFE\4. MFEs-routing\checkout"
npm start
```

#### Terminal 3 - Vue.js Cart Application (Port 3003)
```powershell
cd "d:\MicroFE\4. MFEs-routing\cart"
npm start
```

Wait for all remote applications to start successfully before proceeding to the next step.

### Step 2: Start Host Application

#### Terminal 4 - Host Application (Port 3000)
```powershell
cd "d:\MicroFE\4. MFEs-routing\MFApp"
npm start
```

### 🌐 Access the Applications

Once all applications are running:

- **Host Application**: http://localhost:3000
- **Product Components**: http://localhost:3001
- **Checkout Application**: http://localhost:3002
- **Vue.js Cart**: http://localhost:3003

## 🔧 Development Scripts

Each application has the following npm scripts:

- `npm start` - Start the development server
- `npm run build` - Build the application for production

## 📦 Module Federation Configuration

### Host Application Configuration
The host application consumes the following remotes:
```javascript
remotes: {
  "DetailCardInHost": "commonComponents@http://localhost:3001/remoteEntry.js",
  "ShortCardInHost": "commonComponents@http://localhost:3001/remoteEntry.js", 
  "ProductCardInHost": "commonComponents@http://localhost:3001/remoteEntry.js",
  "CheckoutHost": "Checkout@http://localhost:3002/remoteEntry.js",
  "VueAppHost": "VueApp@http://localhost:3003/remoteEntry.js"
}
```

### Remote Applications Configuration
Each remote application exposes components through Module Federation:

- **Product Components**: Exposes React components for product display
- **Checkout**: Exposes checkout functionality
- **Vue Cart**: Exposes Vue.js cart application

## 🛠️ Technology Stack

- **Webpack 5** with Module Federation
- **React 18** (Host and Product/Checkout remotes)
- **Vue.js 3** (Cart remote)
- **React Router Dom** (Routing in host)
- **Babel** (JavaScript compilation)
- **CSS Loader** & **Mini CSS Extract Plugin** (Styling)

## 🔍 Troubleshooting

### Common Issues

1. **Remote applications not loading**
   - Ensure all remote applications are running before starting the host
   - Check that ports 3001, 3002, and 3003 are available
   - Verify no firewall is blocking the ports

2. **Module Federation errors**
   - Make sure the remote entry points are accessible
   - Check the webpack configuration for correct remote URLs
   - Ensure shared dependencies (React, React-DOM) are properly configured

3. **CORS issues**
   - All applications run on localhost, so CORS shouldn't be an issue
   - If problems persist, check browser console for specific errors

### Debug Steps

1. **Check if remotes are accessible**:
   - Visit http://localhost:3001/remoteEntry.js
   - Visit http://localhost:3002/remoteEntry.js
   - Visit http://localhost:3003/remoteEntry.js

2. **Browser Developer Tools**:
   - Check Console for JavaScript errors
   - Check Network tab for failed requests
   - Verify Module Federation chunks are loading

## 📝 Development Notes

- Each application can be developed and deployed independently
- Shared dependencies (React, React-DOM) are configured to avoid version conflicts
- The host application handles routing and orchestration
- Remote applications focus on specific business domains



