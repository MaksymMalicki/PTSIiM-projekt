from django.contrib import admin
from django.urls import path
from .views import (
    searchAppointmentView,
    patientCancelAppointmentView,
    patientProfileView,
    patientRegistrationView,
    patientLogoutView,
    patientLoginView,
    doctorListView,
    pickAppointmentView,
    getPatientAppointmentsView,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/appointments/search/", searchAppointmentView),
    path("api/patient/appointments/<int:appointment_id>/register/", pickAppointmentView),
    path("api/patient/appointments/<int:appointment_id>/cancel/", patientCancelAppointmentView),
    path("api/patient/profile/", patientProfileView),
    path("api/register/", patientRegistrationView),
    path("api/login/", patientLoginView),
    path("api/logout/", patientLogoutView),
    path("api/doctors/", doctorListView),
    path("api/patient/appointments/", getPatientAppointmentsView)
]
