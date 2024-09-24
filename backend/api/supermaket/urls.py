from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ArticleViewSet, TransactionViewSet

router = DefaultRouter()
router.register(r'articles', ArticleViewSet)
router.register(r'transactions', TransactionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path("url_route", include())
]