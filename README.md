ОБЛАСТИ ХРАНЕНИЯ ДАННЫХ:

-   БД (db) на JSON Server
-   BFF
-   Redux Store

СУЩНОСТИ ПРИЛОЖЕНИЯ:
- 	Администратор (administrator):	БД,
									BFF (сессия),
									Redux Store (для использования на клиенте - Отображение доп. кнопок, например.)

-   Комбайны (combines): 			БД (список Комбайнов),
    								Redux Store (для отображения в браузере)

-   Запчасти (parts) 				БД (список Запчастей),
   									Redux Store (для отображения в браузере)

-   Клиенты (clients): 				БД (список Зарегестрированных клиентов),
    								BFF (текущая сессия Клиента),
   									Redux Store (для отображения в браузере)

-   Статус клиента (status):		БД (список Статусов),
    								BFF (текущая сессия Клиента со статусом),
    								Redux Store (для использования на клиенте - Отображение нужной скидки/цены)

- Роль (role):                   	БД (список Ролей),
									BFF (текущая сессия Клиента с ролью),

-   Корзина покупок (cart):			Redux Store (для отображения в браузере и отправки заявки)

ТАБЛИЦЫ (СХЕМЫ) БД:
- 	Администратор (administrator): id / login / password / admin

-   Комбайны (combines): id / name

-   Запчасти (parts): id / image_url / number / name / quantity / price / combine_id

-   Статус клиента (statuses): id / name / limit

-	Роль (role): id / name

-   Клиенты (clients): id / login / password / role_id / status_id / amount

ТАБЛИЦЫ (СХЕМЫ) BFF:

-   user-session: login / password / role / status

ТАБЛИЦЫ (СХЕМЫ) Redux Store:

-   combine(s): id / name
-   part(s): id / imageUrl / article / name / quantity / price / combineId
-   client: id / login / roleId / statusId / amount
-   cart: parts: [part_id / quantity]