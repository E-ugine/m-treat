from django.urls import path
from . import views

urlpatterns = [
    # API endpoints for patients
    path('patients/', views.patient_handler, name='patient_list'),  # List all patients (GET) or create a new one (POST)
    path('patients/<int:pk>/', views.patient_handler, name='patient_detail'),  # Retrieve, update, or delete a specific patient
    path('token/', views.login, name='login'),  # User login and token generation
]
