from django.shortcuts import render

def index(request):
    return render(request, 'main/index.html')

def starmap(request):
    return render(request, 'starmap/starmap.html')

def planet(request):
    return render(request, 'planets/_bluerockyplanet.html')

def star(request):
    return render(request, 'stars/star.html')
