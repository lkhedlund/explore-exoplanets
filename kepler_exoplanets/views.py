from django.shortcuts import render, get_object_or_404, render_to_response
from django.template import RequestContext
from .models import Planet, Star

def index(request):
    return render(request, 'main/index.html')

def starmap(request):
    stars = Star.objects.all().order_by('pk')
    # Check for stars with habitable planets
    habitable = []
    five_plus = []
    for star in stars:
        planets = star.planets.all()
        # Stars with habitable planets
        if planets.filter(planet_radius__lte=2, surface_temp__gte=273, surface_temp__lt=373).count() > 0:
            habitable.append(star)
        # Stars with more than 5 planets
        if planets.count() >= 5:
            five_plus.append(star)
    planets = Planet.objects.all().order_by('pk')
    hotter = stars.filter(stellar_temp__gte=5000)
    cooler = stars.filter(stellar_temp__lt=5000)
    return render(request, 'starmap/starmap.html', {
        'stars': stars,
        'planets': planets,
        'habitable': habitable,
        'five_plus': five_plus,
        'hotter': hotter,
        'cooler': cooler,
    })

def stellar_system(request, system_id):
    star = get_object_or_404(Star, pk=system_id)
    planets = star.planets.all().order_by("semimajor_axis")
    name = planets.first
    gas = planets.filter(planet_radius__gt=2)
    rocky = planets.filter(planet_radius__lte=2)
    habitable = rocky.filter(planet_radius__lte=2, surface_temp__gte=273, surface_temp__lt=373)
    totalrocky = len(rocky) - len(habitable)
    years = round(star.light_years_dist * 37.2)
    return render(request, 'stellar_system/stellar_system.html', {
        'star': star,
        'planets': planets,
        'name': name,
        'gas': gas,
        'rocky': rocky,
        'habitable': habitable,
        'totalrocky': totalrocky,
        'years': years
    })

def planet(request, planet_id):
    planet = Planet.objects.get(pk=planet_id)
    star_id = planet.star.pk
    celsius = planet.surface_temp - 273
    orbital_period = 15 if planet.orbital_period is None else planet.orbital_period
    return render(request, 'planets/planet.html', {
        'planet': planet,
        'star_id': star_id,
        'celsius': celsius,
        'orbital_period': orbital_period
    })

def star(request, star_id):
    star = Star.objects.get(pk=star_id)
    planets = star.planets.all()
    name = planets.first
    return render(request, 'stars/star.html', {
        'star': star,
        'planets': planets,
        'name': name
    })

def handler404(request):
    response = render_to_response('error/404.html', {},
    context_instance=RequestContext(request))
    response.status_code = 404
    return response

def handler500(request):
    response = render_to_response('error/500.html', {},
    context_instance=RequestContext(request))
    response.status_code = 500
    return response
