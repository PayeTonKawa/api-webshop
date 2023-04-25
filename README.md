# api-webshop

## routes API webshop

### products :
    - [GET] /api/products/ -> renvoi la liste de tout les produits
    - [GET] /api/products/{id} -> renvoi un produit spécifique
    - [PUT] /api/products/ -> ajoute un produit spécifique
    - [POST] /api/products/{id} -> modifie un produit spécifique
    - [DELETE] /api/products/{id} -> supprime un produit spécifique
### stock :
    - [GET] /api/stocks/ -> renvoi la quantité des stocks pour l'ensemble des produits
    - [GET] /api/stocks/{id} -> renvoi la quantité des stocks pour un produit spécifique
    - [PUT] /api/stocks/ -> ajoute la quantité des stocks pour un produit spécifique
    - [POST] /api/stocks/{id} -> modifie un stocks spécifique
    - [DELETE] /api/stocks/{id} -> supprime un stocks spécifique
### order :
    - [GET] /api/orders/ -> renvoi la liste de toutes les commandes
    - [GET] /api/orders/{id} -> renvoi une commande spécifique
    - [PUT] /api/orders/ -> ajoute la quantité des stocks pour un produit spécifique
    - [POST] /api/orders/{id} -> modifie une commande spécifique
    - [DELETE] /api/orders/{id} -> supprime une commande spécifique
### prodpects :
    - [GET] /api/prospects/ -> liste des clients sans commandes
    - [POST] /api/orders/{id} -> modifie une commande spécifique
    - [DELETE] /api/orders/{id} -> supprime une commande spécifique
### customers :
    - [GET] /api/customers/ -> liste les clients
    - [GET] /api/customers/{customer_id}/orders/ -> liste des commandes d’un client
    - [GET] /api/customers/{customer_id}/orders/{order_id}/products -> liste de produits d’une commande
    - [PUT] /api/customers/ -> ajoute un client
    - [POST] /api/customers/{id} -> modifie un client
    - [DELETE] /api/customers/{id} -> supprime un client