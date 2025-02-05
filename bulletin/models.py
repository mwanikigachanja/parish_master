from django.db import models
from django.contrib.auth.models import User

class Bulletin(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    posted_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    attachments = models.FileField(upload_to='bulletins/', null=True, blank=True)

    def __str__(self):
        return self.title
