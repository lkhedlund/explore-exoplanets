from django.shortcuts import render, get_object_or_404
from .models import Planet, Star

def index(request):
    return render(request, 'main/index.html')

def starmap(request):
    stars = Star.objects.all().order_by('pk')
    planets = Planet.objects.all().order_by('pk')
    habitable = planets.filter(surface_temp__gte=273, surface_temp__lt=373)
    return render(request, 'starmap/starmap.html', {
        'stars': stars,
        'planets': planets,
        'habitable': habitable
    })

def stellar_system(request, system_id):
    star = get_object_or_404(Star, pk=system_id)
    planets = star.planets.all()
    name = planets.first
    gas = planets.filter(planet_radius__gt=2)
    rocky = planets.filter(planet_radius__lte=2)
    habitable = rocky.filter(surface_temp__gte=273, surface_temp__lt=373)
    return render(request, 'stellar_system/stellar_system.html', {
        'star': star,
        'planets': planets, 
        'name': name,
        'gas': gas,
        'rocky': rocky, 
        'habitable': habitable
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

# Testing Planets
def redgas_planet(request):
    return render(request, 'planets/_gasredplanet.html')

def bluegas_planet(request):
    return render(request, 'planets/_gasblueplanet.html')

def habitable_planet(request):
    return render(request, 'planets/_habitableplanet.html')

def rocky_planet(request):
    return render(request, 'planets/_rockyplanet.html')

def test_star(request):
    return render(request, 'stars/star.html')
