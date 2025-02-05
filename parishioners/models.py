from django.db import models

class Parishioner(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    address = models.TextField()
    baptism_date = models.DateField(null=True, blank=True)
    marriage_date = models.DateField(null=True, blank=True)
    # Other fields as needed

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
