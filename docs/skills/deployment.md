# Filosofi Yogya - Deployment & Infrastructure Skill

## Project Context
**Project:** filosofi-yogya-mod  
**Repository:** https://github.com/Z20ben/filosofi-yogya-mod  
**Production URL:** https://filosofi.fredika.web.id  
**Infrastructure:** Proxmox → k3s → ArgoCD → Cloudflare Tunnel

---

## Deployment Architecture (DETECTED PATTERN)

```
┌─────────────────────────────────────────────────────────┐
│  GitHub Repository                                      │
│  └─ Push to main branch                                │
└────────────────┬────────────────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────────────────┐
│  GitHub Actions (.github/workflows/)                    │
│  ├─ Lint & Type Check                                  │
│  ├─ Build Next.js Application                          │
│  ├─ Build Docker Image                                 │
│  ├─ Push to Container Registry                         │
│  └─ Update ArgoCD Manifests                            │
└────────────────┬────────────────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────────────────┐
│  ArgoCD (GitOps Controller)                            │
│  ├─ Watches /argocd/ directory                        │
│  ├─ Detects manifest changes                          │
│  └─ Auto-syncs to k3s cluster                         │
└────────────────┬────────────────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────────────────┐
│  Kubernetes (k3s) on Proxmox VM                        │
│  ├─ Deployment (2+ replicas)                          │
│  ├─ Service (ClusterIP)                               │
│  ├─ ConfigMap & Secrets                               │
│  └─ Resource limits/requests                          │
└────────────────┬────────────────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────────────────┐
│  Cloudflare Tunnel                                     │
│  ├─ Exposes service to internet                       │
│  ├─ HTTPS termination                                 │
│  └─ DDoS protection                                    │
└────────────────┬────────────────────────────────────────┘
                 │
                 ↓
        🌐 filosofi.fredika.web.id
```

---

## Docker Configuration

### Dockerfile Pattern (MULTI-STAGE BUILD)

```dockerfile
# Based on detected pattern in repository

# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --production=false

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Build Next.js application
RUN npm run build

# Stage 3: Runner (Production)
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set correct permissions
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

### .dockerignore (MANDATORY)
```
node_modules
.next
.git
.env*
.gitignore
*.md
Dockerfile
docker-compose.yml
.github
argocd
k8s
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

### Docker Compose (LOCAL DEVELOPMENT)
```yaml
# docker-compose.yml
version: '3.8'

services:
  filosofi-yogya:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - NEXT_PUBLIC_API_URL=http://localhost:3000
    volumes:
      - ./app:/app/app
      - ./components:/app/components
      - ./public:/app/public
    restart: unless-stopped
```

---

## GitHub Actions CI/CD Pipeline

### Workflow File Location
```
.github/workflows/
├── deploy.yml        # Main deployment workflow
└── pr-check.yml     # PR validation (optional)
```

### Main Deployment Workflow
```yaml
# .github/workflows/deploy.yml

name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run ESLint
        run: npm run lint
      
      - name: Type check
        run: npx tsc --noEmit

  build-and-push:
    needs: lint-and-test
    runs-on: ubuntu-latest
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    
    permissions:
      contents: read
      packages: write
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
      
      - name: Log in to Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=sha,prefix=,format=short
            type=raw,value=latest
      
      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
      
      - name: Update ArgoCD manifests
        run: |
          sed -i "s|image:.*|image: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${GITHUB_SHA::7}|g" argocd/deployment.yaml
          git config user.name "GitHub Actions"
          git config user.email "actions@github.com"
          git add argocd/deployment.yaml
          git commit -m "chore: update image to ${GITHUB_SHA::7}" || echo "No changes"
          git push || echo "No changes to push"
```

---

## Kubernetes Manifests

### Directory Structure
```
k8s/
├── deployment.yaml     # Application deployment
├── service.yaml        # Service definition
├── configmap.yaml      # Configuration
└── secrets.yaml        # Secrets (NOT committed)

argocd/
├── application.yaml    # ArgoCD application definition
└── deployment.yaml     # ArgoCD-managed deployment
```

### Deployment Configuration
```yaml
# k8s/deployment.yaml OR argocd/deployment.yaml

apiVersion: apps/v1
kind: Deployment
metadata:
  name: filosofi-yogya
  namespace: default
  labels:
    app: filosofi-yogya
spec:
  replicas: 2  # MINIMUM 2 for HA
  
  selector:
    matchLabels:
      app: filosofi-yogya
  
  template:
    metadata:
      labels:
        app: filosofi-yogya
    
    spec:
      containers:
      - name: filosofi-yogya
        image: ghcr.io/z20ben/filosofi-yogya-mod:latest
        
        ports:
        - containerPort: 3000
          name: http
        
        env:
        - name: NODE_ENV
          value: "production"
        - name: NEXT_PUBLIC_SITE_URL
          value: "https://filosofi.fredika.web.id"
        
        # Resource limits (MANDATORY)
        resources:
          requests:
            memory: "256Mi"
            cpu: "100m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        
        # Health checks (RECOMMENDED)
        livenessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        
        readinessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 10
          periodSeconds: 5
      
      # Security context
      securityContext:
        runAsNonRoot: true
        runAsUser: 1001
```

### Service Configuration
```yaml
# k8s/service.yaml

apiVersion: v1
kind: Service
metadata:
  name: filosofi-yogya
  namespace: default
spec:
  type: ClusterIP
  selector:
    app: filosofi-yogya
  ports:
  - port: 80
    targetPort: 3000
    protocol: TCP
    name: http
```

### ConfigMap (Optional)
```yaml
# k8s/configmap.yaml

apiVersion: v1
kind: ConfigMap
metadata:
  name: filosofi-yogya-config
  namespace: default
data:
  NEXT_PUBLIC_API_URL: "https://api.filosofi.fredika.web.id"
  LOCALE_DEFAULT: "id"
```

---

## ArgoCD Configuration

### Application Definition
```yaml
# argocd/application.yaml

apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: filosofi-yogya
  namespace: argocd
spec:
  project: default
  
  source:
    repoURL: https://github.com/Z20ben/filosofi-yogya-mod
    targetRevision: main
    path: argocd  # or k8s/
  
  destination:
    server: https://kubernetes.default.svc
    namespace: default
  
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
    - CreateNamespace=true
```

### Sync Strategy
- **Automated:** ArgoCD auto-syncs on manifest changes
- **Self-Heal:** Auto-corrects manual changes to cluster
- **Prune:** Removes resources deleted from Git

---

## Cloudflare Tunnel Configuration

### Tunnel Setup (Detected from README)
```bash
# Cloudflare Tunnel for exposing k8s service
# Tunnel name: filosofi-yogya-tunnel

# Configuration would be in cloudflared config:
tunnel: <TUNNEL_ID>
credentials-file: /path/to/credentials.json

ingress:
  - hostname: filosofi.fredika.web.id
    service: http://filosofi-yogya.default.svc.cluster.local:80
  - service: http_status:404
```

### Benefits
- ✅ No need for public IP on VM
- ✅ HTTPS automatically configured
- ✅ DDoS protection by Cloudflare
- ✅ Zero trust network access

---

## Environment Variables Management

### Development (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development
```

### Production (Kubernetes Secrets)
```bash
# Create secret (NOT committed to Git)
kubectl create secret generic filosofi-yogya-secrets \
  --from-literal=DATABASE_URL='postgres://...' \
  --from-literal=API_KEY='...' \
  -n default

# Reference in deployment
env:
- name: DATABASE_URL
  valueFrom:
    secretKeyRef:
      name: filosofi-yogya-secrets
      key: DATABASE_URL
```

---

## Deployment Workflow

### 1. Local Development
```bash
# Run locally
npm run dev

# Test with Docker
docker-compose up --build
```

### 2. Push to GitHub
```bash
git add .
git commit -m "feat: add new heritage location"
git push origin main
```

### 3. Automatic CI/CD
```
GitHub Actions triggers:
→ Lint & Type Check
→ Build Docker Image
→ Push to ghcr.io
→ Update ArgoCD manifests
→ Commit manifest changes
```

### 4. ArgoCD Deployment
```
ArgoCD detects changes:
→ Pulls new manifest
→ Applies to k3s cluster
→ Rolling update (zero downtime)
```

### 5. Verification
```bash
# Check deployment status
kubectl get deployments
kubectl get pods
kubectl logs -f deployment/filosofi-yogya

# Check ArgoCD
argocd app get filosofi-yogya
argocd app sync filosofi-yogya  # Manual sync if needed
```

---

## Rollback Strategy

### ArgoCD Rollback
```bash
# List revisions
argocd app history filosofi-yogya

# Rollback to previous version
argocd app rollback filosofi-yogya <REVISION_NUMBER>

# Or rollback to latest working
argocd app rollback filosofi-yogya --prune
```

### Manual Kubernetes Rollback
```bash
# Rollback deployment
kubectl rollout undo deployment/filosofi-yogya

# Check rollout status
kubectl rollout status deployment/filosofi-yogya

# Rollback to specific revision
kubectl rollout undo deployment/filosofi-yogya --to-revision=2
```

---

## Monitoring & Logging

### Check Application Logs
```bash
# View logs
kubectl logs -f deployment/filosofi-yogya

# Logs from specific pod
kubectl logs -f <pod-name>

# Logs from all replicas
kubectl logs -f -l app=filosofi-yogya
```

### Check Application Health
```bash
# Check if pods are running
kubectl get pods -l app=filosofi-yogya

# Describe pod for events
kubectl describe pod <pod-name>

# Check service endpoints
kubectl get endpoints filosofi-yogya
```

### Access Application
```bash
# Port forward for debugging
kubectl port-forward svc/filosofi-yogya 3000:80

# Then access: http://localhost:3000
```

---

## Resource Management

### Recommended Resources
```yaml
# Based on Next.js application profile

resources:
  requests:
    memory: "256Mi"   # Initial allocation
    cpu: "100m"       # 0.1 CPU core
  limits:
    memory: "512Mi"   # Maximum memory
    cpu: "500m"       # 0.5 CPU core max
```

### Horizontal Pod Autoscaling (Optional)
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: filosofi-yogya-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: filosofi-yogya
  minReplicas: 2
  maxReplicas: 5
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

---

## Security Best Practices

### Container Security
- ✅ Run as non-root user (UID 1001)
- ✅ Read-only root filesystem (if possible)
- ✅ Drop all capabilities
- ✅ Use Alpine base images (smaller attack surface)

### Secrets Management
- ❌ NEVER commit secrets to Git
- ✅ Use Kubernetes Secrets
- ✅ Consider using sealed-secrets or external-secrets
- ✅ Rotate secrets regularly

### Network Policies (Optional but Recommended)
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: filosofi-yogya-netpol
spec:
  podSelector:
    matchLabels:
      app: filosofi-yogya
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - podSelector: {}  # Allow from same namespace
    ports:
    - protocol: TCP
      port: 3000
  egress:
  - to:
    - podSelector: {}
    ports:
    - protocol: TCP
      port: 53  # DNS
```

---

## Troubleshooting Guide

### Pod Not Starting
```bash
# Check pod status
kubectl get pods

# Check events
kubectl describe pod <pod-name>

# Check logs
kubectl logs <pod-name>

# Common issues:
# - Image pull errors → Check registry credentials
# - CrashLoopBackOff → Check application logs
# - Resource limits → Adjust resources
```

### Application Not Accessible
```bash
# Check service
kubectl get svc filosofi-yogya

# Check endpoints
kubectl get endpoints filosofi-yogya

# Check Cloudflare Tunnel
# Verify tunnel is running and configured correctly

# Test internally
kubectl run -it --rm debug --image=alpine --restart=Never -- sh
# Inside pod: wget -qO- http://filosofi-yogya.default.svc.cluster.local
```

### ArgoCD Sync Issues
```bash
# Check app status
argocd app get filosofi-yogya

# Force refresh
argocd app get filosofi-yogya --refresh

# Hard refresh
argocd app get filosofi-yogya --hard-refresh

# Manual sync
argocd app sync filosofi-yogya --force
```

---

## Infrastructure as Code Checklist

Before deploying:
- [ ] Dockerfile builds successfully
- [ ] Docker image runs locally
- [ ] GitHub Actions workflow is valid
- [ ] Kubernetes manifests are valid (`kubectl apply --dry-run`)
- [ ] Secrets are NOT committed to Git
- [ ] Resource limits are set
- [ ] Health checks are configured
- [ ] ArgoCD application is created
- [ ] Cloudflare Tunnel is configured
- [ ] Domain DNS points to Cloudflare

---

## Quick Commands Reference

```bash
# Build & Test Locally
docker build -t filosofi-yogya .
docker run -p 3000:3000 filosofi-yogya

# Deploy to k8s Manually (if not using ArgoCD)
kubectl apply -f k8s/

# Check Status
kubectl get all -l app=filosofi-yogya

# View Logs
kubectl logs -f deployment/filosofi-yogya --tail=100

# Restart Deployment
kubectl rollout restart deployment/filosofi-yogya

# Scale Replicas
kubectl scale deployment/filosofi-yogya --replicas=3

# Delete Resources
kubectl delete -f k8s/
```

---

## CRITICAL DEPLOYMENT RULES

### ❌ NEVER
1. Commit secrets or credentials to Git
2. Deploy without health checks
3. Run containers as root
4. Use `latest` tag in production (use specific SHA)
5. Deploy without resource limits
6. Skip CI/CD pipeline
7. Make manual changes to cluster (use GitOps)

### ✅ ALWAYS
1. Use multi-stage Docker builds
2. Set resource requests and limits
3. Configure health checks (liveness & readiness)
4. Use specific image tags (SHA or semantic version)
5. Run at least 2 replicas for HA
6. Follow GitOps workflow (ArgoCD)
7. Test deployment in staging first (if available)
8. Monitor logs after deployment
9. Have rollback plan ready
10. Document infrastructure changes

---

## Notes
- Based on detected infrastructure at https://github.com/Z20ben/filosofi-yogya-mod
- Proxmox VM → k3s → ArgoCD → Cloudflare Tunnel architecture
- GitOps workflow via ArgoCD for zero-touch deployments
- SSH Tunnel mentions in README suggest persistent Cloudflare Tunnel setup

**Last Updated:** Based on repository analysis January 2026
