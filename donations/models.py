from django.db import models
from django.contrib.auth.models import User

class Donation(models.Model):
    DONATION_CHOICES = [
        ('tithe', 'Tithe'),
        ('special', 'Special Collection'),
        ('zaka', 'Zaka'),
        ('fungu', 'Fungu la Kumi'),
        ('sadaka', 'Sadaka'),
    ]
    donor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='donations')
    donation_type = models.CharField(max_length=20, choices=DONATION_CHOICES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)
    mpesa_reference = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.get_donation_type_display()} by {self.donor.username} - {self.amount}"
