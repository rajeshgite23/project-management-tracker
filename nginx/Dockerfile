FROM nginx

# remove default configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy our own configuration file
COPY nginx.conf /etc/nginx/conf.d/