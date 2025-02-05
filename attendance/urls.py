from django.urls import path
from .views import AttendanceListView, AttendanceCreateView

app_name = 'attendance'

urlpatterns = [
    path('', AttendanceListView.as_view(), name='list'),
    path('record/', AttendanceCreateView.as_view(), name='record'),
]
