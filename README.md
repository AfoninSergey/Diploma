ОБЛАСТИ ХРАНЕНИЯ ДАННЫХ:

-   БД (db) на JSON Server
-   BFF
-   Redux Store

СУЩНОСТИ ПРИЛОЖЕНИЯ:

-   Комбайны (combines): БД (список Комбайнов),
    Redux Store (для отображения в браузере)

-   Запчасти (parts) БД (список Запчастей),
    Redux Store (для отображения в браузере)

-   Роль пользователя (role) БД (список Ролей),
    BFF (текущая сессия Пользователя с ролью),
    Redux Store (для использования на клиенте - Отображение доп. кнопок, например.)

-   Клиенты (clients): БД (список Зарегестрированных клиентов),
    BFF (текущая сессия Клиента),
    Redux Store (для отображения в браузере)

-   Статус клиента (status) БД (список Статусов),
    BFF (текущая сессия Клиента со статусом),
    Redux Store (для использования на клиенте - Отображение нужной скидки/цены)

-   Корзина покупок (cart) Redux Store (для отображения в браузере и отправки заявки)

ТАБЛИЦЫ (СХЕМЫ) БД:

-   Комбайны (combines): id / name

-   Запчасти (parts): id / image_url / number / name / quantity / price / combine_id

-   Роли пользователя (roles): id / name

-   Статус клиента (statuses): id / name

-   Клиенты (clients): id / login / password / role_id / status_id / amount

ТАБЛИЦЫ (СХЕМЫ) BFF:

-   user-session: login / password / role / status

ТАБЛИЦЫ (СХЕМЫ) Redux Store:

-   combine(s): id / name
-   part(s): id / imageUrl / number / name / quantity / price / combineId
-   client: id / login / roleId / statusId / amount
-   cart: parts: [part_id / quantity]
