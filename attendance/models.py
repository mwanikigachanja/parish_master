from django.db import models
from mass_scheduler.models import MassEvent

class Attendance(models.Model):
    event = models.ForeignKey(MassEvent, on_delete=models.CASCADE, related_name='attendances')
    attendees_count = models.PositiveIntegerField()
    recorded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.attendees_count} for {self.event.title} on {self.recorded_at.strftime('%Y-%m-%d')}"
