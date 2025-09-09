#!/usr/bin/env bash
set -e
echo "Installing server dependencies..."
cd server
npm install
echo "Installing client dependencies..."
cd ../client
npm install
echo "Done. To run:"
echo "1) In terminal A: cd server && npm run dev"
echo "2) In terminal B: cd client && npm run dev"
