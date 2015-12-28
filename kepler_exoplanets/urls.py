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
    url(r'^planet/redgas_planet/$', views.redgas_planet, name='redgas_planet'),
    url(r'^planet/bluegas_planet/$', views.bluegas_planet, name='bluegas_planet'),
    url(r'^planet/habitable_planet/$', views.habitable_planet, name='habitable_planet'),
    url(r'^planet/rockyplanet/$', views.rocky_planet, name='rockyplanet'),
    url(r'^stars/kepler_104/$', views.star, name='kepler104'),
    url(r'^skybox/$', views.skybox, name='skybox')
]
