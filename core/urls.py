app_name = 'core'

from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    # Add other URL patterns here
]