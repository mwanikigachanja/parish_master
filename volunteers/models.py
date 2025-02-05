from django.db import models
from django.contrib.auth.models import User
from mass_scheduler.models import MassEvent

class Volunteer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='volunteer_records')
    event = models.ForeignKey(MassEvent, on_delete=models.CASCADE, related_name='volunteers')
    hours_served = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)
    contribution_type = models.CharField(max_length=50, blank=True)  # e.g., Zaka, Fungu la Kumi, etc.
    date_signed_up = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} for {self.event.title}"
