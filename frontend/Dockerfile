# Sử dụng image Node.js nhẹ
FROM node:18-alpine

# Đặt thư mục làm việc
WORKDIR /app

# Copy file package.json và package-lock.json trước để cache dependencies
COPY package.json package-lock.json ./

# Cài đặt dependencies
RUN npm ci

# Copy toàn bộ source code vào container
COPY . .

# Build project
RUN npm run build

# Sử dụng Nginx để serve static files
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

# Expose port 3000
EXPOSE 3000

# Khởi động Nginx
CMD ["nginx", "-g", "daemon off;"]
