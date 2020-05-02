FROM nginx:stable

COPY ./build/static/ /var/www
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

#CMD ["nginx -g 'daemon off;'"]
