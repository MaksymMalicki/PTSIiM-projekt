from django.contrib import admin
from django.urls import path
from .views import (
    AppointmentSearchView,
    PatientRegisterAppointmentView,
    PatientCancelAppointmentView,
    ViewDoctorDataView,
    PatientProfileView,
    PatientRegistrationView,
    PatientLogoutView,
    PatientLoginView,
    DoctorListView,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/appointments/search/", AppointmentSearchView.as_view()),
    path("api/patient/appointments/<int:appointment_id>/register/", PatientRegisterAppointmentView.as_view()),
    path("api/patient/appointments/<int:appointment_id>/cancel/", PatientCancelAppointmentView.as_view()),
    path("api/doctors/<int:doctor_id>/", ViewDoctorDataView.as_view()),
    path("api/patient/profile/", PatientProfileView.as_view()),
    path("api/patient/register/", PatientRegistrationView.as_view()),
    path("api/patient/login/", PatientLoginView.as_view()),
    path("api/patient/logout", PatientLogoutView.as_view()),
    path("api/doctors/", DoctorListView.as_view()),
]
