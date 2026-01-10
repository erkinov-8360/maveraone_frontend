FROM node:24-alpine

# Включаем corepack (для Yarn)
RUN corepack enable
RUN npm install -g serve

# Рабочая директория
WORKDIR /app

# Копируем остальной проект
COPY . .

# Открываем порты для Vite (5173) и backend API (3000, если нужно)
EXPOSE 5173
EXPOSE 3000

# Запускаем сервер разработки
CMD ["tail", "-f", "/dev/null"]
