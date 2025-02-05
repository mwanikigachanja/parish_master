from django.urls import path
from .views import VolunteerListView, VolunteerCreateView

app_name = 'volunteers'

urlpatterns = [
    path('', VolunteerListView.as_view(), name='list'),
    path('signup/', VolunteerCreateView.as_view(), name='signup'),
]
