from django.urls import path
from . import views

urlpatterns = [
    path('', views.routes),
    path('<int:month>', views.index),
    path('<str:month>', views.challanges, name='month-challanges'),
]
