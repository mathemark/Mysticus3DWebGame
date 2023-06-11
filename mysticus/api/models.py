from unittest.util import _MAX_LENGTH
from django.db import models
from django.contrib.auth.models import AbstractUser



class Users(AbstractUser):
    levelAt = models.CharField(max_length=255, null=True, blank=True)
    email = models.EmailField(unique=True)

    def setLevelAt(self, page):
        self.levelAt = page
        self.save()

    def getLevelAt(self):
        return self.levelAt

    def __str__(self):
        return self.username


