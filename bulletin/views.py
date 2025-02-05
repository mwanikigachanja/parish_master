from django.urls import reverse_lazy
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from .models import Bulletin

class BulletinListView(ListView):
    model = Bulletin
    template_name = 'bulletin/list.html'
    context_object_name = 'bulletins'

class BulletinDetailView(DetailView):
    model = Bulletin
    template_name = 'bulletin/detail.html'

class BulletinCreateView(CreateView):
    model = Bulletin
    template_name = 'bulletin/form.html'
    fields = ['title', 'content', 'attachments']
    success_url = reverse_lazy('bulletin:list')

    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)

class BulletinUpdateView(UpdateView):
    model = Bulletin
    template_name = 'bulletin/form.html'
    fields = ['title', 'content', 'attachments']
    success_url = reverse_lazy('bulletin:list')

class BulletinDeleteView(DeleteView):
    model = Bulletin
    template_name = 'bulletin/confirm_delete.html'
    success_url = reverse_lazy('bulletin:list')
