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
    url(r'404/$', views.handler404)
]
