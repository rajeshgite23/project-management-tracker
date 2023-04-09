FROM python:3.8-alpine

LABEL version="1.0" \
      Author="sumanshunankana@gmail.com" \
      description="E-Stock-Market Case Study by IIHT"

WORKDIR /e-stock-market

COPY . /e-stock-market

RUN pip install -r requirements.txt

# For Linux and Production Environment
CMD ["gunicorn", "-b", "0.0.0.0:5000", "wsgi:application", "--workers=4"]

# For Windows and Development Environment
# CMD ["python", "wsgi.py"]