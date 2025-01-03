from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from .models import Patient
from .serializers import PatientSerializer


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def patient_handler(request, pk=None):
    """
    Handle GET, POST, PUT, and DELETE requests for patients.
    - GET: Retrieve patient(s)
    - POST: Create a new patient
    - PUT: Update a specific patient
    - DELETE: Delete a specific patient
    """
    if request.method == 'GET':
        if pk:
            # Retrieve a specific patient
            patient = get_object_or_404(Patient, pk=pk)
            serializer = PatientSerializer(patient)
            return Response(serializer.data)
        else:
            # List all patients
            patients = Patient.objects.all()
            serializer = PatientSerializer(patients, many=True)
            return Response(serializer.data)

    elif request.method == 'POST':
        # Create a new patient
        data = request.data
        if pk:
            return Response(
                {'error': 'POST is not allowed on a specific patient'},
                status=status.HTTP_405_METHOD_NOT_ALLOWED
            )
        data['password'] = make_password(data['password'])  # Hash password
        serializer = PatientSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        # Update an existing patient
        if not pk:
            return Response(
                {'error': 'PUT requires a patient ID'},
                status=status.HTTP_400_BAD_REQUEST
            )
        patient = get_object_or_404(Patient, pk=pk)
        serializer = PatientSerializer(patient, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        # Delete a specific patient
        if not pk:
            return Response(
                {'error': 'DELETE requires a patient ID'},
                status=status.HTTP_400_BAD_REQUEST
            )
        patient = get_object_or_404(Patient, pk=pk)
        patient.delete()
        return Response({'message': 'Patient deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def login(request):
    """
    Handle POST requests to authenticate a user and get a token.
    """
    email = request.data.get('email')
    password = request.data.get('password')

    # Get the user
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

    # Check password
    if not user.check_password(password):
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

    # Get or create the user's token
    token, created = Token.objects.get_or_create(user=user)

    return Response({'token': token.key, 'email': user.email, 'name': user.username})
