from django.conf.urls import url, include
from django.contrib import admin
from . import views

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', views.index, name='index'),
    url(r'^starmap/$', views.starmap, name='starmap'),
    url(r'stellar_system/(?P<system_id>[0-9]+)/$', views.stellar_system, name='stellar_system'),
    url(r'planet/(?P<planet_id>[0-9]+)/$', views.planet, name='planet'),
    url(r'star/(?P<star_id>[0-9]+)/$', views.star, name='star'),
    # Testing Planets
    url(r'^planet/gas_planet/$', views.gas_planet, name='gas_planet'),
    url(r'^planet/test_planet/$', views.test_planet, name='test_planet'),
    url(r'^planets/rockyplanet/$', views.planet, name='rockyplanet'),
    url(r'^stars/kepler_104/$', views.test_star, name='kepler104'),
]
