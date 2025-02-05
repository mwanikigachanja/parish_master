# sacraments/utils.py
from django.template.loader import render_to_string
import weasyprint
from django.conf import settings
import os

def generate_certificate_pdf(context, template_name, output_filename):
    html_string = render_to_string(template_name, context)
    pdf_file = weasyprint.HTML(string=html_string).write_pdf(stylesheets=[weasyprint.CSS(os.path.join(settings.STATIC_ROOT, 'css/pdf.css'))])
    with open(output_filename, 'wb') as f:
        f.write(pdf_file)
    return output_filename
