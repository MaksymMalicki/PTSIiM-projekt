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
    pickAppointmentView
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/appointments/search/", searchAppointmentView),
    path("api/patient/appointments/<int:appointment_id>/register/", pickAppointmentView),
    path("api/patient/appointments/<int:appointment_id>/cancel/", patientCancelAppointmentView),
    path("api/patient/profile/", patientProfileView),
    path("api/patient/register/", patientRegistrationView),
    path("api/patient/login/", patientLoginView),
    path("api/patient/logout/", patientLogoutView),
    path("api/doctors/", doctorListView),
]
