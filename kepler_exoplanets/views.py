from django.shortcuts import render

def index(request):
    return render(request, 'main/index.html')

def starmap(request):
    return render(request, 'starmap/starmap.html')

def planet(request):
    return render(request, 'planets/planet.html')
