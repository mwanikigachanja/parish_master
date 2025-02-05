from django.db import models
from django.contrib.auth.models import User

class MassEvent(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    event_date = models.DateTimeField()
    location = models.CharField(max_length=200)
    priest = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='mass_events')

    def __str__(self):
        return f"{self.title} on {self.event_date.strftime('%Y-%m-%d %H:%M')}"
