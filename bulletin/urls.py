from django.urls import path
from .views import (
    BulletinListView,
    BulletinDetailView,
    BulletinCreateView,
    BulletinUpdateView,
    BulletinDeleteView,
)

app_name = 'bulletin'

urlpatterns = [
    path('', BulletinListView.as_view(), name='list'),
    path('<int:pk>/', BulletinDetailView.as_view(), name='detail'),
    path('create/', BulletinCreateView.as_view(), name='create'),
    path('<int:pk>/update/', BulletinUpdateView.as_view(), name='update'),
    path('<int:pk>/delete/', BulletinDeleteView.as_view(), name='delete'),
]
