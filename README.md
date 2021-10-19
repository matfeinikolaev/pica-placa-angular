# PicaPlacaAngular

With this application you can check if you are allowed to enter Quito by the Pico Placa rules, based on the given license plate, date and time.
To check you eligibility, enter your license plate in "Placa" field, date in "Fecha" field and time in "Hora field", after click "Verificar".
If any of the fields are not filled in, those fields will be highlighted red, you have to fill them to proceed.

The applicacion applies the following rules to check your eligibility:
La restricción vehicular se aplica 7:00am - 9:30am / 16:00pm - 19:30 con el siguiente cronograma:

Lunes: no circularán las placas terminadas en los dígitos 0, 1, 2, 3

Martes: no lo harán los vehículos con placas terminadas en 2, 3, 4, 5

Miércoles: 4, 5, 6 y 7

Jueves: 6, 7, 8 y 9

Viernes: no podrán circular los vehículos cuyas placas terminen en: 0, 1, 8 y 9

Sábados, domingos y feriados: libre circulación las 24 horas del día, hasta las 07:00 del día lunes que inicia nuevamente la restricción o del día siguiente del feriado.

List of the days allowed are saved in the "src/assets/picoplaca-rules.json", the holidays are taken only for the 2021.

## Successfull requests
![image](https://user-images.githubusercontent.com/45239725/137969453-0a39c773-4c57-4e0f-a574-85c5606eea3c.png)
![image](https://user-images.githubusercontent.com/45239725/137969494-d5e6e765-9356-4499-a0c0-a87b4625fcdd.png)

## Unsuccessfull request
![image](https://user-images.githubusercontent.com/45239725/137965067-a81ae0b3-7283-4e97-a663-e72b3dcb2561.png)

## Some basic test
![image](https://user-images.githubusercontent.com/45239725/137965326-a8dbfed1-fa3f-4651-ae7d-551095c7d724.png)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.10.
