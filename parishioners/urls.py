from django.urls import path
from .views import (
    ParishionerListView,
    ParishionerDetailView,
    ParishionerCreateView,
    ParishionerUpdateView,
    ParishionerDeleteView,
)

app_name = 'parishioners'

urlpatterns = [
    path('', ParishionerListView.as_view(), name='list'),
    path('<int:pk>/', ParishionerDetailView.as_view(), name='detail'),
    path('create/', ParishionerCreateView.as_view(), name='create'),
    path('<int:pk>/update/', ParishionerUpdateView.as_view(), name='update'),
    path('<int:pk>/delete/', ParishionerDeleteView.as_view(), name='delete'),
]
