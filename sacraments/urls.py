from django.urls import path
from .views import (
    SacramentListView,
    SacramentDetailView,
    SacramentCreateView,
    SacramentUpdateView,
    SacramentDeleteView,
    CertificateDownloadView,
)

app_name = 'sacraments'

urlpatterns = [
    path('', SacramentListView.as_view(), name='list'),
    path('<int:pk>/', SacramentDetailView.as_view(), name='detail'),
    path('create/', SacramentCreateView.as_view(), name='create'),
    path('<int:pk>/update/', SacramentUpdateView.as_view(), name='update'),
    path('<int:pk>/delete/', SacramentDeleteView.as_view(), name='delete'),
    path('<int:pk>/download/', CertificateDownloadView.as_view(), name='download'),
]
