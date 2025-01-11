#!/bin/bash
# restart_nginx.sh: Nginx 서버 재시작

echo "Reloading Nginx server..."
sudo systemctl reload nginx
echo "Nginx server reloaded successfully."