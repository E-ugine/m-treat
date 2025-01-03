from django.urls import path
from .views import patient_handler, login

urlpatterns = [
    path('patients/', patient_handler, name='patients'),  # Handles all patient operations
    path('patients/<int:pk>/', patient_handler, name='patient_detail'),  # Handles operations on specific patients
    path('auth/login/', login, name='login'),  # New login endpoint
]
