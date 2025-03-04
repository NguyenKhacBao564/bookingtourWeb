# Sử dụng image Node.js chính thức
FROM node:18-alpine 

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Build ứng dụng
RUN npm run build

# Sử dụng một web server nhẹ để phục vụ ứng dụng (thay vì chạy npm start)
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]

# Expose cổng 3000
EXPOSE 3000
