from django.shortcuts import render

# Create your views here.


def landing_page(req):
    return render(req, 'blog/index.html')


def posts_page():
    pass


def post_detail_page():
    pass
