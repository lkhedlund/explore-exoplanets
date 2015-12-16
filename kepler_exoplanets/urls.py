from django.conf.urls import url, include
from django.contrib import admin
from . import views

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', views.index, name='index'),
    url(r'^starmap/$', views.starmap, name='starmap'),
    url(r'^planet/$', views.planet, name='planet'),
    url(r'^planet/gas_planet/$', views.gas_planet, name='planet'),

]
