# Executar o projeto localmente

Pré-requisitos: Typescript, NodeJS e Docker

```bash
# clonar o repositório
git clone https://github.com/ocsoares/desafio-bp

# instalar as bibliotecas
pnpm install (ou npm)

# criar um arquivo .env na pasta raíz do projeto

# configurar esse .env baseado no arquivo .env.example

# transpilar os arquivos do projeto para .js
pnpm run build (ou npm)

# iniciar o container do docker
docker-compose up -d

# executar o projeto
pnpm start (ou npm)
```
