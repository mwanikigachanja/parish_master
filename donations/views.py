from django.urls import reverse_lazy
from django.views.generic import ListView, DetailView, CreateView
from .models import Donation
from .mpesa import initiate_payment
from django.shortcuts import render, redirect
from django.contrib import messages

class DonationListView(ListView):
    model = Donation
    template_name = 'donations/list.html'
    context_object_name = 'donations'

class DonationDetailView(DetailView):
    model = Donation
    template_name = 'donations/detail.html'

class DonationCreateView(CreateView):
    model = Donation
    template_name = 'donations/form.html'
    fields = ['donation_type', 'amount']
    success_url = reverse_lazy('donations:list')

    def form_valid(self, form):
        form.instance.donor = self.request.user
        response_data = initiate_payment(
            amount=form.instance.amount,
            phone_number=self.request.user.profile.phone if hasattr(self.request.user, 'profile') else '',
            account_reference=self.request.user.username,
            transaction_desc=form.instance.get_donation_type_display()
        )
        # Store MPESA reference from response if available
        form.instance.mpesa_reference = response_data.get('CheckoutRequestID', '')
        messages.info(self.request, f"MPESA Payment initiated. Response: {response_data}")
        return super().form_valid(form)
