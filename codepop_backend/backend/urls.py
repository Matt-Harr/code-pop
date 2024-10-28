from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import CreateUserAPIView, LogoutUserAPIView, CustomAuthToken
from .views import UserPreferenceLookup, PreferencesOperations
from .views import DrinkOperations, UserDrinksLookup
from .views import InventoryListAPIView, InventoryReportAPIView, InventoryUpdateAPIView
from .views import OrderOperations, UserOrdersLookup


#this ensures that the url calls the right function from the views for each type of request
preferences_list = PreferencesOperations.as_view({
    'get': 'list',
    'post': 'create'
})
#same as above ^
preferences_detail = PreferencesOperations.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})

drink_list = DrinkOperations.as_view({
    'get': 'list',
    'post': 'create'
})

drink_detail = DrinkOperations.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})

order_list = OrderOperations.as_view({
    'get': 'list',
    'post': 'create'
})

order_detail = OrderOperations.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})

urlpatterns = [
    #Authentication related urls
    path('auth/login/', CustomAuthToken.as_view(), name='auth_user_login'),
    path('auth/register/', CreateUserAPIView.as_view(), name='auth_user_create'),
    path('auth/logout/', LogoutUserAPIView.as_view(), name='auth_user_logout'),

    # Preference-related URLs
    path('preferences/', preferences_list, name='preference_list_create'),  # List and create preferences
    path('preferences/<int:pk>/', preferences_detail, name='preference_detail'),  # Retrieve, update, or delete a preference

    # Retrieve preferences by UserID
    path('users/<int:user_id>/preferences/', UserPreferenceLookup.as_view(), name='user_preferences_list'),

    #Drink URLs
    #1. The /backend/drinks/ endpoint will return a list of
    #2. only the drinks that are not User created if you call it
    #3. with a basic GET request
    path('drinks/', drink_list, name='drink list and create'),
    path('drinks/<int:pk>/', drink_detail, name='drink operations'),

    # Retrieve Drinks by UserID
    path('users/<int:user_id>/drinks/', UserDrinksLookup.as_view(), name='user_preferences_list'),


    path('inventory/', InventoryListAPIView.as_view(), name='inventory_list'),
    path('inventory/report/', InventoryReportAPIView.as_view(), name='inventory_report'),
    path('inventory/<int:pk>/', InventoryUpdateAPIView.as_view(), name='inventory_update'),

    #Order URLs

    # Endpoint to list all orders or create a new order.
    # - GET: Retrieve a list of all orders.
    # - POST: Create a new order. Requires authentication and order details in the request body.
    path('orders/', order_list, name='order_list_create'),

    # Endpoint to retrieve, update, or delete a specific order by its primary key (ID).
    # - GET: Retrieve details of a specific order.
    # - PATCH: Update the specific order (e.g., adding drinks).
    # - DELETE: Remove the specific order from the database.
    path('orders/<int:pk>/', order_detail, name='order_detail'),

    # Retrieve Orders by UserID

    # Endpoint to list all orders for a specific user identified by their user ID.
    # - GET: Retrieve a list of orders for the specified user.
    # - POST: Create a new order for the specified user. Requires authentication and order details.
    path('users/<int:user_id>/orders/', UserOrdersLookup.as_view(), name='user_orders_list_create'),

    # Endpoint to retrieve a specific order by its ID for a specific user.
    # - GET: Retrieve details of a specific order belonging to the specified user.
    # - DELETE: Remove the specific order from the database for the specified user.
    path('users/<int:user_id>/orders/<int:pk>/', order_detail, name='user_order_detail'),
]