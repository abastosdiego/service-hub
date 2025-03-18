#!/bin/sh
set -e  # Faz o script falhar caso algum comando falhe

chmod -R 777 .

if [ "$CREATE_NEW_PROJECT_NESTJS" = "true" ] && [ ! -d "src" ]; then
    echo "📦 Criando novo projeto NestJS dentro do container..."
    nest new . --skip-install --package-manager npm --strict
    echo "✅ Projeto criado!"
fi

# Instala dependências
if [ "$INSTALL_NODE_MODULES" = "true" ]; then
    echo "📦 Instalando dependências..."
    npm install --save-dev @types/uuid
    npm install @nestjs/typeorm typeorm @nestjs/config pg
    npm install
fi

chmod -R 777 .

echo "🚀 Iniciando servidor NestJS..."
exec nodemon --legacy-watch --exec "ts-node -r tsconfig-paths/register" src/main.ts
#exec npm run start:dev