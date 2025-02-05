from django.urls import reverse_lazy
from django.views.generic import ListView, CreateView
from .models import Volunteer
from mass_scheduler.models import MassEvent

class VolunteerListView(ListView):
    model = Volunteer
    template_name = 'volunteers/list.html'
    context_object_name = 'volunteers'

class VolunteerCreateView(CreateView):
    model = Volunteer
    template_name = 'volunteers/form.html'
    fields = ['event', 'hours_served', 'contribution_type']
    success_url = reverse_lazy('volunteers:list')

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super().form_valid(form)
