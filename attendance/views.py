from django.urls import reverse_lazy
from django.views.generic import ListView, CreateView
from .models import Attendance

class AttendanceListView(ListView):
    model = Attendance
    template_name = 'attendance/list.html'
    context_object_name = 'attendances'

class AttendanceCreateView(CreateView):
    model = Attendance
    template_name = 'attendance/form.html'
    fields = ['event', 'attendees_count']
    success_url = reverse_lazy('attendance:list')
