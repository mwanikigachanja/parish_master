from django.urls import path
from .views import DonationListView, DonationDetailView, DonationCreateView

app_name = 'donations'

urlpatterns = [
    path('', DonationListView.as_view(), name='list'),
    path('<int:pk>/', DonationDetailView.as_view(), name='detail'),
    path('create/', DonationCreateView.as_view(), name='create'),
]
