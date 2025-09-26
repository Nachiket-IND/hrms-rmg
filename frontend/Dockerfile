# frontend/Dockerfile

FROM nginx:alpine

# Copy Angular production build
COPY dist/hrms/browser/ /usr/share/nginx/html

# Fix permissions (optional but safe)
RUN chmod -R 755 /usr/share/nginx/html

# Replace default nginx config
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
