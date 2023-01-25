from urllib import request, response
from django.shortcuts import render
from django.urls import reverse
from django.http import HttpResponse, HttpResponseNotFound, HttpResponseRedirect

monthly_challenges = {
    "jan": "This is jan challange",
    "fab": "This is fab challange",
    "mar": "This is mar challange",
    "apr": "This is apr challange",
    "may": "This is may challange",
    "jun": "This is jun challange",
    "jul": "This is jul challange",
    "aug": "This is aug challange",
    "sep": "This is sep challange",
    "oct": "This is oct challange",
    "nov": "This is nov challange",
    "dec": None,
}


def routes(req):
    months = list(monthly_challenges.keys())
    return render(req, 'challenges/index.html', {'months': months})


def index(resquest, month):
    months = list(monthly_challenges.keys())
    if len(months) < month:
        return HttpResponseNotFound("Page not found.")
    redirect_month = months[month - 1]
    redirect_path = reverse('month-challanges', args=[redirect_month])
    return HttpResponseRedirect(redirect_path)


def challanges(resquest, month):
    try:
        challenge_text = monthly_challenges[month]
        return render(resquest, 'challenges/challenge.html', {'challenge': challenge_text, 'month_name': month})
    except:
        response_data = render(resquest, 'challenges/not_found.html')
        return HttpResponseNotFound(response_data)
