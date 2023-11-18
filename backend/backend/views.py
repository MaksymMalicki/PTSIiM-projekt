from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Appointment, Patient, Doctor
from .serializers import AppointmentSerializer, PatientRegistrationSerializer, DoctorSerializer, PatientSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated

class AppointmentSearchView(APIView):
    def get(self, request):
        appointments = Appointment.objects.filter(patient=None)
        serializer = AppointmentSerializer(appointments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class PatientRegisterAppointmentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, appointment_id):
        appointment = Appointment.objects.get(pk=appointment_id)
        if appointment.patient is None:
            appointment.patient = request.user
            appointment.save()
            patient_serializer = PatientSerializer(request.user.patient)
            return Response(patient_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Appointment is not available.'}, status=status.HTTP_400_BAD_REQUEST)
    
class PatientCancelAppointmentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, appointment_id):
        appointment = Appointment.objects.get(pk=appointment_id)
        if appointment.patient == request.user:
            appointment.patient = None
            appointment.save()
            return Response({'detail': 'Appointment canceled successfully.'}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({'detail': 'You do not have permission to cancel this appointment.'}, status=status.HTTP_403_FORBIDDEN)
    
class ViewDoctorDataView(APIView):
    def get(self, request, doctor_id):
        doctor = Doctor.objects.get(pk=doctor_id)
        serializer = DoctorSerializer(doctor)
        return Response(serializer.data, status=status.HTTP_200_OK)

class PatientProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        patient = Patient.objects.get(user=request.user)
        serializer = PatientSerializer(patient)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        patient = Patient.objects.get(user=request.user)
        serializer = PatientSerializer(patient, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PatientRegistrationView(APIView):
    def post(self, request):
        serializer = PatientRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class PatientLoginView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(PatientLoginView, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        return Response({'token': token.key, 'user_id': token.user_id})
    
class PatientLogoutView(APIView):
    def post(self, request):
        request.auth.delete()
        return Response(status=status.HTTP_200_OK)

class DoctorListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        doctors = Doctor.objects.all()
        serializer = DoctorSerializer(doctors, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)