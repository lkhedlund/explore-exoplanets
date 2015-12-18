from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^starmap/$', views.starmap, name='starmap'),
    url(r'^planets/rockyplanet/$', views.planet, name='rockyplanet'),
    url(r'^stars/kepler_104/$', views.star, name='kepler104'),
]
