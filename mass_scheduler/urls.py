from django.urls import path
from .views import (
    MassEventListView,
    MassEventDetailView,
    MassEventCreateView,
    MassEventUpdateView,
    MassEventDeleteView,
)

app_name = 'mass_scheduler'

urlpatterns = [
    path('', MassEventListView.as_view(), name='list'),
    path('<int:pk>/', MassEventDetailView.as_view(), name='detail'),
    path('create/', MassEventCreateView.as_view(), name='create'),
    path('<int:pk>/update/', MassEventUpdateView.as_view(), name='update'),
    path('<int:pk>/delete/', MassEventDeleteView.as_view(), name='delete'),
]
