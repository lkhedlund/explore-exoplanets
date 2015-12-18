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

def stellar_system(request, star_id):
    star = get_object_or_404(Star, pk=star_id)
    planets = star.planets.all()
    return render(request, 'stellar_system/stellar_system.html', {
        'star': star,
        'planets': planets
    })

def planet(request, planet_id):
    planet = Planet.objects.get(pk=planet_id)
    # print(planet)
    star_id = planet.star.pk
    return render(request, 'planets/planet.html', {
        'planet': planet
    })

# Testing Planets
def gas_planet(request):
    return render(request, 'planets/gas_planet.html')

def test_planet(request):
    return render(request, 'planets/test_planet.html')
