from django.db import models

# Create your models here.
from django.db import models

class Patient(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    password = models.CharField(max_length=255)  

    def __str__(self):
        return self.name
