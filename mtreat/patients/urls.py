from django.urls import path
from . import views

urlpatterns = [
    # API endpoints for patients
    path('register/', views.register_patient, name='register_patient'),  # Register a new patient
    path('patients/', views.patient_list, name='patient_list'),  # List all patients (GET) or create a new one (POST)
    path('patients/<int:pk>/', views.patient_detail, name='patient_detail'),  # Retrieve, update, or delete a specific patient


    path('token/', views.login, name='login'), 
]
