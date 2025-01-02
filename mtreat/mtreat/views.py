from django.http import HttpResponse

def home(request):
    return HttpResponse("<h1>Welcome to the M-Treat Application</h1>")
