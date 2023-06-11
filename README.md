# Mysticus webgame

## Befezetés 🛸

Ez egy Django backenddel rendelkező React és THREE.JS könyvtárakat használó  rejtvény és szabadulószóba szerű webes játék, amit a 2023-as szakdolgozatomhoz készítettem.


### Szükséges 🔧

* [Node.js](https://nodejs.org/es/download/) - A React és ThreeJs telepítéséhez szükséges kiterjesztés
* [Python + pip](https://www.python.org/downloads/) - A Django telepítéséhez szükséges programnyelv
* Internetkacsolat - A betűtípus betöltéséhez szükséges az internetkapcsolat.

Ha a kiterjesztések telepítés sikeresen megtörtént a lépések a következők:

### Telepítés 💾

<b>Django</b> parancssorból való telepítésének kódja:
```
pip install Django
```
<b>Fontos:</b> ha a Python útvonala meg van adva, használhatja a ```python manage.py``` ha nincs akkor érdemes a ```py -3 manage.py``` kefejezést használni  ahol a -3 a python verzió számát jelöli így ha korábbi python verziót használ, oda csak annak számát kell írni ``` py -2```. 
Windows paranccsorból:
```
py -3 ....

```
Linux vagy mac esetén:
```
python3 ....

```
<b>[CORS](https://pypi.org/project/django-cors-headers/) Headers</b> telepítése:
```
python -m pip install django-cors-headers
```
A linkben szereplő további lépések már integrálva vannak a settings.py fájlba. 

#### Adatbázis létrehozása 🧮
 Elnavigálunk a megfelelő mappához, majd migráljuk a táblákat az adatbázisba és utána létrehozzuk az adminunkat. Ahhoz, hogy használhassuk a syervert létre kell hozni egy superuser.


```
cd ./mysticus
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

Itt megadjuk a felhasználónevet, email-címet és jelszót, majd azokat elfogadjuk.

#### Szerver indítása 🖲️

Amint a su. létrehoztuk elindíthatjuk a szervert.
```
python manage.py runserver
```

A django szerver megfog jelenni a http://127.0.0.1/8000/ porton. 

<b>Eltérő elérési útvonal esetén:</b>
Ha valamilyen oknál fogva más hálózati címen jelenne meg a szerver, akkor az ```app/components/utils.js``` fájlban meg kell adni az új elérési útvonalat a "DB" állandóba:
```
const DB = 'http://127.0.0.1:8000/api/'
//helyett
const DB = '*megfejelő elérésiútvonal*/api/'
```
 majd a ```mysticus/mysticus/settings.py ``` fájlba a következőt:

```
CORS_ALLOWED_ORIGINS = [
    'megfelelő elérésiútvonal', 
    'http://127.0.0.1:8000',
]
```



###React és Three.JS ⚛️ 
Navigáljunk a react mappájába, ahol telepíthetjük a szükséges kiterjesztéseket. 
```
cd ./app
npm install 
npm install --save three
```

Ha befejeződött a telepítés elindíthatja a react applikációt.
```
npm start
```
Az oldal majd automatikusa megnyitja a http://localhost:3000 weblapot de a PowerShell, Parancssor visszajelzést ad arról, hogy honnan érhető el a virtuális server.

<b>Eltérő elérsi útvonal esetén:</b>
Ha valamilyen oknál fogva más hálózati címen jelenne meg a szerver, akkor a ```mysticus/mysticus/settings.py ``` fájlba javítsuk a következőt:

```
CORS_ALLOWED_ORIGINS = [
    'megfelelő elérésiútvonal', 
    'http://localhost:3000',
]
```


### Program indítása és ellenőrzése 🧪

* <b>Frontend</b>
Ha a frontend területet szeretné ellenőrizni amiben már a backend technológiák is integrálva vannak, kérem navigáljon el ehhez a mappához egy parancssorból és írja be a következő kódot:
```
cd ./app 
npm start
```

* <b>Backend</b>
Ha a backend területet szertné ellenőrizni kérem navigáljon el ehhez a project mappához és írja be parancssorba a következő kódot:
```
cd ./mysticus
python manage.py runserver
```

<b>Az admin felület elérési címe:</b>
http://127.0.0.1/8000/admin

<b>Ahhoz, hogy teljes egészébe tudjuk használni a weblapot, mindkét szervert el kell indítani egyszerre.</b>

## Szerző ✒️

* ** Máthé Márk ** - *eduardfawkes@gmail.com*  O4GK3E [Github](https://github.com/mathemark)