from rest_framework import serializers
from .models import Appointment, Patient, Doctor
from django.contrib.auth.models import User

class DoctorSerializer(serializers.ModelSerializer):
    doctor = serializers.SerializerMethodField()
    class Meta:
        model = Doctor
        fields = ['id', 'doctor', 'specialty', 'phone_number', 'email']
    def get_doctor(self, obj):
        return f"{obj.first_name} {obj.last_name}"

class AppointmentSerializer(serializers.ModelSerializer):
    doctor = serializers.StringRelatedField()
    patient = serializers.StringRelatedField()
    class Meta:
        model = Appointment
        fields = ['id', 'doctor', 'patient', 'date', 'time']
    def get_doctor_name(self, obj):
        return obj.doctor.first_name + " " + obj.doctor.last_name
    def get_patient_name(self, obj):
        return obj.patient.first_name + " " + obj.patient.last_name

class PatientRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Patient
        fields = ['id', 'username', 'password', 'email', 'first_name', 'last_name']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class PatientSerializer(serializers.ModelSerializer):
    appointments = AppointmentSerializer(many=True, read_only=True)
    class Meta:
        model = Patient
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    patient = PatientSerializer()
    class Meta:
        model = User
        fields = ['username', 'password', 'patient', 'email']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        patient_data = validated_data.pop('patient', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        Patient.objects.create(**patient_data, user=instance)
        return instance