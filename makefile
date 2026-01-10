cli:
	docker exec -it $(shell docker ps -q | head -n 1) sh

# Если контейнер ещё не запущен
up:
	docker compose up -d

# Пересобрать и запустить заново
rebuild:
	docker compose up -d --build

# Остановить и удалить контейнеры
down:
	docker compose down

# Посмотреть логи
logs:
	docker compose logs -f
