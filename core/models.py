from django.contrib.auth.models import User
from django.db import models

class UserProfile(models.Model):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('staff', 'Staff'),
        ('parishioner', 'Parishioner'),
        ('donor', 'Donor'),
        ('volunteer', 'Volunteer'),
        ('sponsor', 'Sponsor'),
        ('Catechist', 'Catechist'),
        ('christian', 'Christian'),
        ('regular', 'Regular'),
        ('guest', 'Guest'),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='parishioner')
    # Add fields for contributions, volunteer hours, etc.
    total_contributions = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    volunteer_hours = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)

    def __str__(self):
        return f"{self.user.username} - {self.role}"
