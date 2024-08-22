#!/bin/sh
echo "Running migrations..."
npm run migration:run
if [ $? -ne 0 ]; then
  echo "Migration failed."
  exit 1
fi
echo "Migrations completed successfully."

echo "Starting application in development mode..."
npm run start:dev
if [ $? -ne 0 ]; then
  echo "Failed to start application."
  exit 1
fi
