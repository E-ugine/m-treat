from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.contrib.auth.hashers import make_password, check_password
from .models import Patient, CustomToken
from .serializers import PatientSerializer


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@permission_classes([AllowAny])  # Allow public access for all methods
def patient_handler(request, pk=None):
    """
    Handle GET, POST, PUT, and DELETE requests for patients.
    - GET: Retrieve patient(s) (Public access)
    - POST: Create a new patient (Public access)
    - PUT: Update a specific patient (Public access)
    - DELETE: Delete a specific patient (Public access)
    """
    if request.method == 'GET':
        # List all patients or retrieve a specific patient
        if pk:
            patient = get_object_or_404(Patient, pk=pk)
            serializer = PatientSerializer(patient)
            return Response(serializer.data)
        else:
            patients = Patient.objects.all()
            serializer = PatientSerializer(patients, many=True)
            return Response(serializer.data)

    if request.method == 'POST':
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
@permission_classes([AllowAny])  # Allow public access to the login endpoint
def login(request):
    """
    Handle POST requests to authenticate a user and get a token.
    """
    email = request.data.get('email')
    password = request.data.get('password')

    # Validate email and password presence
    if not email or not password:
        return Response({'detail': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    # Get the patient by email
    try:
        patient = Patient.objects.get(email=email)
    except Patient.DoesNotExist:
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

    # Check the password
    if not check_password(password, patient.password):
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

    # Get or create a token for the patient
    token, created = CustomToken.objects.get_or_create(user=patient)

    return Response({
        'token': str(token.key),
        'email': patient.email,
        'name': patient.name
    })
