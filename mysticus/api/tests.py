from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from django.urls import reverse

User = get_user_model()

#Felhasználó készítés teszt.
class UserModelTestCase(TestCase):

    def test_create_user(self):
        user = User.objects.create_user(
            username='testuser',
            email='testuser@example.com',
            password='testpassword'
        )

        self.assertEqual(user.username, 'testuser')
        self.assertEqual(user.email, 'testuser@example.com')
        self.assertTrue(user.check_password('testpassword'))
        
#Felhasználó regisztrálása tesztesetek
class RegisterUserTestCase(TestCase):
    
    #Sikeres teszt
    def test_register_user_success(self):
        url = reverse('register')
        data = {
            'username': 'testuser',
            'password': 'testpassword',
            'email': 'test@example.com',
            'first_name': 'John',
            'last_name': 'Doe',
            'levelAt': '/testlevel'
        }
        response = self.client.post(url, data, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json().get('status'), 'success')
        
    #Létező felhasználónév teszt
    def test_register_user_unae(self):
        url = reverse('register')
        data = {
            'username': 'existinguser',
            'password': 'testpassword',
            'email': 'test@example.com',
            'first_name': 'John',
            'last_name': 'Doe',
            'levelAt': '/testlevel'
        }
        User.objects.create_user(username='existinguser', password='testpassword')
        response = self.client.post(url, data, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json().get('status'), 'error')
        self.assertEqual(response.json().get('message'), 'Username already exists')
        
    #Létező emailcím teszteset
    def test_register_user_eae(self):
        url = reverse('register')
        data = {
            'username': 'user',
            'password': 'testpassword',
            'email': 'existingtest@example.com',
            'first_name': 'John',
            'last_name': 'Doe',
            'levelAt': '/testlevel'
        }
        User.objects.create_user(username='anotheruser', password='testpassword', email='existingtest@example.com')
        response = self.client.post(url, data, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json().get('status'), 'error')
        self.assertEqual(response.json().get('message'), 'Email address already exists')
        
    #Egyéb rosssz lekérdezés eset
    def test_register_user_irm(self):
        url = reverse('register')
        data = {
            'username': 'testuser',
            'password': 'testpassword',
            'email': 'test@example.com',
            'first_name': 'John',
            'last_name': 'Doe',
            'levelAt': '/testlevel'
        }
        response = self.client.get(url, data, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json().get('status'), 'error')
        self.assertEqual(response.json().get('message'), 'Invalid request method')

#Jelszócsere tesztesetek
class PasswordChangeViewTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpassword'
        )
        self.client.login(username='testuser', password='testpassword')
        
    #Sikeres jelszócsere eset
    def test_password_change_view_success(self):
        url = reverse('password_change')
        data = {
            'username':'testuser',
            'old_password': 'testpassword',
            'new_password': 'newtestpassword',
        }

        response = self.client.post(url, data, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json().get('status'), 'success')
        self.assertEqual(response.json().get('message'), 'Password has been changed.')

    #Rossz régi jelszó eset
    def test_password_change_view_invalid_old_password(self):
        url = reverse('password_change')
        data = {
            'username':'testuser',
            'old_password': 'incorrectpassword',
            'new_password': 'newtestpassword',
        }
        response = self.client.post(url, data, content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json().get('status'), 'error')
        self.assertEqual(response.json().get('message'), 'Invalid old password.')
        
    #Rossz felhasználónév eset
    def test_password_change_view_invalid_username(self):
        url = reverse('password_change')
        data = {
            'username':'invalidtestuser',
            'old_password': 'incorrectpassword',
            'new_password': 'newtestpassword',
        }

        response = self.client.post(url, data, content_type='application/json')
        self.assertEqual(response.json().get('status'), 'error')
        self.assertEqual(response.json().get('message'), 'User not found')


#Kijelentkezés tesztesetek
class LogoutViewTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpassword'
        )
        
    #Sikeres bejelentkezés teszt
    def test_logout_view(self):
        self.client.login(username='testuser', password='testpassword')
        url = reverse('logout')
        data = {'username': 'testuser'}
        response = self.client.post(url, data, content_type='application/json')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json().get('status'), 'success')
        self.assertEqual(response.json().get('message'), 'Logout successful')
        
    #Nem létező felhasználónév teszteset
    def test_logout_view(self):
        self.client.login(username='testuser', password='testpassword')
        url = reverse('logout')
        data = {'username': 'testuser2'}
        response = self.client.post(url, data, content_type='application/json')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json().get('status'), 'error')
        self.assertEqual(response.json().get('message'), 'User not found')

#Játékos szintjének beállítása tesztesetek
class SetLevelViewTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpassword'
        )
    #Sikeres játékos szint adatmező felülírása
    def test_set_level_success(self):
        self.client.login(username='testuser', password='testpassword')
        url = reverse('set_level')
        data = {'username': 'testuser', 'levelAt': '/testlevel'}
        response = self.client.post(url, data, content_type='application/json')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json().get('status'), 'success')
        self.assertEqual(response.json().get('message'), 'LevelAt updated successfully')
        self.assertEqual(get_user_model().objects.get(username='testuser').levelAt, '/testlevel')
        
    #Nem megfelelő kérés teszteset
    def test_set_level_invalid_params(self):
        self.client.login(username='testuser', password='testpassword')
        url = reverse('set_level')
        data = {'username': None, 'levelAt': '/testlevel'}
        response = self.client.post(url, data, content_type='application/json')

        self.assertEqual(response.json().get('status'), 'error')
        self.assertEqual(response.json().get('message'), 'Invalid request parameters')
    #Nem megfelelő felhasználónév teszteset
    def test_set_level_invalid_user(self):
        self.client.login(username='testuser', password='testpassword')
        url = reverse('set_level')
        data = {'username': 'invalidtestuser', 'levelAt': '/testlevel'}
        response = self.client.post(url,data, content_type='application/json')

        self.assertEqual(response.json().get('status'), 'error')
        self.assertEqual(response.json().get('message'), 'User does not exist')

#Játékos szintjének lekérdezése teszteset     
class GetLevelViewTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpassword',
            levelAt = '/testlevel'
        )
    #Sikeres lekérdezés teszteset
    def test_get_level_success(self):
        self.client.login(username='testuser', password='testpassword')
        url = reverse('get_level')
        data = {'username': 'testuser'}
        response = self.client.post(url, data, content_type='application/json')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json().get('status'), 'success')
        self.assertEqual(response.json().get('levelAt'), '/testlevel')
        
    #Nem létezi felhasználó teszteset
    def test_get_level_fail(self):
        self.client.login(username='testuser', password='testpassword')
        url = reverse('get_level')
        data = {'username': 'invalidtestuser'}
        response = self.client.post(url, data, content_type='application/json')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json().get('status'), 'error')
        self.assertEqual(response.json().get('message'), 'User not found')
    #Egyéb hiba teszteset
    def test_get_level_invalid(self):
        self.client.login(username='testuser', password='testpassword')
        url = reverse('get_level')
        data = {'username': 'invalidtestuser'}
        response = self.client.get(url, data, content_type='application/json')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json().get('status'), 'error')
        self.assertEqual(response.json().get('message'), 'Invalid request')

