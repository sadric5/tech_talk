from django.urls import path
from . import views



urlpatterns = [
    path("", views.index, name="frontend-view"),
    path("chart/", views.testChart, name="chart" ),
]