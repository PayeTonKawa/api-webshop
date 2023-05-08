echo "BUILD ================================================================="
docker compose build  
echo "DEPLOY ==================================================================="
docker compose up  

#docker stop api_webshop_epsi || true && docker rm -f api_webshop_epsi || true
#docker run -d --name api_webshop_epsi -p "4001:3000" api_webshop_epsi