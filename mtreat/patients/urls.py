from django.urls import path
from .views import register_patient, patient_detail

urlpatterns = [
    path('register/', register_patient, name='register_patient'),
    path('<int:pk>/', patient_detail, name='patient_detail'),
]
