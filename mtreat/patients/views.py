from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from .models import Patient
from .serializers import PatientSerializer

# View for registering a new patient
@api_view(['POST'])
def register_patient(request):
    """
    Handle POST requests to register a new patient.
    """
    data = request.data
    data['password'] = make_password(data['password'])  
    serializer = PatientSerializer(data=data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# View for retrieving, updating, or deleting a specific patient
@api_view(['GET', 'PUT', 'DELETE'])
def patient_detail(request, pk):
    """
    Handle GET, PUT, and DELETE requests for a specific patient.
    """
    patient = get_object_or_404(Patient, pk=pk)

    if request.method == 'GET':
        # Retrieve patient details
        serializer = PatientSerializer(patient)
        return Response(serializer.data)

    elif request.method == 'PUT':
        # Update patient details
        data = request.data
        serializer = PatientSerializer(patient, data=data, partial=True) 
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        # Delete the patient
        patient.delete()
        return Response({'message': 'Patient deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

# View for listing all patients (GET) and creating a new patient (POST)
@api_view(['GET', 'POST'])
def patient_list(request):
    """
    Handle GET (list patients) and POST (create a new patient).
    """
    if request.method == 'GET':
        patients = Patient.objects.all()
        serializer = PatientSerializer(patients, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        data = request.data
        serializer = PatientSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# API view for user login to get the authentication token
@api_view(['POST'])
def login(request):
    """
    Handle POST requests to authenticate a user and get a token.
    """
    from rest_framework.authtoken.views import obtain_auth_token
    return obtain_auth_token(request)
