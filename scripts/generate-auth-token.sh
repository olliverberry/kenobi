#!/bin/bash

AUTH_SECRET=$(openssl rand -base64 33)

echo "Auth secret: $AUTH_SECRET. Copy this to your .env or .env.docker file replacing the existing AUTH_SECRET placeholder."