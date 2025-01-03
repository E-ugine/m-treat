from django.urls import path
from . import views

urlpatterns = [
    path('patients/', views.patient_handler, name='patient_list'),  # List all patients (GET) 
    path('patients/<int:pk>/', views.patient_handler, name='patient_detail'),  # Retrieve, update, or delete a specific patient
    path('token/', views.login, name='login'),  
]
