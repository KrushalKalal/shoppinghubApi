#1st Page

1. List of Collection Category
https://shoppinghub-api.herokuapp.com/collectiontype

2. List of Brand
https://shoppinghub-api.herokuapp.com/brandlist

3. List of ImageList
https://shoppinghub-api.herokuapp.com/imagecollection

4. List of ImageCollection related to Collection Category
https://shoppinghub-api.herokuapp.com/imagecollection?collectionId=3

5. List of ImageCollection related to Brand
https://shoppinghub-api.herokuapp.com/imagecollection?brandId=1

6. List of ImageCollection related to discount
https://shoppinghub-api.herokuapp.com/imagecollection?discountId=1


#2nd Page

7. List of Products related to Brand
https://shoppinghub-api.herokuapp.com/products?brandId=1

8. Product on basis of Brand & Size
https://shoppinghub-api.herokuapp.com/filter/1?sizeId=2

9. Product on basis of Brand & Gender
https://shoppinghub-api.herokuapp.com/filter/1?genderId=1

10. Product on basis of Brand & Ocation
https://shoppinghub-api.herokuapp.com/filter/1?occasionId=1


#3rd Page 

11. Detail of the Product
https://shoppinghub-api.herokuapp.com/details/1


#4th Page

12. Product Details
(POST) https://shoppinghub-api.herokuapp.com/productItem
{"id": [3,6,8]}

13. Place Order 
(POST) https://shoppinghub-api.herokuapp.com/placeOrder
{
    "order_id": 5,
    "name": "Damini",
    "email": "damini@gmail.com",
    "address": "Hno 23,Sector 1",
    "phone": 768768686,
    "cost": 2787,
    "menuItem":[12,16,18],
    "status": "Pending"
}


#5th Page

14. List Of Order Placed
https://shoppinghub-api.herokuapp.com/orderList

15. List of Order Placed related to Email
https://shoppinghub-api.herokuapp.com/orderList?email=krushal@gmail.com

16. Update Order Details with Payment
(PUT) https://shoppinghub-api.herokuapp.com/updateOrder/1
{
     "status": "TXN Successful",
     "bank_name": "AXIS Bank",
     "date": "12/07/2022"
}

17. Delete Order
(DELETE) https://shoppinghub-api.herokuapp.com/deleteOrder/6



