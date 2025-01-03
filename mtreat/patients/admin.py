from django.contrib import admin
from .models import Patient, CustomToken

admin.site.register(Patient)
admin.site.register(CustomToken)
