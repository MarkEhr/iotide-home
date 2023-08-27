#!/bin/bash

# Configuration
HOST="tide.mx"
USER="maich"
PROJECT_PATH="/home/maich/iotide"

# Navigate to frontend and build
cd frontend || exit
echo "REACT_APP_BUILD=prod" > .env
yarn build
echo "REACT_APP_BUILD=dev" > .env
cd ..

# Rsync to copy everything to the server
# --exclude is used to ignore certain folders or files
rsync -avz \
  --exclude 'server/node_modules' \
  --exclude 'server/logs' \
  --exclude '.env' \
  --exclude '.git' \
  --exclude '.idea' \
  --include 'frontend/' \
  --include 'frontend/build/' \
  --include 'frontend/build/**' \
  --exclude 'frontend/*' \
  -e ssh ./ $USER@$HOST:$PROJECT_PATH


# SSH into the remote server and execute commands
ssh $USER@$HOST <<EOF
  cd $PROJECT_PATH/server
  yarn install
  pm2 restart iotide
EOF

echo "Deployment complete!"


