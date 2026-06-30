# 静的サイト(index.html / script.js / style.css)をnginxで配信する
FROM nginx:alpine

# デフォルトのサンプルページを削除し、サイトのファイルを配置
RUN rm -rf /usr/share/nginx/html/*
COPY index.html style.css script.js /usr/share/nginx/html/

# /api/ へのアクセスをAPI用Container Appへ転送するリバースプロキシ設定
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
