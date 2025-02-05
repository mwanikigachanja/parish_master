from django.test import TestCase
from django.urls import reverse
from .models import Parishioner

class ParishionerTests(TestCase):

    def setUp(self):
        self.parishioner = Parishioner.objects.create(
            first_name="John",
            last_name="Doe",
            email="john.doe@example.com",
            phone="1234567890",
            address="123 Main St",
        )

    def test_parishioner_list_view(self):
        response = self.client.get(reverse('parishioners:list'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "John Doe")

    def test_parishioner_detail_view(self):
        response = self.client.get(reverse('parishioners:detail', args=[self.parishioner.pk]))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "john.doe@example.com")

    def test_create_parishioner_view(self):
        data = {
            "first_name": "Jane",
            "last_name": "Smith",
            "email": "jane.smith@example.com",
            "phone": "0987654321",
            "address": "456 Elm St",
        }
        response = self.client.post(reverse('parishioners:create'), data)
        self.assertEqual(response.status_code, 302)  # Should redirect on success
        self.assertEqual(Parishioner.objects.count(), 2)

    def test_update_parishioner_view(self):
        data = {
            "first_name": "Johnny",
            "last_name": "Doe",
            "email": "john.doe@example.com",
            "phone": "1234567890",
            "address": "123 Main St",
        }
        response = self.client.post(reverse('parishioners:update', args=[self.parishioner.pk]), data)
        self.assertEqual(response.status_code, 302)
        self.parishioner.refresh_from_db()
        self.assertEqual(self.parishioner.first_name, "Johnny")

    def test_delete_parishioner_view(self):
        response = self.client.post(reverse('parishioners:delete', args=[self.parishioner.pk]))
        self.assertEqual(response.status_code, 302)
        self.assertEqual(Parishioner.objects.count(), 0)
