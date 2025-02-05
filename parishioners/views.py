from django.urls import reverse_lazy
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from .models import Parishioner

class ParishionerListView(ListView):
    model = Parishioner
    template_name = 'parishioners/list.html'
    context_object_name = 'parishioners'

class ParishionerDetailView(DetailView):
    model = Parishioner
    template_name = 'parishioners/detail.html'

class ParishionerCreateView(CreateView):
    model = Parishioner
    template_name = 'parishioners/form.html'
    fields = ['first_name', 'last_name', 'email', 'phone', 'address', 'baptism_date', 'marriage_date']
    success_url = reverse_lazy('parishioners:list')

class ParishionerUpdateView(UpdateView):
    model = Parishioner
    template_name = 'parishioners/form.html'
    fields = ['first_name', 'last_name', 'email', 'phone', 'address', 'baptism_date', 'marriage_date']
    success_url = reverse_lazy('parishioners:list')

class ParishionerDeleteView(DeleteView):
    model = Parishioner
    template_name = 'parishioners/confirm_delete.html'
    success_url = reverse_lazy('parishioners:list')
