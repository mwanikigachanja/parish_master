from django.urls import reverse_lazy
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from .models import MassEvent

class MassEventListView(ListView):
    model = MassEvent
    template_name = 'mass_scheduler/list.html'
    context_object_name = 'events'

class MassEventDetailView(DetailView):
    model = MassEvent
    template_name = 'mass_scheduler/detail.html'

class MassEventCreateView(CreateView):
    model = MassEvent
    template_name = 'mass_scheduler/form.html'
    fields = ['title', 'description', 'event_date', 'location', 'priest']
    success_url = reverse_lazy('mass_scheduler:list')

class MassEventUpdateView(UpdateView):
    model = MassEvent
    template_name = 'mass_scheduler/form.html'
    fields = ['title', 'description', 'event_date', 'location', 'priest']
    success_url = reverse_lazy('mass_scheduler:list')

class MassEventDeleteView(DeleteView):
    model = MassEvent
    template_name = 'mass_scheduler/confirm_delete.html'
    success_url = reverse_lazy('mass_scheduler:list')
