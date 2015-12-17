from django.conf.urls import url, include
from django.contrib import admin
from . import views

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', views.index, name='index'),
    url(r'^starmap/$', views.starmap, name='starmap'),
    url(r'solarsystem/(?P<star_id>[0-9]+)/$', views.solarsystem, name='solarsystem'),
    url(r'planet/(?P<planet_id>[0-9]+)/$', views.planet, name='planet'),
    # Testing Planets
    url(r'^planet/gas_planet/$', views.gas_planet, name='gas_planet'),
    url(r'^planet/test_planet/$', views.test_planet, name='test_planet'),
]
