from django.urls import reverse_lazy
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView, View
from django.http import FileResponse, Http404
from .models import Sacrament
import os
from django.conf import settings

class SacramentListView(ListView):
    model = Sacrament
    template_name = 'sacraments/list.html'
    context_object_name = 'sacraments'

class SacramentDetailView(DetailView):
    model = Sacrament
    template_name = 'sacraments/detail.html'

class SacramentCreateView(CreateView):
    model = Sacrament
    template_name = 'sacraments/form.html'
    fields = ['parishioner', 'sacrament_type', 'date', 'certificate']
    success_url = reverse_lazy('sacraments:list')

class SacramentUpdateView(UpdateView):
    model = Sacrament
    template_name = 'sacraments/form.html'
    fields = ['parishioner', 'sacrament_type', 'date', 'certificate']
    success_url = reverse_lazy('sacraments:list')

class SacramentDeleteView(DeleteView):
    model = Sacrament
    template_name = 'sacraments/confirm_delete.html'
    success_url = reverse_lazy('sacraments:list')

class CertificateDownloadView(View):
    def get(self, request, pk, *args, **kwargs):
        sacrament = Sacrament.objects.get(pk=pk)
        if not sacrament.certificate:
            raise Http404("Certificate not found.")
        file_path = sacrament.certificate.path
        if os.path.exists(file_path):
            return FileResponse(open(file_path, 'rb'), as_attachment=True, filename=os.path.basename(file_path))
        raise Http404("File does not exist.")
