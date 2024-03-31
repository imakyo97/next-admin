# Nodeイメージをベースにする
FROM node:20.11.1-alpine

# 作業ディレクトリを設定する
WORKDIR /app

# パッケージマネージャに基づいて依存関係をインストールする
COPY package.json package-lock.json* ./
RUN npm ci

# ソースコードをコピーする
COPY src ./src
COPY next.config.mjs .
COPY tsconfig.json .

# Nextの開発サーバを起動する
CMD ["npm", "run", "dev"]
