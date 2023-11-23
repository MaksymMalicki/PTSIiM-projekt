from .models import Appointment, Patient, Doctor
from .serializers import AppointmentSerializer, DoctorSerializer, UserSerializer, PatientSerializer
from django.contrib.auth import login, logout
from django.http import HttpResponseBadRequest
from django.http import JsonResponse
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth.models import User
@csrf_exempt
def searchAppointmentView(request):
    if not request.user.is_authenticated:
        return JsonResponse({'detail': 'Not authorized.'}, status=status.HTTP_401_UNAUTHORIZED)
    if request.method == 'GET':
        appointments = Appointment.objects.filter(patient=None)
        serializer = AppointmentSerializer(appointments, many=True)
        return JsonResponse(serializer.data, status=status.HTTP_200_OK, safe=False)
    else:
        return JsonResponse({'detail': 'Method not allowed.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@csrf_exempt
def getPatientAppointmentsView(request):
    if not request.user.is_authenticated:
        return JsonResponse({'detail': 'Not authorized.'}, status=status.HTTP_401_UNAUTHORIZED)
    if request.method == 'GET':
        patient = Patient.objects.get(user=request.user)
        appointments = Appointment.objects.filter(patient=patient)
        serializer = AppointmentSerializer(appointments, many=True)
        return JsonResponse(serializer.data, status=status.HTTP_200_OK, safe=False)
    else:
        return JsonResponse({'detail': 'Method not allowed.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@csrf_exempt
def pickAppointmentView(request, appointment_id):
    if not request.user.is_authenticated:
        return JsonResponse({'detail': 'Not authorized.'}, status=status.HTTP_401_UNAUTHORIZED)

    if request.method == 'POST':
        appointment = Appointment.objects.get(pk=appointment_id)
        if appointment.patient is None:
            try:
                patient = Patient.objects.get(user=request.user)
            except User.DoesNotExist:
                return JsonResponse({'detail': 'Patient does not exist!'}, status=status.HTTP_404_NOT_FOUND)
            appointment.patient = patient
            appointment.save()
            patient_serializer = PatientSerializer(request.user.patient)
            return JsonResponse(patient_serializer.data, status=status.HTTP_200_OK)
        else:
            return JsonResponse({'detail': 'Appointment is not available.'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return JsonResponse({'detail': 'Method not allowed.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@csrf_exempt
def patientCancelAppointmentView(request, appointment_id):
    if not request.user.is_authenticated:
        return JsonResponse({'detail': 'Not authorized.'}, status=status.HTTP_401_UNAUTHORIZED)

    if request.method == 'POST':
        appointment = Appointment.objects.get(pk=appointment_id)
        patient = Patient.objects.get(user=request.user)
        if appointment.patient == patient:
            appointment.patient = None
            appointment.save()
            appointment_serializer = AppointmentSerializer(appointment)
            return JsonResponse(appointment_serializer.data, status=status.HTTP_200_OK, safe=False)
        else:
            return JsonResponse({'detail': 'You do not have permission to cancel this appointment.'}, status=status.HTTP_403_FORBIDDEN)
    else:
        return JsonResponse({'detail': 'Method not allowed.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@csrf_exempt
def patientProfileView(request):
    if not request.user.is_authenticated:
        return JsonResponse({'detail': 'Not authorized.'}, status=status.HTTP_401_UNAUTHORIZED)
    if request.method == 'GET':
        patient = Patient.objects.get(user=request.user)
        serializer = PatientSerializer(patient)
        return JsonResponse(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        patient = Patient.objects.get(user=request.user)
        raw_body = request.body
        decoded_body = raw_body.decode('utf-8')
        json_data = json.loads(decoded_body)
        serializer = PatientSerializer(patient, data=json_data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return JsonResponse({'detail': 'Method not allowed.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@csrf_exempt
def patientRegistrationView(request):
    if request.method == 'POST':
        body = json.loads(request.body.decode('utf-8'))
        userSerializer = UserSerializer(data=body)
        userSerializer.is_valid(raise_exception=True)
        userSerializer.save()
        return JsonResponse(userSerializer.data)
    else:
        return JsonResponse({'detail': 'Method not allowed.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@csrf_exempt
def patientLoginView(request):
    if request.method == 'POST':
        raw_body = request.body
        decoded_body = raw_body.decode('utf-8')
        json_data = json.loads(decoded_body)
        email = json_data['email']
        password = json_data['password']
        if email == None  or password == None:
            return HttpResponseBadRequest("Incorrect request data was provided")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return JsonResponse({'detail': 'User does not exist!'}, status=status.HTTP_404_NOT_FOUND)
        if not user.check_password(password):
            return JsonResponse({'detail': 'Incorrect password!'}, status=status.HTTP_400_BAD_REQUEST)
        login(request, user)

        return JsonResponse({'detail': 'Successfully logged in!'}, status=status.HTTP_200_OK)
    else:
        return JsonResponse({'detail': 'Method not allowed.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
def patientLogoutView(request):
    if not request.user.is_authenticated:
        return JsonResponse({'detail': 'Not authorized.'}, status=status.HTTP_401_UNAUTHORIZED)

    if request.method == 'GET':
        logout(request)
        response = JsonResponse({'detail': 'Successfully logged out!'})
    else:
        response = JsonResponse({'detail': 'Method not allowed.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    return response

def doctorListView(request):
    print(request)
    if not request.user.is_authenticated:
        return JsonResponse({'detail': 'Not authorized.'}, status=status.HTTP_401_UNAUTHORIZED)

    if request.method == 'GET':
        doctors = Doctor.objects.all()
        serializer = DoctorSerializer(doctors, many=True)
        return JsonResponse(serializer.data, status=status.HTTP_200_OK, safe=False)
    else:
        return JsonResponse({'detail': 'Method not allowed.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)