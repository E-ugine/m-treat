from django.urls import path
from . import views

urlpatterns = [
    path('patients/', views.patient_handler),
    path('patients/<int:pk>/', views.patient_handler),
    path('auth/login/', views.login),
]
