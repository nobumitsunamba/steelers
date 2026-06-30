# Azure Functions (Node.js v4プログラミングモデル) 用コンテナイメージ
# 公式ベースイメージを使うことで、ローカルのFunctionsランタイムと同じ挙動を再現する
FROM mcr.microsoft.com/azure-functions/node:4-node18

ENV AzureWebJobsScriptRoot=/home/site/wwwroot \
    AzureFunctionsJobHost__Logging__Console__IsEnabled=true

WORKDIR /home/site/wwwroot

# 依存関係を先にコピーしてキャッシュを効かせる
COPY package*.json ./
RUN npm install --omit=dev

# アプリ本体をコピー
COPY . .
