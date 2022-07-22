
from django.db import models
from django.contrib.auth.models import User
# Create your models here


class Profile(models.Model):
    profile = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(default='default.png', upload_to="profile_user")

    def __str__(self) -> str:
        return f"{self.profile.username} Profile"