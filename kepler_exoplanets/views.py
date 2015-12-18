from django.shortcuts import render, get_object_or_404
from .models import Planet, Star

def index(request):
    return render(request, 'main/index.html')

def starmap(request):
    stars = Star.objects.all().order_by('pk')
    return render(request, 'starmap/starmap.html', {
        'stars': stars
    })

def stellar_system(request, system_id):
    star = get_object_or_404(Star, pk=system_id)
    planets = star.planets.all()
    return render(request, 'stellar_system/stellar_system.html', {
        'star': star, 'planets': planets
    })

def planet(request, planet_id):
    planet = Planet.objects.get(pk=planet_id)
    star_id = planet.star.pk
    return render(request, 'planets/planet.html', {
        'planet': planet
    })

def star(request, star_id):
    star = Star.objects.get(pk=star_id)
    return render(request, 'stars/star.html', {
        'star': star
    })

# Testing Planets
def redgas_planet(request):
    return render(request, 'planets/_gasredplanet.html')

def bluegas_planet(request):
    return render(request, 'planets/_gasblueplanet.html')

def habitable_planet(request):
    return render(request, 'planets/_habitable.html')

def rocky_planet(request):
    return render(request, 'planets/_rockyplanet.html')

def skybox(request):
    return render(request, 'main/skybox.html')

def star(request):
    return render(request, 'stars/star.html')
