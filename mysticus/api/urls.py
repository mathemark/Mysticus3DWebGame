from django.urls import path
from . import views

#URL-ek integrálása
urlpatterns = [
    path('register/', views.register_user, name='register'),
    path('login/', views.login_view, name='login_view'),
    path('level/', views.get_level, name='get_level'),
    path('setlevel/', views.set_level, name='set_level'),
    path('logout/', views.logout_view, name='logout'),
    path('password_change/', views.password_change_view, name='password_change'),
]