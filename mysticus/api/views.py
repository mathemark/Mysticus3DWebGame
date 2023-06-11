import json
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth import get_user_model, authenticate, login, logout
from .models import Users


User = get_user_model()

#Regisztrációs nézet, a felhaszálók adatainak bekérése JSON üzenetból, ellenörzés és DB-be felvitel.
@csrf_exempt
def register_user(request):
    if request.method == 'POST':
        User = get_user_model()
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        levelAt = data.get('levelAt')

        if User.objects.filter(username=username).exists():
            return JsonResponse({'status': 'error', 'message': 'Username already exists'})

        if User.objects.filter(email=email).exists():
            return JsonResponse({'status': 'error', 'message': 'Email address already exists'})
        user = User.objects.create_user(username=username, password=password, email=email, first_name=first_name, last_name=last_name, levelAt=levelAt)
        return JsonResponse({'status': 'success'})
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'})

#Belépés nézet login metódussal
@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'status': 'success'})
        else:
            return JsonResponse({'status': 'error', 'message': 'Invalid username or password'})
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'})
    
    
#Jelszó csere nézet, régi jelszó ellenőrzéssel és adatmező cserével
@csrf_exempt
def password_change_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        old_password = data.get('old_password')
        new_password = data.get('new_password')
        try:
            user = User.objects.get(username=username)
            if user.check_password(old_password):
               user.set_password(new_password)
               user.save()
               return JsonResponse({'status': 'success','message': 'Password has been changed.'})
            else:
                 return JsonResponse({'status': 'error','message': 'Invalid old password.'}, status=400)
        except Users.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'User not found'})

#A játékos szintjének lekérdezése JSON üzenetbe való visszaküldése
@csrf_exempt
def get_level(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        try:
            user = Users.objects.get(username=username)
            return JsonResponse({'status': 'success', 'levelAt': user.levelAt})
        except Users.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'User not found'})
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request'})


#A játékos szintjének bállítása, adatbázisba való mentése.
@csrf_exempt
def set_level(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        levelAt = data.get('levelAt')
        if username is None or levelAt is None:
            return JsonResponse({'status': 'error', 'message': 'Invalid request parameters'})
        try:
            user = User.objects.get(username=username)
            user.levelAt = levelAt
            user.save()
            return JsonResponse({'status': 'success', 'message': 'LevelAt updated successfully'})
        except User.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'User does not exist'})
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'})

#Kijelentkezés nézet, logout metódussal
@csrf_exempt
def logout_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        try:
            user = User.objects.get(username=username)
            logout(request)
            return JsonResponse({'status': 'success','message': 'Logout successful'})
        except Users.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'User not found'})
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'})