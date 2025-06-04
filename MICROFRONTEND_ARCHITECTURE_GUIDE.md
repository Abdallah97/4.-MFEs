# Microfrontend Architecture & Communication Guide

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Application Structure](#application-structure)
3. [Module Federation Configuration](#module-federation-configuration)
4. [Communication Patterns](#communication-patterns)
5. [Routing Implementation](#routing-implementation)
6. [Shared Dependencies](#shared-dependencies)
7. [Remote Entry Files](#remote-entry-files)
8. [Setup and Deployment](#setup-and-deployment)
9. [Benefits and Trade-offs](#benefits-and-trade-offs)
10. [Best Practices](#best-practices)

## Architecture Overview

This application demonstrates a **host-remote microfrontend architecture** using **Webpack Module Federation**. It consists of 5 independent applications that work together as a single user experience.

```
┌─────────────────────────────────────────────────────────────────┐
│                    MFApp (Host - Port 3000)                    │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                React Router Navigation                  │   │
│  └─────────────────────────────────────────────────────────┘   │
│  ┌─────────────┬─────────────┬─────────────┬─────────────┐   │
│  │ Components  │ Todo List   │   Vue App   │   JS App    │   │
│  │ Port 3001   │ Port 3002   │ Port 3003   │ Port 3004   │   │
│  │   React     │   React     │   Vue.js    │ Vanilla JS  │   │
│  └─────────────┴─────────────┴─────────────┴─────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## Application Structure

### 1. **Host Application (MFApp - Port 3000)**
- **Role**: Orchestrates all microfrontends
- **Technology**: React with React Router
- **Responsibilities**:
  - Main navigation and routing
  - Layout management (Header, Footer)
  - Loading and integrating remote components
  - Shared dependency management

### 2. **Components App (Port 3001)**
- **Role**: Shared UI component library
- **Technology**: React
- **Exposes**:
  - `CardDetails` component
  - `CardShort` component
- **Purpose**: Reusable components across the application

### 3. **Todo List App (Port 3002)**
- **Role**: Task management functionality
- **Technology**: React
- **Exposes**: Todo list components and functionality
- **Features**: Add, edit, delete tasks

### 4. **Vue App (Port 3003)**
- **Role**: Vue.js based functionality
- **Technology**: Vue.js
- **Exposes**: Vue components integrated into React host
- **Demonstrates**: Cross-framework integration

### 5. **JavaScript App (Port 3004)**
- **Role**: Vanilla JavaScript functionality
- **Technology**: Pure JavaScript
- **Exposes**: Framework-agnostic components
- **Purpose**: Shows integration without frameworks

## Module Federation Configuration

### Host Application Configuration
```javascript
// MFApp/webpack.config.js
new ModuleFederationPlugin({
  name: "MFHost",
  filename: "remoteEntry.js",
  remotes: {
    // Component library remote
    "DetailCardInHost": "commonComponents@http://localhost:3001/remoteEntry.js",
    "ShortCardInHost": "commonComponents@http://localhost:3001/remoteEntry.js",
    
    // Application remotes
    "CheckoutHost": "Checkout@http://localhost:3002/remoteEntry.js",
    "VueAppHost": "VueApp@http://localhost:3003/remoteEntry.js", 
    "JsAppHost": "JsApp@http://localhost:3004/remoteEntry.js"
  },
  shared: {
    react: {
      singleton: true,
      requiredVersion: "^18.0.0"
    },
    "react-dom": {
      singleton: true,
      requiredVersion: "^18.0.0"
    }
  }
})
```

### Remote Application Configurations

#### Components App
```javascript
// components/webpack.config.js
new ModuleFederationPlugin({
  name: "commonComponents",
  filename: "remoteEntry.js",
  exposes: {
    "./CardDetails": "./src/components/CardDetails.jsx",
    "./CardShort": "./src/components/CardShort.jsx"
  },
  shared: {
    react: { singleton: true },
    "react-dom": { singleton: true }
  }
})
```

#### Todo App
```javascript
// to-do-list/webpack.config.js
new ModuleFederationPlugin({
  name: "Checkout",
  filename: "remoteEntry.js",
  exposes: {
    "./Checkout": "./src/App.jsx"
  },
  shared: {
    react: { singleton: true },
    "react-dom": { singleton: true }
  }
})
```

#### Vue App
```javascript
// vue-app/webpack.config.js
new ModuleFederationPlugin({
  name: "VueApp",
  filename: "remoteEntry.js",
  exposes: {
    "./VueApp": "./src/index.js"
  },
  shared: {
    vue: { singleton: true }
  }
})
```

#### JavaScript App
```javascript
// js-app/webpack.config.js
new ModuleFederationPlugin({
  name: "JsApp", 
  filename: "remoteEntry.js",
  exposes: {
    "./JsApp": "./src/index.js"
  }
})
```

## Communication Patterns

### 1. **Module Federation Communication**
The primary communication method using Webpack's Module Federation:

```javascript
// Dynamic import of remote components
const Checkout = React.lazy(() => import("CheckoutHost/Checkout"));
const VueApp = React.lazy(() => import("VueAppHost/VueApp"));
const CardDetails = React.lazy(() => import("DetailCardInHost/CardDetails"));
```

### 2. **Props-Based Communication**
Passing data between host and remotes through React props:

```javascript
// Host passes data to remote component
<Suspense fallback={<div>Loading...</div>}>
  <Checkout 
    initialTasks={hostData.tasks}
    onTaskUpdate={handleTaskUpdate}
    userId={currentUser.id}
  />
</Suspense>
```

### 3. **Event-Driven Communication**
Custom events for loose coupling between microfrontends:

```javascript
// Remote component dispatches event
const notifyHost = (data) => {
  window.dispatchEvent(new CustomEvent('mf-todo-updated', { 
    detail: data 
  }));
};

// Host listens for events
useEffect(() => {
  const handleTodoUpdate = (event) => {
    setHostState(event.detail);
  };
  
  window.addEventListener('mf-todo-updated', handleTodoUpdate);
  return () => window.removeEventListener('mf-todo-updated', handleTodoUpdate);
}, []);
```

### 4. **Shared State Management**
Using shared context or state management libraries:

```javascript
// Shared context across microfrontends
const SharedContext = React.createContext();

// Host provides context
<SharedContext.Provider value={{ user, theme, notifications }}>
  <RemoteComponent />
</SharedContext.Provider>

// Remote consumes context
const { user, theme } = useContext(SharedContext);
```

### 5. **URL-Based Communication**
Using URL parameters and query strings for state sharing:

```javascript
// Navigate with state
navigate('/todo-app?filter=completed&user=123');

// Remote reads URL state
const searchParams = new URLSearchParams(location.search);
const filter = searchParams.get('filter');
const userId = searchParams.get('user');
```

## Routing Implementation

### Host Application Routing
```javascript
// MFApp/src/App.jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <FoodList /> // Home page with components
      },
      {
        path: "/vue-js",
        element: <VueJs /> // Vue microfrontend
      },
      {
        path: "/js-app", 
        element: <JsApp /> // Vanilla JS microfrontend
      },
      {
        path: "/to-do-app",
        element: <ProductList /> // Todo microfrontend
      }
    ]
  }
]);

return <RouterProvider router={router} />;
```

### Layout Structure
```javascript
// MFApp/src/components/Layout.jsx
const Layout = () => {
  return (
    <>
      <Header /> {/* Consistent across all routes */}
      <main>
        <Outlet /> {/* This is where microfrontends render */}
      </main>
      <Footer /> {/* Consistent across all routes */}
    </>
  );
};
```

### Navigation Component
```javascript
// Navigation between microfrontends
const Navigation = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/to-do-app">Todo App</Link>
      <Link to="/vue-js">Vue App</Link>
      <Link to="/js-app">JavaScript App</Link>
    </nav>
  );
};
```

## Shared Dependencies

### Benefits of Sharing
1. **Reduced Bundle Size**: React loaded once, not in every microfrontend
2. **Memory Efficiency**: Single instance in browser memory
3. **State Consistency**: All components use same React instance
4. **Faster Loading**: Cached after first load

### Configuration Options
```javascript
shared: {
  react: {
    singleton: true,        // Only one version loaded
    strictVersion: true,    // Enforce exact version match
    requiredVersion: "^18.0.0", // Minimum version required
    eager: true            // Load immediately, not lazy
  },
  "react-dom": {
    singleton: true,
    requiredVersion: "^18.0.0"
  },
  "@emotion/react": {
    singleton: true        // Share UI libraries too
  }
}
```

### Version Management
```javascript
// Handle version conflicts
shared: {
  react: {
    singleton: true,
    requiredVersion: "^18.0.0",
    // If versions don't match, show warning
    shareScope: "default"
  }
}
```

## Remote Entry Files

### What is remoteEntry.js?
The `remoteEntry.js` file is automatically generated by Webpack Module Federation and serves as:
- **Module Registry**: Lists all exposed modules
- **Runtime Loader**: Handles dynamic imports
- **Dependency Resolver**: Manages shared dependencies
- **Version Controller**: Handles compatibility

### How It Works
```javascript
// Generated remoteEntry.js structure (simplified)
(function() {
  var moduleMap = {
    "./CardDetails": () => import("./src/components/CardDetails.jsx"),
    "./CardShort": () => import("./src/components/CardShort.jsx")
  };
  
  var get = (module) => {
    return moduleMap[module]();
  };
  
  var init = (shareScope) => {
    // Initialize shared dependencies
  };
  
  // Expose to global scope
  window.commonComponents = { get, init };
})();
```

### Loading Process
1. **Host Discovery**: Host loads remoteEntry.js from each remote
2. **Module Registration**: Remote registers its exposed modules
3. **Dependency Resolution**: Shared dependencies are resolved
4. **Dynamic Import**: Components loaded on-demand

## Setup and Deployment

### Development Setup
```bash
# Terminal 1 - Components Library
cd components
npm install
npm start  # Port 3001

# Terminal 2 - Todo Application  
cd to-do-list
npm install
npm start  # Port 3002

# Terminal 3 - Vue Application
cd vue-app
npm install
npm start  # Port 3003

# Terminal 4 - JavaScript Application
cd js-app
npm install  
npm start  # Port 3004

# Terminal 5 - Host Application
cd MFApp
npm install
npm start  # Port 3000
```

### Production Deployment Options

#### Option 1: Independent Deployment
```bash
# Each microfrontend deployed separately
# Components: https://components.myapp.com
# Todo: https://todo.myapp.com  
# Vue: https://vue.myapp.com
# JS: https://js.myapp.com
# Host: https://myapp.com

# Update webpack.config.js for production URLs
remotes: {
  "CheckoutHost": "Checkout@https://todo.myapp.com/remoteEntry.js"
}
```

#### Option 2: Container Deployment
```dockerfile
# Dockerfile for each microfrontend
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  components:
    build: ./components
    ports: ["3001:3001"]
  
  todo-app:
    build: ./to-do-list  
    ports: ["3002:3002"]
    
  vue-app:
    build: ./vue-app
    ports: ["3003:3003"]
    
  js-app:
    build: ./js-app
    ports: ["3004:3004"]
    
  host:
    build: ./MFApp
    ports: ["3000:3000"]
    depends_on: [components, todo-app, vue-app, js-app]
```

## Benefits and Trade-offs

### Benefits

#### 1. **Team Independence**
- **Separate Codebases**: Each team owns their microfrontend
- **Independent Deployment**: Deploy without affecting others
- **Technology Freedom**: Choose best tools for each domain
- **Parallel Development**: Teams work simultaneously

#### 2. **Scalability**
- **Horizontal Scaling**: Add new microfrontends easily
- **Load Distribution**: Distribute across multiple servers
- **Caching Benefits**: Cache microfrontends independently
- **Performance**: Load only needed components

#### 3. **Maintainability**
- **Smaller Codebases**: Easier to understand and modify
- **Isolated Testing**: Test microfrontends independently
- **Clear Boundaries**: Well-defined interfaces
- **Legacy Migration**: Gradually replace old systems

#### 4. **Technology Benefits**
- **Framework Mixing**: React + Vue + Vanilla JS
- **Version Independence**: Different React versions possible
- **Shared Resources**: Common dependencies shared
- **Modern Tooling**: Latest build tools and practices

### Trade-offs

#### 1. **Complexity**
- **Setup Overhead**: More complex initial setup
- **Coordination**: Need to coordinate between teams
- **Debugging**: Harder to debug across boundaries
- **Testing**: Integration testing more complex

#### 2. **Performance Considerations**
- **Network Overhead**: Multiple HTTP requests
- **Bundle Splitting**: Potential for duplicate code
- **Runtime Overhead**: Module federation runtime cost
- **Waterfall Loading**: Sequential loading of dependencies

#### 3. **Development Challenges**
- **Local Development**: Need to run multiple applications
- **Dependency Management**: Shared dependency conflicts
- **State Management**: Complex state sharing
- **Error Handling**: Errors across boundaries

## Best Practices

### 1. **Design Principles**
```javascript
// Keep interfaces simple and stable
// components/src/components/CardDetails.jsx
export const CardDetails = ({ 
  title, 
  description, 
  onAction,
  theme = 'default' 
}) => {
  // Simple, predictable interface
};
```

### 2. **Error Boundaries**
```javascript
// Host error boundary for remote components
class MicrofrontendErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Microfrontend error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong with this component.</div>;
    }

    return this.props.children;
  }
}

// Usage
<MicrofrontendErrorBoundary>
  <Suspense fallback={<Loading />}>
    <RemoteComponent />
  </Suspense>
</MicrofrontendErrorBoundary>
```

### 3. **Performance Optimization**
```javascript
// Lazy loading with proper loading states
const Checkout = React.lazy(() => 
  import("CheckoutHost/Checkout").catch(() => {
    return { default: () => <div>Failed to load Todo App</div> };
  })
);

// Preload critical components
const preloadCheckout = () => {
  import("CheckoutHost/Checkout");
};

// Trigger preload on hover or route prefetch
<Link to="/todo-app" onMouseEnter={preloadCheckout}>
  Todo App
</Link>
```

