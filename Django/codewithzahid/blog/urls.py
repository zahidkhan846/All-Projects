
from django.urls import path
from . import views

urlpatterns = [
    path('', views.landing_page, name="landing_page"),
    path('/posts', views.posts_page, name="posts_page"),
    path('/posts/<slug:slug>', views.post_detail_page, name="post_detail_page"),
]
