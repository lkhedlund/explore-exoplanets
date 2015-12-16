from django.shortcuts import render
from .models import Planet, Star

def index(request):
    return render(request, 'main/index.html')

def starmap(request):
    stars = Star.objects.all().order_by('pk')
    return render(request, 'starmap/starmap.html', {
        'stars': stars
    })

def planet(request):
    return render(request, 'planets/planet.html')
