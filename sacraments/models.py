from django.db import models
from parishioners.models import Parishioner

class Sacrament(models.Model):
    SACRAMENT_CHOICES = [
        ('baptism', 'Baptism'),
        ('marriage', 'Marriage'),
        ('confirmation', 'Confirmation'),
        ('first_communion', 'First Communion'),
        ('holy_orders', 'Holy Orders'),
        ('anointing_of_the_sick', 'Anointing of the Sick'),
        ('reconciliation', 'Reconciliation'),
    ]
    parishioner = models.ForeignKey(Parishioner, on_delete=models.CASCADE, related_name='sacraments')
    sacrament_type = models.CharField(max_length=30, choices=SACRAMENT_CHOICES)
    date = models.DateField()
    certificate = models.FileField(upload_to='sacraments/certificates/', null=True, blank=True)

    def __str__(self):
        return f"{self.get_sacrament_type_display()} - {self.parishioner}"
