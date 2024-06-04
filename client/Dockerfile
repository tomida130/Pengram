# ベースイメージ
FROM node:20.12.0

# 作業ディレクトリを設定
WORKDIR /client

# 依存関係ファイルをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install
RUN npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react typescript


# アプリケーションファイルをコピー
COPY . .

# 環境変数を設定
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Next.jsアプリケーションをビルド
RUN npm run build 

# ポートを設定
EXPOSE 3000

# アプリケーションを開始
CMD ["npm", "start"]
